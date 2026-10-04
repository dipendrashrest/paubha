"use client";

import { Badge } from "@paubha/registry/ui/badge";
import { Button } from "@paubha/registry/ui/button";
import { PricingCard, PricingCardGrid } from "@paubha/registry/ui/pricing-card";
import { ComponentPlayground } from "../_shared/component-playground";

export function PricingCardHero() {
  return (
    <ComponentPlayground
      code={`<PricingCardGrid>
  <PricingCard
    name="Free"
    description="Full open-source registry."
    price="$0"
    features={["All components", "MIT license"]}
    action={<Button variant="secondary">Get started</Button>}
  />
  <PricingCard
    name="Team"
    description="Priority support."
    price="$49"
    featured
    badge={<Badge variant="brand" fill="subtle" size="sm">Popular</Badge>}
    features={["Everything in Free", "Slack channel"]}
    action={<Button>Start trial</Button>}
  />
</PricingCardGrid>`}
    >
      <PricingCardGrid className="max-w-3xl">
        <PricingCard
          name="Free"
          description="Full open-source registry."
          price="$0"
          features={["All components", "MIT license"]}
          action={<Button variant="secondary">Get started</Button>}
        />
        <PricingCard
          name="Team"
          description="Priority support."
          price="$49"
          featured
          badge={
            <Badge variant="brand" fill="subtle" size="sm">
              Popular
            </Badge>
          }
          features={["Everything in Free", "Slack channel"]}
          action={<Button>Start trial</Button>}
        />
      </PricingCardGrid>
    </ComponentPlayground>
  );
}

export function PricingCardFeatured() {
  return (
    <ComponentPlayground
      code={`<PricingCard
  name="Enterprise"
  description="Dedicated design-system help."
  price="$199"
  featured
  features={["SLA", "Named partner", "Custom work"]}
  action={<Button>Talk to us</Button>}
/>`}
    >
      <div className="w-full max-w-sm">
        <PricingCard
          name="Enterprise"
          description="Dedicated design-system help."
          price="$199"
          featured
          features={["SLA", "Named partner", "Custom work"]}
          action={<Button>Talk to us</Button>}
        />
      </div>
    </ComponentPlayground>
  );
}
