import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DEFAULT_REGISTRY_URL } from "./registry.js";

export interface PaubhaConfig {
  $schema: string;
  registry: string;
  aliases: {
    components: string;
    lib: string;
  };
  tailwind: {
    tokens: string;
    theme: string;
    /**
     * The global stylesheet `init` adds the token `@import`s to. Auto-detected on
     * first run and persisted, so re-runs and unusual project layouts stay stable.
     */
    css?: string;
  };
}

export const CONFIG_FILE = "components.json";

export const DEFAULT_CONFIG: PaubhaConfig = {
  $schema: "https://paubha.tech/schema.json",
  registry: DEFAULT_REGISTRY_URL,
  aliases: {
    components: "components/ui",
    lib: "lib",
  },
  tailwind: {
    tokens: "styles/tokens.css",
    theme: "styles/theme.css",
  },
};

/**
 * Defaults for a fresh `init`. Projects with a `src/` folder (Vite, or Next with
 * `--src-dir`) keep their `@/*` alias pointing at `./src/*`, so files written to
 * the project root would sit outside both the alias and tsconfig's `include`.
 */
export function detectConfig(cwd: string): PaubhaConfig {
  if (!usesSrcDir(cwd)) return DEFAULT_CONFIG;
  const prefix = (path: string) => `src/${path}`;
  return {
    ...DEFAULT_CONFIG,
    aliases: {
      components: prefix(DEFAULT_CONFIG.aliases.components),
      lib: prefix(DEFAULT_CONFIG.aliases.lib),
    },
    tailwind: {
      tokens: prefix(DEFAULT_CONFIG.tailwind.tokens),
      theme: prefix(DEFAULT_CONFIG.tailwind.theme),
    },
  };
}

function usesSrcDir(cwd: string): boolean {
  if (!existsSync(join(cwd, "src"))) return false;
  const target = readAliasTarget(cwd);
  // A root-mapped alias (`"@/*": ["./*"]`) means files belong at the root even
  // if a `src/` folder happens to exist.
  return target === null || target.startsWith("src");
}

/** First target of the `@/*` path alias in tsconfig, normalised (`./src/*` → `src`). */
function readAliasTarget(cwd: string): string | null {
  for (const name of ["tsconfig.json", "tsconfig.app.json", "jsconfig.json"]) {
    const path = join(cwd, name);
    if (!existsSync(path)) continue;
    try {
      const text = readFileSync(path, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|\s)\/\/.*$/gm, "$1")
        .replace(/,(\s*[}\]])/g, "$1");
      const target = JSON.parse(text)?.compilerOptions?.paths?.["@/*"]?.[0];
      if (typeof target === "string") {
        return target.replace(/^\.\//, "").replace(/\/?\*$/, "");
      }
    } catch {
      // unparsable tsconfig (references-only, exotic JSONC) — fall through
    }
  }
  return null;
}

/**
 * Warns when `components.json` puts files somewhere the project's `@/*` alias
 * can't reach (e.g. an older `init` wrote to the root of a `src/` project).
 */
export function aliasMismatch(
  cwd: string,
  config: PaubhaConfig,
): string | null {
  const target = readAliasTarget(cwd);
  if (!target) return null;
  const outside = [config.aliases.components, config.aliases.lib].filter(
    (path) => !path.startsWith(`${target}/`),
  );
  if (outside.length === 0) return null;
  return [
    `tsconfig maps "@/*" to "./${target}/*", but components.json writes to ${outside.join(" and ")} — outside that alias, so imports won't resolve.`,
    `Move those folders under ${target}/ and set aliases.components / aliases.lib (and tailwind.tokens / tailwind.theme) to "${target}/…" in components.json.`,
  ].join("\n");
}

/** Alias-relative form of a project path: `src/components/ui` → `components/ui`. */
export function stripSrc(path: string): string {
  return path.replace(/^src\//, "");
}

export function configPath(cwd: string): string {
  return join(cwd, CONFIG_FILE);
}

export function readConfig(cwd: string): PaubhaConfig | null {
  const path = configPath(cwd);
  if (!existsSync(path)) return null;
  const parsed = JSON.parse(
    readFileSync(path, "utf8"),
  ) as Partial<PaubhaConfig>;
  return {
    ...DEFAULT_CONFIG,
    ...parsed,
    aliases: { ...DEFAULT_CONFIG.aliases, ...parsed.aliases },
    tailwind: { ...DEFAULT_CONFIG.tailwind, ...parsed.tailwind },
  };
}

export function writeConfig(cwd: string, config: PaubhaConfig): void {
  writeFileSync(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`);
}
