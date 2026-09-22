import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { rewriteLibImports } from "../rewrite-imports.js";

describe("rewriteLibImports", () => {
  it("rewrites @/lib specifiers to the real relative path for a nested component dest", () => {
    const cwd = "/project";
    const dest = join(cwd, "components/ui/button/button.tsx");
    const libDir = join(cwd, "lib");
    const content =
      'import { cn } from "@paubha/registry/lib/cn";\nimport { withIconSize } from "@paubha/registry/lib/with-icon-size";\n';
    const result = rewriteLibImports(content, dest, libDir);
    expect(result).toContain('from "../../../lib/cn"');
    expect(result).toContain('from "../../../lib/with-icon-size"');
  });

  it("computes correct depth when lib alias is flat under cwd and component is one level deep", () => {
    const cwd = "/project";
    const dest = join(cwd, "components/ui/avatar/avatar.tsx");
    const libDir = join(cwd, "lib");
    const result = rewriteLibImports(
      'import { cn } from "@paubha/registry/lib/cn";',
      dest,
      libDir,
    );
    expect(result).toBe('import { cn } from "../../../lib/cn";');
  });

  it("handles a customized lib alias path", () => {
    const cwd = "/project";
    const dest = join(cwd, "components/ui/button/button.tsx");
    const libDir = join(cwd, "src/utils");
    const result = rewriteLibImports(
      'import { cn } from "@paubha/registry/lib/cn";',
      dest,
      libDir,
    );
    expect(result).toBe('import { cn } from "../../../src/utils/cn";');
  });

  it("leaves content without @/lib imports untouched", () => {
    const content =
      'import * as React from "react";\nimport { Button } from "../button/button";';
    const result = rewriteLibImports(
      content,
      "/project/components/ui/x/x.tsx",
      "/project/lib",
    );
    expect(result).toBe(content);
  });
});
