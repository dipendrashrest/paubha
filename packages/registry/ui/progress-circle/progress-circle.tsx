import type * as React from "react";
import { cn } from "../../lib/cn";

export type ProgressCircleSize = "sm" | "md" | "lg";

const sizeConfig: Record<ProgressCircleSize, { px: number; strokeWidth: number; textClassName: string }> = {
  sm: { px: 40, strokeWidth: 4, textClassName: "text-ui-xs" },
  md: { px: 48, strokeWidth: 5, textClassName: "text-ui-sm" },
  lg: { px: 64, strokeWidth: 6, textClassName: "text-ui-md" },
};

export interface ProgressCircleProps extends React.ComponentPropsWithRef<"div"> {
  /** Current progress value, from 0 to max. */
  value: number;
  max?: number;
  size?: ProgressCircleSize;
  /** Shows the percentage as text in the center. */
  showPercentage?: boolean;
  /** Accessible label describing what is loading. */
  "aria-label": string;
}

/**
 * role="progressbar" with aria-valuenow/aria-valuemin=0/aria-valuemax=100 · always pass
 * aria-label describing what is loading · the circular rendering itself is decorative,
 * the value is conveyed entirely via ARIA attributes
 */
export function ProgressCircle({
  ref,
  className,
  value,
  max = 100,
  size = "md",
  showPercentage = true,
  ...props
}: ProgressCircleProps) {
  const { px, strokeWidth, textClassName } = sizeConfig[size];
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (px - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: a determinate progress display is not an interactive control and correctly has no tabIndex per the ARIA spec
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: px, height: px }}
      {...props}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-bg-tertiary"
        />
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-bg-brand-solid transition-[stroke-dashoffset] duration-300"
        />
      </svg>
      {showPercentage ? (
        <p
          aria-hidden="true"
          className={cn(
            "absolute font-medium text-fg-primary",
            textClassName,
          )}
        >
          {Math.round(percentage)}%
        </p>
      ) : null}
    </div>
  );
}

ProgressCircle.displayName = "ProgressCircle";
