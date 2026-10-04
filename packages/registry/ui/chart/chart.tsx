import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

/* -------------------------------------------------------------------------- */
/* ChartCard                                                                  */
/* -------------------------------------------------------------------------- */

export interface ChartCardProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Card heading shown above the chart. */
  title: React.ReactNode;
  /** Optional trailing actions (buttons, menus, etc.). */
  actions?: React.ReactNode;
}

/**
 * Non-interactive chart wrapper · title is a heading (h3) · actions slot is
 * author-controlled · chart children should provide their own accessible name
 * via role="img" + aria-label
 */
export function ChartCard({
  ref,
  className,
  title,
  actions,
  children,
  ...props
}: ChartCardProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md border border-border-default bg-bg-primary p-5",
        className,
      )}
      {...props}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-ui-md font-semibold text-fg-primary">{title}</h3>
        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
      {children}
    </div>
  );
}

ChartCard.displayName = "ChartCard";

/* -------------------------------------------------------------------------- */
/* Shared chart helpers                                                       */
/* -------------------------------------------------------------------------- */

const Y_TICKS = [0, 25, 50, 75, 100] as const;

function clampPercent(value: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, (value / max) * 100));
}

/* -------------------------------------------------------------------------- */
/* BarChart                                                                   */
/* -------------------------------------------------------------------------- */

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface BarChartProps extends React.ComponentPropsWithRef<"div"> {
  data: BarChartDatum[];
  /** Scale ceiling for bar heights. Defaults to 100. */
  max?: number;
  /** Accessible name for the chart. */
  "aria-label"?: string;
}

/**
 * role="img" with aria-label · bars and grid are decorative · values are not
 * individually focusable. Summarize the series in aria-label
 */
