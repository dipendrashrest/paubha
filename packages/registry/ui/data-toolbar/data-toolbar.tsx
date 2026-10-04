import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface DataToolbarProps extends React.ComponentPropsWithRef<"div"> {
  /** Leading search slot — typically SearchField. */
  search?: React.ReactNode;
  /** Filter chips / selects. */
  filters?: React.ReactNode;
  /** Trailing actions. */
  actions?: React.ReactNode;
}

/**
 * Table / list toolbar · layout only (no role added) · search (min 12rem,
 * flexes) · filters · right-aligned actions · wraps on narrow widths ·
 * Tab order follows visual order (search, filters, children, actions) ·
 * slotted controls must carry shadow-glow-focus
 */
export function DataToolbar({
  ref,
  className,
  search,
  filters,
  actions,
  children,
  ...props
}: DataToolbarProps) {
  return (
    <div
      ref={ref}
      className={cn("flex w-full flex-wrap items-center gap-3", className)}
      {...props}
    >
      {search != null ? (
        <div className="min-w-[12rem] flex-1">{search}</div>
      ) : null}
      {filters != null ? (
        <div className="flex flex-wrap items-center gap-2">{filters}</div>
      ) : null}
      {children}
      {actions != null ? (
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

DataToolbar.displayName = "DataToolbar";
