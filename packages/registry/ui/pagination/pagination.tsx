import { cn } from "@paubha/registry/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type * as React from "react";

export interface PaginationProps extends React.ComponentPropsWithRef<"nav"> {}

/**
 * Pagination — synced to Paubha-UI Figma (file `7JhwsjEdCg2grQsRnK24NF`, set `6318:9133`,
 * Size=sm|md|lg × State=default|focus|disabled|hover).
 *
 * Accessibility: nav landmark with aria-label="Pagination" · pages and prev/next are native
 * buttons (Enter/Space activates, Tab moves between them) · current page announced via
 * aria-current="page" · prev/next carry aria-labels ("Previous page"/"Next page") · focus ring
 * (`glow-focus`) visible on Tab · disabled prev/next are removed from interaction · ellipsis
 * glyph is aria-hidden with sr-only "More pages" text.
 */
export function Pagination({
  ref,
  className,
  "aria-label": ariaLabel = "Pagination",
  ...props
}: PaginationProps) {
  return (
    <nav ref={ref} aria-label={ariaLabel} className={className} {...props} />
  );
}

Pagination.displayName = "Pagination";

/**
 * Item chrome per Figma: `radius/md` (12px), 1px `border/default` on `bg/primary`
 * (inactive) or `bg/brand-solid` + `fg/on-brand` (active), Inter Medium `ui-xs`/`ui-md`/`ui-lg`.
 * Square 28/36/44px boxes follow Figma's per-size `min-width`; Figma's auto-layout padding
 * actually yields 28x30 / 36x38 / 44x42, which reads as a padding artifact, not intent.
 */
const itemSizeContext = {
  sm: "size-7 text-ui-xs",
  md: "size-9 text-ui-md",
  lg: "size-11 text-ui-lg",
} as const;

export type PaginationSize = keyof typeof itemSizeContext;

/**
 * Row gap scales per size (Figma `6318:8956`/`9020`/`9084`, the sm/md/lg default symbols):
 * `space/xs` 4px sm, `space/sm` 6px md, `space/md` 8px lg.
 */
const contentGapContext = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
} as const;

/**
 * Icon size scales per size (same Figma nodes): 12px sm, 14px md, 16px lg, for the
 * prev/next chevrons and the ellipsis glyph.
 */
const iconSizeContext = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
} as const;

export interface PaginationContentProps
  extends React.ComponentPropsWithRef<"ul"> {
  size?: PaginationSize;
}

export function PaginationContent({
  ref,
  className,
  size = "md",
  ...props
}: PaginationContentProps) {
  return (
    <ul
      ref={ref}
      data-pagination-size={size}
      className={cn("flex items-center", contentGapContext[size], className)}
      {...props}
    />
  );
}

PaginationContent.displayName = "PaginationContent";

export function PaginationItem({
  className,
  ...props
}: React.ComponentPropsWithRef<"li">) {
  return <li className={className} {...props} />;
}

const pageLinkVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-md border font-medium outline-none transition-colors",
    "focus-visible:shadow-[var(--shadow-glow-focus)]",
  ].join(" "),
  {
    variants: {
      size: itemSizeContext,
      active: {
        true: "border-transparent bg-bg-brand-solid text-fg-on-brand",
        false:
          "border-border-default bg-bg-primary text-fg-primary hover:bg-bg-secondary-hover",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  },
);

export interface PaginationLinkProps
  extends React.ComponentPropsWithRef<"button">,
    VariantProps<typeof pageLinkVariants> {
  /** Marks this page as the current page; sets aria-current="page". */
  isActive?: boolean;
}

/** Individual page number: role=button (native <button>), aria-current="page" when active */
export function PaginationLink({
  ref,
  className,
  size = "md",
  isActive = false,
  type = "button",
  ...props
}: PaginationLinkProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-current={isActive ? "page" : undefined}
      className={cn(pageLinkVariants({ size, active: isActive }), className)}
      {...props}
    />
  );
}

PaginationLink.displayName = "PaginationLink";

const navButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-md border border-border-default bg-bg-primary text-fg-primary outline-none transition-colors",
    "hover:bg-bg-secondary-hover",
    "focus-visible:shadow-[var(--shadow-glow-focus)]",
    "disabled:cursor-not-allowed disabled:text-fg-disabled disabled:hover:bg-bg-primary",
  ].join(" "),
  {
    variants: {
      size: itemSizeContext,
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface PaginationNavButtonProps
  extends React.ComponentPropsWithRef<"button">,
    VariantProps<typeof navButtonVariants> {}

export function PaginationPrevious({
  ref,
  className,
  size = "md",
  type = "button",
  "aria-label": ariaLabel = "Previous page",
  ...props
}: PaginationNavButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      className={cn(navButtonVariants({ size }), className)}
      {...props}
    >
      <ChevronLeft
        className={iconSizeContext[size ?? "md"]}
        aria-hidden="true"
      />
    </button>
  );
}

PaginationPrevious.displayName = "PaginationPrevious";

export function PaginationNext({
  ref,
  className,
  size = "md",
  type = "button",
  "aria-label": ariaLabel = "Next page",
  ...props
}: PaginationNavButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      className={cn(navButtonVariants({ size }), className)}
      {...props}
    >
      <ChevronRight
        className={iconSizeContext[size ?? "md"]}
        aria-hidden="true"
      />
    </button>
  );
}

PaginationNext.displayName = "PaginationNext";

export function PaginationEllipsis({
  className,
  size = "md",
  ...props
}: React.ComponentPropsWithRef<"span"> & { size?: PaginationSize }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center text-fg-tertiary",
        itemSizeContext[size],
        className,
      )}
      {...props}
    >
      <MoreHorizontal className={iconSizeContext[size]} aria-hidden="true" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

/**
 * PaginationV2 — direct re-exports of the parts above (kept so the `pagination-v2` registry
 * item and its `*V2` names stay stable). Paubha-UI publishes a single Pagination set
 * (`6318:9133`), so V2 renders identically to Pagination.
 *
 * Figma's `hover`, `focus` and `disabled` symbols are bound identically to `default` (no
 * distinct fills/borders/text), so the code keeps its own affordances for those states:
 * `hover:bg-bg-secondary-hover`, `glow-focus` on focus-visible, `fg-disabled` + not-allowed
 * cursor on disabled prev/next.
 */
export const PaginationV2 = Pagination;

export const PaginationContentV2 = PaginationContent;

export const PaginationItemV2 = PaginationItem;

export const PaginationLinkV2 = PaginationLink;

export const PaginationPreviousV2 = PaginationPrevious;

export const PaginationNextV2 = PaginationNext;

export const PaginationEllipsisV2 = PaginationEllipsis;
