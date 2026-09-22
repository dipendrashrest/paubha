import { Alert } from "@paubha/registry/ui/alert";
import Link from "fumadocs-core/link";

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
    <div className="not-prose rounded-sm border border-border-default bg-bg-secondary p-4">
      <p className="text-ui-md font-semibold text-fg-primary">skill.md</p>
      <p className="mt-1 text-ui-sm text-fg-secondary">
        A machine-readable description of Paubha&apos;s component conventions,
        token structure, and composition patterns. Available on our{" "}
        <Link href="/" className="font-medium text-fg-brand hover:underline">
          landing page
        </Link>
        .
      </p>
    </div>
  );
}
