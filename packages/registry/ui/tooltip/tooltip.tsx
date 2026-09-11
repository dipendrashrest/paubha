import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";
import { cn } from "../../lib/cn";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends React.ComponentPropsWithRef<typeof TooltipPrimitive.Content> {}

/**
 * role=tooltip (set by Radix) · shows on hover/focus · Esc dismisses · linked to its
 * trigger via aria-describedby · not interactive/not focusable · no independent focus
 * ring on the content — the wrapped trigger element keeps its own normal
 * focus-visible treatment undisturbed
 *
 * Figma (node 2121:15434, "Variant: Top | Bottom | Left | Right") has no size/state
 * axis and no visual difference between placements beyond arrow rotation — Radix's
 * native `side`/`align` props on TooltipContent already cover all 4 placements, so no
 * custom placement prop is added here. Body: bg-fg-primary, text-bg-primary (inverted
 * scheme), rounded-xs, px-2 py-1 (space/md, space/xs), text-ui-xs font-medium, arrow
 * 6x5 fill-fg-primary — all confirmed against the published symbols.
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
        "z-50 rounded-xs bg-fg-primary px-2 py-1 text-ui-xs font-medium text-bg-primary shadow-md",
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
