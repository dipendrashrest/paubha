import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type PreflightLevel = "error" | "warning";

export interface PreflightMessage {
  level: PreflightLevel;
  message: string;
}

function readPackageJson(cwd: string): Record<string, unknown> | null {
  const path = join(cwd, "package.json");
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function depRange(
  pkg: Record<string, unknown>,
  name: string,
): string | undefined {
  const sections = ["dependencies", "devDependencies", "peerDependencies"];
  for (const section of sections) {
    const value = (pkg[section] as Record<string, string> | undefined)?.[name];
    if (value) return value;
  }
  return undefined;
}

function majorVersion(range?: string): number | null {
  const match = range?.match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

/**
 * Fails fast with an actionable message instead of letting `init`/`add` crash
 * partway through (a raw ENOENT, or a broken CSS-first `@theme` setup, is a
 * much worse experience than telling the user up front what's missing).
 */
export function checkProject(cwd: string): PreflightMessage[] {
  const pkg = readPackageJson(cwd);

  if (!pkg) {
    return [
      {
        level: "error",
        message: [
          "No package.json found in this directory.",
          "Run this inside an existing project (e.g. after `npx create-next-app@latest` or `npm create vite@latest`), not an empty folder.",
        ].join("\n"),
      },
    ];
  }

  const issues: PreflightMessage[] = [];

  const reactMajor = majorVersion(depRange(pkg, "react"));
  if (reactMajor !== null && reactMajor < 19) {
    issues.push({
      level: "warning",
      message: `This project depends on react@${reactMajor}, but Paubha components target React 19+. Some components may not behave correctly on older React.`,
    });
  }

  const tailwindMajor = majorVersion(depRange(pkg, "tailwindcss"));
  if (tailwindMajor === null) {
    issues.push({
      level: "warning",
      message: [
        "No `tailwindcss` dependency found in this package.json.",
        "Paubha's tokens.css/theme.css need Tailwind CSS v4 (CSS-first `@theme`, no tailwind.config.js). Install it first: https://tailwindcss.com/docs/installation",
      ].join("\n"),
    });
  } else if (tailwindMajor < 4) {
    issues.push({
      level: "error",
      message: `Tailwind CSS v${tailwindMajor} detected, but Paubha requires Tailwind v4+ (CSS-first \`@theme\`, no tailwind.config.js). Upgrade first: https://tailwindcss.com/docs/upgrade-guide`,
    });
  }

  return issues;
}

/** Prints each message and returns true if any is an error (caller should stop). */
export function reportPreflight(issues: PreflightMessage[]): boolean {
  for (const issue of issues) {
    const log = issue.level === "error" ? console.error : console.warn;
    log(issue.message);
  }
  return issues.some((issue) => issue.level === "error");
}
