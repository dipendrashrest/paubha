#!/usr/bin/env node
/**
 * Builds shadcn-format registry JSON into apps/www/public/r/.
 * Source of truth: packages/registry (ui/, lib/, styles/, registry.json).
 */

import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const registryRoot = join(__dirname, "..");
const outDir = join(registryRoot, "..", "..", "apps", "www", "public", "r");

function readText(path) {
  return readFileSync(path, "utf8");
}

function readSource(relPath) {
  return readText(join(registryRoot, relPath));
}

const registryJson = JSON.parse(readText(join(registryRoot, "registry.json")));
const tokensCss = readText(join(registryRoot, "styles", "tokens.css"));
const themeCss = readText(join(registryRoot, "styles", "theme.css"));

mkdirSync(outDir, { recursive: true });

// Clear prior build artifacts (keep .gitkeep).
for (const entry of readdirSync(outDir, { withFileTypes: true })) {
  if (entry.name === ".gitkeep") continue;
  rmSync(join(outDir, entry.name), { recursive: true, force: true });
}

/**
 * Top-level value exports (components/helpers), in source order.
 * `interface`/`type` exports are deliberately skipped — they can't be rendered,
 * so they'd be noise in the CLI's "import it and use it" hint.
 */
function exportedSymbols(source) {
  return [
    ...source.matchAll(/^export\s+(?:const|function)\s+([A-Z]\w*)/gm),
  ].map((match) => match[1]);
}

/**
 * Several items share one source file: `SelectV2` lives inside `ui/select/select.tsx`
 * alongside `Select`. Splitting exports by the `V2` suffix is what lets `add select-v2`
 * report the symbols and path you actually got, instead of guessing `select-v2/select-v2`
 * from the item name — a path that never existed on disk.
 */
function exportsForItem(item, files) {
  const isV2 = item.name.endsWith("-v2");
  const symbols = files
    .filter((file) => file.type === "registry:ui")
    .flatMap((file) => exportedSymbols(file.content))
    .filter((symbol) => symbol.endsWith("V2") === isV2);

  const primary = item.name
    .split("-")
    .map((part) =>
      part === "v2" ? "V2" : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join("");

  return symbols.includes(primary)
    ? [primary, ...symbols.filter((symbol) => symbol !== primary)]
    : symbols;
}

const builtItems = [];

for (const item of registryJson.items) {
  const files = item.files.map((file) => ({
    path: file.path,
    type: file.type,
    content: readSource(file.path),
  }));

  const meta = { ...item.meta, exports: exportsForItem(item, files) };

  if (meta.exports.length === 0) {
    throw new Error(
      `"${item.name}" resolved to zero exports. Its source must export at least one PascalCase const/function${
        item.name.endsWith("-v2") ? ` whose name ends in "V2".` : "."
      }`,
    );
  }

  const payload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    meta,
    files,
  };

  writeFileSync(
    join(outDir, `${item.name}.json`),
    `${JSON.stringify(payload, null, 2)}\n`,
  );

  builtItems.push({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    meta,
    files: item.files,
  });
}

const index = {
  $schema: registryJson.$schema,
  name: registryJson.name,
  homepage: registryJson.homepage,
  items: builtItems,
};

writeFileSync(
  join(outDir, "registry.json"),
  `${JSON.stringify(index, null, 2)}\n`,
);

const stylesPayload = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "styles",
  type: "registry:style",
  title: "Styles",
  description: "Paubha design tokens and Tailwind v4 theme mapping.",
  files: [
    {
      path: "styles/tokens.css",
      type: "registry:style",
      content: tokensCss,
    },
    {
      path: "styles/theme.css",
      type: "registry:style",
      content: themeCss,
    },
  ],
};

writeFileSync(
  join(outDir, "styles.json"),
  `${JSON.stringify(stylesPayload, null, 2)}\n`,
);

const cnSource = readSource("lib/cn.ts");
const cnPayload = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "cn",
  type: "registry:lib",
  title: "cn",
  description: "clsx + tailwind-merge className helper.",
  dependencies: ["clsx", "tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "lib/cn.ts",
      type: "registry:lib",
      content: cnSource,
    },
  ],
};

writeFileSync(
  join(outDir, "cn.json"),
  `${JSON.stringify(cnPayload, null, 2)}\n`,
);

console.log(`Built registry: ${builtItems.length} components → ${outDir}`);
