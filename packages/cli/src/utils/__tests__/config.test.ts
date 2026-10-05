import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  DEFAULT_CONFIG,
  aliasMismatch,
  detectConfig,
  readConfig,
  writeConfig,
} from "../config.js";

describe("config", () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "paubha-cli-config-test-"));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("returns null when no components.json exists", () => {
    expect(readConfig(dir)).toBeNull();
  });

  it("round-trips a written config", () => {
    writeConfig(dir, DEFAULT_CONFIG);
    expect(readConfig(dir)).toEqual(DEFAULT_CONFIG);
  });
});

describe("detectConfig", () => {
  const make = (files: Record<string, string>) => {
    const d = mkdtempSync(join(tmpdir(), "paubha-detect-"));
    for (const [name, body] of Object.entries(files)) {
      mkdirSync(dirname(join(d, name)), { recursive: true });
      writeFileSync(join(d, name), body);
    }
    return d;
  };

  it("defaults to the project root without src/", () => {
    expect(detectConfig(make({ "package.json": "{}" }))).toEqual(
      DEFAULT_CONFIG,
    );
  });

  it("nests everything under src/ when the project has one", () => {
    const c = detectConfig(make({ "src/main.tsx": "" }));
    expect(c.aliases).toEqual({
      components: "src/components/ui",
      lib: "src/lib",
    });
    expect(c.tailwind.tokens).toBe("src/styles/tokens.css");
  });

  it("keeps the root when @/* maps to ./* despite a src/ folder", () => {
    const d = make({
      "src/x.ts": "",
      "tsconfig.json":
        '{ // c\n "compilerOptions": { "paths": { "@/*": ["./*"], }, }, }',
    });
    expect(detectConfig(d)).toEqual(DEFAULT_CONFIG);
  });
});

describe("aliasMismatch", () => {
  const tsconfig = '{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }';
  const project = () => {
    const d = mkdtempSync(join(tmpdir(), "paubha-alias-"));
    writeFileSync(join(d, "tsconfig.json"), tsconfig);
    return d;
  };

  it("flags root-level aliases in a src-mapped project", () => {
    expect(aliasMismatch(project(), DEFAULT_CONFIG)).toContain("src/");
  });

  it("is silent when aliases sit under the mapped folder", () => {
    const d = project();
    mkdirSync(join(d, "src"));
    expect(aliasMismatch(d, detectConfig(d))).toBeNull();
  });
});
