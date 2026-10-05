"use client";

import { Reveal } from "@/components/motion/reveal";
import { Avatar } from "@paubha/registry/ui/avatar";
import { Button, buttonVariants } from "@paubha/registry/ui/button";
import { ConfirmDialog } from "@paubha/registry/ui/confirm-dialog";
import { Testimonial } from "@paubha/registry/ui/testimonial";
import {
  GraduationCap,
  Laptop,
  type LucideIcon,
  Plane,
  Sprout,
} from "lucide-react";
import Link from "next/link";
import { Photo } from "./photo";
import { MarketingShell } from "./shell";

const PRACTICES = [
  {
    title: "Figma is the spec",
    body: "Every variant, size and state comes from the file. If it is not drawn, we ask before we build it.",
  },
  {
    title: "Accessibility ships with the component",
    body: "Keyboard behavior, ARIA and a vitest-axe test are part of the pull request, not a follow-up.",
  },
  {
    title: "Small, public, reviewed",
    body: "Work happens in the open repo. Every change gets a reviewer, and every reviewer gets a thank you.",
  },
] as const;

const TEAMS = [
  {
    name: "Engineering",
    note: "Registry, CLI and the docs site.",
    roles: [
      {
        title: "Design systems engineer",
        where: "Remote, Europe or Americas",
        type: "Full-time",
      },
      {
        title: "CLI and tooling engineer",
        where: "Remote, anywhere",
        type: "Full-time",
      },
    ],
  },
  {
    name: "Design",
    note: "Figma library, tokens and motion.",
    roles: [
      {
        title: "Product designer, components",
        where: "Remote, Europe",
        type: "Full-time",
      },
      {
        title: "Motion designer",
        where: "Remote, anywhere",
        type: "Contract",
      },
    ],
  },
  {
    name: "Docs and community",
    note: "Guides, examples and the issue tracker.",
    roles: [
      {
        title: "Technical writer",
        where: "Remote, anywhere",
        type: "Contract",
      },
      {
        title: "Developer advocate",
        where: "Remote, Americas",
        type: "Part-time",
      },
    ],
  },
] as const;

const PERKS: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: Laptop,
    title: "Remote by default",
    body: "No office to commute to. We overlap for four hours and write everything else down.",
  },
  {
    icon: Sprout,
    title: "Paid time for open source",
    body: "One day a week goes to the repo, your own projects or reviewing other people's.",
  },
  {
    icon: GraduationCap,
    title: "Learning budget",
    body: "Books, courses and conference tickets, no approval chain.",
  },
  {
    icon: Plane,
    title: "Meet in person twice a year",
    body: "The whole team gets together for a week of planning, then a week of actually shipping.",
  },
];

