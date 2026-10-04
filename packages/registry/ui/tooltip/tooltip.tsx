"use client";

import { cn } from "@paubha/registry/lib/cn";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";

/** Figma show delay for tooltips (Notes and documentation → Accessibility). */
const TOOLTIP_DELAY_DURATION = 400;

export interface TooltipProviderProps
  extends React.ComponentProps<typeof TooltipPrimitive.Provider> {}

/**
 * Radix `Provider` with Figma's 400ms show delay as the default `delayDuration`
 * (Radix's own default is 700ms). Any Radix provider prop still overrides it.
 */
export function TooltipProvider({
  delayDuration = TOOLTIP_DELAY_DURATION,
  ...props
}: TooltipProviderProps) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends React.ComponentPropsWithRef<typeof TooltipPrimitive.Content> {}

/**
 * role=tooltip (set by Radix) · trigger references it via aria-describedby ·
 * shows on hover and keyboard focus after a 400ms delay · Esc dismisses without
 * moving focus · content is not focusable and stays out of the tab order · the
 * trigger keeps its own focus-visible (glow-focus) treatment · the trigger must
 * carry its own accessible name; the tooltip only supplements it
 *
 * Figma (node 2121:15434, "Variant: Top | Bottom | Left | Right") has no size or
 * state axis; placements differ only in arrow rotation, covered by Radix's
 * `side`/`align`. Body: bg-fg-primary / text-bg-primary (inverted), rounded-xs,
 * px-2 py-1 (space/md, space/xs), text-ui-xs font-medium, shadow-md; arrow 6x5
 * fill-fg-primary, flush with the body. Layering: z-index/tooltip (70).
 * Motion: opacity-in over duration/fast (100ms) ease-out; duration/instant under
 * prefers-reduced-motion.
 */
export function TooltipContent({
  ref,
  className,
  sideOffset = 6,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-(--z-tooltip) rounded-xs bg-fg-primary px-2 py-1 text-ui-xs font-medium text-bg-primary shadow-md",
        "transition-opacity duration-(--duration-fast) ease-out starting:opacity-0 motion-reduce:duration-(--duration-instant)",
        className,
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow
        width={6}
        height={5}
        className="fill-fg-primary"
      />
    </TooltipPrimitive.Content>
  );
}

TooltipContent.displayName = "TooltipContent";
