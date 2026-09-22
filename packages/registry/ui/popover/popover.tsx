import * as PopoverPrimitive from "@radix-ui/react-popover";
import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export interface PopoverContentProps
  extends React.ComponentPropsWithRef<typeof PopoverPrimitive.Content> {}

/**
 * role="dialog" · trigger gets aria-haspopup="dialog" + aria-expanded automatically ·
 * Escape closes · Tab traps focus within while open · focus moves to the first
 * focusable element on open and returns to the trigger on close
 *
 * Real Figma spec confirmed via `get_design_context`/`get_metadata` on node `6033:35565`
 * (file `CDgfoMkj7lP3pXWJ3aOgkH`, found via the "add Popover" build commit's own recorded
 * node id after the usual `2120:*`/`6033:*` range crawl came up empty): Properties text
 * publishes exactly `Side: Top | Bottom | Left | Right` · `State: Default | Focus`, no
 * size axis. `side` was already fully typed/pass-through-able pre-fix (this type extends
 * Radix's own `Content` props, which include `side`) — just undocumented; this comment
 * now spells it out. Screenshotted all 8 published `Side × State` symbols directly
 * (`6089:35900`–`6089:35921`): the `focus` variant renders **byte-identical** to
 * `default` for every side — no ring, no border/bg change — so no focus-visible style
 * was added to this panel itself (it would be an invented state Figma doesn't show; the
 * panel is programmatically focused on open per Radix, not a typical Tab-reachable
 * control). Token bindings confirmed exact matches: `bg/primary`, `border/default`,
 * `radius/lg`, `shadow/md`, title `14px semibold` → `text-ui-md font-semibold`,
 * description `13px regular` → `text-ui-sm`/`fg-secondary` — all already correct,
 * unchanged here.
 *
 * Real, confirmed gap that WAS fixed: `PopoverClose` (below) was a bare, unstyled Radix
 * re-export with no focus-visible ring at all — unlike every sibling overlay's own close/
 * action sub-component (`ModalClose`, `DialogCancel`, `DialogAction`), which all bake in
 * `focus-visible:shadow-[var(--shadow-glow-focus)]` by default. That's a real drift from
 * this repo's own established convention and from CLAUDE.md's non-negotiable focus-ring
 * rule, independent of what Figma's static demo (title/description only, no close
 * button) does or doesn't show. Fixed by wrapping it exactly like the sibling components.
 *
 * Default width corrected 2026-09-11: Figma's confirmed base symbol width is 124px
 * (consistent across all 8 `Side × State` v1 instances and all 16 v2 instances) —
 * was `w-65` (260px), a pre-audit developer default not backed by any Figma data.
 */
export function PopoverContent({
  ref,
  className,
  side = "bottom",
  sideOffset = 8,
  children,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-[124px] rounded-md border border-border-default bg-bg-primary p-4 shadow-md outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

PopoverContent.displayName = "PopoverContent";

export function PopoverTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  return (
    <p
      className={cn("text-ui-md font-semibold text-fg-primary", className)}
      {...props}
    />
  );
}

export function PopoverDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  return (
    <p
      className={cn("mt-2 text-ui-sm text-fg-secondary", className)}
      {...props}
    />
  );
}

export interface PopoverCloseProps
  extends React.ComponentPropsWithRef<typeof PopoverPrimitive.Close> {}

/**
 * Fixed gap (see PopoverContent's doc comment above): was a bare, unstyled
 * `PopoverPrimitive.Close` re-export with no focus-visible ring, unlike every sibling
 * overlay's own close/action sub-component. Now matches that convention — adds only the
 * mandatory `focus-visible:shadow-glow-focus` ring, no other default visual chrome, so
 * existing usage (e.g. `<PopoverClose>Close</PopoverClose>`) renders unchanged except for
 * a visible ring on keyboard focus.
 */
