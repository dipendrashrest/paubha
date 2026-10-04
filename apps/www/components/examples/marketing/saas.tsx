"use client";

import { AnnouncementBar } from "@paubha/registry/ui/announcement-bar";
import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { buttonVariants } from "@paubha/registry/ui/button";
import { CliSnippet } from "@paubha/registry/ui/cli-snippet";
import { LogoCloud } from "@paubha/registry/ui/logo-cloud";
import { MarketingHero } from "@paubha/registry/ui/marketing-hero";
import { Newsletter } from "@paubha/registry/ui/newsletter";
import { Testimonial } from "@paubha/registry/ui/testimonial";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BrandField } from "@/components/motion/brand-field";
import { Reveal } from "@/components/motion/reveal";
import { BrandMarks } from "./brand-marks";
import { MarketingShell } from "./shell";

export function SaasMarketingPage() {
  return (
    <MarketingShell
      announcement={
        <AnnouncementBar
          badge={
            <Badge variant="brand" fill="solid" size="sm">
              New
            </Badge>
          }
          action={
            <Link
              href="/docs"
              className="font-medium text-fg-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
            >
              Read the docs
            </Link>
          }
        >
          Application patterns just shipped. Free forever.
        </AnnouncementBar>
      }
    >
      <div className="relative">
        <BrandField />
        <MarketingHero
          className="border-b-0 bg-transparent"
          eyebrow={
            <Badge variant="brand" fill="subtle" size="md">
              Open-source
            </Badge>
          }
          title="Components you actually own."
          description="Copy the file. Remap the tokens. glow-focus comes with it. No rented UI."
          actions={
            <>
              <Link
                href="/docs"
                className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press`}
              >
                Get started
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/examples/marketing/pricing"
                className={`${buttonVariants({ variant: "secondary", size: "lg" })} pb-press`}
              >
                View pricing
              </Link>
            </>
          }
          media={
            <div className="pb-enter-late">
              <CliSnippet
                label="Quick start"
                command="npx paubha@latest add button"
                description="Tokens, focus rings, and a11y, already baked in."
              />
            </div>
          }
        />
      </div>

      <section className="border-y border-border-default bg-bg-secondary py-10">
        <LogoCloud className="mx-auto max-w-6xl px-6">
          <BrandMarks />
        </LogoCloud>
      </section>

      <Reveal className="border-b border-border-default">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
              glow-focus is the brand.
            </h2>
            <p className="mt-3 max-w-[48ch] text-body-md text-fg-secondary">
              Tab the button. The ring is brand-500 at 24% opacity, 4px spread,
              zero blur. Not a gray outline.
            </p>
          </div>
          <div className="flex min-h-40 items-center justify-center rounded-lg border border-border-default bg-bg-secondary">
            <button
              type="button"
              className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press`}
            >
              Tab me
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Testimonial
            className="bg-bg-secondary"
            quote="We stopped buying template kits. glow-focus alone made the product feel like ours."
            author="Ava Ruiz"
            role="Design lead, Northwind"
            avatar={<Avatar initials="AR" alt="Ava Ruiz" size="sm" />}
          />
        </div>
      </Reveal>

      <section className="border-t border-border-default bg-bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-display-xs font-semibold text-fg-primary">
              Start with one component
            </h2>
            <p className="mt-2 max-w-md text-body-md text-fg-secondary">
              Add Button, Avatar, or a full pattern, then make it yours.
            </p>
            <Link
              href="/docs/components"
              className={`${buttonVariants({ variant: "primary", size: "lg" })} mt-6 pb-press`}
            >
              Browse components
            </Link>
          </div>
          <Newsletter
            title="Paubha updates"
            description="New components and patterns, one email a month. No spam."
            submitLabel="Subscribe"
          />
        </div>
      </section>
    </MarketingShell>
  );
}
