#!/usr/bin/env node
import { Command } from "commander";
import { runAdd } from "./commands/add.js";
import { runInit } from "./commands/init.js";

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
  .name("asteria-ui")
  .description("shadcn-style copy-paste CLI for Asteria UI")
  .version("0.0.0");

program
  .command("init")
  .description(
    "write tokens.css, theme.css, cn(), and install core dependencies",
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
