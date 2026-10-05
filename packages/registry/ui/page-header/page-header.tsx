import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface PageHeaderProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Page title, typically a string or heading node. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Breadcrumb trail rendered above the title row. */
  breadcrumb?: React.ReactNode;
  /** Trailing actions slot, typically Button(s). */
  actions?: React.ReactNode;
  /** Badge shown inline after the title (e.g. a count). */
  badge?: React.ReactNode;
  /** Tabs (or similar) rendered below the title row. */
  tabs?: React.ReactNode;
}

/**
 * Page-level header surface (bg-primary, 1px border, 32/24 padding; bottom padding is
 * dropped when `tabs` are present so the tab underline sits on the border) ·
 * layout only, no interactive role of its own ·
 * pass focusable controls via the actions / tabs / breadcrumb slots (they must
 * carry shadow-glow-focus themselves) · title uses display-xs · description
 * uses body-sm / fg-secondary
 */
export function PageHeader({
  ref,
  className,
  title,
  description,
  breadcrumb,
  actions,
  badge,
  tabs,
  ...props
}: PageHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col gap-3 border border-border-default bg-bg-primary px-8 pt-6",
        tabs == null && "pb-6",
        className,
      )}
      {...props}
    >
      {breadcrumb != null ? <div className="min-w-0">{breadcrumb}</div> : null}

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-display-xs font-semibold text-fg-primary">
              {title}
            </h1>
            {badge}
          </div>
          {description != null ? (
            <p className="text-body-sm text-fg-secondary">{description}</p>
          ) : null}
        </div>
        {actions != null ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>

      {tabs != null ? <div className="mt-2 min-w-0">{tabs}</div> : null}
    </div>
  );
}

PageHeader.displayName = "PageHeader";
