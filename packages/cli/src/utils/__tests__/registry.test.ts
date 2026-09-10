import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import {
  fetchRegistryItem,
  getRegistryBase,
  listRegistryNames,
  resolveComponents,
} from "../registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_DIR = join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "..",
  "apps",
  "www",
  "public",
  "r",
);

describe("registry", () => {
  beforeAll(() => {
    process.env.PAUBHA_REGISTRY_URL = REGISTRY_DIR;
  });

  it("lists every registry item by name", async () => {
    const names = await listRegistryNames(getRegistryBase());
    expect(names).toContain("button");
    expect(names).toContain("tabs");
    expect(names.length).toBeGreaterThanOrEqual(19);
  });

  it("looks up a single item by name", async () => {
    const button = await fetchRegistryItem("button", getRegistryBase());
    expect(button.title).toBe("Button");
    expect(button.files[0]?.content).toContain("export");
  });

  it("resolves a component with no registry dependencies to just itself", async () => {
    const resolved = await resolveComponents(["button"], getRegistryBase());
    expect(resolved.items.map((i) => i.name)).toEqual(["button"]);
  });

  it("pulls in registryDependencies recursively and dedupes them", async () => {
    const resolved = await resolveComponents(["field"], getRegistryBase());
    const names = resolved.items.map((i) => i.name);
    expect(names).toContain("input");
    expect(names).toContain("field");
    // input must come before field, since field composes it
    expect(names.indexOf("input")).toBeLessThan(names.indexOf("field"));
  });

  it("dedupes shared files and dependencies across multiple requested components", async () => {
    const resolved = await resolveComponents(
      ["button", "input"],
      getRegistryBase(),
    );
    const cnFiles = resolved.files.filter((f) => f.path === "lib/cn.ts");
    expect(cnFiles).toHaveLength(1);
    const clsxDeps = resolved.dependencies.filter((d) => d === "clsx");
    expect(clsxDeps).toHaveLength(1);
  });

  it("does not duplicate a component requested both directly and as a dependency", async () => {
    const resolved = await resolveComponents(
      ["input", "field"],
      getRegistryBase(),
    );
    expect(resolved.items.filter((i) => i.name === "input")).toHaveLength(1);
  });

  it("throws a clear error listing valid names when a component is unknown", async () => {
    await expect(
      resolveComponents(["not-a-real-component"], getRegistryBase()),
    ).rejects.toThrowError(/Unknown component\(s\): not-a-real-component/);
  });
});
