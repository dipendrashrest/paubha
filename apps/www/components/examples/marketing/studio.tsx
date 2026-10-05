"use client";

import { Reveal } from "@/components/motion/reveal";
import { Avatar } from "@paubha/registry/ui/avatar";
import { buttonVariants } from "@paubha/registry/ui/button";
import { Testimonial } from "@paubha/registry/ui/testimonial";
import Link from "next/link";
import { Photo, type PhotoName } from "./photo";
import { MarketingShell } from "./shell";

const WORK: {
  photo: PhotoName;
  name: string;
  line: string;
  span: string;
  ratio: string;
  sizes: string;
}[] = [
  {
    photo: "skyscrapers",
    name: "Calder Estates",
    line: "A property search for a commercial landlord, with saved filters and a tenant portal.",
    span: "md:col-span-7",
    ratio: "aspect-[4/3]",
    sizes: "(min-width: 768px) 58vw, 100vw",
  },
  {
    photo: "wireframe-sketch",
    name: "Fieldnote",
    line: "Offline-first notes for field researchers, built in six weeks.",
    span: "md:col-span-5",
    ratio: "aspect-[4/3] md:aspect-[4/5]",
    sizes: "(min-width: 768px) 42vw, 100vw",
  },
  {
    photo: "office-corridor",
    name: "Harbourline",
    line: "Desk and room booking for a company with four floors and one calendar.",
    span: "md:col-span-5",
    ratio: "aspect-[4/3] md:aspect-[4/5]",
    sizes: "(min-width: 768px) 42vw, 100vw",
  },
  {
    photo: "pair-review",
    name: "Tidewater Credit Union",
    line: "A member dashboard and a design system the in-house team now maintains.",
    span: "md:col-span-7",
    ratio: "aspect-[4/3]",
    sizes: "(min-width: 768px) 58vw, 100vw",
  },
];

const PROCESS = [
  {
    verb: "Listen",
    body: "We sit with your users and your support inbox before we open Figma.",
  },
  {
    verb: "Sketch",
    body: "Flows first, then screens. You see rough work early and often.",
  },
  {
    verb: "Build",
    body: "Screens become React and Tailwind on Paubha components, reviewed in the open.",
  },
  {
    verb: "Hand over",
    body: "You get the repo, the Figma file and a walkthrough. No lock-in, no retainer.",
  },
] as const;

export function StudioMarketingPage() {
  return (
    <MarketingShell>
      <section className="border-b border-border-default">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-16 lg:grid-cols-[0.85fr_1.15fr] lg:pt-20">
          <div className="pb-enter">
            <h1 className="max-w-md text-balance text-display-md font-semibold tracking-[-0.045em] text-fg-primary lg:text-display-lg">
              We design and build product interfaces.
            </h1>
            <p className="mt-4 max-w-md text-body-lg text-fg-secondary">
              A six-person studio. Everything we ship is built on Paubha, so you
              can read and change it.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/examples/marketing/contact"
                className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press whitespace-nowrap`}
              >
                Start a project
              </Link>
              <Link
                href="#work"
                className={`${buttonVariants({ variant: "secondary", size: "lg" })} pb-press whitespace-nowrap`}
              >
                See our work
              </Link>
            </div>
          </div>
          <Photo
            name="ux-wall"
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="pb-enter-late aspect-[4/3] rounded-lg"
          />
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
          Selected work
        </h2>
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-12">
          {WORK.map((w, i) => (
            <Reveal key={w.name} delay={(i % 2) * 70} className={w.span}>
              <Photo
                name={w.photo}
                sizes={w.sizes}
                className={`${w.ratio} rounded-lg`}
              />
              <h3 className="mt-4 text-ui-lg font-semibold text-fg-primary">
                {w.name}
              </h3>
              <p className="mt-1 max-w-[52ch] text-body-md text-fg-secondary">
                {w.line}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <Photo
        name="meeting-bw"
        sizes="100vw"
        className="aspect-[16/9] max-h-[480px] w-full"
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="max-w-xs text-balance text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
            How a project goes
          </h2>
          <ol className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {PROCESS.map((p) => (
              <li key={p.verb}>
                <p className="text-display-xs font-semibold tracking-[-0.03em] text-fg-brand">
                  {p.verb}
                </p>
                <p className="mt-2 max-w-[34ch] text-body-md text-fg-secondary">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Testimonial
            className="bg-bg-primary"
            quote="They handed us a repo our own engineers could change on day one. That is rare for an agency."
            author="Ingrid Solheim"
            role="Head of Design Systems, Harbourline"
            avatar={
              <Avatar
                src="/examples/photos/person-5.jpg"
                alt="Ingrid Solheim"
                size="sm"
              />
            }
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-xl">
          <h2 className="text-balance text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
            Tell us what you are building.
          </h2>
          <p className="mt-3 max-w-md text-body-md text-fg-secondary">
            A paragraph is enough. We reply within two working days.
          </p>
          <Link
            href="/examples/marketing/contact"
            className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press mt-6 whitespace-nowrap`}
          >
            Start a project
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
