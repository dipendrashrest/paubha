import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export interface WriteResult {
  path: string;
  status: "written" | "skipped-exists" | "overwritten" | "unchanged";
}

/**
 * Writes a file, refusing to clobber local edits unless `force` is set:
 * `init`/`add` should never silently overwrite a file the user may have
 * customized.
 */
export function writeFileSafe(
  path: string,
  content: string,
  force: boolean,
): WriteResult {
  const exists = existsSync(path);
  if (exists) {
    // Items sharing a source file (select / select-v2) land on the same path, and
    // so does re-adding a component you never touched. Neither is a conflict.
    if (readFileSync(path, "utf8") === content) {
      return { path, status: "unchanged" };
    }
    if (!force) {
      return { path, status: "skipped-exists" };
    }
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  return { path, status: exists ? "overwritten" : "written" };
}
