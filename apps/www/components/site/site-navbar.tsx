"use client";

import { cn } from "@paubha/registry/lib/cn";
import { Badge } from "@paubha/registry/ui/badge";
import { buttonVariants } from "@paubha/registry/ui/button";
import { Logo } from "@paubha/registry/ui/logo";
import Link from "fumadocs-core/link";
import { ThemeToggle } from "fumadocs-ui/components/layout/theme-toggle";
import { SidebarTrigger } from "fumadocs-ui/layouts/docs";
import { ArrowRight, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { SiteSearchTrigger } from "./site-search-trigger";

const NAV_LINKS = [
  { label: "Docs", url: "/docs", section: "/docs" },
  {
    label: "Foundations",
    url: "/docs/foundations/colors",
    section: "/docs/foundations",
  },
  {
    label: "Components",
    url: "/docs/components/avatar",
    section: "/docs/components",
  },
];

// Only the deepest-matching section is active — otherwise "Docs" (whose
// section is a prefix of every other one) would light up alongside
// whichever specific section the pathname is actually in.
function activeNavLink(pathname: string) {
  return NAV_LINKS.filter(
    (link) =>
      pathname === link.section || pathname.startsWith(`${link.section}/`),
  ).sort((a, b) => b.section.length - a.section.length)[0];
}

export function SiteNavbar({
  showSidebarTrigger = false,
}: { showSidebarTrigger?: boolean }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-border-default bg-bg-elevated px-8">
      <div className="flex items-center gap-8">
        {showSidebarTrigger ? (
          // SidebarTrigger hardcodes its own aria-label ("Open Sidebar").
          <SidebarTrigger className="-ms-2 rounded-sm p-2 text-fg-secondary hover:bg-bg-tertiary-hover md:hidden">
            <Menu className="size-5" aria-hidden="true" />
          </SidebarTrigger>
        ) : null}
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo variant="combined" />
          </Link>
          <Badge
            variant="gray"
            fill="subtle"
            size="sm"
            className="font-mono uppercase"
          >
            Docs
          </Badge>
        </div>
        <nav className="hidden items-center gap-6 text-ui-sm md:flex">
          {NAV_LINKS.map((link) => {
            const active = activeNavLink(pathname)?.url === link.url;
            return (
              <Link
                key={link.url}
                href={link.url}
                className={cn(
                  "transition-colors",
                  active
                    ? "text-fg-primary"
                    : "text-fg-tertiary hover:text-fg-primary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <SiteSearchTrigger />
        <ThemeToggle mode="light-dark" className="text-fg-secondary" />
        <a
          href="https://github.com/dipendra0514/paubha"
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "hidden sm:inline-flex",
          )}
        >
          GitHub
        </a>
        <Link
          href="/docs"
          className={cn(
            buttonVariants({ variant: "primary", size: "sm" }),
            "hidden sm:inline-flex",
          )}
        >
          Get started
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
