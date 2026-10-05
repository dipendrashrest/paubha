import { cn } from "@paubha/registry/lib/cn";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import * as React from "react";

/* -------------------------------------------------------------------------- */
/* Sparkline                                                                  */
/* -------------------------------------------------------------------------- */

function Sparkline({
  data,
  className,
}: {
  data: number[];
  className?: string;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 228;
  const height = 60;
  const padY = 2;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - padY - ((value - min) / range) * (height - padY * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-[60px] w-full text-fg-brand", className)}
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Metric                                                                     */
/* -------------------------------------------------------------------------- */

export interface MetricProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Metric label (tertiary). */
  label: React.ReactNode;
  /** Primary value; display-xs semibold. */
  value: React.ReactNode;
  /**
   * Optional delta slot, typically a Badge (Stat Card / Sparkline) or a
   * percent string when `trend` is set (Metric with Trend).
   */
  delta?: React.ReactNode;
  /** Comparison copy, e.g. "vs last month" / "from last week". */
  description?: React.ReactNode;
  /**
   * When set, renders the Metric-with-Trend row: ArrowUpRight / ArrowDownRight
   * in fg-success / fg-error, then `delta` percent text, then `description`.
   */
  trend?: "up" | "down";
  /** Optional sparkline series; renders a brand-stroke mini SVG path. */
  sparkline?: number[];
  /** Optional leading icon for compact MetricGroup children. */
  icon?: React.ReactNode;
  /**
   * Compact layout for MetricGroup rows: icon + label/value, no card chrome.
   * @default false
   */
  compact?: boolean;
}

/**
 * KPI / stat display · non-interactive layout shell · delta Badge / trend
 * controls must carry their own a11y (Badge = role=status) · sparkline is
 * decorative (aria-hidden); summarize the series in surrounding copy ·
 * trend arrows are decorative (aria-hidden); convey direction via text in delta
 */
export function Metric({
  ref,
  className,
  label,
  value,
  delta,
  description,
  trend,
  sparkline,
  icon,
  compact = false,
  ...props
}: MetricProps) {
  if (compact) {
    return (
      <div
        ref={ref}
        className={cn("flex min-w-0 flex-1 items-center gap-2", className)}
        {...props}
      >
        {icon ? (
          <span className="inline-flex shrink-0 text-fg-tertiary [&_svg]:size-[18px]">
            {icon}
          </span>
        ) : null}
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-ui-xs font-medium text-fg-tertiary">
            {label}
          </p>
          <p className="truncate text-ui-md font-semibold text-fg-primary">
            {value}
          </p>
        </div>
      </div>
    );
  }

  const hasSparkline = sparkline != null && sparkline.length >= 2;
  const hasTrend = !hasSparkline && trend != null;
  const TrendIcon = trend === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col rounded-md border border-border-default bg-bg-primary p-5",
        hasSparkline ? "gap-3 overflow-hidden" : hasTrend ? "gap-1.5" : "gap-2",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex flex-col",
          hasSparkline ? "gap-1" : hasTrend ? "gap-1.5" : "gap-2",
        )}
      >
        <p className="text-ui-md font-medium text-fg-tertiary">{label}</p>

        {hasSparkline ? (
          <div className="flex items-center gap-2">
            <p className="text-display-xs font-semibold whitespace-nowrap text-fg-primary">
              {value}
            </p>
            {delta != null ? (
              <div className="flex shrink-0 items-center">{delta}</div>
            ) : null}
          </div>
        ) : (
          <p className="text-display-xs font-semibold text-fg-primary">
            {value}
          </p>
        )}
      </div>

      {hasTrend ? (
        <div className="flex items-center gap-1">
          <TrendIcon
            className={cn(
              "size-4 shrink-0",
              trend === "down" ? "text-fg-error" : "text-fg-success",
            )}
            aria-hidden="true"
          />
          {delta != null ? (
            <span
              className={cn(
                "text-ui-md font-semibold whitespace-nowrap",
                trend === "down" ? "text-fg-error" : "text-fg-success",
              )}
            >
              {delta}
            </span>
          ) : null}
          {description != null ? (
            <span className="min-w-0 truncate text-ui-md text-fg-tertiary">
              {description}
            </span>
          ) : null}
        </div>
      ) : null}

      {!hasTrend && !hasSparkline && (delta != null || description != null) ? (
        <div className="flex items-center gap-1.5">
          {delta != null ? (
            <div className="flex shrink-0 items-center">{delta}</div>
          ) : null}
          {description != null ? (
            <p className="min-w-0 truncate text-ui-xs font-medium text-fg-tertiary">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {hasSparkline ? <Sparkline data={sparkline} /> : null}
    </div>
  );
}

Metric.displayName = "Metric";

/* -------------------------------------------------------------------------- */
/* MetricGroup                                                                */
/* -------------------------------------------------------------------------- */

export interface MetricGroupProps extends React.ComponentPropsWithRef<"div"> {}

/**
 * Horizontal row of compact metrics · dividers are decorative separators
 * (aria-hidden) · compose with `<Metric compact />` children
 */
export function MetricGroup({
  ref,
  className,
  children,
  ...props
}: MetricGroupProps) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center rounded-md border border-border-default bg-bg-primary p-3",
        className,
      )}
      {...props}
    >
      {items.map((child, index) => (
        <React.Fragment key={React.isValidElement(child) ? child.key : index}>
          {index > 0 ? (
            <div
              aria-hidden="true"
              className="mx-2 h-8 w-px shrink-0 bg-border-default"
            />
          ) : null}
          {child}
        </React.Fragment>
      ))}
    </div>
  );
}

MetricGroup.displayName = "MetricGroup";
