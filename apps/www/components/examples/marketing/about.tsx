"use client";

import { Reveal } from "@/components/motion/reveal";
import { Avatar } from "@paubha/registry/ui/avatar";
import { buttonVariants } from "@paubha/registry/ui/button";
import { TeamCard, TeamCardGrid } from "@paubha/registry/ui/team-card";
import { GitBranch } from "lucide-react";
import Link from "next/link";
import { PEOPLE, Photo } from "./photo";
import { MarketingShell } from "./shell";

const VALUES = [
  {
    title: "You own every line",
    body: "Components are copied into your repo. There is no package between you and the UI.",
  },
  {
    title: "Figma is the spec",
    body: "Variants, sizes and tokens match the design file. We do not invent states in code.",
  },
  {
    title: "Accessible by default",
    body: "Each interactive component follows its WAI-ARIA pattern, shows a visible focus ring and ships with an axe test.",
  },
  {
    title: "Free, with no catch",
    body: "The whole catalog is MIT licensed. There is no paid tier behind it.",
  },
] as const;

const NEXT = [
  {
    title: "Live previews on every docs page",
    body: "Each component page gets a working demo and a full props table.",
  },
  {
    title: "More application patterns",
    body: "Settings screens, onboarding flows and data views built from the base components.",
  },
  {
    title: "Easier token sync",
    body: "A smoother path from Figma variables to the token files in your app.",
  },
] as const;

export function AboutMarketingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="pb-enter">
          <h1 className="text-balance text-display-md font-semibold tracking-[-0.03em] text-fg-primary lg:text-display-lg">
            A small team building UI you can keep.
          </h1>
          <p className="mt-4 max-w-md text-body-lg text-fg-secondary">
            Paubha is a free component library for React and Tailwind, built in
            the open.
          </p>
          <div className="mt-8">
            <Link
              href="https://github.com/dipendrashrest/paubha"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              <GitBranch className="size-4" aria-hidden="true" />
              View on GitHub
            </Link>
          </div>
        </div>
        <Photo
          name="office-corridor"
          priority
          className="aspect-[4/3] rounded-lg"
          sizes="(min-width: 1024px) 580px, 100vw"
        />
      </section>

      <Reveal>
        <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 md:pt-6">
            <h2 className="text-balance text-display-xs font-semibold text-fg-primary">
              We got tired of rebuilding the same button
            </h2>
            <p className="mt-3 text-body-md text-fg-secondary">
              Every product we worked on started with the same week: pick a kit,
              fight its styles, then fork it. We wanted components that start in
              our repo and match the design file from day one.
            </p>
            <p className="mt-3 text-body-md text-fg-secondary">
              So we built them once, with tokens, tests and a focus ring we
              would be proud to put on our own homepage, and gave them away.
            </p>
          </div>
          <Photo
            name="meeting-bw"
            className="aspect-[4/5] rounded-lg md:col-span-3 md:mt-16"
            sizes="(min-width: 768px) 25vw, 100vw"
          />
          <Photo
            name="team-laptops"
            className="aspect-[4/5] rounded-lg md:col-span-4"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </section>
      </Reveal>

      <section className="border-y border-border-default bg-bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-balance text-display-xs font-semibold text-fg-primary">
            How we work
          </h2>
          <dl className="divide-y divide-border-default border-y border-border-default">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6"
              >
                <dt className="text-ui-lg font-semibold text-fg-primary">
                  {v.title}
                </dt>
                <dd className="text-body-md text-fg-secondary">{v.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Photo
        name="all-hands"
        className="h-[320px] md:h-[460px]"
        sizes="100vw"
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-display-xs font-semibold text-fg-primary">
          The people behind it
        </h2>
        <TeamCardGrid className="mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {PEOPLE.map((m) => (
            <TeamCard
              key={m.name}
              avatar={<Avatar src={m.src} alt={m.name} size="xl" />}
              name={m.name}
              role={m.role}
            />
          ))}
        </TeamCardGrid>
      </section>

      <section className="border-t border-border-default bg-bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-balance text-display-xs font-semibold text-fg-primary">
              Where Paubha is going
            </h2>
            <p className="mt-2 max-w-sm text-body-md text-fg-secondary">
              The next few months, in the order we plan to do them.
            </p>
          </div>
          <ol className="flex flex-col gap-6">
            {NEXT.map((n, i) => (
              <li key={n.title} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-brand bg-bg-brand-subtle text-ui-sm font-semibold text-fg-brand">
                  {i + 1}
                </span>
                <div>
                  <p className="text-ui-lg font-semibold text-fg-primary">
                    {n.title}
                  </p>
                  <p className="mt-1 max-w-lg text-body-md text-fg-secondary">
                    {n.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="max-w-xl text-balance text-display-sm font-semibold tracking-[-0.03em] text-fg-primary">
              Read the code, open an issue, send a pull request.
            </h2>
            <p className="mt-3 max-w-lg text-body-md text-fg-secondary">
              Everything happens on GitHub, and every contribution gets a reply.
            </p>
          </div>
          <Link
            href="https://github.com/dipendrashrest/paubha"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            <GitBranch className="size-4" aria-hidden="true" />
            View on GitHub
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
