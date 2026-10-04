"use client";

import { CliSnippet } from "@paubha/registry/ui/cli-snippet";
import { ComponentPlayground } from "../_shared/component-playground";

export function CliSnippetHero() {
  return (
    <ComponentPlayground
      code={`<CliSnippet
  label="npx"
  command="npx paubha@latest add button"
  description="Copies button.tsx into components/ui and installs its dependencies."
  showCopy
/>`}
    >
      <div className="w-full max-w-md">
        <CliSnippet
          label="npx"
          command="npx paubha@latest add button"
          description="Copies button.tsx into components/ui and installs its dependencies."
          showCopy
        />
      </div>
    </ComponentPlayground>
  );
}
