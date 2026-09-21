"use client";

import { CodeCopyButton } from "@/components/docs/_shared/docs-icon-button";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import * as React from "react";

/** Fumadocs `pre` uses a clipboard mark; we swap in Lucide `Copy` (two squares). */
export function DocsPre(props: React.ComponentProps<"pre">) {
  const wrapRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapRef} className="relative">
      <CodeBlock allowCopy={false} viewportProps={{ className: "pr-10" }} {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
      <CodeCopyButton
        className="absolute top-2 right-2 z-10"
        getText={() => wrapRef.current?.querySelector("pre")?.innerText ?? ""}
      />
    </div>
  );
}
