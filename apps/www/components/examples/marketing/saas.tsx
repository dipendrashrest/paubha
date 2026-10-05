"use client";

import { Reveal } from "@/components/motion/reveal";
import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { Button, buttonVariants } from "@paubha/registry/ui/button";
import { Checkbox } from "@paubha/registry/ui/checkbox";
import { CliSnippet } from "@paubha/registry/ui/cli-snippet";
import { Field } from "@paubha/registry/ui/field";
import { Input } from "@paubha/registry/ui/input";
import { LogoCloud } from "@paubha/registry/ui/logo-cloud";
import { Newsletter } from "@paubha/registry/ui/newsletter";
import { Switch } from "@paubha/registry/ui/switch";
import { Testimonial } from "@paubha/registry/ui/testimonial";
import { ArrowRight, FileCode2, GitFork, Palette } from "lucide-react";
import Link from "next/link";
import { BrandMarks } from "./brand-marks";
import { Photo } from "./photo";
import { MarketingShell } from "./shell";

const OWN_POINTS = [
  {
    icon: FileCode2,
    title: "The file lands in your repo",
    body: "add writes into components/ui. There is no package to upgrade and no black box between you and the markup.",
  },
  {
    icon: Palette,
    title: "Remap tokens, not components",
    body: "Every color, radius and shadow reads from semantic tokens. Change the brand blue once and the whole set follows.",
  },
  {
    icon: GitFork,
    title: "Fork it without asking",
    body: "MIT on the full catalog. Delete a variant, rename a prop, ship it to production.",
  },
] as const;

