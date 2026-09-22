import { execSync } from "node:child_process";
import { basename, join } from "node:path";
import { readConfig } from "../utils/config.js";
import {
  detectPackageManager,
  installCommand,
} from "../utils/package-manager.js";
import {
  type RegistryFile,
  getRegistryBase,
  resolveComponents,
} from "../utils/registry.js";
import { rewriteLibImports } from "../utils/rewrite-imports.js";
import { writeFileSafe } from "../utils/write-file.js";

export interface AddOptions {
  cwd: string;
  force: boolean;
}

function toPascalCase(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function destinationFor(
  file: RegistryFile,
  cwd: string,
  aliases: { components: string; lib: string },
): string {
  if (file.type === "registry:lib") {
    return join(cwd, aliases.lib, basename(file.path));
  }
  // ui/avatar/avatar.tsx → {components}/avatar/avatar.tsx
  const rel = file.path.startsWith("ui/")
    ? file.path.slice("ui/".length)
    : basename(file.path);
  return join(cwd, aliases.components, rel);
}

export async function runAdd(
  names: string[],
  { cwd, force }: AddOptions,
): Promise<void> {
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
        `• ${result.path} already exists, skipping (use --force to overwrite)`,
      );
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
      const componentName = toPascalCase(item.name);
      console.log(
        `  import { ${componentName} } from "@/${config.aliases.components}/${item.name}/${item.name}";`,
      );
    }
  }

  console.log("\nDone.");
}
