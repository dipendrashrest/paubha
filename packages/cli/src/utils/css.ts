import { existsSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, sep } from "node:path";

/**
 * Where framework starters put the CSS file that already `@import`s Tailwind.
 * Ordered most- to least-specific so a Next.js `src/app/globals.css` wins over
 * a leftover `src/index.css` in the same project.
 */
const CANDIDATE_CSS_PATHS = [
  "src/app/globals.css",
  "app/globals.css",
  "src/app/global.css",
  "app/global.css",
  "src/styles/globals.css",
  "styles/globals.css",
  "src/index.css",
  "src/styles/index.css",
  "src/main.css",
  "src/App.css",
  "index.css",
];

/** `@import "tailwindcss";` (v4) or a trailing `@tailwind utilities;` (v3-style). */
const TAILWIND_ANCHOR =
  /^[^\S\n]*(?:@import\s+["'][^"']*tailwindcss[^"']*["'][^;\n]*;|@tailwind\s+utilities\s*;)[^\S\n]*$/gm;

export interface CssTarget {
  /** Absolute path to the global CSS file. */
  path: string;
  /** Path relative to `cwd`, POSIX-separated — what we persist in components.json. */
  relPath: string;
}

function toPosix(value: string): string {
  return sep === "/" ? value : value.split(sep).join("/");
}

function hasTailwindAnchor(source: string): boolean {
  TAILWIND_ANCHOR.lastIndex = 0;
  return TAILWIND_ANCHOR.test(source);
}

/**
 * Finds the project's global stylesheet. An explicit `configured` path wins so a
 * project with an unusual layout can pin it once in components.json; otherwise we
 * take the first candidate that both exists and actually pulls in Tailwind — a
 * stray `src/App.css` with no `@import "tailwindcss"` is not where tokens belong.
 */
export function findGlobalCss(
  cwd: string,
  configured?: string,
): CssTarget | null {
  if (configured) {
    const path = isAbsolute(configured) ? configured : join(cwd, configured);
    if (existsSync(path)) {
      return { path, relPath: toPosix(configured) };
    }
    return null;
  }

  const withAnchor: CssTarget[] = [];
  for (const candidate of CANDIDATE_CSS_PATHS) {
    const path = join(cwd, candidate);
    if (!existsSync(path)) continue;
    const target = { path, relPath: candidate };
    if (hasTailwindAnchor(readFileSync(path, "utf8"))) return target;
    withAnchor.push(target);
  }

  // Nothing imports Tailwind yet (a bare Vite `src/index.css`, say) — still the
  // right file to write into; `injectTokenImports` reports the missing anchor.
  return withAnchor[0] ?? null;
}

/**
 * Builds the `@import` specifier for `targetRel` as written *inside* `cssPath`.
 * Relative to the stylesheet's own directory, not the project root — the depth
 * users most often got wrong when this was a manual step.
 */
export function toImportSpecifier(
  cssPath: string,
  cwd: string,
  targetRel: string,
): string {
  const specifier = toPosix(relative(dirname(cssPath), join(cwd, targetRel)));
  return specifier.startsWith(".") ? specifier : `./${specifier}`;
}

export type CssInjectStatus = "injected" | "already-present" | "no-anchor";

export interface CssInjectResult {
  content: string;
  status: CssInjectStatus;
  /** Specifiers actually added, in insertion order. */
  added: string[];
}

/** True if some `@import` in `source` already resolves to this file's basename. */
function alreadyImported(source: string, specifier: string): boolean {
  const basename = specifier.split("/").pop() ?? specifier;
  const escaped = basename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`@import\\s+["'][^"']*${escaped}["']`, "m").test(source);
}

/**
 * Inserts the token imports immediately after the *last* Tailwind import line.
 * Order matters: tokens/theme must land after Tailwind or its resets and the
 * token layer fight over precedence. Idempotent — re-running `init` won't stack
 * duplicates, and an existing import at a different relative depth still counts.
 */
export function injectTokenImports(
  source: string,
  specifiers: string[],
): CssInjectResult {
  const missing = specifiers.filter((s) => !alreadyImported(source, s));
  if (missing.length === 0) {
    return { content: source, status: "already-present", added: [] };
  }

  TAILWIND_ANCHOR.lastIndex = 0;
  let anchorEnd = -1;
  for (
    let match = TAILWIND_ANCHOR.exec(source);
    match !== null;
    match = TAILWIND_ANCHOR.exec(source)
  ) {
    anchorEnd = match.index + match[0].length;
  }

  if (anchorEnd === -1) {
    return { content: source, status: "no-anchor", added: [] };
  }

  const block = missing.map((s) => `@import "${s}";`).join("\n");
  const content = `${source.slice(0, anchorEnd)}\n${block}${source.slice(anchorEnd)}`;
  return { content, status: "injected", added: missing };
}