export function SaasMarketingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pt-20">
        <div className="pb-enter">
          <h1 className="text-display-md font-semibold tracking-[-0.03em] text-fg-primary sm:text-display-lg">
            Components you actually own.
          </h1>
          <p className="mt-4 max-w-[44ch] text-body-lg text-fg-secondary">
            Copy the file into your repo, remap the tokens, and ship. React and
            Tailwind, free under MIT.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press whitespace-nowrap`}
            >
              Get started
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/docs/components"
              className={`${buttonVariants({ variant: "secondary", size: "lg" })} pb-press whitespace-nowrap`}
            >
              Browse components
            </Link>
          </div>
        </div>
        <div className="pb-enter-late relative pb-10 sm:pb-14">
          <Photo
            name="laptop-code"
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] rounded-md border border-border-default"
          />
          <CliSnippet
            showCopy
            command="npx paubha@latest add button"
            className="absolute right-4 bottom-0 left-4 shadow-lg sm:right-auto sm:left-[-1.5rem] sm:w-80"
          />
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-secondary py-10">
        <LogoCloud className="mx-auto max-w-6xl px-6">
          <BrandMarks />
        </LogoCloud>
      </section>

      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary sm:text-display-sm">
              Why own the code
            </h2>
            <p className="mt-3 max-w-[40ch] text-body-md text-fg-secondary">
              Dependencies change under you. A file in your repo does not.
            </p>
          </div>
          <ul className="divide-y divide-border-default border-y border-border-default">
            {OWN_POINTS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4 py-6">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-sm bg-bg-brand-subtle text-fg-brand">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-ui-lg font-semibold text-fg-primary">
                    {title}
                  </h3>
                  <p className="mt-1 max-w-[56ch] text-body-md text-fg-secondary">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <section className="bg-bg-secondary py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-[24ch] text-display-xs font-semibold tracking-[-0.03em] text-fg-primary sm:text-display-sm">
              33 base components and 27 patterns, built to be edited
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-6">
              <div className="relative overflow-hidden rounded-md border border-border-default md:col-span-4">
                <Photo
                  name="ux-wall"
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="aspect-[16/10]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-bg-overlay p-5">
                  <p className="text-ui-lg font-semibold text-fg-on-brand">
                    Patterns for whole screens
                  </p>
                  <p className="mt-1 max-w-[52ch] text-body-sm text-fg-on-brand">
                    Tables, date pickers, activity feeds and dashboards, built
                    from the same base components.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 rounded-md border border-border-default bg-bg-primary p-6 md:col-span-2">
                <Field label="Work email" description="We never share it.">
                  <Input placeholder="you@company.com" />
                </Field>
                <Button size="md">Save changes</Button>
                <p className="text-body-sm text-fg-secondary">
                  Tab to the field. The glow-focus ring comes with the file.
                </p>
              </div>

              <div className="flex flex-col justify-between gap-5 rounded-md border border-border-default bg-bg-primary p-6 md:col-span-2">
                <div className="flex flex-col gap-4">
                  <Switch label="Dark mode" defaultChecked />
                  <Checkbox label="Reduce motion" defaultChecked />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="brand" fill="subtle">
                      Brand
                    </Badge>
                    <Badge variant="success" fill="subtle">
                      Success
                    </Badge>
                    <Badge variant="warning" fill="subtle">
                      Warning
                    </Badge>
                  </div>
                </div>
                <p className="text-body-sm text-fg-secondary">
                  Light and dark ship together, bound to one token layer.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-md border border-border-default md:col-span-2">
                <Photo
                  name="code-closeup"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[4/3] md:aspect-auto md:h-full"
                />
              </div>

              <div className="relative overflow-hidden rounded-md border border-border-default md:col-span-2">
                <Photo
                  name="desk-topdown"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[4/3] md:aspect-auto md:h-full"
                />
                <div className="absolute inset-x-0 bottom-0 bg-bg-overlay p-4">
                  <p className="text-body-sm text-fg-on-brand">
                    Accessibility tests ship with every component.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-20 md:grid-cols-5">
          <Testimonial
            className="bg-bg-secondary md:col-span-3 md:p-8"
            quote="We stopped buying template kits. The focus ring alone made the product feel like ours."
            author="Maren Holloway"
            role="Design Lead, Northwind"
            avatar={
              <Avatar
                src="/examples/photos/person-1.jpg"
                alt="Maren Holloway"
                size="lg"
              />
            }
          />
          <div className="flex flex-col gap-4 md:col-span-2">
            <Testimonial
              quote="I read the Button source in ten minutes and changed it in five."
              author="Dario Quintela"
              role="Staff Engineer, Helix"
              avatar={
                <Avatar
                  src="/examples/photos/person-2.jpg"
                  alt="Dario Quintela"
                  size="md"
                />
              }
            />
            <Testimonial
              quote="Tests and keyboard behavior were already there. Review got shorter."
              author="Leila Marchetti"
              role="Product Manager, Parcel"
              avatar={
                <Avatar
                  src="/examples/photos/person-3.jpg"
                  alt="Leila Marchetti"
                  size="md"
                />
              }
            />
          </div>
        </div>
      </Reveal>

      <section className="relative isolate overflow-hidden">
        <Photo
          name="skyscrapers"
          sizes="100vw"
          alt=""
          className="absolute inset-0 -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-bg-overlay" />
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-on-brand sm:text-display-sm">
              Add your first component in a minute
            </h2>
            <p className="mt-3 max-w-[44ch] text-body-md text-fg-on-brand">
              Run init once, then add what you need.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <CliSnippet showCopy command="npx paubha@latest init" />
            <CliSnippet showCopy command="npx paubha@latest add button" />
          </div>
        </div>
      </section>

      <section className="bg-bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-display-xs font-semibold text-fg-primary">
              New components, once a month
            </h2>
            <p className="mt-2 max-w-md text-body-md text-fg-secondary">
              One short email when new patterns land. Unsubscribe any time.
            </p>
          </div>
          <Newsletter
            title="Paubha updates"
            description="No spam, just the changelog."
            submitLabel="Subscribe"
          />
        </div>
      </section>
    </MarketingShell>
  );
}
