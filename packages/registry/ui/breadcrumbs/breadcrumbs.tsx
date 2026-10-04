"use client";

import { cn } from "@paubha/registry/lib/cn";
import { cva } from "class-variance-authority";
import { ChevronDown, ChevronRight, Ellipsis } from "lucide-react";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu";

/**
 * Figma: Paubha-UI (`7JhwsjEdCg2grQsRnK24NF`) "Breadcrumbs" (`2121:15396`) + "_Breadcrumb Item"
 * (`2121:15395`, State=default/current): `ui-sm` medium (13/18), 4px gap, 16px chevron,
 * fg/secondary for links, fg/primary for current. Figma has no ellipsis, dropdown, slash or
 * icon frames yet; those reuse the same item styling (owner-specified API).
 */
const crumbVariants = cva(
  "inline-flex items-center gap-1 rounded-xs text-ui-sm font-medium transition-colors [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      current: {
        true: "text-fg-primary",
        false: "text-fg-secondary",
      },
      interactive: {
        true: "hover:text-fg-primary focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
        false: "",
      },
    },
    defaultVariants: { current: false, interactive: true },
  },
);

export interface BreadcrumbsProps extends React.ComponentPropsWithRef<"nav"> {
  /** Separator between crumbs. */
  separator?: "chevron" | "slash";
}

/**
 * nav with aria-label="Breadcrumb" · ol/li structure · current page has aria-current="page"
 * · separators are aria-hidden · links, ellipsis and dropdown trigger are Tab-focusable with
 * glow-focus · dropdown follows the menu-button pattern (Enter/Space/ArrowDown opens)
 */
export function Breadcrumbs({
  ref,
  className,
  separator = "chevron",
  children,
  ...props
}: BreadcrumbsProps) {
  const items = React.Children.toArray(children);

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={className} {...props}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <React.Fragment key={React.isValidElement(item) ? item.key : index}>
            {item}
            {index < items.length - 1 ? (
              <li
                role="presentation"
                aria-hidden="true"
                className="flex shrink-0 items-center text-ui-sm text-fg-tertiary"
              >
                {separator === "slash" ? (
                  <span className="w-4 text-center">/</span>
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </li>
            ) : null}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

Breadcrumbs.displayName = "Breadcrumbs";

export interface BreadcrumbItemProps extends React.ComponentPropsWithRef<"a"> {
  /** Marks this as the current page. Renders as non-interactive text with aria-current="page". */
  current?: boolean;
  /** Leading icon slot (Lucide icon), rendered before the label. */
  icon?: React.ReactNode;
}

export function BreadcrumbItem({
  ref,
  className,
  current = false,
  icon,
  children,
  ...props
}: BreadcrumbItemProps) {
  if (current) {
    return (
      <li aria-current="page">
        <span
          className={cn(
            crumbVariants({ current: true, interactive: false }),
            className,
          )}
        >
          {icon}
          {children}
        </span>
      </li>
    );
  }

  return (
    <li>
      <a ref={ref} className={cn(crumbVariants(), className)} {...props}>
        {icon}
        {children}
      </a>
    </li>
  );
}

BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbEllipsisProps
  extends React.ComponentPropsWithRef<"button"> {}

/** Collapsed-crumbs button · role=button · aria-label "Show more breadcrumbs" · Enter/Space activates */
export function BreadcrumbEllipsis({
  ref,
  className,
  "aria-label": ariaLabel = "Show more breadcrumbs",
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <li>
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn(crumbVariants(), className)}
        {...props}
      >
        <Ellipsis aria-hidden="true" />
      </button>
    </li>
  );
}

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export interface BreadcrumbDropdownProps
  extends React.ComponentPropsWithRef<"button"> {
  /** Menu content (DropdownMenuItem elements) for switching to a sibling page. */
  menu?: React.ReactNode;
  /** Leading icon slot (Lucide icon). */
  icon?: React.ReactNode;
}

/** Current-page crumb that opens a menu · li aria-current="page" · button aria-haspopup="menu" */
export function BreadcrumbDropdown({
  ref,
  className,
  menu,
  icon,
  children,
  ...props
}: BreadcrumbDropdownProps) {
  return (
    <li aria-current="page">
      <DropdownMenu>
        <DropdownMenuTrigger
          ref={ref}
          className={cn(crumbVariants({ current: true }), className)}
          {...props}
        >
          {icon}
          {children}
          <ChevronDown aria-hidden="true" className="text-fg-tertiary" />
        </DropdownMenuTrigger>
        {menu ? (
          <DropdownMenuContent align="start">{menu}</DropdownMenuContent>
        ) : null}
      </DropdownMenu>
    </li>
  );
}

BreadcrumbDropdown.displayName = "BreadcrumbDropdown";
