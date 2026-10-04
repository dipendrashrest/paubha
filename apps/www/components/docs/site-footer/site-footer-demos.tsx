"use client";

import { Logo } from "@paubha/registry/ui/logo";
import {
  SiteFooter,
  SiteFooterColumn,
  SiteFooterLink,
} from "@paubha/registry/ui/site-footer";
import { ComponentPlayground } from "../_shared/component-playground";

export function SiteFooterHero() {
  return (
    <ComponentPlayground
      code={`<SiteFooter
  brand={<Logo variant="combined" size={32} />}
  description="Open-source components for React & Tailwind."
  bottom="© 2026 Paubha"
>
  <SiteFooterColumn title="Product">
    <SiteFooterLink href="/docs">Docs</SiteFooterLink>
  </SiteFooterColumn>
</SiteFooter>`}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-md border border-border-default">
        <SiteFooter
          brand={<Logo variant="combined" size={32} />}
          description="Open-source components for React & Tailwind."
          bottom="© 2026 Paubha"
        >
          <SiteFooterColumn title="Product">
            <SiteFooterLink href="/docs">Docs</SiteFooterLink>
            <SiteFooterLink href="/docs/components/button">
              Components
            </SiteFooterLink>
          </SiteFooterColumn>
          <SiteFooterColumn title="Company">
            <SiteFooterLink href="/examples/marketing/about">
              About
            </SiteFooterLink>
            <SiteFooterLink href="/examples/marketing/contact">
              Contact
            </SiteFooterLink>
          </SiteFooterColumn>
        </SiteFooter>
      </div>
    </ComponentPlayground>
  );
}
