import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DEFAULT_REGISTRY_URL } from "./registry.js";

export interface AsteriaConfig {
  $schema: string;
  registry: string;
  aliases: {
    components: string;
    lib: string;
  };
  tailwind: {
    tokens: string;
    theme: string;
  };
}

export const CONFIG_FILE = "components.json";

export const DEFAULT_CONFIG: AsteriaConfig = {
  $schema: "https://asteria-ui.vercel.app/schema.json",
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

export function configPath(cwd: string): string {
  return join(cwd, CONFIG_FILE);
}

export function readConfig(cwd: string): AsteriaConfig | null {
  const path = configPath(cwd);
  if (!existsSync(path)) return null;
  const parsed = JSON.parse(
    readFileSync(path, "utf8"),
  ) as Partial<AsteriaConfig>;
  return {
    ...DEFAULT_CONFIG,
    ...parsed,
    aliases: { ...DEFAULT_CONFIG.aliases, ...parsed.aliases },
    tailwind: { ...DEFAULT_CONFIG.tailwind, ...parsed.tailwind },
  };
}

export function writeConfig(cwd: string, config: AsteriaConfig): void {
  writeFileSync(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`);
}
