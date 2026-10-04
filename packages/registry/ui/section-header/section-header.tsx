import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface SectionHeaderProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Section title, typically a string or heading node. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Trailing actions slot, typically Button(s). */
  actions?: React.ReactNode;
  /** Search input (or filter) slot, rendered in the title row. */
  search?: React.ReactNode;
  /** Tabs (or similar) rendered below the title row. */
  tabs?: React.ReactNode;
  /** When true, draws a bottom border under the header. @default false */
  bordered?: boolean;
}

/**
 * In-page section header shell · layout only, no interactive role of its own ·
 * pass focusable controls via the actions / search / tabs slots (they must
 * carry shadow-glow-focus themselves) · title uses ui-lg · description uses
 * body-sm / fg-secondary
 */
export function SectionHeader({
  ref,
  className,
  title,
  description,
  actions,
  search,
  tabs,
  bordered = false,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col gap-3",
        bordered && "border-b border-border-default pb-3",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-ui-lg font-semibold text-fg-primary">{title}</h2>
          {description != null ? (
            <p className="text-body-sm text-fg-secondary">{description}</p>
          ) : null}
        </div>
        {(search != null || actions != null) && (
          <div className="flex shrink-0 items-center gap-2">
            {search != null ? <div className="min-w-0">{search}</div> : null}
            {actions != null ? actions : null}
          </div>
        )}
      </div>

      {tabs != null ? <div className="min-w-0">{tabs}</div> : null}
    </div>
  );
}

SectionHeader.displayName = "SectionHeader";
