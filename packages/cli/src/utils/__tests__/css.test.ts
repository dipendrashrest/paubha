import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  findGlobalCss,
  injectTokenImports,
  toImportSpecifier,
} from "../css.js";

function project(files: Record<string, string>): string {
  const cwd = mkdtempSync(join(tmpdir(), "paubha-css-"));
  for (const [rel, content] of Object.entries(files)) {
    const path = join(cwd, rel);
    mkdirSync(join(path, ".."), { recursive: true });
    writeFileSync(path, content);
  }
  return cwd;
}

const TAILWIND = '@import "tailwindcss";\n';

describe("findGlobalCss", () => {
  it("finds the Next.js App Router stylesheet", () => {
    const cwd = project({ "app/globals.css": TAILWIND });
    expect(findGlobalCss(cwd)?.relPath).toBe("app/globals.css");
  });

  it("prefers the file that actually imports Tailwind", () => {
    const cwd = project({
      "src/App.css": ".foo { color: red }\n",
      "src/index.css": TAILWIND,
    });
    expect(findGlobalCss(cwd)?.relPath).toBe("src/index.css");
  });

  it("honours an explicit configured path", () => {
    const cwd = project({
      "app/globals.css": TAILWIND,
      "weird/x.css": TAILWIND,
    });
    expect(findGlobalCss(cwd, "weird/x.css")?.relPath).toBe("weird/x.css");
  });

  it("returns null when there is no stylesheet at all", () => {
    expect(findGlobalCss(project({ "package.json": "{}" }))).toBeNull();
  });
});

describe("toImportSpecifier", () => {
  it("is relative to the stylesheet, not the project root", () => {
    const cwd = "/proj";
    expect(
      toImportSpecifier("/proj/app/globals.css", cwd, "styles/tokens.css"),
    ).toBe("../styles/tokens.css");
    expect(
      toImportSpecifier("/proj/globals.css", cwd, "styles/tokens.css"),
    ).toBe("./styles/tokens.css");
    expect(
      toImportSpecifier("/proj/src/app/globals.css", cwd, "styles/theme.css"),
    ).toBe("../../styles/theme.css");
  });
});

describe("injectTokenImports", () => {
  const specs = ["../styles/tokens.css", "../styles/theme.css"];

  it("inserts after the Tailwind import", () => {
    const result = injectTokenImports(
      `${TAILWIND}\nbody { margin: 0 }\n`,
      specs,
    );
    expect(result.status).toBe("injected");
    expect(result.content).toBe(
      '@import "tailwindcss";\n' +
        '@import "../styles/tokens.css";\n' +
        '@import "../styles/theme.css";\n' +
        "\nbody { margin: 0 }\n",
    );
  });

  it("inserts after the last Tailwind-ish line", () => {
    const source = '@import "tailwindcss";\n@import "tailwindcss/utilities";\n';
    const result = injectTokenImports(source, specs);
    expect(result.content.indexOf("tokens.css")).toBeGreaterThan(
      result.content.indexOf("tailwindcss/utilities"),
    );
  });

  it("is idempotent", () => {
    const once = injectTokenImports(TAILWIND, specs);
    const twice = injectTokenImports(once.content, specs);
    expect(twice.status).toBe("already-present");
    expect(twice.content).toBe(once.content);
  });

  it("treats a different relative depth as already imported", () => {
    const source = `${TAILWIND}@import "./styles/tokens.css";\n@import "./styles/theme.css";\n`;
    expect(injectTokenImports(source, specs).status).toBe("already-present");
  });

  it("adds only the missing import", () => {
    const source = `${TAILWIND}@import "../styles/tokens.css";\n`;
    const result = injectTokenImports(source, specs);
    expect(result.added).toEqual(["../styles/theme.css"]);
  });

  it("reports when there is no Tailwind import to anchor to", () => {
    const result = injectTokenImports("body { margin: 0 }\n", specs);
    expect(result.status).toBe("no-anchor");
    expect(result.content).toBe("body { margin: 0 }\n");
  });
});