export function PopoverClose({ ref, className, ...props }: PopoverCloseProps) {
  return (
    <PopoverPrimitive.Close
      ref={ref}
      className={cn(
        "outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
        className,
      )}
      {...props}
    />
  );
}

PopoverClose.displayName = "PopoverClose";

/**
 * PopoverV2 — "restrained" variant (additive only; does not alter `Popover`/
 * `PopoverTrigger`/`PopoverAnchor`/`PopoverClose`/`PopoverContent`/`PopoverTitle`/
 * `PopoverDescription` above).
 *
 * 🆕 v2 built from a REAL, confirmed "Popover / v2 — restrained" Figma frame — unlike
 * SelectV2/AccordionV2, this one did NOT need the Pagination-based interpretation
 * fallback. Found via `get_metadata` on canvas `6033:35565` (the same canvas as v1,
 * discovered via the "add Popover" build commit's recorded node id after the usual
 * `2120:*`/`6033:*`/`6089:*`/`6098:*`/`6100:*`/`6126:*`/`6318:*` range crawl and
 * `search_design_system` both came up empty, matching every prior unit's finding that
 * neither tool surfaces this file's own local pages directly): sibling frame
 * `6318:23417`, "Popover / v2 — restrained", publishing 16 symbols — `Side` (Top/Bottom/
 * Left/Right) × `State` (default/focus/hover/**disabled**) — confirmed via
 * `get_design_context` + direct screenshots of all 4 states on the Top side.
 *
 * The real, confirmed distinction from v1 is NOT a quieter default chrome (unlike
 * Select/Accordion's restrained pattern) — v2's `default` state renders with the exact
 * same `bg/primary` + `border/default` + `radius/lg` + `shadow/md` panel as v1. What v2
 * actually adds, confirmed pixel-for-pixel via screenshot comparison: a real `hover`
 * state v1's symbol set never had (`bg/secondary` fill + `border/strong`), and a real
 * `disabled` state v1 never had (identical chrome, `opacity: 50%`). `focus` is again
 * byte-identical to `default` here too (same as v1) — no invented ring added, same
 * reasoning as PopoverContent above. Sides, tokens, radius, shadow, and title/description
 * typography are otherwise identical to v1, so `PopoverV2` reuses `PopoverTitle` and
 * `PopoverDescription` directly rather than forking them — no visual difference exists
 * between v1/v2 for either.
 */
export const PopoverV2 = PopoverPrimitive.Root;

export interface PopoverContentV2Props
  extends React.ComponentPropsWithRef<typeof PopoverPrimitive.Content> {
  /**
   * Dims the panel to match a disabled trigger — confirmed real Figma state
   * (`opacity: 50%`, same chrome as default) with no native Radix/HTML equivalent for a
   * content panel, so it's exposed as an explicit prop rather than derived automatically.
   */
  disabled?: boolean;
}

/**
 * Same roles/keyboard behavior as PopoverContent (role="dialog", Escape closes, focus
 * trapped while open) · adds a real `hover` state and a `disabled` (dimmed) state v1
 * doesn't have, both confirmed via Figma's real v2 frame · `focus` intentionally has no
 * distinct visual, matching v1 and matching Figma's own symbols
 */
export function PopoverContentV2({
  ref,
  className,
  side = "bottom",
  sideOffset = 8,
  disabled,
  children,
  ...props
}: PopoverContentV2Props) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        data-disabled={disabled || undefined}
        className={cn(
          "z-50 w-[124px] rounded-lg border border-border-default bg-bg-primary p-4 shadow-md outline-none transition-colors",
          "hover:border-border-strong hover:bg-bg-secondary",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

PopoverContentV2.displayName = "PopoverContentV2";

// PopoverV2 reuses PopoverTrigger, PopoverAnchor, PopoverClose, PopoverTitle, and
// PopoverDescription from v1 above — Figma's real v2 frame shows no difference in any of
// these, so forking them would just be duplicated code on an unconfirmed basis.
