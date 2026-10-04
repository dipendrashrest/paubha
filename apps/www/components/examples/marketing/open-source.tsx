"use client";

import { BrandField } from "@/components/motion/brand-field";
import { Reveal } from "@/components/motion/reveal";
import { Avatar, AvatarGroup } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { buttonVariants } from "@paubha/registry/ui/button";
import { CliSnippet } from "@paubha/registry/ui/cli-snippet";
import { Faq } from "@paubha/registry/ui/faq";
import { MarketingHero } from "@paubha/registry/ui/marketing-hero";
import Link from "next/link";
import { MarketingShell } from "./shell";

export function OpenSourceMarketingPage() {
  return (
    <MarketingShell>
      <div className="relative">
        <BrandField />
        <MarketingHero
          className="border-b-0 bg-transparent"
          eyebrow={
            <Badge variant="success" fill="subtle" size="md">
              MIT
            </Badge>
          }
          title="Own the source. Skip the vendor."
          description="npx copies the file. You theme it. You fork it. Nobody can deprecate your button."
          actions={
            <>
              <Link
                href="https://github.com/dipendrashrest/paubha"
                className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press`}
              >
                GitHub
              </Link>
              <Link
                href="/docs"
                className={`${buttonVariants({ variant: "secondary", size: "lg" })} pb-press`}
              >
                Docs
              </Link>
            </>
          }
          media={
            <div className="pb-enter-late">
              <CliSnippet
                label="Add anything"
                command="npx paubha@latest add button"
                description="Tokens, glow-focus, and a vitest-axe file come with it."
              />
            </div>
          }
        />
      </div>

      <Reveal className="border-y border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
            Why we stayed a registry
          </h2>
          <div className="mt-10 flex flex-col gap-8">
            <div>
              <p className="text-ui-lg font-semibold text-fg-primary">
                The file is yours
              </p>
              <p className="mt-2 text-body-md text-fg-secondary">
                add writes into components/ui. There is no node_modules black
                box between you and the focus ring.
              </p>
            </div>
            <div>
              <p className="text-ui-lg font-semibold text-fg-primary">
                MIT on the whole catalog
              </p>
              <p className="mt-2 text-body-md text-fg-secondary">
                Base components and application patterns. No pro folder behind a
                paywall.
              </p>
            </div>
            <div>
              <p className="text-ui-lg font-semibold text-fg-primary">
                Fork without permission
              </p>
              <p className="mt-2 text-body-md text-fg-secondary">
                Change a token, ship a variant, delete what you do not need.
                That is the point.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-display-xs font-semibold text-fg-primary">
              Built in public
            </h2>
            <p className="mt-2 max-w-md text-body-md text-fg-secondary">
              Issues, PRs, and weekly pattern drops. The people shipping this
              week:
            </p>
          </div>
          <AvatarGroup max={6}>
            {["AR", "JK", "MN", "SL", "TP", "OW"].map((initials) => (
              <Avatar key={initials} initials={initials} alt={initials} />
            ))}
          </AvatarGroup>
        </div>
      </Reveal>

      <section className="border-t border-border-default bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Faq
            title="License questions"
            items={[
              {
                question: "Can we ship Paubha in a commercial product?",
                answer:
                  "Yes. MIT. Modify, redistribute, sell the product you build with it. No royalty.",
              },
              {
                question: "Do we have to keep the Paubha name?",
                answer:
                  "No. Once the file is in your repo it is your component. Credit is appreciated, not required.",
              },
              {
                question: "Is the Figma file part of MIT?",
                answer:
                  "The code registry is MIT. Figma access notes live on the Team plan. The code never gates on that.",
              },
            ]}
          />
        </div>
      </section>
    </MarketingShell>
  );
}
