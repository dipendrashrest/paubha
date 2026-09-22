import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  DEFAULT_CONFIG,
  type PaubhaConfig,
  readConfig,
  writeConfig,
} from "../utils/config.js";
import {
  findGlobalCss,
  injectTokenImports,
  toImportSpecifier,
} from "../utils/css.js";
import {
  detectPackageManager,
  installCommand,
} from "../utils/package-manager.js";
import { checkProject, reportPreflight } from "../utils/preflight.js";
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
  if (reportPreflight(checkProject(cwd))) {
    process.exitCode = 1;
    return;
  }

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

  wireGlobalCss(cwd, config);

  console.log("Add your first component with:\n  npx paubha add button");
}

/**
 * Adds the token `@import`s to the project's global stylesheet. This used to be a
 * manual step, and getting the relative depth wrong was the single most common
 * reason components rendered unstyled after a clean `init`.
 */
function wireGlobalCss(cwd: string, config: PaubhaConfig): void {
  const target = findGlobalCss(cwd, config.tailwind.css);

  if (!target) {
    console.log(
      [
        "",
        "Couldn't find a global CSS file to wire up. Create one (e.g. app/globals.css), then add, in this order:",
        '  @import "tailwindcss";',
        `  @import "./${config.tailwind.tokens}";`,
        `  @import "./${config.tailwind.theme}";`,
        `Adjust the leading "./" to that file's depth, or set "tailwind.css" in components.json and re-run init.`,
        "Components won't look right until this is wired up.",
        "",
      ].join("\n"),
    );
    return;
  }

  const specifiers = [config.tailwind.tokens, config.tailwind.theme].map(
    (rel) => toImportSpecifier(target.path, cwd, rel),
  );
  const result = injectTokenImports(
    readFileSync(target.path, "utf8"),
    specifiers,
  );

  if (result.status === "no-anchor") {
    console.log(
      [
        "",
        `${target.relPath} doesn't import Tailwind yet, so there's nowhere safe to put the tokens.`,
        "Add this at the top of that file, then re-run init:",
        '  @import "tailwindcss";',
        `  @import "${specifiers[0]}";`,
        `  @import "${specifiers[1]}";`,
        "",
      ].join("\n"),
    );
    return;
  }

  if (result.status === "already-present") {
    console.log(`\n• ${target.relPath} already imports the tokens`);
  } else {
    writeFileSync(target.path, result.content);
    console.log(
      `\n✔ Wired ${result.added.join(" and ")} into ${target.relPath} (after Tailwind)`,
    );
  }

  if (config.tailwind.css !== target.relPath) {
    writeConfig(cwd, {
      ...config,
      tailwind: { ...config.tailwind, css: target.relPath },
    });
  }
}
