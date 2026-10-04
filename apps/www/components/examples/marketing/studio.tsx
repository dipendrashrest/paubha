"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { buttonVariants } from "@paubha/registry/ui/button";
import { InlineCta } from "@paubha/registry/ui/inline-cta";
import { TeamCard } from "@paubha/registry/ui/team-card";
import { Testimonial } from "@paubha/registry/ui/testimonial";
import Link from "next/link";
import { BrandField, BrandOrbit } from "@/components/motion/brand-field";
import { Reveal } from "@/components/motion/reveal";
import { MarketingShell } from "./shell";

const CREW = [
  { initials: "AR", name: "Ava Ruiz", role: "Systems" },
  { initials: "JK", name: "Jules Kim", role: "Type and color" },
  { initials: "SL", name: "Sam Lee", role: "Product" },
  { initials: "MN", name: "Mina Ortiz", role: "Motion" },
] as const;

const DECISIONS = [
  {
    title: "glow-focus",
    body: "4px brand spread, zero blur. Every interactive piece. If it ships without this, it is incomplete.",
  },
  {
    title: "Semantic tokens only",
    body: "Components bind to fg-primary and bg-brand-solid, never a guessed hex. Dark mode is a remap.",
  },
  {
    title: "Figma is the source",
    body: "Variants and density come from the file. We do not invent a size because the CSS felt empty.",
  },
] as const;

export function StudioMarketingPage() {
  return (
    <MarketingShell>
      <section className="relative min-h-[100dvh] overflow-hidden border-b border-border-default">
        <BrandField />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-20">
          <div className="pb-enter">
            <Badge variant="gray" fill="subtle" size="md">
              Studio
            </Badge>
            <h1 className="mt-5 max-w-xl text-balance text-display-md font-semibold tracking-[-0.045em] text-fg-primary lg:text-display-lg">
              A system with a point of view.
            </h1>
            <p className="mt-4 max-w-md text-body-lg text-fg-secondary">
              Brand-tinted shadows. glow-focus instead of a gray ring. This is
              not another indigo kit.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/docs/foundations"
                className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press`}
              >
                Read foundations
              </Link>
              <Link
                href="/docs/figma"
                className={`${buttonVariants({ variant: "secondary", size: "lg" })} pb-press`}
              >
                Figma notes
              </Link>
            </div>
          </div>
          <div className="pb-enter-late">
            <BrandOrbit />
          </div>
        </div>
      </section>

      <Reveal className="border-b border-border-default">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Testimonial
            className="bg-bg-secondary"
            quote="We stopped arguing about the focus ring. Paubha already decided, and it looks like a brand."
            author="Mira Chen"
            role="Creative director, Helix"
            avatar={<Avatar initials="MC" alt="Mira Chen" size="sm" />}
          />
        </div>
      </Reveal>

      <section className="border-b border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
            Three decisions we will not reverse
          </h2>
          <ol className="mt-10 flex flex-col gap-10">
            {DECISIONS.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 70}>
                  <p className="text-display-xs font-semibold tracking-[-0.03em] text-fg-brand">
                    {item.title}
                  </p>
                  <p className="mt-2 max-w-[52ch] text-body-md text-fg-secondary">
                    {item.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Reveal>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-display-xs font-semibold text-fg-primary">
            A small studio
          </h2>
          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
            {CREW.map((member) => (
              <TeamCard
                key={member.initials}
                className="min-w-[220px] snap-start md:min-w-0"
                avatar={
                  <Avatar initials={member.initials} alt={member.name} size="md" />
                }
                name={member.name}
                role={member.role}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <section className="border-t border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <InlineCta
            variant="card"
            title="Commission a review"
            description="Team plan exists for design-system critiques, not for unlocking components."
            actions={
              <Link
                href="/examples/marketing/pricing"
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                See Team
              </Link>
            }
          />
        </div>
      </section>
    </MarketingShell>
  );
}
