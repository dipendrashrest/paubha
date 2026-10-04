"use client";

import { Badge } from "@paubha/registry/ui/badge";
import { buttonVariants } from "@paubha/registry/ui/button";
import { MarketingHero } from "@paubha/registry/ui/marketing-hero";
import { ComponentPlayground } from "../_shared/component-playground";

export function MarketingHeroDemo() {
  return (
    <ComponentPlayground
      code={`<MarketingHero
  eyebrow={<Badge variant="brand" fill="subtle">Open-source</Badge>}
  title="Paubha"
  description="The foundation for your design system."
  actions={<a className={buttonVariants()}>Get started</a>}
/>`}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-md border border-border-default">
        <MarketingHero
          className="border-b-0 pt-12 pb-12"
          eyebrow={
            <Badge variant="brand" fill="subtle" size="md">
              Open-source
            </Badge>
          }
          title="Paubha"
          description="The foundation for your design system."
          actions={
            <a href="/docs" className={buttonVariants({ size: "md" })}>
              Get started
            </a>
          }
          footnote="MIT · Free forever"
        />
      </div>
    </ComponentPlayground>
  );
}
