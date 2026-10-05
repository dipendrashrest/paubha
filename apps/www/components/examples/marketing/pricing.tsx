"use client";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@paubha/registry/ui/badge";
import { buttonVariants } from "@paubha/registry/ui/button";
import { Faq } from "@paubha/registry/ui/faq";
import { PricingCard, PricingCardGrid } from "@paubha/registry/ui/pricing-card";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { Photo } from "./photo";
import { MarketingShell } from "./shell";

const COMPARISON = [
  {
    label: "Price",
    paubha: "$0, no seats",
    kits: "Per seat, per year",
  },
  {
    label: "License",
    paubha: "MIT",
    kits: "Commercial, per project",
  },
  {
    label: "Where the code lives",
    paubha: "In your repo",
    kits: "In node_modules",
  },
  {
    label: "Changing a component",
    paubha: "Edit the file",
    kits: "Override or fork",
  },
  {
    label: "Accessibility tests",
    paubha: true,
    kits: false,
  },
  {
    label: "Light and dark tokens",
    paubha: true,
    kits: false,
  },
] as const;

const FAQS = [
  {
    question: "Is Paubha really free?",
    answer:
      "Yes. The whole catalog ships under the MIT license. Copy what you need with npx paubha@latest add, and nothing is gated behind an account.",
  },
  {
    question: "Can we use it in a commercial product?",
    answer:
      "Yes. MIT lets you use, modify and ship Paubha components in commercial products without royalties. Keep the license notice in the repo.",
  },
  {
    question: "How is this different from an npm UI library?",
    answer:
      "The CLI copies source files into your project. You review them in pull requests, change them freely, and upgrade by choice rather than by version bump.",
  },
  {
    question: "Where do I get help?",
    answer:
      "Start with the docs, then open a GitHub issue or ask in Discussions. If your team wants a hand adopting it, write to us and we can set up a workshop.",
  },
  {
    question: "Will a paid tier appear later?",
    answer:
      "No plans for one. The registry stays free and MIT. If that ever changed, what you have already copied would still be yours.",
  },
] as const;

export function PricingMarketingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div className="pb-enter">
          <h1 className="text-balance text-display-md font-semibold tracking-[-0.03em] text-fg-primary lg:text-display-lg">
            Free and MIT, with nothing held back.
          </h1>
          <p className="mt-4 max-w-md text-body-lg text-fg-secondary">
            Paubha is free and MIT licensed. Copy the code, own it, and ship it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Get started
            </Link>
            <Link
              href="https://github.com/dipendrashrest/paubha"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              View on GitHub
            </Link>
          </div>
        </div>
        <Photo
          name="team-laptops"
          priority
          className="aspect-[4/3] rounded-lg"
          sizes="(min-width: 1024px) 560px, 100vw"
        />
      </section>

      <section className="border-y border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="max-w-xl text-display-xs font-semibold text-fg-primary">
            Two ways to use it
          </h2>
          <p className="mt-2 max-w-xl text-body-md text-fg-secondary">
            Both cost the same. Pick the one that matches how your team works.
          </p>
          <PricingCardGrid className="mt-8 lg:grid-cols-2">
            <PricingCard
              name="Self-serve"
              description="Read the docs, run the CLI, ship."
              price="$0"
              period="forever"
              featured
              badge={
                <Badge variant="brand" fill="subtle" size="sm">
                  Most teams
                </Badge>
              }
              features={[
                "33 base components and 27 patterns",
                "Light and dark tokens included",
                "Accessibility tests with every component",
                "MIT license, commercial use allowed",
              ]}
              action={
                <Link
                  href="/docs"
                  className={buttonVariants({ variant: "primary", size: "md" })}
                >
                  Get started
                </Link>
              }
            />
            <PricingCard
              name="With a little help"
              description="Same code, plus people to ask."
              price="$0"
              period="forever"
              features={[
                "Everything in Self-serve",
                "GitHub issues and Discussions",
                "Migration notes for existing Tailwind apps",
                "Workshops for teams, by request",
              ]}
              action={
                <Link
                  href="/examples/marketing/contact"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "md",
                  })}
                >
                  Contact us
                </Link>
              }
            />
          </PricingCardGrid>
        </div>
      </section>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-balance text-display-xs font-semibold text-fg-primary">
                Compared with a rented UI kit
              </h2>
              <p className="mt-2 max-w-sm text-body-md text-fg-secondary">
                A kit you rent keeps the source on its side. Paubha hands it to
                you on day one.
              </p>
            </div>
            <div className="overflow-x-auto rounded-md border border-border-default">
              <table className="w-full min-w-[480px] text-left text-body-sm">
                <caption className="sr-only">
                  Paubha compared with a rented UI kit
                </caption>
                <thead className="bg-bg-secondary text-ui-sm text-fg-tertiary">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium" />
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-fg-brand"
                    >
                      Paubha
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Rented kit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr
                      key={row.label}
                      className="border-t border-border-default"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-fg-primary"
                      >
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-fg-primary">
                        <Cell value={row.paubha} yes />
                      </td>
                      <td className="px-4 py-3 text-fg-secondary">
                        <Cell value={row.kits} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Reveal>

      <section className="relative">
        <Photo
          name="desk-topdown"
          className="h-[360px] md:h-[440px]"
          sizes="100vw"
          alt="Overhead view of a shared desk covered in laptops, notebooks and phones"
        />
        <div className="mx-auto max-w-6xl px-6">
          <div className="-mt-20 max-w-md rounded-lg border border-border-default bg-bg-primary p-6 md:-mt-28">
            <h2 className="text-display-xs font-semibold text-fg-primary">
              Built by people who ship product
            </h2>
            <p className="mt-2 text-body-md text-fg-secondary">
              Every component came out of real app work, then got tests, docs
              and a Figma spec.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 border-t border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="mb-6 text-display-xs font-semibold text-fg-primary">
            Questions people ask
          </h2>
          <Faq items={[...FAQS]} />
        </div>
      </section>
    </MarketingShell>
  );
}

function Cell({ value, yes }: { value: string | boolean; yes?: boolean }) {
  if (typeof value === "string") return <>{value}</>;
  return value ? (
    <span className="inline-flex items-center gap-1.5">
      <Check className="size-4 text-fg-success" aria-hidden="true" />
      Included
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5">
      <Minus className="size-4 text-fg-tertiary" aria-hidden="true" />
      {yes ? "Included" : "Varies"}
    </span>
  );
}
