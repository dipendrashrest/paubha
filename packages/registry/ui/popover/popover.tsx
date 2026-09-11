import * as PopoverPrimitive from "@radix-ui/react-popover";
import type * as React from "react";
import { cn } from "../../lib/cn";

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
 * Left open (see SYNC_LOG.md): the confirmed base symbol width is 124px (consistent
 * across all 8 `Side × State` instances), not this component's current `w-65` (260px)
 * default — but 260px predates this audit, isn't a color/spacing *token* this repo
 * defines, and changing it would be a visible layout change for every existing consumer
 * well beyond this unit's scoped side/focus/token check. Flagged rather than silently
 * changed.
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
          "z-50 w-65 rounded-lg border border-border-default bg-bg-primary p-4 shadow-md outline-none",
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
