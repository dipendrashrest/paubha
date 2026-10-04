"use client";

import { Newsletter } from "@paubha/registry/ui/newsletter";
import { ComponentPlayground } from "../_shared/component-playground";

export function NewsletterHero() {
  return (
    <ComponentPlayground
      code={`<Newsletter
  title="Paubha updates"
  description="New components and patterns, one email a month."
/>`}
    >
      <div className="w-full max-w-md">
        <Newsletter
          title="Paubha updates"
          description="New components and patterns, one email a month."
        />
      </div>
    </ComponentPlayground>
  );
}
