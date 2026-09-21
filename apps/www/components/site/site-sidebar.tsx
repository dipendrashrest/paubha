"use client";

import { cn } from "@paubha/registry/lib/cn";
import Link from "fumadocs-core/link";
import type { SidebarComponents } from "fumadocs-ui/components/layout/sidebar";
import {
  ChevronDown,
  CircleCheck,
  FileText,
  RefreshCcw,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

const ITEM_ICONS: Record<string, LucideIcon> = {
  "/docs": CircleCheck,
  "/docs/installation": Terminal,
  "/docs/theming": RefreshCcw,
  "/docs/cli": Terminal,
  "/docs/coming-soon": Sparkles,
  "/docs/figma": FileText,
  "/docs/icons": Sparkles,
};

function SectionRule({ className }: { className?: string }) {
  return (
    <div data-section-rule="" className={cn("w-full py-2 pb-1.5", className)}>
      <div className="h-px w-full bg-border-default" />
    </div>
  );
}

function SectionLabel({
  children,
  chevron,
}: {
  children: React.ReactNode;
  chevron?: React.ReactNode;
}) {
  return (
    <div className="flex h-7 w-full items-center justify-between px-2">
      <span className="text-ui-xs font-medium text-fg-primary">{children}</span>
      {chevron}
    </div>
  );
}

const SiteSidebarItem: SidebarComponents["Item"] = ({ item }) => {
  const pathname = usePathname();
  const href = item.url ?? "";
  const active = pathname === href || pathname === `${href}/`;
  const Icon = ITEM_ICONS[href.replace(/\/$/, "") || "/docs"];

  return (
    <Link
      href={item.url}
      external={item.external}
      className={cn(
        "flex h-[34px] items-center gap-2 rounded-sm px-2 text-ui-sm transition-colors",
        "focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
        active
          ? "bg-bg-brand-subtle font-semibold text-fg-brand"
          : "font-medium text-fg-primary hover:bg-bg-tertiary-hover",
      )}
    >
      {Icon ? <Icon className="size-4 shrink-0" aria-hidden="true" /> : null}
      {item.name}
    </Link>
  );
};

const SiteSidebarSeparator: SidebarComponents["Separator"] = ({ item }) => (
  <div className="flex w-full flex-col first:[&>[data-section-rule]]:hidden">
    <SectionRule />
    <SectionLabel>{item.name}</SectionLabel>
  </div>
);

const SiteSidebarFolder: SidebarComponents["Folder"] = ({
  item,
  level,
  children,
}) => {
  const [open, setOpen] = React.useState(item.defaultOpen ?? true);

  return (
    <div className={level > 1 ? "ms-3" : undefined}>
      <SectionRule />
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center rounded-sm",
          "focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
        )}
      >
        <SectionLabel
          chevron={
            <ChevronDown
              className={cn(
                "size-3 shrink-0 text-fg-tertiary transition-transform",
                !open && "-rotate-90",
              )}
              aria-hidden="true"
            />
          }
        >
          {item.name}
        </SectionLabel>
      </button>
      {open ? <div className="flex flex-col gap-1">{children}</div> : null}
    </div>
  );
};

export const siteSidebarComponents: Partial<SidebarComponents> = {
  Item: SiteSidebarItem,
  Separator: SiteSidebarSeparator,
  Folder: SiteSidebarFolder,
};
