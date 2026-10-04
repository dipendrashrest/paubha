"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { BlogCard, BlogCardGrid } from "@paubha/registry/ui/blog-card";
import { buttonVariants } from "@paubha/registry/ui/button";
import { LogoCloud } from "@paubha/registry/ui/logo-cloud";
import { Metric } from "@paubha/registry/ui/metric";
import { Testimonial } from "@paubha/registry/ui/testimonial";
import Link from "next/link";
import { BrandField } from "@/components/motion/brand-field";
import { Reveal } from "@/components/motion/reveal";
import { BrandMarks } from "./brand-marks";
import { MarketingShell } from "./shell";

export function CustomersMarketingPage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden border-b border-border-default">
        <BrandField />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-8">
          <div className="pb-enter">
            <h1 className="max-w-3xl text-balance text-display-md font-semibold tracking-[-0.04em] text-fg-primary">
              Teams that got tired of looking like every other Tailwind kit.
            </h1>
            <p className="mt-4 max-w-lg text-body-lg text-fg-secondary">
              They copied the registry, remapped tokens, and kept glow-focus.
            </p>
          </div>
        </div>
        <Reveal className="relative mx-auto max-w-6xl px-6 pb-16">
          <Testimonial
            className="max-w-3xl border-border-brand bg-bg-brand-subtle"
            quote="The day we pasted Button, the whole app stopped looking rented. The focus ring alone made the product feel like ours."
            author="Priya Nair"
            role="Head of design, Northwind"
            avatar={<Avatar initials="PN" alt="Priya Nair" size="sm" />}
          />
        </Reveal>
      </section>

      <section className="border-b border-border-default bg-bg-secondary py-10">
        <LogoCloud className="mx-auto max-w-6xl px-6">
          <BrandMarks />
        </LogoCloud>
      </section>

      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-16 md:grid-cols-[1.4fr_1fr]">
          <Metric
            className="bg-bg-secondary"
            label="Handoff time"
            value="-48%"
            trend="up"
            delta="Helix"
            description="after Figma sync (example)"
          />
          <div className="grid gap-4">
            <Metric
              label="Components owned"
              value="100%"
              description="no npm UI lock-in"
            />
            <Metric
              label="Axe on ship"
              value="0"
              description="violations, last audit"
            />
          </div>
        </div>
      </Reveal>

      <section className="border-t border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-display-xs font-semibold text-fg-primary">
            More from the floor
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <Testimonial
              quote="Copy-paste registry means we review the actual file in PRs. That changed the culture."
              author="Eli Voss"
              role="Staff eng, Parcel"
              avatar={<Avatar initials="EV" alt="Eli Voss" size="sm" />}
            />
            <div className="flex flex-col gap-4">
              <Testimonial
                quote="We themed dark mode by remapping four bg tokens."
                author="Noor Rahman"
                role="Platform, Orbit"
                avatar={<Avatar initials="NR" alt="Noor Rahman" size="sm" />}
              />
              <Testimonial
                quote="Marketing and the app finally share a nav and a focus ring."
                author="Kenji Ito"
                role="PM, Kite"
                avatar={<Avatar initials="KI" alt="Kenji Ito" size="sm" />}
              />
            </div>
          </div>
        </div>
      </section>

      <Reveal className="border-t border-border-default">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-display-xs font-semibold text-fg-primary">
            Write-ups
          </h2>
          <BlogCardGrid className="mt-8">
            <BlogCard
              tag={
                <Badge variant="gray" fill="subtle" size="sm">
                  Helix
                </Badge>
              }
              title="Three products. One token file."
              excerpt="How Helix collapsed three UI kits into Paubha without a rewrite."
              meta={
                <Link
                  href="/examples/marketing/blog"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Read
                </Link>
              }
            />
            <BlogCard
              tag={
                <Badge variant="gray" fill="subtle" size="sm">
                  Northwind
                </Badge>
              }
              title="glow-focus as a brand asset"
              excerpt="They stopped treating the ring as chrome and put it on the homepage."
              meta={
                <Link
                  href="/examples/marketing/blog"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Read
                </Link>
              }
            />
          </BlogCardGrid>
        </div>
      </Reveal>
    </MarketingShell>
  );
}
