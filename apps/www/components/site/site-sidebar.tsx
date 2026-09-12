"use client";

import { cn } from "@paubha/registry/lib/cn";
import Link from "fumadocs-core/link";
import type { SidebarComponents } from "fumadocs-ui/components/layout/sidebar";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

const SiteSidebarItem: SidebarComponents["Item"] = ({ item }) => {
  const pathname = usePathname();
  const active = pathname === item.url;

  return (
    <Link
      href={item.url}
      external={item.external}
      className={cn(
        "flex h-9 items-center rounded-md border-l-2 border-transparent px-3 text-ui-sm transition-colors",
        active
          ? "border-border-brand bg-bg-tertiary text-fg-primary"
          : "text-fg-tertiary hover:bg-bg-tertiary-hover hover:text-fg-primary",
      )}
    >
      {item.name}
    </Link>
  );
};

const SiteSidebarSeparator: SidebarComponents["Separator"] = ({ item }) => (
  <p className="mt-6 mb-1.5 px-3 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary uppercase first:mt-0">
    {item.name}
  </p>
);

const SiteSidebarFolder: SidebarComponents["Folder"] = ({
  item,
  level,
  children,
}) => {
  const [open, setOpen] = React.useState(item.defaultOpen ?? true);

  return (
    <div className={level > 1 ? "ms-3" : undefined}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-6 mb-1.5 flex w-full items-center gap-1.5 px-3 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary uppercase first:mt-0"
      >
        {item.name}
        <ChevronDown
          className={cn(
            "size-3 shrink-0 transition-transform",
            !open && "-rotate-90",
          )}
          aria-hidden="true"
        />
      </button>
      {open ? <div className="flex flex-col gap-0.5">{children}</div> : null}
    </div>
  );
};

export const siteSidebarComponents: Partial<SidebarComponents> = {
  Item: SiteSidebarItem,
  Separator: SiteSidebarSeparator,
  Folder: SiteSidebarFolder,
};
