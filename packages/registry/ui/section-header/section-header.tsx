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
  /** SearchField (or Input) slot, rendered in the title row. */
  search?: React.ReactNode;
  /** Tabs rendered below the title row; switches the title to the larger tabs-header size. */
  tabs?: React.ReactNode;
  /** When true, draws a bottom border under the header. @default false */
  bordered?: boolean;
}

/**
 * In-page section header shell · layout only, no interactive role of its own ·
 * pass focusable controls via the actions / search / tabs slots (they must
 * carry shadow-glow-focus themselves) · title 18/28 semibold (22/30 when tabs
 * are present) · description 14/20 fg-tertiary · Figma variants: simple,
 * actions, search, tabs (derived from which slots are passed)
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
        "flex w-full flex-col gap-4",
        bordered && "border-b border-border-default pb-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h2
            className={cn(
              "font-semibold text-fg-primary",
              tabs != null ? "text-[22px] leading-[30px]" : "text-body-lg",
            )}
          >
            {title}
          </h2>
          {description != null ? (
            <p className="text-ui-md text-fg-tertiary">{description}</p>
          ) : null}
        </div>
        {(search != null || actions != null) && (
          <div className="flex shrink-0 items-center gap-3">
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
