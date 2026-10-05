"use client";

import { Reveal } from "@/components/motion/reveal";
import { Avatar } from "@paubha/registry/ui/avatar";
import { buttonVariants } from "@paubha/registry/ui/button";
import { CliSnippet } from "@paubha/registry/ui/cli-snippet";
import { Faq } from "@paubha/registry/ui/faq";
import { Testimonial } from "@paubha/registry/ui/testimonial";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Photo } from "./photo";
import { MarketingShell } from "./shell";

const REPO = "https://github.com/dipendrashrest/paubha";

const STEPS = [
  {
    title: "Pick an issue",
    body: "Issues tagged good first issue are scoped to one component and one test file.",
  },
  {
    title: "Run it locally",
    body: "pnpm install, then pnpm dev starts the docs site with every component live.",
  },
  {
    title: "Open a pull request",
    body: "Include a vitest-axe test. A maintainer reviews within a few days.",
  },
] as const;

const ROADMAP = [
  { label: "Application patterns, all 27", done: true },
  { label: "Docs pages with live previews for every component", done: true },
  { label: "Registry search in the CLI", done: false },
  { label: "Right-to-left layout audit", done: false },
  { label: "Chart components", done: false },
] as const;

export function OpenSourceMarketingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pt-20">
        <div className="pb-enter">
          <h1 className="text-display-md font-semibold tracking-[-0.03em] text-fg-primary sm:text-display-lg">
            Built in the open, by the people who use it.
          </h1>
          <p className="mt-4 max-w-[44ch] text-body-lg text-fg-secondary">
            Paubha is MIT licensed. Read the source, fix a bug, or fork the
            whole thing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={REPO}
              className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press whitespace-nowrap`}
            >
              View on GitHub
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/docs"
              className={`${buttonVariants({ variant: "secondary", size: "lg" })} pb-press whitespace-nowrap`}
            >
              Read the docs
            </Link>
          </div>
        </div>
        <Photo
          name="pair-programming"
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="pb-enter-late aspect-[4/3] rounded-md border border-border-default"
        />
      </section>

      <Reveal>
        <section className="border-y border-border-default bg-bg-secondary">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-5 gap-3">
              <Photo
                name="desk-topdown"
                sizes="(min-width: 1024px) 300px, 60vw"
                className="col-span-3 aspect-[3/4] rounded-md"
              />
              <Photo
                name="notes-table"
                sizes="(min-width: 1024px) 200px, 40vw"
                className="col-span-2 mt-10 aspect-[2/3] rounded-md"
              />
            </div>
            <div>
              <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary sm:text-display-sm">
                How to contribute
              </h2>
              <ol className="mt-8 flex flex-col gap-6">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-bg-brand-subtle text-ui-sm font-semibold text-fg-brand"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-ui-lg font-semibold text-fg-primary">
                        {step.title}
                      </h3>
                      <p className="mt-1 max-w-[52ch] text-body-md text-fg-secondary">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <CliSnippet
                className="mt-8"
                showCopy
                command="git clone https://github.com/dipendrashrest/paubha"
              />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary sm:text-display-sm">
              What we are working on
            </h2>
            <p className="mt-3 max-w-[40ch] text-body-md text-fg-secondary">
              A plain list, in rough order. Open an issue to move something up.
            </p>
          </div>
          <ul className="divide-y divide-border-default border-y border-border-default">
            {ROADMAP.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 py-4 text-body-md text-fg-primary"
              >
                {item.done ? (
                  <Check
                    className="size-5 shrink-0 text-fg-success"
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="size-5 shrink-0 rounded-full border border-border-strong"
                  />
                )}
                <span className={item.done ? "text-fg-secondary" : undefined}>
                  {item.label}
                </span>
                <span className="sr-only">
                  {item.done ? "(shipped)" : "(planned)"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <section className="border-t border-border-default bg-bg-secondary">
          <div className="mx-auto grid max-w-6xl gap-4 px-6 py-20 md:grid-cols-2">
            <Testimonial
              quote="I sent a fix for the Select keyboard order on a Tuesday. It was merged by Thursday."
              author="Tomás Aguilar"
              role="Engineering Manager, Orbit"
              avatar={
                <Avatar
                  src="/examples/photos/person-4.jpg"
                  alt="Tomás Aguilar"
                  size="lg"
                />
              }
            />
            <Testimonial
              quote="We forked the tokens for three brands. The license never came up in legal review."
              author="Ingrid Solheim"
              role="Head of Design Systems, Kite"
              avatar={
                <Avatar
                  src="/examples/photos/person-5.jpg"
                  alt="Ingrid Solheim"
                  size="lg"
                />
              }
            />
          </div>
        </section>
      </Reveal>

      <div className="mx-auto max-w-3xl px-6 py-20">
        <Faq
          title="License questions"
          items={[
            {
              question: "Can we ship Paubha in a commercial product?",
              answer:
                "Yes. It is MIT licensed. Modify it, redistribute it, and sell what you build with it. No royalty.",
            },
            {
              question: "Do we have to keep the Paubha name?",
              answer:
                "No. Once the file is in your repo it is your component. Credit is appreciated, not required.",
            },
            {
              question: "Is anything behind a paywall?",
              answer:
                "No. Base components and application patterns are all in the same free registry.",
            },
          ]}
        />
      </div>

      <section className="border-t border-border-default bg-bg-secondary">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-display-xs font-semibold text-fg-primary">
              Found something to fix?
            </h2>
            <p className="mt-2 max-w-md text-body-md text-fg-secondary">
              Issues and pull requests are both welcome.
            </p>
          </div>
          <Link
            href={REPO}
            className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press whitespace-nowrap`}
          >
            View on GitHub
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
