"use client";

import { FeatureList, FeatureListItem } from "@paubha/registry/ui/feature-list";
import { Boxes, Code2, Sparkles } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

export function FeatureListHero() {
  return (
    <ComponentPlayground
      code={`<FeatureList>
  <FeatureListItem
    icon={<Boxes aria-hidden="true" />}
    title="Copy, don’t install"
    description="Own every line, no black-box npm package."
  />
  <FeatureListItem
    icon={<Sparkles aria-hidden="true" />}
    title="glow-focus, not a gray ring"
    description="Brand-tinted focus that feels like a real system."
  />
  <FeatureListItem
    icon={<Code2 aria-hidden="true" />}
    title="Accessible by default"
    description="WAI-ARIA patterns and vitest-axe coverage."
  />
</FeatureList>`}
    >
      <div className="w-full max-w-2xl">
        <FeatureList>
          <FeatureListItem
            icon={<Boxes aria-hidden="true" />}
            title="Copy, don’t install"
            description="Own every line, no black-box npm package."
          />
          <FeatureListItem
            icon={<Sparkles aria-hidden="true" />}
            title="glow-focus, not a gray ring"
            description="Brand-tinted focus that feels like a real system."
          />
          <FeatureListItem
            icon={<Code2 aria-hidden="true" />}
            title="Accessible by default"
            description="WAI-ARIA patterns and vitest-axe coverage."
          />
        </FeatureList>
      </div>
    </ComponentPlayground>
  );
}
