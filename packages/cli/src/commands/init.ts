import { execSync } from "node:child_process";
import { join } from "node:path";
import { DEFAULT_CONFIG, readConfig, writeConfig } from "../utils/config.js";
import {
  detectPackageManager,
  installCommand,
} from "../utils/package-manager.js";
import {
  fetchCnSource,
  fetchStyles,
  getRegistryBase,
} from "../utils/registry.js";
import { writeFileSafe } from "../utils/write-file.js";

export interface InitOptions {
  cwd: string;
  force: boolean;
}

const INIT_DEPENDENCIES = [
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
];

export async function runInit({ cwd, force }: InitOptions): Promise<void> {
  const existing = readConfig(cwd);
  const config = existing ?? DEFAULT_CONFIG;

  if (!existing) {
    writeConfig(cwd, config);
    console.log("✔ Created components.json");
  } else {
    console.log("• components.json already exists, reusing its paths");
  }

  const base = getRegistryBase(config.registry);
  console.log(`Fetching styles from ${base}...`);

  const [{ tokensCss, themeCss }, cnSource] = await Promise.all([
    fetchStyles(base),
    fetchCnSource(base),
  ]);

  const results = [
    writeFileSafe(join(cwd, config.tailwind.tokens), tokensCss, force),
    writeFileSafe(join(cwd, config.tailwind.theme), themeCss, force),
    writeFileSafe(join(cwd, config.aliases.lib, "cn.ts"), cnSource, force),
  ];

  for (const result of results) {
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

  const manager = detectPackageManager(cwd);
  console.log(
    `\nInstalling ${INIT_DEPENDENCIES.join(", ")} with ${manager}...`,
  );
  execSync(installCommand(manager, INIT_DEPENDENCIES), {
    cwd,
    stdio: "inherit",
  });

  console.log(
    "\nDone. Add your first component with:\n  npx asteria-ui add button",
  );
}
