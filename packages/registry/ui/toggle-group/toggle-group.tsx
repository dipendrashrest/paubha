"use client";

import { cn } from "@paubha/registry/lib/cn";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

export type ToggleGroupSize = "sm" | "md" | "lg";

const ToggleGroupSizeContext = React.createContext<ToggleGroupSize>("md");

export interface ToggleGroupProps
  extends React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root> {
  size?: ToggleGroupSize;
}

/**
 * Segmented control for 2-4 mutually exclusive options. Built on Radix RadioGroup:
 * role="radiogroup" · each item role="radio" with aria-checked · Arrow keys move and
 * select · Tab enters/leaves the group on the checked item · disabled items are native
 * disabled and skipped · focus ring visible on Tab (shadow-glow-focus)
 */
export function ToggleGroup({
  ref,
  className,
  size = "md",
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupSizeContext.Provider value={size}>
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn(
          "inline-flex items-center gap-0.5 rounded-md bg-bg-secondary p-1",
          className,
        )}
        {...props}
      />
    </ToggleGroupSizeContext.Provider>
  );
}

ToggleGroup.displayName = "ToggleGroup";

const toggleGroupItemVariants = cva(
  "flex items-center justify-center rounded-sm font-medium whitespace-nowrap outline-none",
  {
    variants: {
      size: {
        sm: "h-6 px-3 text-ui-xs",
        md: "h-8 px-4 text-ui-md",
        lg: "h-10 px-5 text-ui-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface ToggleGroupItemProps
  extends Omit<
      React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>,
      "children"
    >,
    VariantProps<typeof toggleGroupItemVariants> {
  children?: React.ReactNode;
}

/**
 * Synced to Figma "Toggle Group" (node 6089:37078): track bg-secondary · 4px padding ·
 * 2px gap · radius-md; item radius-sm, font-medium. Sizes sm/md/lg = 24/32/40px items
 * (32/40/48px overall, matching the shared density scale) with 12/16/20px padding and
 * ui-xs/ui-md/ui-lg type. Checked = bg-primary + fg-primary + shadow-xs; unchecked =
 * fg-secondary. Figma only draws the resting state; hover/active/disabled/focus are
 * code-side conventions shared with Tabs and Radio Group.
 */

export function ToggleGroupItem({
  ref,
  className,
  size,
  children,
  ...props
}: ToggleGroupItemProps) {
  const contextSize = React.useContext(ToggleGroupSizeContext);

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleGroupItemVariants({ size: size ?? contextSize }),
        "text-fg-secondary",
        "data-[state=unchecked]:hover:bg-bg-secondary-hover",
        "data-[state=unchecked]:active:bg-bg-tertiary-hover",
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
        "data-[state=checked]:bg-bg-primary data-[state=checked]:text-fg-primary data-[state=checked]:shadow-xs",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}

ToggleGroupItem.displayName = "ToggleGroupItem";
