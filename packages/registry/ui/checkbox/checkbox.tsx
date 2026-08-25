import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

const checkboxVariants = cva(
  [
    "peer flex shrink-0 items-center justify-center overflow-hidden rounded-xs border-[1.5px] border-border-default bg-bg-primary",
    "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
    "data-[state=checked]:border-border-brand data-[state=checked]:bg-bg-brand-solid",
    "data-[state=indeterminate]:border-border-brand data-[state=indeterminate]:bg-bg-brand-solid",
    "disabled:cursor-not-allowed disabled:bg-bg-secondary data-[state=checked]:disabled:bg-bg-disabled data-[state=indeterminate]:disabled:bg-bg-disabled",
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
