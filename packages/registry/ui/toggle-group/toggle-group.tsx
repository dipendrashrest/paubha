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
 * Built on Radix RadioGroup so it gets the exact ARIA contract a segmented control needs:
 * role="radiogroup" · each item role="radio" with aria-checked · Arrow keys navigate
 * between items · disabled items get a native disabled state · focus ring visible on Tab
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
        sm: "h-[22px] px-3 text-ui-xs",
        md: "h-[30px] px-4 text-ui-md",
        lg: "h-[38px] px-5 text-ui-lg",
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
 * No Figma page for Toggle Group was discoverable this session (same dead-end pattern as
 * Card/Select/Progress Circle/Slider: no canvas found by ID-crawl, and the "add Toggle
 * Group" commit (`b83c470`) records no node id to recover it from, unlike Toast/Table/
 * Dialog). Audited against this repo's own cross-component convention instead: unchecked
 * items had no hover/active feedback at all (checked-only styling), unlike every sibling
 * form-control/segmented-control component (RadioGroupItem's unselected hover, Button's
 * ghost/ Tabs pill hover+active pairs), added `data-[state=unchecked]:hover:bg-bg-secondary-hover`
 * / `:active:bg-bg-tertiary-hover`, the same one-step-darker-than-track pairing those
 * components already use. Focus ring (`shadow-glow-focus`) and disabled treatment were
 * already correct and unchanged.
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
