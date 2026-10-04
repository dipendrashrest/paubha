import { cn } from "@paubha/registry/lib/cn";
import { buttonVariants } from "@paubha/registry/ui/button";
import { Logo } from "@paubha/registry/ui/logo";
import {
  SiteFooter,
  SiteFooterColumn,
  SiteFooterLink,
} from "@paubha/registry/ui/site-footer";
import Link from "next/link";
import type * as React from "react";

const NAV_LINKS = [
  { href: "/examples/marketing/pricing", label: "Pricing" },
  { href: "/examples/marketing/about", label: "About" },
  { href: "/examples/marketing/blog", label: "Blog" },
  { href: "/examples/marketing/changelog", label: "Changelog" },
] as const;

/** Paubha mark linking home. Uses registry Logo. */
export function PaubhaMark({
  className,
  variant = "combined",
}: {
  className?: string;
  variant?: "icon" | "wordmark" | "combined" | "combined-dark";
}) {
  return (
    <Link
      href="/examples/marketing/saas"
      className={cn(
        "inline-flex items-center rounded-sm",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
        className,
      )}
      aria-label="Paubha home"
    >
      <Logo variant={variant} />
    </Link>
  );
}

export function MarketingNav({
  className,
  cta = "Get started",
  ctaHref = "/docs",
}: {
  className?: string;
  cta?: string;
  ctaHref?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border-default bg-bg-primary/90 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <PaubhaMark />
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm px-3 py-1.5 text-ui-md text-fg-secondary transition-colors hover:text-fg-primary focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/examples/marketing/auth"
            className="hidden rounded-sm px-3 py-1.5 text-ui-md text-fg-secondary hover:text-fg-primary sm:inline-flex focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
          >
            Log in
          </Link>
          <Link
            href={ctaHref}
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            {cta}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function MarketingFooter({ className }: { className?: string }) {
  return (
    <SiteFooter
      className={className}
      brand={<PaubhaMark />}
      description="Open-source components for React & Tailwind: copy, customize, own."
      bottom={`© ${new Date().getFullYear()} Paubha, open-source components for React & Tailwind.`}
    >
      <SiteFooterColumn title="Product">
        <SiteFooterLink href="/examples/marketing/saas">
          Overview
        </SiteFooterLink>
        <SiteFooterLink href="/examples/marketing/launch">
          Launch
        </SiteFooterLink>
        <SiteFooterLink href="/examples/marketing/pricing">
          Pricing
        </SiteFooterLink>
        <SiteFooterLink href="/examples/marketing/changelog">
          Changelog
        </SiteFooterLink>
      </SiteFooterColumn>
      <SiteFooterColumn title="Company">
        <SiteFooterLink href="/examples/marketing/about">About</SiteFooterLink>
        <SiteFooterLink href="/examples/marketing/studio">
          Studio
        </SiteFooterLink>
        <SiteFooterLink href="/examples/marketing/careers">
          Careers
        </SiteFooterLink>
        <SiteFooterLink href="/examples/marketing/contact">
          Contact
        </SiteFooterLink>
      </SiteFooterColumn>
      <SiteFooterColumn title="Get started">
        <SiteFooterLink href="/docs">Docs</SiteFooterLink>
        <SiteFooterLink href="/examples/marketing/auth">Sign in</SiteFooterLink>
        <SiteFooterLink href="/examples/marketing">All examples</SiteFooterLink>
      </SiteFooterColumn>
    </SiteFooter>
  );
}

export function MarketingShell({
  children,
  className,
  hideNav = false,
  hideFooter = false,
  announcement,
}: {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  hideFooter?: boolean;
  announcement?: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-h-screen flex-col bg-bg-primary", className)}>
      {announcement}
      {!hideNav ? <MarketingNav /> : null}
      <main className="flex-1">{children}</main>
      {!hideFooter ? <MarketingFooter /> : null}
    </div>
  );
}

export const MARKETING_EXAMPLES = [
  {
    slug: "saas",
    title: "SaaS landing",
    description: "Product hero, features, metrics, and CTA.",
  },
  {
    slug: "pricing",
    title: "Pricing",
    description: "Three tiers, billing toggle, and FAQ.",
  },
  {
    slug: "waitlist",
    title: "Waitlist",
    description: "Coming-soon capture with a single CTA.",
  },
  {
    slug: "about",
    title: "About",
    description: "Company story and team grid.",
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "Product updates as a timeline.",
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Form plus office details.",
  },
  {
    slug: "blog",
    title: "Blog index",
    description: "Post grid with tags and pagination.",
  },
  {
    slug: "auth",
    title: "Auth shell",
    description: "Login and signup in one card.",
  },
  {
    slug: "launch",
    title: "Launch",
    description: "Ship-night landing. The hero is a live product canvas.",
  },
  {
    slug: "studio",
    title: "Studio",
    description:
      "Editorial design-system page. Point of view, not a feature grid.",
  },
  {
    slug: "open-source",
    title: "Open source",
    description: "MIT manifesto with CLI as the product.",
  },
  {
    slug: "careers",
    title: "Careers",
    description: "Hiring page with settings-as-culture and confirm-to-apply.",
  },
  {
    slug: "customers",
    title: "Customers",
    description: "Social proof first: quote, logos, metrics, write-ups.",
  },
] as const;

export type MarketingSlug = (typeof MARKETING_EXAMPLES)[number]["slug"];
