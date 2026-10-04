"use client";

import { Avatar, AvatarGroup } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { FeatureList, FeatureListItem } from "@paubha/registry/ui/feature-list";
import { SectionHeader } from "@paubha/registry/ui/section-header";
import { TeamCard, TeamCardGrid } from "@paubha/registry/ui/team-card";
import { MarketingShell } from "./shell";

const TEAM = [
  { initials: "AR", name: "Ava Ruiz", role: "Design systems" },
  { initials: "JK", name: "Jules Kim", role: "Design" },
  { initials: "MN", name: "Morgan Nia", role: "Engineering" },
  { initials: "SL", name: "Sam Lee", role: "Product" },
  { initials: "TP", name: "Tara Park", role: "Docs" },
  { initials: "OW", name: "Omar West", role: "Community" },
] as const;

const VALUES = [
  {
    title: "Own every line",
    body: "shadcn-style copy-paste, no black-box npm package between you and the UI.",
  },
  {
    title: "Figma is the source of truth",
    body: "Variants, sizes, and tokens match the design file. We don’t invent specs in code.",
  },
  {
    title: "Accessible by default",
    body: "WAI-ARIA patterns, visible glow-focus, and vitest-axe coverage on every interactive piece.",
  },
] as const;

export function AboutMarketingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <Badge variant="gray" fill="subtle" size="md">
            About Paubha
          </Badge>
          <h1 className="mt-4 max-w-xl text-display-sm font-semibold tracking-[-0.03em] text-fg-primary">
            Open-source components for React & Tailwind
          </h1>
          <p className="mt-4 max-w-lg text-body-lg text-fg-secondary">
            Paubha is a design system you can customize: base components and
            application patterns, distributed like shadcn so you own the code.
          </p>
          <p className="mt-4 max-w-lg text-body-md text-fg-secondary">
            We’re a small team shipping weekly from remote: Figma-first tokens,
            brand-tinted focus rings, and a free MIT registry at paubha.tech.
          </p>
        </div>
        <div className="rounded-lg border border-border-default bg-bg-secondary p-6">
          <p className="text-ui-sm font-medium text-fg-tertiary">The crew</p>
          <AvatarGroup className="mt-4" max={6}>
            {TEAM.map((m) => (
              <Avatar key={m.initials} initials={m.initials} alt={m.name} />
            ))}
          </AvatarGroup>
          <p className="mt-4 text-body-sm text-fg-secondary">
            Six people. One design system. Fully open source.
          </p>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader
            title="How we work"
            description="Three bets we refuse to compromise."
          />
          <FeatureList className="mt-10">
            {VALUES.map((v) => (
              <FeatureListItem
                key={v.title}
                className="py-6"
                title={v.title}
                description={v.body}
              />
            ))}
          </FeatureList>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeader title="Team" description="Humans behind the system." />
        <TeamCardGrid className="mt-8">
          {TEAM.map((m) => (
            <TeamCard
              key={m.initials}
              avatar={
                <Avatar initials={m.initials} alt={m.name} size="md" />
              }
              name={m.name}
              role={m.role}
            />
          ))}
        </TeamCardGrid>
      </section>
    </MarketingShell>
  );
}
