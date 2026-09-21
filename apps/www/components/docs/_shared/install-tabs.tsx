"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@paubha/registry/ui/tabs";
import { CodeSnippet } from "./docs-icon-button";

export function InstallTabs({
  name,
  manual,
}: {
  name: string;
  manual: string;
}) {
  return (
    <Tabs defaultValue="cli" className="not-prose my-4">
      <TabsList variant="pill" aria-label="Installation method">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli" className="mt-3">
        <CodeSnippet code={`npx paubha@latest add ${name}`} />
      </TabsContent>
      <TabsContent value="manual" className="mt-3">
        <CodeSnippet code={manual} />
      </TabsContent>
    </Tabs>
  );
}
