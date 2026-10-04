"use client";

import { cn } from "@paubha/registry/lib/cn";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import * as React from "react";

const checkboxVariants = cva(
  [
    "peer group flex shrink-0 items-center justify-center overflow-hidden border border-border-default bg-bg-primary text-fg-primary",
    "hover:border-border-strong",
    "focus-visible:outline-none focus-visible:border-[1.5px] focus-visible:border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)]",
    "data-[state=unchecked]:active:border-border-brand data-[state=unchecked]:active:bg-bg-brand-subtle",
    // Checked/indeterminate are outlined (Figma): bg-primary fill, brand border,
    // fg-primary glyph. Hover/active darken the border along the brand ramp.
    "data-[state=checked]:border-border-brand data-[state=indeterminate]:border-border-brand",
    "data-[state=checked]:hover:border-bg-brand-solid-hover data-[state=indeterminate]:hover:border-bg-brand-solid-hover",
    "data-[state=checked]:active:border-bg-brand-solid-active data-[state=indeterminate]:active:border-bg-brand-solid-active",
    "disabled:cursor-not-allowed disabled:border-border-disabled disabled:text-fg-disabled",
    "data-[state=unchecked]:disabled:bg-bg-disabled",
    "data-[state=checked]:disabled:border-border-disabled data-[state=indeterminate]:disabled:border-border-disabled",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-4 rounded-xs",
        // Figma: 6px corner on md/lg (unbound — no radius token at 6px).
        md: "size-5 rounded-[6px]",
        lg: "size-6 rounded-[6px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const checkboxLabelVariants = cva(
  "select-none font-normal text-fg-primary peer-disabled:cursor-not-allowed peer-disabled:text-fg-disabled",
  {
    variants: {
      size: {
        sm: "text-ui-sm",
        md: "text-body-sm",
        lg: "text-body-md",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const indicatorIconSize: Record<
  NonNullable<VariantProps<typeof checkboxVariants>["size"]>,
  string
> = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
};

export interface CheckboxProps
  extends Omit<
      React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>,
      "children"
    >,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode;
}

/**
 * role=checkbox · aria-checked=true/false/mixed · Space toggles · focus ring visible on
 * Tab · label is clickable (linked via for/id) · disabled prevents interaction
 *
 * Figma (node 6198:22838, sm/md/lg): outlined box — checked and indeterminate keep the
 * bg-primary fill with a brand border and an fg-primary check/minus glyph. Unchecked
 * hover -> border/strong; unchecked active -> bg/brand-subtle + border/brand; checked
 * hover/active darken the border; focus -> 1.5px border/brand + glow-focus; disabled ->
 * border/disabled + fg/disabled (unchecked also bg/disabled). Label: sm ui-sm, md
 * body-sm, lg body-md; gap 8/8/12px.
 */
export function Checkbox({
  ref,
  className,
  id,
  label,
  size = "md",
  ...props
}: CheckboxProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const iconSizeClassName = indicatorIconSize[size ?? "md"];

  return (
    <div
      className={cn(
        "inline-flex items-center",
        size === "lg" ? "gap-3" : "gap-2",
      )}
    >
      <CheckboxPrimitive.Root
        ref={ref}
        id={controlId}
        className={cn(checkboxVariants({ size }), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <Check
            aria-hidden
            className={cn(
              iconSizeClassName,
              "group-data-[state=indeterminate]:hidden",
            )}
          />
          <Minus
            aria-hidden
            className={cn(
              iconSizeClassName,
              "hidden group-data-[state=indeterminate]:block",
            )}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label ? (
        <label htmlFor={controlId} className={checkboxLabelVariants({ size })}>
          {label}
        </label>
      ) : null}
    </div>
  );
}

Checkbox.displayName = "Checkbox";

export { checkboxLabelVariants, checkboxVariants };
