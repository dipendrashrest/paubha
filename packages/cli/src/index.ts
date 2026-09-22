#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { runAdd } from "./commands/add.js";
import { runInit } from "./commands/init.js";

// Read from package.json rather than a hardcoded literal: a literal is a
// second place to remember to bump, and it already drifted once (0.1.1 vs
// 0.1.2) before this session started fixing things. dist/index.js always
// ships one directory below package.json, both in this repo and once
// installed under node_modules/paubha/, so the relative path holds either way.
const { version } = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "package.json"),
    "utf8",
  ),
) as { version: string };

async function runSafely(fn: () => void | Promise<void>): Promise<void> {
  try {
    await fn();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

const program = new Command();

program
  .name("paubha")
  .description("shadcn-style copy-paste CLI for Paubha")
  .version(version);

program
  .command("init")
  .description(
    "write tokens.css, theme.css, cn(), wire them into your global CSS, and install core dependencies",
  )
  .option("--cwd <path>", "target directory", process.cwd())
  .option("--force", "overwrite existing files", false)
  .action(async (options: { cwd: string; force: boolean }) => {
    await runSafely(() => runInit(options));
  });

program
  .command("add")
  .description("copy one or more components into your project")
  .argument("<components...>", "component name(s), e.g. button avatar")
  .option("--cwd <path>", "target directory", process.cwd())
  .option("--force", "overwrite existing files", false)
  .action(
    async (components: string[], options: { cwd: string; force: boolean }) => {
      await runSafely(() => runAdd(components, options));
    },
  );

program.parseAsync(process.argv);
