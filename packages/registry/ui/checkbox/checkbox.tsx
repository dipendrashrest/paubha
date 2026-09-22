import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

const checkboxVariants = cva(
  [
    "peer flex shrink-0 items-center justify-center overflow-hidden rounded-xs border-[1.5px] border-border-default bg-bg-primary",
    "hover:border-border-strong",
    "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
    "data-[state=unchecked]:focus-visible:border-border-brand",
    "data-[state=unchecked]:active:border-border-brand data-[state=unchecked]:active:bg-bg-brand-subtle",
    // Figma binds the checked/indeterminate border to the same var as the fill
    // (bg/brand-solid), not border/brand — border-brand diverges from
    // bg-brand-solid in dark mode, so match Figma's literal binding here.
    "data-[state=checked]:border-bg-brand-solid data-[state=checked]:bg-bg-brand-solid",
    "data-[state=checked]:hover:border-bg-brand-solid-hover data-[state=checked]:hover:bg-bg-brand-solid-hover",
    "data-[state=checked]:active:border-bg-brand-solid-active data-[state=checked]:active:bg-bg-brand-solid-active",
    "data-[state=indeterminate]:border-bg-brand-solid data-[state=indeterminate]:bg-bg-brand-solid",
    "data-[state=indeterminate]:hover:border-bg-brand-solid-hover data-[state=indeterminate]:hover:bg-bg-brand-solid-hover",
    "data-[state=indeterminate]:active:border-bg-brand-solid-active data-[state=indeterminate]:active:bg-bg-brand-solid-active",
    "disabled:cursor-not-allowed disabled:border-border-default disabled:bg-bg-disabled",
    "data-[state=checked]:disabled:border-border-default data-[state=checked]:disabled:bg-bg-disabled",
    "data-[state=indeterminate]:disabled:border-border-default data-[state=indeterminate]:disabled:bg-bg-disabled",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
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
 * Tab · label is clickable (linked via for/id)
 *
 * State bindings confirmed against Figma (node 6198:22838, all 3 sizes): unchecked
 * hover -> border/strong; unchecked active -> bg/brand-subtle + border/brand; checked
 * and indeterminate hover -> bg/brand-solid-hover; checked and indeterminate active ->
 * bg/brand-solid-active; all disabled states -> bg/disabled + border/default (Figma's
 * border/disabled swatch is byte-identical to border/default, so no separate token was
 * needed). Checked/indeterminate border is bound to the same var as the fill
 * (bg-brand-solid) per Figma, not border-brand, since those two tokens diverge in dark
 * mode.
 */
export function Checkbox({
  ref,
  className,
  id,
  label,
  checked,
  size = "md",
  ...props
}: CheckboxProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const iconSizeClassName = indicatorIconSize[size ?? "md"];

  return (
    <div className="inline-flex items-center gap-2">
      <CheckboxPrimitive.Root
        ref={ref}
        id={controlId}
        checked={checked}
        className={cn(checkboxVariants({ size }), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="text-fg-on-brand">
          {checked === "indeterminate" ? (
            <Minus className={iconSizeClassName} />
          ) : (
            <Check className={iconSizeClassName} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label ? (
        <label
          htmlFor={controlId}
          className={cn(
            "select-none text-ui-md font-normal text-fg-primary",
            "peer-disabled:cursor-not-allowed peer-disabled:text-fg-disabled",
          )}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}

Checkbox.displayName = "Checkbox";

export { checkboxVariants };
