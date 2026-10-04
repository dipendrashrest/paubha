"use client";

import { cn } from "@paubha/registry/lib/cn";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type * as React from "react";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export interface PopoverContentProps
  extends React.ComponentPropsWithRef<typeof PopoverPrimitive.Content> {}

/**
 * role="dialog" · trigger gets aria-haspopup="dialog" + aria-expanded automatically ·
 * Escape or an outside click closes · focus moves into the panel on open and returns
 * to the trigger on close · non-modal by default (pass `modal` on Popover to trap Tab) ·
 * panel shows a 2px focus-ring border when it holds keyboard focus itself
 *
 * Figma (Paubha-UI `6089:35924`): `Side: Top | Bottom | Left | Right` × `State: default |
 * focus`, no size axis, no arrow. 280px wide · p-16 · radius/md · border/default ·
 * bg/primary · shadow/md · title ui/md medium fg/primary · body body/sm fg/secondary ·
 * 8px title/body gap. `focus` = 2px `focus/ring` border (drawn as border + 1px inset
 * ring so the panel doesn't shift).
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
          "z-(--z-popover) w-70 rounded-md border border-border-default bg-bg-primary p-4 shadow-md outline-none",
          "focus-visible:border-focus-ring focus-visible:ring-1 focus-visible:ring-focus-ring focus-visible:ring-inset",
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
      className={cn("text-ui-md font-medium text-fg-primary", className)}
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
      className={cn("mt-2 text-body-sm text-fg-secondary", className)}
      {...props}
    />
  );
}

export interface PopoverCloseProps
  extends React.ComponentPropsWithRef<typeof PopoverPrimitive.Close> {}

/**
 * role=button · Enter/Space closes the popover · glow-focus ring on Tab · no other
 * default chrome (not in Figma) — compose with `asChild` for a styled button
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
 * PopoverV2 ("restrained"): same panel as v1 plus `hover` (bg/secondary + border/strong)
 * and `disabled` (opacity 50%) states. Paubha-UI publishes no v2 frame, so those two
 * states are kept as-is; the shared panel chrome (width, radius, z-index, focus border)
 * follows the v1 Figma spec above.
 */
export const PopoverV2 = PopoverPrimitive.Root;

export interface PopoverContentV2Props
  extends React.ComponentPropsWithRef<typeof PopoverPrimitive.Content> {
  /**
   * Dims the panel to match a disabled trigger. Confirmed real Figma state
   * (`opacity: 50%`, same chrome as default) with no native Radix/HTML equivalent for a
   * content panel, so it's exposed as an explicit prop rather than derived automatically.
   */
  disabled?: boolean;
}

/**
 * Same roles/keyboard behavior as PopoverContent · adds hover and disabled (dimmed) states
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
          "z-(--z-popover) w-70 rounded-md border border-border-default bg-bg-primary p-4 shadow-md outline-none transition-colors",
          "focus-visible:border-focus-ring focus-visible:ring-1 focus-visible:ring-focus-ring focus-visible:ring-inset",
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
// PopoverDescription from v1 above. Figma's real v2 frame shows no difference in any of
// these, so forking them would just be duplicated code on an unconfirmed basis.
