import { DotBackground } from "@/components/home/dot-background";
import { buttonVariants } from "@paubha/registry/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FIGMA_FILE =
  "https://www.figma.com/design/CDgfoMkj7lP3pXWJ3aOgkH/Paubha";

function FigmaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 1 0 0 8Z" />
      <path d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" />
      <path d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" />
      <path d="M12 0h4a4 4 0 1 1 0 8h-4V0Z" />
      <path d="M16 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </svg>
  );
}

export function LandingHero() {
  return (
    <section className="relative px-6 pt-24 pb-24 text-center">
      <DotBackground />
      <div className="relative z-10">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-primary px-3 py-1 text-ui-sm text-fg-tertiary">
          Paubha v1.0 is here
          <Link
            href="/docs"
            className="inline-flex items-center gap-0.5 font-medium text-fg-brand"
          >
            New
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </p>

        <h1 className="mx-auto mt-6 max-w-5xl text-balance text-display-xl font-semibold tracking-[-1.5px] text-fg-primary">
          The foundation for your design system
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-balance text-body-lg text-fg-secondary">
          Composable, accessible components with thoughtful defaults. Build your
          own component library with code you can customize, extend, and make
          your own.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/docs" className={buttonVariants({ variant: "primary" })}>
            Get Started
          </Link>
          <Link
            href="/docs/components/avatar"
            className={buttonVariants({ variant: "secondary" })}
          >
            View Components
          </Link>
          <a
            href={FIGMA_FILE}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "secondary" })}
          >
            <FigmaMark className="size-4 shrink-0" />
            Paubha UI Figma
          </a>
        </div>
      </div>
    </section>
  );
}
