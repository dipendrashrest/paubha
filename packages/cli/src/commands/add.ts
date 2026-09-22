import { execSync } from "node:child_process";
import { basename, join } from "node:path";
import { readConfig } from "../utils/config.js";
import {
  detectPackageManager,
  installCommand,
} from "../utils/package-manager.js";
import { checkProject, reportPreflight } from "../utils/preflight.js";
import {
  type RegistryFile,
  type RegistryItem,
  getRegistryBase,
  resolveComponents,
} from "../utils/registry.js";
import { rewriteLibImports } from "../utils/rewrite-imports.js";
import { writeFileSafe } from "../utils/write-file.js";

export interface AddOptions {
  cwd: string;
  force: boolean;
}

/** ui/avatar/avatar.tsx → avatar/avatar.tsx (POSIX, as the registry publishes it). */
function componentRelPath(path: string): string {
  return path.startsWith("ui/") ? path.slice("ui/".length) : basename(path);
}

function destinationFor(
  file: RegistryFile,
  cwd: string,
  aliases: { components: string; lib: string },
): string {
  if (file.type === "registry:lib") {
    return join(cwd, aliases.lib, basename(file.path));
  }
  return join(cwd, aliases.components, componentRelPath(file.path));
}

/**
 * The module specifier for an item, derived from the file it actually writes
 * rather than its registry name. `select-v2` ships `ui/select/select.tsx`, so
 * guessing `select-v2/select-v2` from the name pointed at a file that never existed.
 */
function importPathFor(
  item: RegistryItem,
  componentsAlias: string,
): string | null {
  const file = item.files.find((candidate) => candidate.type === "registry:ui");
  if (!file) return null;
  const rel = componentRelPath(file.path).replace(/\.[jt]sx?$/, "");
  return `@/${componentsAlias}/${rel}`;
}

export async function runAdd(
  names: string[],
  { cwd, force }: AddOptions,
): Promise<void> {
  if (reportPreflight(checkProject(cwd))) {
    process.exitCode = 1;
    return;
  }

  const config = readConfig(cwd);
  if (!config) {
    console.error("No components.json found. Run `npx paubha init` first.");
    process.exitCode = 1;
    return;
  }

  const base = getRegistryBase(config.registry);
  console.log(`Fetching from ${base}...`);

  let resolved: Awaited<ReturnType<typeof resolveComponents>>;
  try {
    resolved = await resolveComponents(names, base);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
    return;
  }

  const requested = new Set(names);
  const pulledIn = resolved.items.filter((item) => !requested.has(item.name));

  console.log(`Adding: ${resolved.items.map((item) => item.name).join(", ")}`);
  if (pulledIn.length > 0) {
    console.log(
      `  (pulled in as dependencies: ${pulledIn.map((item) => item.name).join(", ")})`,
    );
  }

  const libDir = join(cwd, config.aliases.lib);

  for (const file of resolved.files) {
    const dest = destinationFor(file, cwd, config.aliases);
    const content = rewriteLibImports(file.content, dest, libDir);
    const result = writeFileSafe(dest, content, force);
    if (result.status === "skipped-exists") {
      console.log(
        `• ${result.path} already exists and differs, skipping (use --force to overwrite)`,
      );
    } else if (result.status === "unchanged") {
      console.log(`• ${result.path} already up to date`);
    } else {
      console.log(
        `✔ ${result.status === "overwritten" ? "Overwrote" : "Wrote"} ${result.path}`,
      );
    }
  }

  if (resolved.dependencies.length > 0) {
    const manager = detectPackageManager(cwd);
    console.log(
      `\nInstalling ${resolved.dependencies.join(", ")} with ${manager}...`,
    );
    execSync(installCommand(manager, resolved.dependencies), {
      cwd,
      stdio: "inherit",
    });
  }

  const requestedItems = resolved.items.filter((item) =>
    requested.has(item.name),
  );
  if (requestedItems.length > 0) {
    console.log("\nImport it and use it:");
    for (const item of requestedItems) {
      const importPath = importPathFor(item, config.aliases.components);
      const exports = item.meta?.exports ?? [];
      if (!importPath || exports.length === 0) continue;

      const shown = exports.slice(0, 4).join(", ");
      const rest = exports.length > 4 ? `, …+${exports.length - 4} more` : "";
      console.log(`  import { ${shown}${rest} } from "${importPath}";`);
    }
  }

  console.log("\nDone.");
}
