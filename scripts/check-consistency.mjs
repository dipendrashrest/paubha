#!/usr/bin/env node
/**
 * Guards the facts this repo duplicates in more than one place.
 *
 * Failure modes it has actually hit:
 *  1. Links to `ui.paubha.tech/<path>` — that host serves only the marketing
 *     homepage (separate private repo), so every docs path under it 404s.
 *  2. The registry base drifting apart across the places that hardcode it.
 *  3. The CLI's `--version` and the docs navbar badge silently going stale
 *     because they were hardcoded literals instead of reading
 *     packages/cli/package.json (the navbar sat at "v0.1.2" through three
 *     real releases before anyone noticed). Both now read it live, so this
 *     guards against either regressing back to a literal.
 *  4. tokens.css's two dark-mode blocks (OS fallback + `.dark` class) drifting,
 *     which would make dark mode differ depending on how it was switched on.
 *
 * Run by `pnpm check`.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
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

// Both used to be hardcoded literals — the CLI's own --version, and the docs
// navbar badge — and both drifted from packages/cli/package.json before this
// check existed. They now read it live (packages/cli/src/index.ts via fs at
// runtime, apps/www/lib/version.ts via fs at build time). Guard against
// either regressing back to a typed-in literal rather than re-checking a
// value that can no longer disagree by construction.
const indexTs = readFileSync(join(root, "packages/cli/src/index.ts"), "utf8");
const versionCall = indexTs.match(/\.version\(([^)]*)\)/)?.[1] ?? "";
if (/["']/.test(versionCall)) {
  errors.push(
    `packages/cli/src/index.ts: .version(${versionCall}) looks like a hardcoded literal, not the value read from package.json. It drifted this way before — pass the parsed \`version\`, don't type it in.`,
  );
}

const navbarTsx = readFileSync(
  join(root, "apps/www/components/site/site-navbar.tsx"),
  "utf8",
);
// Anchored on a literal "v" immediately before the digits (the badge's own
// text, "v0.1.2") rather than SEMVER_LITERAL bare — GithubMark's inline SVG
// path data is full of coincidental N.N.N-shaped number runs with no "v".
if (/\bv\d+\.\d+\.\d+\b/.test(navbarTsx)) {
  errors.push(
    'apps/www/components/site/site-navbar.tsx: contains a hardcoded version-looking string. It sat stale at "v0.1.2" through three releases before — render the `version` prop (from CLI_VERSION), don\'t type a number in.',
  );
}

// Every component folder ships an index.ts barrel so the flat, shadcn-standard
// import (`@/components/ui/button`) resolves. The barrels existed in the source
// all along but weren't listed in registry.json, so the build dropped them and
// `add` copied only the bare component file — users hit "Cannot find module" on
// their first line. build-registry.mjs adds them now; this catches a folder that
// never got one, which would break that import for that component alone.
const registryItems = readJson("packages/registry/registry.json").items;
for (const item of registryItems) {
  const componentFile = item.files.find(
    (file) => file.type === "registry:ui" && !file.path.endsWith("/index.ts"),
  );
  if (!componentFile) continue;
  const barrel = `${componentFile.path.split("/").slice(0, -1).join("/")}/index.ts`;
  if (!existsSync(join(root, "packages/registry", barrel))) {
    errors.push(
      `packages/registry/${barrel} is missing, so \`add ${item.name}\` would ship a folder with no barrel and "@/components/ui/..." wouldn't resolve for it.`,
    );
  }
}

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
