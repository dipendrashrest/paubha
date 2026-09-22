#!/usr/bin/env node
/**
 * Guards the facts this repo duplicates in more than one place.
 *
 * Failure modes it has actually hit:
 *  1. Links to `ui.paubha.tech/<path>` — that host serves only the marketing
 *     homepage (separate private repo), so every docs path under it 404s.
 *  2. The registry base drifting apart across the places that hardcode it.
 *  3. The CLI's `--version` literal drifting from its package.json.
 *  4. tokens.css's two dark-mode blocks (OS fallback + `.dark` class) drifting,
 *     which would make dark mode differ depending on how it was switched on.
 *
 * Run by `pnpm check`.
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CANONICAL_HOST = "paubha.tech";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;
const REGISTRY_URL = `${CANONICAL_ORIGIN}/r`;

const SCANNED_EXTENSIONS = /\.(tsx?|jsx?|mjs|cjs|mdx?|json|css|ya?ml)$/;
/** Bare `ui.paubha.tech` in prose is fine — it's a real deployment. A path under it is not. */
const BAD_LINK = /\bui\.paubha\.tech\/\S+/g;

const errors = [];

function trackedFiles() {
  return execFileSync("git", ["ls-files", "-z"], {
    cwd: root,
    encoding: "utf8",
  })
    .split("\0")
    .filter(
      (file) =>
        file &&
        SCANNED_EXTENSIONS.test(file) &&
        !file.startsWith("apps/www/public/r/") &&
        // This file spells out the bad pattern in order to match it.
        file !== "scripts/check-consistency.mjs",
    );
}

for (const file of trackedFiles()) {
  const source = readFileSync(join(root, file), "utf8");
  const lines = source.split("\n");
  for (const [index, line] of lines.entries()) {
    for (const match of line.matchAll(BAD_LINK)) {
      errors.push(
        `${file}:${index + 1} links to "${match[0]}" — that host only serves the marketing homepage, so the path 404s. Use ${CANONICAL_ORIGIN}/… instead.`,
      );
    }
  }
}

function readJson(relPath) {
  return JSON.parse(readFileSync(join(root, relPath), "utf8"));
}

function expect(label, actual, expected) {
  if (actual !== expected) {
    errors.push(`${label} is "${actual}", expected "${expected}"`);
  }
}

expect(
  "packages/registry/registry.json homepage",
  readJson("packages/registry/registry.json").homepage,
  CANONICAL_ORIGIN,
);
expect(
  "packages/cli/package.json homepage",
  readJson("packages/cli/package.json").homepage,
  CANONICAL_ORIGIN,
);
expect(
  "apps/www/public/schema.json $id",
  readJson("apps/www/public/schema.json").$id,
  `${CANONICAL_ORIGIN}/schema.json`,
);

const registryTs = readFileSync(
  join(root, "packages/cli/src/utils/registry.ts"),
  "utf8",
);
expect(
  "DEFAULT_REGISTRY_URL",
  registryTs.match(/DEFAULT_REGISTRY_URL\s*=\s*"([^"]+)"/)?.[1],
  REGISTRY_URL,
);

const configTs = readFileSync(
  join(root, "packages/cli/src/utils/config.ts"),
  "utf8",
);
expect(
  "components.json $schema",
  configTs.match(/\$schema:\s*"([^"]+)"/)?.[1],
  `${CANONICAL_ORIGIN}/schema.json`,
);

// `--version` is a hardcoded literal in the commander setup, so it silently
// drifts every time package.json is bumped on its own.
const cliPkgVersion = readJson("packages/cli/package.json").version;
const indexTs = readFileSync(join(root, "packages/cli/src/index.ts"), "utf8");
expect(
  "packages/cli/src/index.ts .version()",
  indexTs.match(/\.version\("([^"]+)"\)/)?.[1],
  cliPkgVersion,
);

// Dark mode is declared twice — once behind `prefers-color-scheme` so it works
// with no setup, once behind `.dark` for an explicit toggle. They must agree.
const tokensCss = readFileSync(
  join(root, "packages/registry/styles/tokens.css"),
  "utf8",
);

function darkDeclarations(block) {
  return [...block.matchAll(/--[\w-]+\s*:[^;]+;/g)]
    .map((match) => match[0].replace(/\s+/g, " ").trim())
    .sort();
}

// Exactly one of each: a stale second copy would silently win or lose by source
// order, and comparing only the first would not notice.
const mediaCount = (
  tokensCss.match(/@media \(prefers-color-scheme: dark\)/g) ?? []
).length;
const classCount = (tokensCss.match(/^\.dark,$/gm) ?? []).length;
const duplicated = mediaCount !== 1 || classCount !== 1;
if (duplicated) {
  errors.push(
    `tokens.css should have exactly one prefers-color-scheme block and one .dark block, found ${mediaCount} and ${classCount}. Run \`pnpm sync:tokens\`.`,
  );
}

const mediaBlock = tokensCss.match(
  /@media \(prefers-color-scheme: dark\) \{(.*?)\n\}\n/s,
)?.[1];
const classBlock = tokensCss.match(
  /\n\.dark,\n\[data-preview-theme="dark"\] \{(.*?)\n\}/s,
)?.[1];

if (!mediaBlock || !classBlock) {
  errors.push(
    "tokens.css is missing its prefers-color-scheme fallback or its .dark block",
  );
} else if (!duplicated) {
  // A stray extra block makes every declaration look mismatched; the count
  // error above is the one worth acting on, so don't bury it.
  const fromMedia = darkDeclarations(mediaBlock);
  const fromClass = darkDeclarations(classBlock);
  const onlyMedia = fromMedia.filter((d) => !fromClass.includes(d));
  const onlyClass = fromClass.filter((d) => !fromMedia.includes(d));
  for (const decl of onlyClass) {
    errors.push(
      `tokens.css: "${decl}" is in the .dark block but not the prefers-color-scheme fallback. Run \`pnpm sync:tokens\`.`,
    );
  }
  for (const decl of onlyMedia) {
    errors.push(
      `tokens.css: "${decl}" is in the prefers-color-scheme fallback but not the .dark block. Run \`pnpm sync:tokens\`.`,
    );
  }
}

if (errors.length > 0) {
  console.error(`Consistency check failed (${errors.length}):\n`);
  for (const error of errors) console.error(`  ✖ ${error}`);
  process.exit(1);
}

console.log("✔ Consistency check passed");
