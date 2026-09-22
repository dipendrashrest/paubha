import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "tokens.css"), "utf8");

const MEDIA_RULE =
  /@media \(prefers-color-scheme: dark\) \{\s*([^{]+)\{(.*?)\n {2}\}\n\}/s;
const DARK_RULE = /\n(\.dark,\n\[data-preview-theme="dark"\]) \{(.*?)\n\}/s;
const LIGHT_RULE = /\n(:root,\n\[data-preview-theme="light"\]) \{/;

function declarations(block: string): string[] {
  return [...block.matchAll(/--[\w-]+\s*:[^;]+;/g)]
    .map((match) => match[0].replace(/\s+/g, " ").trim())
    .sort();
}

describe("dark mode wiring", () => {
  const media = css.match(MEDIA_RULE);
  const dark = css.match(DARK_RULE);

  it("declares dark mode exactly once per mechanism", () => {
    expect(css.match(/@media \(prefers-color-scheme: dark\)/g)).toHaveLength(1);
    expect(css.match(/^\.dark,$/gm)).toHaveLength(1);
  });

  it("follows the OS with no class set", () => {
    expect(media).not.toBeNull();
  });

  it("lets an explicit light choice beat a dark OS", () => {
    expect(media?.[1]).toContain(":not(.light)");
    expect(media?.[1]).toContain(':not([data-preview-theme="light"])');
  });

  // The docs site renders light previews inside a page that may be dark. The OS
  // rule must not reach them, which holds only while it is scoped to :root — a
  // nested pane is never :root, so its own [data-preview-theme] rule applies.
  it("scopes the OS rule to :root so nested preview panes still win", () => {
    expect(media?.[1].trim().startsWith(":root")).toBe(true);
    expect(media?.[1]).not.toMatch(/\*|\bbody\b/);
  });

  it("gives light preview panes their own declarations to override with", () => {
    expect(css.match(LIGHT_RULE)).not.toBeNull();
  });

  it("keeps both dark blocks identical", () => {
    expect(declarations(media?.[2] ?? "")).toEqual(
      declarations(dark?.[2] ?? ""),
    );
  });

  it("sets color-scheme so native controls follow the theme", () => {
    expect(media?.[2]).toContain("color-scheme: dark;");
    expect(dark?.[2]).toContain("color-scheme: dark;");
    expect(css).toContain("color-scheme: light;");
  });
});
