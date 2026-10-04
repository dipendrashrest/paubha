import { Badge } from "@paubha/registry/ui/badge";
import { buttonVariants } from "@paubha/registry/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@paubha/registry/ui/card";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PaubhaMark, MARKETING_EXAMPLES } from "@/components/examples/marketing/shell";

export const metadata = {
  title: "Marketing Examples",
  description:
    "Full-page marketing templates composed from Paubha components: SaaS landing, pricing, waitlist, and more.",
};

export default function MarketingExamplesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge variant="brand" fill="subtle" size="md">
            Marketing Examples
          </Badge>
          <h1 className="pb-enter mt-4 text-display-sm font-semibold tracking-[-0.03em] text-fg-primary">
            Premium page templates, free
          </h1>
          <p className="mt-3 max-w-xl text-body-md text-fg-secondary">
            Full-bleed Paubha marketing pages, built only with our components
            and tokens. Open any live page, or browse them from the docs.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <PaubhaMark />
          <Link
            href="/docs/marketing-examples"
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Docs section
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MARKETING_EXAMPLES.map((example) => (
          <Link
            key={example.slug}
            href={`/examples/marketing/${example.slug}`}
            className="group rounded-md focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
          >
            <Card
              variant="outlined"
              className="h-full transition-colors group-hover:border-border-brand group-hover:bg-bg-secondary"
            >
              <CardContent className="gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{example.title}</CardTitle>
                  <ArrowRight
                    className="size-4 shrink-0 text-fg-tertiary transition-transform group-hover:translate-x-0.5 group-hover:text-fg-brand"
                    aria-hidden="true"
                  />
                </div>
                <CardDescription>{example.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
