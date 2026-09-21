import { cn } from "@paubha/registry/lib/cn";
import { Badge } from "@paubha/registry/ui/badge";
import { buttonVariants } from "@paubha/registry/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function LandingComingSoon() {
  return (
    <section
      aria-labelledby="coming-soon-heading"
      className="px-6 pb-16"
    >
      <div className="mx-auto max-w-[760px] rounded-lg border border-border-default bg-bg-secondary px-6 py-8 text-center sm:px-10">
        <Badge variant="brand" fill="subtle" size="sm">
          Coming soon
        </Badge>
        <h2
          id="coming-soon-heading"
          className="mt-4 text-display-xs font-semibold tracking-[-0.5px] text-fg-primary"
        >
          New updates are coming soon
        </h2>
        <p className="mx-auto mt-2 max-w-md text-balance text-body-sm text-fg-secondary">
          More application patterns, Figma files, and icon docs are on the way.
          Check back here — we publish as each piece ships.
        </p>
        <Link
          href="/docs/coming-soon"
          className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}
        >
          See what&apos;s next
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
