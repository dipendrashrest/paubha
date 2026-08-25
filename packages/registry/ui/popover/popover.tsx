import * as PopoverPrimitive from "@radix-ui/react-popover";
import type * as React from "react";
import { cn } from "../../lib/cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps
  extends React.ComponentPropsWithRef<typeof PopoverPrimitive.Content> {}

/**
 * role="dialog" · trigger gets aria-haspopup="dialog" + aria-expanded automatically ·
 * Escape closes · Tab traps focus within while open · focus moves to the first
 * focusable element on open and returns to the trigger on close
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
