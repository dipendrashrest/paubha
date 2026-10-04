"use client";

import { CliSnippet } from "@paubha/registry/ui/cli-snippet";
import { ComponentPlayground } from "../_shared/component-playground";

export function CliSnippetHero() {
  return (
    <ComponentPlayground
      code={`<CliSnippet
  label="Quick start"
  command="npx paubha@latest add button"
  description="Tokens, focus rings, and a11y, already baked in."
/>`}
    >
      <div className="w-full max-w-md">
        <CliSnippet
          label="Quick start"
          command="npx paubha@latest add button"
          description="Tokens, focus rings, and a11y, already baked in."
        />
      </div>
    </ComponentPlayground>
  );
}
