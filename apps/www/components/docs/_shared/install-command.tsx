import { CodeSnippet } from "./docs-icon-button";

export function InstallCommand({
  name,
}: {
  name: string;
}) {
  return (
    <CodeSnippet
      className="not-prose"
      code={`npx paubha add ${name}`}
    />
  );
}
