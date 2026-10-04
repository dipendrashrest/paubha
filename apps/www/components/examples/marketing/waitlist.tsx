"use client";

import { Badge } from "@paubha/registry/ui/badge";
import { buttonVariants } from "@paubha/registry/ui/button";
import { InlineCta } from "@paubha/registry/ui/inline-cta";
import { MarketingHero } from "@paubha/registry/ui/marketing-hero";
import { Newsletter } from "@paubha/registry/ui/newsletter";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { MarketingShell } from "./shell";

export function WaitlistMarketingPage() {
  return (
    <MarketingShell>
      <MarketingHero
        className="border-b-0"
        eyebrow={
          <Badge variant="brand" fill="subtle" size="md">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Updates & new patterns
          </Badge>
        }
        title="Stay ahead of Paubha releases"
        description="Get a short note when we ship new components, application patterns, and design-system updates. No spam, just the catalog."
        actions={
          <Newsletter
            className="max-w-md border-0 bg-transparent p-0 shadow-none"
            title={undefined}
            description={undefined}
            submitLabel="Join waitlist"
            successMessage={(email) =>
              `You’re on the list. We’ll write to ${email} when the next drop ships.`
            }
            placeholder="you@company.com"
          />
        }
        footnote="Open source · MIT · Unsubscribe anytime"
      />

      <section className="border-t border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <InlineCta
            variant="card"
            title="Prefer the changelog?"
            description="Follow weekly notes on what landed in the registry: components, patterns, and fixes."
            actions={
              <Link
                href="/examples/marketing/changelog"
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                Read changelog
              </Link>
            }
          />
        </div>
      </section>
    </MarketingShell>
  );
}
