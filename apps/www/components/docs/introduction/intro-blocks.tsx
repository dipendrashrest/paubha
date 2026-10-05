import { Alert } from "@paubha/registry/ui/alert";
import { buttonVariants } from "@paubha/registry/ui/button";

export function IntroPositioningAlert() {
  return (
    <Alert
      variant="info"
      title="This is not just a component library. It is how you build your product library."
      className="not-prose my-0"
    >
      <div className="space-y-3 text-body-sm text-fg-secondary">
        <p>
          Traditional component libraries ask you to install a package, import
          components, and accept their constraints. The moment you need to
          customize beyond what the library exposes, you find yourself fighting
          the abstraction: wrapping components, overriding styles, or mixing
          incompatible APIs from multiple libraries.
        </p>
        <p>
          Paubha works differently. Every component is yours. The source lives
          in your project, follows your conventions, and is as easy to read,
          edit, and extend as any code you wrote yourself.
        </p>
      </div>
    </Alert>
  );
}

export function SkillMdCard() {
  return (
    <div className="not-prose flex flex-col gap-4 rounded-sm border border-border-default bg-bg-secondary p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-ui-md font-semibold text-fg-primary">skill.md</p>
        <p className="mt-1 text-ui-sm text-fg-secondary">
          Conventions, tokens and install steps for AI tools. Plain Markdown,
          always in sync with the registry.
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <a
          href="/skill.md"
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          View
        </a>
        <a
          href="/skill.md"
          download="skill.md"
          className={buttonVariants({ variant: "primary", size: "sm" })}
        >
          Download
        </a>
      </div>
    </div>
  );
}
