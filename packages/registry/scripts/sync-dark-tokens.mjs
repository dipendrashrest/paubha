#!/usr/bin/env node
/**
 * Regenerates tokens.css's `prefers-color-scheme: dark` block from its `.dark`
 * block, which is the single source of truth.
 *
 * Dark mode has to be declared twice: once so it follows the OS with no setup,
 * once so an explicit `.light`/`.dark` class can override it. Pure CSS has no
 * way to share declarations between a media query and a class rule, and
 * `light-dark()` would drop Safari 16.4–17.4 — below this project's Tailwind v4
 * baseline — into uncolored components with no usable fallback. So the copy is
 * generated here rather than maintained by hand, and `pnpm check` fails if the
 * two blocks disagree.
 *
 * Usage: `pnpm sync:tokens` (or `--check` to only report).
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const tokensPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "styles",
  "tokens.css",
);

const DARK_SELECTOR = '.dark,\n[data-preview-theme="dark"] {\n';
const OPEN = "@media (prefers-color-scheme: dark) {";
const HEADER = `/* Follows the OS setting when no theme class is set, so dark mode works out of
   the box. An explicit \`.light\`/\`.dark\` class (or next-themes) still wins, and a
   \`[data-preview-theme]\` pane is unaffected — this rule only matches :root.
   GENERATED from the .dark block below by \`pnpm sync:tokens\`; do not edit. */
`;

const source = readFileSync(tokensPath, "utf8");

const darkStart = source.indexOf(DARK_SELECTOR);
if (darkStart === -1) {
  throw new Error("tokens.css: could not find the .dark block");
}
const bodyStart = darkStart + DARK_SELECTOR.length;
const bodyEnd = source.indexOf("\n}", bodyStart);
const body = source.slice(bodyStart, bodyEnd);

const generated = `${HEADER}${OPEN}
  :root:not(.light):not([data-preview-theme="light"]) {
${body
  .split("\n")
  .map((line) => (line.trim() ? `  ${line}` : line))
  .join("\n")}
  }
}
`;

/**
 * Strips every existing generated block, matching on the `@media` line rather
 * than the comment above it — keying off the comment wording meant that editing
 * it appended a second block instead of replacing the first.
 */
function stripGenerated(css) {
  let out = css;
  for (;;) {
    const open = out.indexOf(OPEN);
    if (open === -1) return out;

    // Walk forward with a brace counter: the block nests one rule inside.
    let depth = 0;
    let end = -1;
    for (let i = open; i < out.length; i++) {
      if (out[i] === "{") depth++;
      else if (out[i] === "}" && --depth === 0) {
        end = i + 1;
        break;
      }
    }
    if (end === -1) throw new Error("tokens.css: unterminated @media block");

    // Absorb a comment directly above it, and collapse the blank lines left behind.
    let start = open;
    const before = out.slice(0, open).trimEnd();
    if (before.endsWith("*/")) start = before.lastIndexOf("/*");
    while (out[end] === "\n") end++;
    out = `${out.slice(0, start).trimEnd()}\n\n${out.slice(end)}`;
  }
}

const stripped = stripGenerated(source);
const insertAt = stripped.indexOf(DARK_SELECTOR);
const next = `${stripped.slice(0, insertAt)}${generated}\n${stripped.slice(insertAt)}`;

if (next === source) {
  console.log("✔ tokens.css dark blocks already in sync");
  process.exit(0);
}

if (process.argv.includes("--check")) {
  console.error(
    "✖ tokens.css dark blocks are out of sync. Run `pnpm sync:tokens`.",
  );
  process.exit(1);
}

writeFileSync(tokensPath, next);
console.log("✔ Regenerated the prefers-color-scheme block from .dark");
