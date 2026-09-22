import { type VariantProps, cva } from "class-variance-authority";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

export interface PaginationProps extends React.ComponentPropsWithRef<"nav"> {}

/** nav with aria-label="Pagination" — wrap PaginationContent + PaginationItem children */
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

const itemSizeContext = {
  sm: "size-7 text-ui-xs",
  md: "size-9 text-ui-md",
  lg: "size-11 text-ui-lg",
} as const;

export type PaginationSize = keyof typeof itemSizeContext;

/**
 * Audit fix (confirmed via `get_design_context` on Figma nodes `6089:35746`/`35797`/`35848`
 * — the sm/md/lg default symbols on base Pagination `6089:35899`): the row gap scales per
 * size — `space/xs` (4px) at sm, `space/sm` (6px) at md, `space/md` (8px) at lg — it is not
 * a single fixed value. Was previously hardcoded to `gap-1.5` (6px) at every size, which
 * only happened to be correct for `md`.
 */
const contentGapContext = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
} as const;

/**
 * Audit fix (same Figma nodes as `contentGapContext` above): icon size scales per size too —
 * 12px sm, 14px md, 16px lg — for both the prev/next chevrons and the ellipsis glyph. Was
 * previously hardcoded to `size-3.5` (14px) regardless of `size`, so sm/lg icons rendered at
 * the wrong scale relative to their chrome.
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
  /** Marks this page as the current page — sets aria-current="page". */
  isActive?: boolean;
}

/** Individual page number — role=button (native <button>), aria-current="page" when active */
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
      className={cn(
        pageLinkVariants({ size, active: isActive }),
        className,
      )}
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
      <ChevronLeft className={iconSizeContext[size ?? "md"]} aria-hidden="true" />
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
      <ChevronRight className={iconSizeContext[size ?? "md"]} aria-hidden="true" />
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
 * PaginationV2 — "restrained" variant (additive only; does not alter `Pagination`/
 * `PaginationContent`/`PaginationItem`/`PaginationLink`/`PaginationPrevious`/
 * `PaginationNext`/`PaginationEllipsis` above).
 *
 * 🆕 v2 built from a REAL, confirmed "Pagination / v2 — restrained" Figma frame
 * (`6318:9133`, sibling to base Pagination `6089:35899` on canvas `6033:30`, file
 * `CDgfoMkj7lP3pXWJ3aOgkH`) — this is the one frame tonight's earlier discovery correctly
 * flagged as genuinely real (and used elsewhere as a stand-in reference for Select's and
 * Accordion's v2, which had no frame of their own).
 *
 * Verified firsthand via `get_design_context` on both nodes, size by size (sm 28px / md
 * 36px / lg 44px), rather than trusting the secondhand screenshot-diff handoff: v2's
 * `_prev`/`_page-N`/`_next` chrome is **token-for-token identical** to v1 — same
 * `bg/primary` + `border/default` (inactive) / `bg/brand-solid` + `fg/on-brand` (active),
 * same `radius/md` squircle, and the same per-size gap scale (`space/xs` 4px sm,
 * `space/sm` 6px md, `space/md` 8px lg). Two claims from the handoff don't survive direct
 * inspection: there is no squircle-vs-pill axis (v1 was never a pill in Figma — both use
 * `radius/md`) and there is no "tighter" v2-only gap scale (v1's real spec already has the
 * same per-size scale; both were audited and fixed together above on `PaginationContent`/
 * `iconSizeContext`).
 *
 * The one real, structural difference: v2's published symbol set adds an explicit `hover`
 * state (sm/md/lg × default/focus/disabled/hover = 12 symbols, vs. v1's 9 — confirmed via
 * `get_metadata` + `get_design_context`). But extracting the `hover` symbols directly shows
 * **pixel-identical** fill/border/text bindings to `default` for every size — Figma
 * publishes the state slot but never gave it a distinct color. Rather than invent an
 * unconfirmed hover color for v2 (or silently drop hover feedback for v2 only), this build
 * carries forward the same `hover:bg-secondary-hover` affordance v1's own code already
 * applies to its inactive items/nav buttons — keeping interactive feedback consistent
 * across the whole component family.
 *
 * Net effect: every sub-part below is a real, additive export with its own stable name (and
 * `pagination-v2` gets its own registry entry), but the rendered output is intentionally the
 * same as a correctly-implemented v1 — that IS the confirmed real spec here, not an
 * interpretation. Forking the CVA definitions solely to duplicate identical class strings
 * under a new name would just be dead weight, so these are direct re-exports. See
 * SYNC_LOG.md for the full discrepancy note against the secondhand handoff.
 */
export const PaginationV2 = Pagination;

export const PaginationContentV2 = PaginationContent;

export const PaginationItemV2 = PaginationItem;

export const PaginationLinkV2 = PaginationLink;

export const PaginationPreviousV2 = PaginationPrevious;

export const PaginationNextV2 = PaginationNext;

export const PaginationEllipsisV2 = PaginationEllipsis;
