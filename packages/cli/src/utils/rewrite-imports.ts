import { dirname, relative } from "node:path";

/**
 * Registry source always imports shared modules via the canonical
 * `@paubha/registry/lib/...` specifier (a self-reference that resolves
 * correctly inside this monorepo, for both the registry's own tests and
 * apps/www's build), regardless of how deep a component's own folder is
 * nested. The CLI is what decides the real on-disk layout in a consumer
 * project (aliases.lib, aliases.components), so it's also what has to turn
 * that canonical specifier into a real relative import — computed from the
 * actual destination paths, not hardcoded depth. This is what keeps imports
 * correct no matter how the registry source tree or the consumer's alias
 * config is shaped.
 */
export function rewriteLibImports(
  content: string,
  destPath: string,
  libDir: string,
): string {
  return content.replace(
    /(['"])@paubha\/registry\/lib\/([^'"]+)\1/g,
    (_match, quote: string, specifier: string) => {
      let rel = relative(dirname(destPath), libDir).replace(/\\/g, "/");
      if (rel === "") rel = ".";
      if (!rel.startsWith(".")) rel = `./${rel}`;
      return `${quote}${rel}/${specifier}${quote}`;
    },
  );
}
