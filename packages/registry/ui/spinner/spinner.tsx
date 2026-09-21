import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/cn";

// text-fg-brand is just the default — the arc still reads currentColor, so
// wrapping in a different text-* class (e.g. inside a Button) or passing a
// className still overrides it.
const spinnerVariants = cva("inline-block shrink-0 animate-spin text-fg-brand", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SpinnerSize = NonNullable<
  VariantProps<typeof spinnerVariants>["size"]
>;

// Figma (node 6087:36803): a light track ring plus a ~270° highlighted arc,
// not the ring+orbiting-dot this component used to render. Geometry below is
// transcribed exactly from the real per-size SVG exports — only the arc's
// hardcoded fill (#2450EA) is swapped for currentColor, since Figma's own
// spec says the spinner "inherits foreground color from parent context."
const SIZE_CONFIG: Record<
  SpinnerSize,
  {
    viewBox: string;
    center: number;
    trackRadius: number;
    trackWidth: number;
    arcWidth: number;
    maskId: string;
    arcPath: string;
  }
> = {
  sm: {
    viewBox: "0 0 16 16",
    center: 8,
    trackRadius: 7,
    trackWidth: 2,
    arcWidth: 4,
    maskId: "spinner-arc-sm",
    arcPath:
      "M16 8C16 9.58225 15.5308 11.129 14.6518 12.4446C13.7727 13.7602 12.5233 14.7855 11.0615 15.391C9.59966 15.9965 7.99113 16.155 6.43928 15.8463C4.88743 15.5376 3.46197 14.7757 2.34315 13.6569L3.75736 12.2426C4.59647 13.0818 5.66557 13.6532 6.82946 13.8847C7.99334 14.1162 9.19974 13.9974 10.2961 13.5433C11.3925 13.0892 12.3295 12.3201 12.9888 11.3334C13.6481 10.3467 14 9.18669 14 8H16Z",
  },
  md: {
    viewBox: "0 0 24 24",
    center: 12,
    trackRadius: 10.5,
    trackWidth: 3,
    arcWidth: 6,
    maskId: "spinner-arc-md",
    arcPath:
      "M24 12C24 14.3734 23.2962 16.6935 21.9776 18.6668C20.6591 20.6402 18.7849 22.1783 16.5922 23.0866C14.3995 23.9948 11.9867 24.2324 9.65892 23.7694C7.33114 23.3064 5.19295 22.1635 3.51472 20.4853L5.63604 18.364C6.89471 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.4722 15.5201 21 13.78 21 12H24Z",
  },
  lg: {
    viewBox: "0 0 32 32",
    center: 16,
    trackRadius: 14,
    trackWidth: 4,
    arcWidth: 6,
    maskId: "spinner-arc-lg",
    arcPath:
      "M32 16C32 19.1645 31.0616 22.2579 29.3035 24.8891C27.5454 27.5203 25.0466 29.5711 22.1229 30.7821C19.1993 31.9931 15.9823 32.3099 12.8786 31.6926C9.77486 31.0752 6.92393 29.5513 4.68629 27.3137L7.51472 24.4853C9.19295 26.1635 11.3311 27.3064 13.6589 27.7694C15.9867 28.2324 18.3995 27.9948 20.5922 27.0866C22.7849 26.1783 24.6591 24.6402 25.9776 22.6668C27.2962 20.6935 28 18.3734 28 16H32Z",
  },
};

export interface SpinnerProps extends React.ComponentPropsWithRef<"output"> {
  size?: SpinnerSize;
}

/**
 * role=status (native to <output>) · aria-label="Loading" · aria-live="polite"
 * announces the loading state · aria-busy="true" belongs on the container being
 * loaded, not the spinner itself · has no "done" state — unmount or swap it out once
 * loading completes · inherits its color from context (currentColor) — wrap in a
 * text-color class to recolor
 */
export function Spinner({
  ref,
  className,
  size = "md",
  ...props
}: SpinnerProps) {
  const config = SIZE_CONFIG[size];

  return (
    <output
      ref={ref}
      aria-label="Loading"
      aria-live="polite"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <svg
        aria-hidden="true"
        viewBox={config.viewBox}
        fill="none"
        className="size-full"
      >
        <circle
          cx={config.center}
          cy={config.center}
          r={config.trackRadius}
          strokeWidth={config.trackWidth}
          className="stroke-bg-tertiary"
        />
        <mask id={config.maskId} fill="white">
          <path d={config.arcPath} />
        </mask>
        <path
          d={config.arcPath}
          strokeWidth={config.arcWidth}
          mask={`url(#${config.maskId})`}
          className="stroke-current"
        />
      </svg>
    </output>
  );
}

Spinner.displayName = "Spinner";

export { spinnerVariants };
