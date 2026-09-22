"use client";

import { cn } from "@paubha/registry/lib/cn";
import { Badge } from "@paubha/registry/ui/badge";
import { Logo } from "@paubha/registry/ui/logo";
import { ToggleGroup, ToggleGroupItem } from "@paubha/registry/ui/toggle-group";
import Link from "fumadocs-core/link";
import { SidebarTrigger } from "fumadocs-ui/layouts/docs";
import { Download, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
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

// Only the deepest-matching section is active, otherwise "Docs" (whose
// section is a prefix of every other one) would light up alongside
// whichever specific section the pathname is actually in.
function activeNavLink(pathname: string) {
  return NAV_LINKS.filter(
    (link) =>
      pathname === link.section || pathname.startsWith(`${link.section}/`),
  ).sort((a, b) => b.section.length - a.section.length)[0];
}

/** Lucide v1 dropped brand marks; this is the GitHub glyph for the repo link only. */
function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10Z" />
    </svg>
  );
}

function SiteThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const value = !mounted || resolvedTheme !== "light" ? "dark" : "light";

  return (
    <ToggleGroup
      value={value}
      onValueChange={(next) => {
        if (next) setTheme(next);
      }}
      aria-label="Color theme"
      size="sm"
      className="h-8 gap-0.5 rounded-sm border border-border-default bg-bg-primary p-1 lg:h-9"
    >
      <ToggleGroupItem
        value="light"
        aria-label="Light theme"
        className="h-full rounded-xs px-3 data-[state=checked]:bg-bg-tertiary data-[state=checked]:shadow-xs"
      >
        <Sun className="size-4" aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="dark"
        aria-label="Dark theme"
        className="h-full rounded-xs px-3 data-[state=checked]:bg-bg-tertiary data-[state=checked]:shadow-xs"
      >
        <Moon className="size-4" aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function SiteNavbar({
  showSidebarTrigger = false,
  version,
}: { showSidebarTrigger?: boolean; version: string }) {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border-default bg-bg-primary px-6">
      <div className="flex items-center gap-8">
        {showSidebarTrigger ? (
          // SidebarTrigger hardcodes its own aria-label ("Open Sidebar").
          <SidebarTrigger className="-ms-2 rounded-sm p-2 text-fg-secondary hover:bg-bg-tertiary-hover md:hidden">
            <Menu className="size-5" aria-hidden="true" />
          </SidebarTrigger>
        ) : null}
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Paubha" className="flex items-center">
            <Logo variant="combined" />
          </Link>
          <Badge variant="gray" fill="subtle" size="sm">
            v{version}
          </Badge>
        </div>
        <nav className="hidden items-center gap-4 text-ui-md md:flex">
          {NAV_LINKS.map((link) => {
            const active = activeNavLink(pathname)?.url === link.url;
            return (
              <Link
                key={link.url}
                href={link.url}
                className={cn(
                  "font-medium transition-colors",
                  active
                    ? "text-fg-brand"
                    : "text-fg-secondary hover:text-fg-primary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <SiteSearchTrigger />
        <SiteThemeToggle />
        <a
          href="/skill.md"
          download
          aria-label="Download skill.md: AI agent instructions for Paubha"
          className={cn(
            "hidden h-8 items-center gap-2 rounded-sm border border-border-default bg-bg-primary px-3 sm:inline-flex lg:h-9",
            "text-ui-md text-fg-tertiary transition-colors",
            "hover:border-border-strong",
            "focus-visible:border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
          )}
        >
          <Download className="size-4 shrink-0" aria-hidden="true" />
          Skill.md
        </a>
        <a
          href="https://github.com/dipendrashrest/paubha"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className={cn(
            "hidden h-8 items-center gap-2 rounded-sm border border-border-default bg-bg-primary px-3 sm:inline-flex lg:h-9",
            "text-ui-md text-fg-tertiary transition-colors",
            "hover:border-border-strong",
            "focus-visible:border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
          )}
        >
          <GithubMark className="size-4 shrink-0" />
          GitHub
        </a>
      </div>
    </header>
  );
}