export function BarChart({
  ref,
  className,
  data,
  max = 100,
  "aria-label": ariaLabel = "Bar chart",
  ...props
}: BarChartProps) {
  return (
    <div
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      className={cn("flex h-44 w-full gap-3", className)}
      {...props}
    >
      {/* Y-axis labels */}
      <div
        className="flex h-[calc(100%-1.25rem)] w-7 shrink-0 flex-col justify-between pb-0"
        aria-hidden="true"
      >
        {[...Y_TICKS].reverse().map((tick) => (
          <span key={tick} className="text-ui-xs leading-none text-fg-tertiary">
            {tick}
          </span>
        ))}
      </div>

      {/* Plot */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="relative min-h-0 flex-1" aria-hidden="true">
          {/* Horizontal grid */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
            {Y_TICKS.map((tick) => (
              <div
                key={tick}
                className="border-t border-border-default first:border-t-0"
              />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-around gap-1 px-1">
            {data.map((datum) => {
              const heightPct = clampPercent(datum.value, max);
              return (
                <div
                  key={datum.label}
                  className="flex h-full w-[18px] shrink-0 items-end"
                >
                  <div
                    className="w-full rounded-t-sm bg-bg-brand-solid"
                    style={{ height: `${heightPct}%` }}
                    title={`${datum.label}: ${datum.value}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* X labels */}
        <div
          className="mt-1 flex h-5 items-start justify-around gap-1 px-1"
          aria-hidden="true"
        >
          {data.map((datum) => (
            <span
              key={datum.label}
              className="w-[18px] shrink-0 truncate text-center text-ui-xs text-fg-tertiary"
            >
              {datum.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

BarChart.displayName = "BarChart";

/* -------------------------------------------------------------------------- */
/* LineChart                                                                  */
/* -------------------------------------------------------------------------- */

export interface LineChartDatum {
  label: string;
  value: number;
  previous?: number;
}

export interface LineChartProps extends React.ComponentPropsWithRef<"div"> {
  data: LineChartDatum[];
  /** Draw the dashed previous-period series when values exist. */
  showPrevious?: boolean;
  /** Scale ceiling. Defaults to max of current (+ previous) values, or 100. */
  max?: number;
  "aria-label"?: string;
}

function linePoints(
  values: number[],
  max: number,
  width: number,
  height: number,
  padX: number,
  padY: number,
): string {
  if (values.length === 0) return "";
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const step = values.length === 1 ? 0 : innerW / (values.length - 1);

  return values
    .map((v, i) => {
      const x = padX + i * step;
      const y = padY + innerH * (1 - clampPercent(v, max) / 100);
      return `${x},${y}`;
    })
    .join(" ");
}

/**
 * role="img" with aria-label · SVG polylines are decorative · current series uses
 * currentColor (text-fg-brand) · previous series is dashed tertiary
 */
export function LineChart({
  ref,
  className,
  data,
  showPrevious = false,
  max: maxProp,
  "aria-label": ariaLabel = "Line chart",
  ...props
}: LineChartProps) {
  const values = data.map((d) => d.value);
  const previousValues = data.map((d) => d.previous ?? 0);
  const computedMax =
    maxProp ??
    Math.max(100, ...values, ...(showPrevious ? previousValues : []));

  const width = 320;
  const height = 160;
  const padX = 8;
  const padY = 8;

  const currentPoints = linePoints(
    values,
    computedMax,
    width,
    height,
    padX,
    padY,
  );
  const previousPoints = linePoints(
    previousValues,
    computedMax,
    width,
    height,
    padX,
    padY,
  );

  return (
    <div
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      className={cn("flex h-44 w-full gap-3", className)}
      {...props}
    >
      <div
        className="flex h-[calc(100%-1.25rem)] w-7 shrink-0 flex-col justify-between"
        aria-hidden="true"
      >
        {[...Y_TICKS].reverse().map((tick) => (
          <span key={tick} className="text-ui-xs leading-none text-fg-tertiary">
            {tick}
          </span>
        ))}
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="relative min-h-0 flex-1" aria-hidden="true">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
            {Y_TICKS.map((tick) => (
              <div
                key={tick}
                className="border-t border-border-default first:border-t-0"
              />
            ))}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {showPrevious && data.some((d) => d.previous != null) ? (
              <polyline
                points={previousPoints}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="text-fg-tertiary"
              />
            ) : null}
            <polyline
              points={currentPoints}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="text-fg-brand"
            />
          </svg>
        </div>

        <div
          className="mt-1 flex h-5 items-start justify-between gap-1 px-1"
          aria-hidden="true"
        >
          {data.map((datum) => (
            <span
              key={datum.label}
              className="truncate text-center text-ui-xs text-fg-tertiary"
            >
              {datum.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

LineChart.displayName = "LineChart";

/* -------------------------------------------------------------------------- */
/* DonutChart                                                                 */
/* -------------------------------------------------------------------------- */

export type DonutChartTone = "brand" | "success" | "warning" | "gray";

export interface DonutChartDatum {
  label: string;
  value: number;
  color: DonutChartTone;
}

export interface DonutChartProps extends React.ComponentPropsWithRef<"div"> {
  data: DonutChartDatum[];
  /** Content centered in the hole (defaults to sum of values). */
  centerValue?: React.ReactNode;
  /** Label under the center value. */
  centerLabel?: React.ReactNode;
  "aria-label"?: string;
}

const DONUT_COLORS: Record<DonutChartTone, string> = {
  brand: "var(--bg-brand-solid)",
  success: "var(--fg-success)",
  warning: "var(--fg-warning)",
  gray: "var(--fg-tertiary)",
};

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, largeArc, 0, end.x, end.y].join(
    " ",
  );
}

/**
 * role="img" with aria-label · arcs are decorative · legend lists each segment
 * label · center value/label are visible text for sighted users
 */
export function DonutChart({
  ref,
  className,
  data,
  centerValue,
  centerLabel,
  "aria-label": ariaLabel = "Donut chart",
  ...props
}: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 56;
  const strokeWidth = 22;

  let angle = 0;
  const arcs =
    total > 0
      ? data.map((datum) => {
          const sweep = (datum.value / total) * 360;
          const start = angle;
          const end = angle + sweep;
          angle = end;
          // Full circle needs a tiny gap so the arc path renders
          const safeEnd = sweep >= 359.99 ? start + 359.99 : end;
          return {
            ...datum,
            d: describeArc(cx, cy, radius, start, safeEnd),
          };
        })
      : [];

  return (
    <div
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      className={cn("flex w-full flex-col items-center gap-4", className)}
      {...props}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
        >
          {arcs.length === 0 ? (
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              className="stroke-border-default"
            />
          ) : (
            arcs.map((arc) => (
              <path
                key={arc.label}
                d={arc.d}
                fill="none"
                stroke={DONUT_COLORS[arc.color]}
                strokeWidth={strokeWidth}
                strokeLinecap="butt"
              />
            ))
          )}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-display-xs font-semibold text-fg-primary">
            {centerValue ?? total}
          </span>
          {centerLabel ? (
            <span className="text-ui-xs text-fg-tertiary">{centerLabel}</span>
          ) : null}
        </div>
      </div>

      <ul
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
        aria-hidden="true"
      >
        {data.map((datum) => (
          <li key={datum.label} className="flex items-center gap-1.5">
            <span
              className="size-2.5 shrink-0 rounded-xs"
              style={{ backgroundColor: DONUT_COLORS[datum.color] }}
            />
            <span className="text-ui-sm text-fg-secondary">{datum.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

DonutChart.displayName = "DonutChart";

/* -------------------------------------------------------------------------- */
/* AreaChart                                                                  */
/* -------------------------------------------------------------------------- */

export type AreaChartTone = "brand" | "gray";

export interface AreaChartSeries {
  label: string;
  values: number[];
  tone: AreaChartTone;
}

export interface AreaChartProps extends React.ComponentPropsWithRef<"div"> {
  series: AreaChartSeries[];
  /** X-axis category labels. */
  labels: string[];
  /** Optional horizontal reference line (same scale as values). */
  referenceLine?: number;
  max?: number;
  "aria-label"?: string;
}

const AREA_FILL: Record<AreaChartTone, string> = {
  brand: "color-mix(in srgb, var(--bg-brand-solid) 28%, transparent)",
  gray: "color-mix(in srgb, var(--fg-tertiary) 28%, transparent)",
};

const AREA_STROKE: Record<AreaChartTone, string> = {
  brand: "var(--bg-brand-solid)",
  gray: "var(--fg-tertiary)",
};

function areaPath(
  values: number[],
  max: number,
  width: number,
  height: number,
  padX: number,
  padY: number,
): { area: string; line: string } {
  if (values.length === 0) return { area: "", line: "" };

  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const step = values.length === 1 ? 0 : innerW / (values.length - 1);
  const points = values.map((v, i) => {
    const x = padX + i * step;
    const y = padY + innerH * (1 - clampPercent(v, max) / 100);
    return { x, y };
  });

  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const baselineY = padY + innerH;
  const first = points[0];
  const last = points[points.length - 1];
  const area = [
    `M ${first.x} ${baselineY}`,
    `L ${first.x} ${first.y}`,
    ...points.slice(1).map((p) => `L ${p.x} ${p.y}`),
    `L ${last.x} ${baselineY}`,
    "Z",
  ].join(" ");

  return { area, line };
}

/**
 * role="img" with aria-label · filled paths are decorative · optional reference
 * line uses success stroke · series tones map to brand/gray CSS variables
 */
export function AreaChart({
  ref,
  className,
  series,
  labels,
  referenceLine,
  max: maxProp,
  "aria-label": ariaLabel = "Area chart",
  ...props
}: AreaChartProps) {
  const allValues = series.flatMap((s) => s.values);
  const computedMax =
    maxProp ??
    Math.max(
      100,
      ...allValues,
      ...(referenceLine != null ? [referenceLine] : []),
    );

  const width = 320;
  const height = 160;
  const padX = 8;
  const padY = 8;
  const innerH = height - padY * 2;
  const refY =
    referenceLine != null
      ? padY + innerH * (1 - clampPercent(referenceLine, computedMax) / 100)
      : null;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      className={cn("flex h-44 w-full gap-3", className)}
      {...props}
    >
      <div
        className="flex h-[calc(100%-1.25rem)] w-7 shrink-0 flex-col justify-between"
        aria-hidden="true"
      >
        {[...Y_TICKS].reverse().map((tick) => (
          <span key={tick} className="text-ui-xs leading-none text-fg-tertiary">
            {tick}
          </span>
        ))}
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="relative min-h-0 flex-1" aria-hidden="true">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
            {Y_TICKS.map((tick) => (
              <div
                key={tick}
                className="border-t border-border-default first:border-t-0"
              />
            ))}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {series.map((s) => {
              const { area, line } = areaPath(
                s.values,
                computedMax,
                width,
                height,
                padX,
                padY,
              );
              return (
                <g key={s.label}>
                  <path d={area} fill={AREA_FILL[s.tone]} stroke="none" />
                  <polyline
                    points={line}
                    fill="none"
                    stroke={AREA_STROKE[s.tone]}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              );
            })}
            {refY != null ? (
              <line
                x1={padX}
                x2={width - padX}
                y1={refY}
                y2={refY}
                stroke="var(--fg-success)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                vectorEffect="non-scaling-stroke"
              />
            ) : null}
          </svg>
        </div>

        <div
          className="mt-1 flex h-5 items-start justify-between gap-1 px-1"
          aria-hidden="true"
        >
          {labels.map((label) => (
            <span
              key={label}
              className="truncate text-center text-ui-xs text-fg-tertiary"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

AreaChart.displayName = "AreaChart";
