"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { Button, buttonVariants } from "@paubha/registry/ui/button";
import { ConfirmDialog } from "@paubha/registry/ui/confirm-dialog";
import { EmptyState } from "@paubha/registry/ui/empty-state";
import { MarketingHero } from "@paubha/registry/ui/marketing-hero";
import { SectionHeader } from "@paubha/registry/ui/section-header";
import { SettingsRow } from "@paubha/registry/ui/settings-row";
import { Switch } from "@paubha/registry/ui/switch";
import { TeamCard, TeamCardGrid } from "@paubha/registry/ui/team-card";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { BrandField } from "@/components/motion/brand-field";
import { Reveal } from "@/components/motion/reveal";
import { MarketingShell } from "./shell";

const ROLES = [
  {
    title: "Design systems engineer",
    where: "Remote · Full-time",
    blurb: "Own registry items end to end: Figma spec, tokens, axe tests.",
  },
  {
    title: "Docs writer",
    where: "Remote · Contract",
    blurb: "Turn patterns into pages people can actually install from.",
  },
] as const;

const CREW = [
  { initials: "AR", name: "Ava Ruiz", role: "Design systems" },
  { initials: "MN", name: "Morgan Nia", role: "Engineering" },
  { initials: "TP", name: "Tara Park", role: "Docs" },
] as const;

export function CareersMarketingPage() {
  return (
    <MarketingShell>
      <div className="relative">
        <BrandField />
        <MarketingHero
          className="border-b-0 bg-transparent"
          eyebrow={
            <Badge variant="gray" fill="subtle" size="md">
              Careers
            </Badge>
          }
          title="Come ship the system."
          description="Small team. Public repo. Figma is the source. If you care about focus rings, we should talk."
          actions={
            <Link
              href="#roles"
              className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press`}
            >
              Open roles
            </Link>
          }
        />
      </div>

      <Reveal className="border-y border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <SectionHeader
            title="How we actually work"
            description="Not values-on-a-poster. The operating defaults."
          />
          <div className="mt-8 rounded-md border border-border-default bg-bg-primary px-5">
            <SettingsRow
              title="Figma first"
              description="No invented variants. If it is not in the file, it does not ship."
              control={<Switch defaultChecked aria-label="Figma first" />}
            />
            <SettingsRow
              title="Axe on every interactive"
              description="Zero violations across open, error, and disabled."
              control={<Switch defaultChecked aria-label="Axe required" />}
            />
            <SettingsRow
              title="glow-focus or it is incomplete"
              description="The brand is the ring. We will send it back."
              control={<Switch defaultChecked aria-label="glow-focus required" />}
            />
          </div>
        </div>
      </Reveal>

      <section id="roles" className="mx-auto max-w-3xl px-6 py-16">
        <SectionHeader
          title="Open roles"
          description="Two seats. We hire slowly on purpose."
        />
        <ul className="mt-8 flex flex-col gap-3">
          {ROLES.map((role) => (
            <li
              key={role.title}
              className="flex flex-col gap-4 rounded-md border border-border-default bg-bg-primary p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-ui-lg font-semibold text-fg-primary">
                  {role.title}
                </p>
                <p className="mt-1 text-ui-sm text-fg-tertiary">{role.where}</p>
                <p className="mt-2 text-body-sm text-fg-secondary">
                  {role.blurb}
                </p>
              </div>
              <ConfirmDialog
                trigger={
                  <Button variant="secondary" size="sm">
                    Apply
                  </Button>
                }
                title={`Apply for ${role.title}?`}
                description="This demo does not send email. In production, wire the confirm action to your ATS."
                confirmLabel="Send intro"
                onConfirm={() => undefined}
              />
            </li>
          ))}
        </ul>
        <EmptyState
          className="mt-6 rounded-md border border-dashed border-border-default"
          icon={<Briefcase aria-hidden="true" />}
          title="No internships this cycle"
          description="We will post here when a seat opens. Follow the changelog."
          actions={
            <Link
              href="/examples/marketing/changelog"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Changelog
            </Link>
          }
        />
      </section>

      <section className="border-t border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader title="You would sit with" />
          <TeamCardGrid className="mt-8 max-w-3xl">
            {CREW.map((m) => (
              <TeamCard
                key={m.initials}
                avatar={<Avatar initials={m.initials} alt={m.name} size="md" />}
                name={m.name}
                role={m.role}
              />
            ))}
          </TeamCardGrid>
        </div>
      </section>
    </MarketingShell>
  );
}
