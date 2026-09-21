"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@paubha/registry/ui/tabs";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { CodeCopyButton, DocsIconButton } from "./docs-icon-button";

export function ComponentPlayground({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  const [previewTheme, setPreviewTheme] = React.useState<"dark" | "light">(
    "dark",
  );

  return (
    <Tabs
      defaultValue="preview"
      className="not-prose my-6 overflow-hidden rounded-lg border border-border-default bg-bg-secondary"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border-default px-3 py-2">
        <TabsList variant="pill">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-1">
          <DocsIconButton
            aria-label="Light preview"
            aria-pressed={previewTheme === "light"}
            onClick={() => setPreviewTheme("light")}
          >
            <Sun className="size-4" aria-hidden="true" />
          </DocsIconButton>
          <DocsIconButton
            aria-label="Dark preview"
            aria-pressed={previewTheme === "dark"}
            onClick={() => setPreviewTheme("dark")}
          >
            <Moon className="size-4" aria-hidden="true" />
          </DocsIconButton>
          <CodeCopyButton getText={() => code} />
        </div>
      </div>
      <TabsContent value="preview" className="m-0">
        <div
          data-preview-theme={previewTheme}
          style={{ colorScheme: previewTheme }}
          className="flex min-h-40 flex-wrap items-center justify-center gap-3 bg-bg-preview p-8"
        >
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code" className="m-0">
        <pre
          data-preview-theme={previewTheme}
          style={{ colorScheme: previewTheme }}
          className="overflow-x-auto bg-bg-primary p-4 font-mono text-ui-sm text-fg-primary"
        >
          <code>{code}</code>
        </pre>
      </TabsContent>
    </Tabs>
  );
}
