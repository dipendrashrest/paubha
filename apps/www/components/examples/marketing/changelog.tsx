"use client";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@paubha/registry/ui/badge";
import { Button, buttonVariants } from "@paubha/registry/ui/button";
import { Field } from "@paubha/registry/ui/field";
import { Input } from "@paubha/registry/ui/input";
import { Plus } from "lucide-react";
import * as React from "react";
import { Photo } from "./photo";
import { MarketingShell } from "./shell";

type Kind = "Added" | "Changed" | "Fixed";

const kindVariant = {
  Added: "success",
  Changed: "brand",
  Fixed: "warning",
} as const;

type Release = {
  version: string;
  date: string;
  title: string;
  summary: string;
  notes: { kind: Kind; text: string }[];
  media?: "buttons" | "ux-wall" | "desk-topdown";
};

const RELEASES: Release[] = [
  {
    version: "0.12.0",
    date: "Oct 5, 2026",
    title: "Filter panel and User Menu",
    summary:
      "Two more application patterns, both built from components you already have installed.",
    notes: [
      {
        kind: "Added",
        text: "Filter pattern: a panel with applied-filter chips and a clear-all action.",
      },
      {
        kind: "Added",
        text: "User Menu pattern: avatar trigger, account details and sign-out, on top of Dropdown.",
      },
      {
        kind: "Changed",
        text: "Avatar falls back to initials when the image fails to load.",
      },
    ],
    media: "ux-wall",
  },
  {
    version: "0.11.0",
    date: "Sep 22, 2026",
    title: "Button gets a tertiary variant",
    summary:
      "For low-emphasis actions that sit beside a primary and a secondary button.",
    notes: [
      {
        kind: "Added",
        text: "Button variant tertiary, with the same focus ring and sizes as the others.",
      },
      {
        kind: "Changed",
        text: "Date Picker now holds the draft range until you press Apply.",
      },
      {
        kind: "Fixed",
        text: "Breadcrumb links lost their focus ring in dark mode.",
      },
    ],
    media: "buttons",
  },
  {
    version: "0.10.0",
    date: "Sep 10, 2026",
    title: "Marketing patterns",
    summary: "Building blocks for landing pages, blogs and pricing.",
    notes: [
      {
        kind: "Added",
        text: "Blog Card, Pricing Card, FAQ, Logo Cloud, Site Footer and Auth Card patterns.",
      },
      {
        kind: "Changed",
        text: "Tokens re-synced with the Figma file. Brand and gray ramps updated.",
      },
    ],
    media: "desk-topdown",
  },
  {
    version: "0.9.0",
    date: "Aug 28, 2026",
    title: "Calendar and chart patterns",
    summary: "Higher-level compositions for scheduling and reporting screens.",
    notes: [
      {
        kind: "Added",
        text: "Calendar pattern with month navigation and range selection.",
      },
      { kind: "Added", text: "Chart patterns for bar, line and area data." },
      {
        kind: "Fixed",
        text: "Select menu now closes when the trigger loses focus.",
      },
    ],
  },
];

function Media({ kind }: { kind: NonNullable<Release["media"]> }) {
  if (kind === "buttons") {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border-default bg-bg-primary p-6">
        <Button variant="primary">Publish</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="tertiary">Cancel</Button>
        <Button variant="tertiary" leadingIcon={<Plus />}>
          Add filter
        </Button>
      </div>
    );
  }
  return (
    <Photo
      name={kind}
      sizes="(min-width: 1024px) 640px, 100vw"
      className="aspect-[16/9] rounded-lg"
    />
  );
}

function Subscribe() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const [done, setDone] = React.useState(false);
  return (
    <form
      noValidate
      className="flex flex-col gap-4 sm:flex-row sm:items-start"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          setError("Enter a valid email address.");
          setDone(false);
          return;
        }
        setError(undefined);
        setDone(true);
      }}
    >
      <Field
        label="Email"
        error={error}
        success={done ? "Subscribed. Check your inbox to confirm." : undefined}
        className="sm:w-72"
      >
        <Input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Button type="submit" className="sm:mt-[26px]">
        Subscribe
      </Button>
    </form>
  );
}

export function ChangelogMarketingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <h1 className="text-display-md font-semibold tracking-[-0.03em] text-fg-primary">
            What shipped in Paubha
          </h1>
          <p className="mt-4 max-w-md text-body-md text-fg-secondary">
            Release notes for new components, patterns and fixes.
          </p>
          <a
            href="#subscribe"
            className={`${buttonVariants({ variant: "primary", size: "lg" })} mt-8`}
          >
            Subscribe
          </a>
        </div>
        <Photo
          name="team-laptops"
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="aspect-[4/3] rounded-lg"
        />
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-20">
        {RELEASES.map((r) => (
          <Reveal key={r.version}>
            <article className="grid gap-6 md:grid-cols-[180px_1fr] md:gap-10">
              <header className="md:sticky md:top-24 md:self-start">
                <p className="text-ui-lg font-semibold text-fg-primary">
                  v{r.version}
                </p>
                <time className="text-ui-sm text-fg-tertiary">{r.date}</time>
              </header>
              <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                <div>
                  <h2 className="text-display-xs font-semibold tracking-[-0.02em] text-fg-primary">
                    {r.title}
                  </h2>
                  <p className="mt-2 text-body-md text-fg-secondary">
                    {r.summary}
                  </p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {r.notes.map((n) => (
                      <li key={n.text} className="flex items-start gap-3">
                        <span className="mt-0.5 w-[4.5rem] shrink-0">
                          <Badge
                            variant={kindVariant[n.kind]}
                            fill="subtle"
                            size="sm"
                          >
                            {n.kind}
                          </Badge>
                        </span>
                        <span className="text-body-sm text-fg-primary">
                          {n.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {r.media ? <Media kind={r.media} /> : null}
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section id="subscribe" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 rounded-lg border border-border-default bg-bg-secondary p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-display-xs font-semibold tracking-[-0.02em] text-fg-primary">
              Get release notes by email
            </h2>
            <p className="mt-2 max-w-md text-body-md text-fg-secondary">
              One short email per release. Older versions are on GitHub.
            </p>
          </div>
          <Subscribe />
        </div>
      </section>
    </MarketingShell>
  );
}
