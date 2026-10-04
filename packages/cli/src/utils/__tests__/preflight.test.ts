import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { checkProject, reportPreflight } from "../preflight.js";

describe("checkProject", () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "paubha-cli-preflight-test-"));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  function writePkg(pkg: Record<string, unknown>) {
    writeFileSync(join(dir, "package.json"), JSON.stringify(pkg));
  }

  it("errors when there is no package.json", () => {
    const issues = checkProject(dir);
    expect(issues).toEqual([expect.objectContaining({ level: "error" })]);
  });

  it("warns when tailwindcss is missing", () => {
    writePkg({ dependencies: { react: "^19.0.0" } });
    const issues = checkProject(dir);
    expect(issues).toContainEqual(
      expect.objectContaining({
        level: "warning",
        message: expect.stringContaining("tailwindcss"),
      }),
    );
  });

  it("errors when tailwindcss is below v4", () => {
    writePkg({
      dependencies: { react: "^19.0.0", tailwindcss: "^3.4.0" },
    });
    const issues = checkProject(dir);
    expect(issues).toContainEqual(
      expect.objectContaining({
        level: "error",
        message: expect.stringContaining("v4"),
      }),
    );
  });

  it("warns when react is below v19", () => {
    writePkg({
      dependencies: { react: "^18.2.0", tailwindcss: "^4.0.0" },
    });
    const issues = checkProject(dir);
    expect(issues).toContainEqual(
      expect.objectContaining({
        level: "warning",
        message: expect.stringContaining("react@18"),
      }),
    );
  });

  it("reports no issues for a fully compatible project", () => {
    writePkg({
      dependencies: { react: "^19.0.0", tailwindcss: "^4.0.0" },
    });
    expect(checkProject(dir)).toEqual([]);
  });
});

describe("reportPreflight", () => {
  it("returns true when any issue is an error", () => {
    expect(reportPreflight([{ level: "error", message: "bad" }])).toBe(true);
  });

  it("returns false when only warnings are present", () => {
    expect(reportPreflight([{ level: "warning", message: "heads up" }])).toBe(
      false,
    );
  });

  it("returns false for no issues", () => {
    expect(reportPreflight([])).toBe(false);
  });
});
