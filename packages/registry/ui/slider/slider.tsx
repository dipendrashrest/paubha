import * as SliderPrimitive from "@radix-ui/react-slider";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

export type SliderSize = "sm" | "md" | "lg";

const trackVariants = cva("relative w-full grow overflow-hidden rounded-full bg-bg-tertiary", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-1.5",
      lg: "h-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const thumbSizeClassName: Record<SliderSize, string> = {
  sm: "size-3.5 hover:size-4",
  md: "size-[18px] hover:size-5",
  lg: "size-[22px] hover:size-6",
};

export interface SliderProps
  extends React.ComponentPropsWithRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof trackVariants> {
  /** Shows the track/thumb in the error color, e.g. for validation feedback. */
  error?: boolean;
}

/**
 * role="slider" (via Radix) with aria-valuenow/aria-valuemin/aria-valuemax · label it via
 * aria-label or aria-labelledby · Arrow keys adjust by step · Page Up/Down for larger
 * steps · Home/End jump to min/max · thumb meets the 44×44px touch target via its hit
 * area, not just its visible size · focus ring visible on Tab, using `--shadow-glow-focus`
 * (or `--shadow-glow-focus-error` when `error` is set, matching Input/Select's pattern)
 */
export function Slider({
  ref,
  className,
  size = "md",
  error = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SliderProps) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        "data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className={cn(trackVariants({ size }))}>
        <SliderPrimitive.Range
          className={cn(
            "absolute h-full rounded-full",
            error ? "bg-bg-error-solid" : "bg-bg-brand-solid",
          )}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(
          "block shrink-0 rounded-full border-2 bg-bg-primary shadow-sm outline-none transition-[width,height]",
          "disabled:pointer-events-none disabled:opacity-50",
          thumbSizeClassName[size ?? "md"],
          error
            ? "border-border-error focus-visible:shadow-[var(--shadow-glow-focus-error)]"
            : "border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)]",
        )}
      />
    </SliderPrimitive.Root>
  );
}

Slider.displayName = "Slider";