export function CareersMarketingPage() {
  return (
    <MarketingShell>
      <section className="border-b border-border-default">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:pt-20">
          <div className="pb-enter">
            <h1 className="max-w-md text-balance text-display-md font-semibold tracking-[-0.04em] text-fg-primary lg:text-display-lg">
              Build the components other teams copy.
            </h1>
            <p className="mt-4 max-w-md text-body-lg text-fg-secondary">
              We are a small remote team making an open-source React and
              Tailwind library. Six seats are open.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#roles"
                className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press whitespace-nowrap`}
              >
                See open roles
              </Link>
              <Link
                href="https://github.com/dipendrashrest/paubha"
                className={`${buttonVariants({ variant: "secondary", size: "lg" })} pb-press whitespace-nowrap`}
              >
                Read the code
              </Link>
            </div>
          </div>
          <Photo
            name="team-laptops"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="pb-enter-late aspect-[4/3] rounded-lg"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Photo
            name="discussion"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="aspect-[4/3] rounded-lg lg:order-none"
          />
          <div>
            <h2 className="text-balance text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
              How we work
            </h2>
            <dl className="mt-8 flex flex-col gap-7">
              {PRACTICES.map((p) => (
                <div key={p.title}>
                  <dt className="text-ui-lg font-semibold text-fg-primary">
                    {p.title}
                  </dt>
                  <dd className="mt-1.5 max-w-[48ch] text-body-md text-fg-secondary">
                    {p.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Photo
        name="all-hands"
        sizes="100vw"
        className="aspect-[16/9] max-h-[460px] w-full"
        alt="A teammate presenting to the company in a brick-walled office"
      />

      <section id="roles" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
          Open roles
        </h2>
        <p className="mt-3 max-w-md text-body-md text-fg-secondary">
          We hire slowly and reply to every application within a week.
        </p>
        <div className="mt-10 flex flex-col gap-12">
          {TEAMS.map((team) => (
            <div
              key={team.name}
              className="grid gap-5 md:grid-cols-[14rem_1fr] md:gap-10"
            >
              <div>
                <h3 className="text-ui-lg font-semibold text-fg-primary">
                  {team.name}
                </h3>
                <p className="mt-1 text-body-sm text-fg-tertiary">
                  {team.note}
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {team.roles.map((role) => (
                  <li
                    key={role.title}
                    className="flex flex-col gap-3 rounded-md bg-bg-secondary p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-ui-md font-semibold text-fg-primary">
                        {role.title}
                      </p>
                      <p className="mt-1 text-body-sm text-fg-secondary">
                        {role.where}. {role.type}.
                      </p>
                    </div>
                    <ConfirmDialog
                      trigger={
                        <Button variant="secondary" size="sm">
                          Apply
                        </Button>
                      }
                      title={`Apply for ${role.title}?`}
                      description="This demo does not send email. In production, wire the confirm action to your applicant tracking system."
                      confirmLabel="Send application"
                      onConfirm={() => undefined}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-md text-balance text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
            What you get
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-6">
            <Photo
              name="desk-topdown"
              sizes="(min-width: 768px) 60vw, 100vw"
              className="aspect-[16/10] rounded-lg md:col-span-4 md:aspect-auto md:min-h-[18rem]"
            />
            <Perk perk={PERKS[0]} className="md:col-span-2" />
            <Perk perk={PERKS[1]} className="md:col-span-2" />
            <Perk perk={PERKS[2]} className="md:col-span-2" />
            <Photo
              name="office-corridor"
              sizes="(min-width: 768px) 30vw, 100vw"
              className="aspect-[16/10] rounded-lg md:col-span-2 md:aspect-auto"
            />
            <Perk perk={PERKS[3]} className="md:col-span-6" wide />
          </div>
        </div>
      </section>

      <Reveal>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Testimonial
            className="bg-bg-secondary"
            quote="I review a pull request with the person who wrote the spec in Figma. Nobody guesses, so nothing gets redone."
            author="Dario Quintela"
            role="Staff Engineer, Paubha"
            avatar={
              <Avatar
                src="/examples/photos/person-2.jpg"
                alt="Dario Quintela"
                size="sm"
              />
            }
          />
        </div>
      </Reveal>

      <section className="border-t border-border-default bg-bg-secondary">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
              Do not see your role?
            </h2>
            <p className="mt-2 max-w-md text-body-md text-fg-secondary">
              Send a short note and a link to something you built. We read all
              of it.
            </p>
          </div>
          <Link
            href="/examples/marketing/contact"
            className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press whitespace-nowrap`}
          >
            Send a note
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}

function Perk({
  perk,
  className,
  wide = false,
}: {
  perk: (typeof PERKS)[number];
  className?: string;
  wide?: boolean;
}) {
  const Icon = perk.icon;
  return (
    <div
      className={`rounded-lg bg-bg-primary p-6 ${wide ? "flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6" : ""} ${className ?? ""}`}
    >
      <Icon className="size-5 shrink-0 text-fg-brand" aria-hidden="true" />
      <div>
        <p className="text-ui-lg font-semibold text-fg-primary">{perk.title}</p>
        <p className="mt-1.5 max-w-[56ch] text-body-md text-fg-secondary">
          {perk.body}
        </p>
      </div>
    </div>
  );
}
