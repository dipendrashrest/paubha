"use client";

import { Badge } from "@paubha/registry/ui/badge";
import { buttonVariants } from "@paubha/registry/ui/button";
import { Faq } from "@paubha/registry/ui/faq";
import { PricingCard, PricingCardGrid } from "@paubha/registry/ui/pricing-card";
import { ToggleGroup, ToggleGroupItem } from "@paubha/registry/ui/toggle-group";
import Link from "next/link";
import * as React from "react";
import { MarketingShell } from "./shell";

const PLANS = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    blurb: "The full open-source registry, forever.",
    features: [
      "All base components",
      "Application patterns",
      "MIT license",
      "Community Discord",
    ],
    cta: "Get started",
    href: "/docs",
    featured: false,
  },
  {
    name: "Team",
    monthly: 49,
    yearly: 39,
    blurb: "Design-system reviews and priority answers.",
    features: [
      "Everything in Free",
      "Priority email support",
      "Figma file access notes",
      "Private Slack channel",
      "Token / theming review",
    ],
    cta: "Start Team trial",
    href: "/examples/marketing/auth",
    featured: true,
  },
  {
    name: "Enterprise",
    monthly: 199,
    yearly: 159,
    blurb: "Dedicated help for large design systems.",
    features: [
      "Everything in Team",
      "Custom component work",
      "SLA + onboarding",
      "Security questionnaire",
      "Named design partner",
    ],
    cta: "Talk to us",
    href: "/examples/marketing/contact",
    featured: false,
  },
] as const;

const FAQS = [
  {
    question: "Is Paubha really free?",
    answer:
      "Yes. The entire component catalog ships under the MIT license. Copy what you need with npx paubha; no paid tier gates the registry.",
  },
  {
    question: "What’s the difference between Free and Team?",
    answer:
      "Free is the full open-source kit. Team adds priority support, design-system reviews, and a private channel when you want humans in the loop.",
  },
  {
    question: "Can we use Paubha commercially?",
    answer:
      "Yes. MIT lets you use, modify, and ship Paubha components in commercial products without royalties.",
  },
  {
    question: "How do I get help?",
    answer:
      "Email hello@paubha.tech or open a GitHub issue. Team and Enterprise get faster turnaround and optional Slack.",
  },
] as const;

export function PricingMarketingPage() {
  const [billing, setBilling] = React.useState("yearly");

  return (
    <MarketingShell>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 text-center">
        <Badge variant="gray" fill="subtle" size="md">
          Pricing
        </Badge>
        <h1 className="mt-4 text-display-sm font-semibold tracking-[-0.03em] text-fg-primary">
          Free open source. Support when you need it.
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-body-md text-fg-secondary">
          Every component is MIT. Optional Team and Enterprise plans exist for
          support, not for unlocking the kit.
        </p>
        <div className="mt-8 flex justify-center">
          <ToggleGroup
            value={billing}
            onValueChange={(v) => {
              if (v) setBilling(v);
            }}
            size="sm"
            aria-label="Billing period"
          >
            <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
            <ToggleGroupItem value="yearly">
              Yearly
              <span className="ml-1 text-fg-brand">−20%</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </section>

      <PricingCardGrid className="mx-auto max-w-6xl px-6 pb-16">
        {PLANS.map((plan) => {
          const price = billing === "yearly" ? plan.yearly : plan.monthly;
          return (
            <PricingCard
              key={plan.name}
              name={plan.name}
              description={plan.blurb}
              price={`$${price}`}
              featured={plan.featured}
              badge={
                plan.featured ? (
                  <Badge variant="brand" fill="subtle" size="sm">
                    Popular
                  </Badge>
                ) : undefined
              }
              features={[...plan.features]}
              action={
                <Link
                  href={plan.href}
                  className={buttonVariants({
                    variant: plan.featured ? "primary" : "secondary",
                    size: "md",
                  })}
                >
                  {plan.cta}
                </Link>
              }
            />
          );
        })}
      </PricingCardGrid>

      <section className="border-t border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Faq items={[...FAQS]} />
        </div>
      </section>
    </MarketingShell>
  );
}
