"use client";

import { Reveal } from "@/components/motion/reveal";
import { Avatar } from "@paubha/registry/ui/avatar";
import { buttonVariants } from "@paubha/registry/ui/button";
import { LogoCloud } from "@paubha/registry/ui/logo-cloud";
import { Testimonial } from "@paubha/registry/ui/testimonial";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BrandMarks } from "./brand-marks";
import { PEOPLE, Photo } from "./photo";
import { MarketingShell } from "./shell";

function Person({ index }: { index: 0 | 1 | 2 | 3 | 4 | 5 }) {
  const p = PEOPLE[index];
  return <Avatar src={p.src} alt={p.name} size="lg" />;
}

const OUTCOMES = [
  {
    title: "Design and code agree again",
    body: "One token file feeds Figma and the app, so handoff is a pull request instead of a meeting.",
  },
  {
    title: "Reviews happen on real files",
    body: "Components live in the repo, so changes show up in a diff and get reviewed like any other code.",
  },
  {
    title: "Dark mode is a token swap",
    body: "Teams remapped a handful of semantic tokens and every component followed.",
  },
  {
    title: "No upgrade fire drills",
    body: "Nothing updates until you copy it in, so a release never breaks a Friday deploy.",
  },
] as const;

const STORY_LINK = `${buttonVariants({ variant: "tertiary", size: "md" })} mt-3 -ml-3`;

export function CustomersMarketingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="pb-enter">
          <h1 className="text-balance text-display-md font-semibold tracking-[-0.03em] text-fg-primary lg:text-display-lg">
            Product teams that own their UI.
          </h1>
          <p className="mt-4 max-w-md text-body-lg text-fg-secondary">
            How six teams moved off rented kits and onto code they control.
          </p>
          <div className="mt-8">
            <Link
              href="/docs"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Get started
            </Link>
          </div>
        </div>
        <Photo
          name="boardroom"
          priority
          className="aspect-[4/3] rounded-lg"
          sizes="(min-width: 1024px) 580px, 100vw"
        />
      </section>

      <section className="border-y border-border-default bg-bg-secondary py-10">
        <LogoCloud className="mx-auto max-w-6xl px-6">
          <BrandMarks />
        </LogoCloud>
      </section>

      <Reveal>
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-12 md:gap-8">
          <article className="md:col-span-7">
            <Photo
              name="skyscrapers"
              className="aspect-[16/10] rounded-lg"
              sizes="(min-width: 768px) 58vw, 100vw"
            />
            <h2 className="mt-5 text-balance text-display-xs font-semibold text-fg-primary">
              Summit replaced two internal kits with one
            </h2>
            <p className="mt-2 max-w-xl text-body-md text-fg-secondary">
              Summit&apos;s web and admin apps had drifted into two component
              sets. They moved both onto Paubha over one quarter, one screen at
              a time.
            </p>
            <Link href="/examples/marketing/blog" className={STORY_LINK}>
              Read the story
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
          <article className="md:col-span-5 md:pt-16">
            <Photo
              name="discussion"
              className="aspect-[4/3] rounded-lg"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
            <h2 className="mt-5 text-balance text-display-xs font-semibold text-fg-primary">
              Helix kept one token file for three products
            </h2>
            <p className="mt-2 text-body-md text-fg-secondary">
              Design edits a token in Figma, engineering pulls it into the repo,
              and all three products pick it up.
            </p>
            <Link href="/examples/marketing/blog" className={STORY_LINK}>
              Read the story
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
        </section>
      </Reveal>

      <section className="relative">
        <Photo
          name="all-hands"
          className="h-[420px] md:h-[520px]"
          sizes="100vw"
        />
        <div className="mx-auto max-w-6xl px-6">
          <Testimonial
            className="relative -mt-24 max-w-lg md:-mt-36 md:ml-auto"
            quote="We showed the diff at all-hands. Nobody asked what library it was, they asked when their screen was next."
            author="Walter Brandt"
            role="VP Engineering, Summit"
            avatar={<Person index={5} />}
          />
        </div>
      </section>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-xl text-display-xs font-semibold text-fg-primary">
            What teams say after a few months
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-12">
            <Testimonial
              className="justify-between border-border-brand bg-bg-brand-subtle md:col-span-7 md:row-span-2"
              quote="The day we pasted Button, the app stopped looking rented. The focus ring alone made it feel like ours."
              author="Maren Holloway"
              role="Design Lead, Northwind"
              avatar={<Person index={0} />}
            />
            <Testimonial
              className="md:col-span-5"
              quote="Copy-paste means we review the actual file in a pull request. That changed our culture."
              author="Dario Quintela"
              role="Staff Engineer, Parcel"
              avatar={<Person index={1} />}
            />
            <Testimonial
              className="md:col-span-5"
              quote="Marketing and the app finally share one nav and one focus ring."
              author="Leila Marchetti"
              role="Product Manager, Kite"
              avatar={<Person index={2} />}
            />
          </div>
        </section>
      </Reveal>

      <section className="border-y border-border-default bg-bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-balance text-display-xs font-semibold text-fg-primary">
              What changed for them
            </h2>
            <p className="mt-2 max-w-sm text-body-md text-fg-secondary">
              No benchmarks, just the things teams told us got easier.
            </p>
          </div>
          <ul className="divide-y divide-border-default border-y border-border-default">
            {OUTCOMES.map((o) => (
              <li key={o.title} className="py-5">
                <p className="text-ui-lg font-semibold text-fg-primary">
                  {o.title}
                </p>
                <p className="mt-1 max-w-xl text-body-md text-fg-secondary">
                  {o.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="max-w-xl text-balance text-display-sm font-semibold tracking-[-0.03em] text-fg-primary">
              Run the CLI and see how it fits your app.
            </h2>
            <Testimonial
              className="mt-6 max-w-xl border-0 bg-transparent p-0"
              quote="We had Button and Dialog in production by the end of the first week."
              author="Tomás Aguilar"
              role="Engineering Manager, Orbit"
              avatar={<Person index={3} />}
            />
          </div>
          <Link
            href="/docs"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Get started
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
