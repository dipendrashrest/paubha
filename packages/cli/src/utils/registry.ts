import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export interface RegistryFile {
  path: string;
  type: "registry:ui" | "registry:lib" | "registry:style" | string;
  content?: string;
}

export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: readonly string[];
  registryDependencies: readonly string[];
  files: readonly RegistryFile[];
}

export interface RegistryIndex {
  name: string;
  homepage?: string;
  items: readonly {
    name: string;
    type: string;
    title: string;
    description: string;
    dependencies: readonly string[];
    registryDependencies: readonly string[];
    files: readonly Omit<RegistryFile, "content">[];
  }[];
}

export interface ResolvedComponents {
  items: RegistryItem[];
  files: Array<RegistryFile & { content: string }>;
  dependencies: string[];
}

export const DEFAULT_REGISTRY_URL = "https://paubha.tech/r";

/** Resolves the registry base URL (no trailing slash). Env overrides config. */
export function getRegistryBase(configured?: string): string {
  const raw =
    process.env.PAUBHA_REGISTRY_URL?.trim() ||
    configured?.trim() ||
    DEFAULT_REGISTRY_URL;
  return raw.replace(/\/$/, "");
}

async function readJson(url: string): Promise<unknown> {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  }

  // Local filesystem path (used in tests and offline builds).
  const filePath = url.startsWith("file:") ? new URL(url).pathname : url;
  if (!existsSync(filePath)) {
    throw new Error(`Registry file not found: ${filePath}`);
  }
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function itemUrl(base: string, name: string): string {
  if (base.startsWith("http://") || base.startsWith("https://")) {
    return `${base}/${name}.json`;
  }
  if (base.startsWith("file:")) {
    return new URL(`${name}.json`, base.endsWith("/") ? base : `${base}/`).href;
  }
  return join(base, `${name}.json`);
}

export async function fetchRegistryItem(
  name: string,
  base = getRegistryBase(),
): Promise<RegistryItem> {
  const url = itemUrl(base, name);
  const data = (await readJson(url)) as RegistryItem;
  if (!data?.name || !Array.isArray(data.files)) {
    throw new Error(`Invalid registry item at ${url}`);
  }
  return data;
}

export async function fetchRegistryIndex(
  base = getRegistryBase(),
): Promise<RegistryIndex> {
  const url = itemUrl(base, "registry");
  return (await readJson(url)) as RegistryIndex;
}

export async function listRegistryNames(
  base = getRegistryBase(),
): Promise<string[]> {
  const index = await fetchRegistryIndex(base);
  return index.items.map((item) => item.name);
}

export async function fetchStyles(
  base = getRegistryBase(),
): Promise<{ tokensCss: string; themeCss: string }> {
  const item = await fetchRegistryItem("styles", base);
  const tokens = item.files.find((f) => f.path.endsWith("tokens.css"));
  const theme = item.files.find((f) => f.path.endsWith("theme.css"));
  if (!tokens?.content || !theme?.content) {
    throw new Error("styles.json is missing tokens.css or theme.css content");
  }
  return { tokensCss: tokens.content, themeCss: theme.content };
}

export async function fetchCnSource(base = getRegistryBase()): Promise<string> {
  const item = await fetchRegistryItem("cn", base);
  const file = item.files.find((f) => f.path.endsWith("cn.ts"));
  if (!file?.content) {
    throw new Error("cn.json is missing lib/cn.ts content");
  }
  return file.content;
}

/** Resolves component names plus their registryDependencies (recursively), deduped. */
export async function resolveComponents(
  names: string[],
  base = getRegistryBase(),
): Promise<ResolvedComponents> {
  const items: RegistryItem[] = [];
  const seenNames = new Set<string>();
  const notFound: string[] = [];
  const cache = new Map<string, RegistryItem>();

  async function load(name: string): Promise<RegistryItem | undefined> {
    if (cache.has(name)) return cache.get(name);
    try {
      const item = await fetchRegistryItem(name, base);
      cache.set(name, item);
      return item;
    } catch {
      return undefined;
    }
  }

  async function visit(name: string): Promise<void> {
    if (seenNames.has(name)) return;
    const item = await load(name);
    if (!item) {
      notFound.push(name);
      return;
    }
    seenNames.add(name);
    for (const dep of item.registryDependencies) {
      await visit(dep);
    }
    items.push(item);
  }

  for (const name of names) {
    await visit(name);
  }

  if (notFound.length > 0) {
    let available = "";
    try {
      const listed = await listRegistryNames(base);
      available = ` Available: ${listed.join(", ")}`;
    } catch {
      // Index may be unreachable; still report unknown names.
    }
    throw new Error(
      `Unknown component(s): ${notFound.join(", ")}.${available}`,
    );
  }

  const files = dedupeBy(
    items.flatMap((item) =>
      item.files.map((file) => {
        if (file.content === undefined) {
          throw new Error(
            `Registry item "${item.name}" file "${file.path}" is missing content`,
          );
        }
        return { ...file, content: file.content };
      }),
    ),
    (file) => file.path,
  );

  const dependencies = [
    ...new Set(items.flatMap((item) => [...item.dependencies])),
  ].sort();

  return { items, files, dependencies };
}

function dedupeBy<T>(list: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of list) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    result.push(item);
  }
  return result;
}

/** Absolute path helper for tests pointing at apps/www/public/r. */
export function registryDirToBase(dir: string): string {
  return pathToFileURL(dir.endsWith("/") ? dir : `${dir}/`).href;
}
