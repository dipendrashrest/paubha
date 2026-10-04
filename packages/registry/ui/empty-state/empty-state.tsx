import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface EmptyStateProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Illustration / icon slot above the title. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary / secondary CTA slot. */
  actions?: React.ReactNode;
}

/**
 * Empty / zero-result / first-run placeholder · role=status · layout only.
 * Pass focusable CTAs via actions (they carry glow-focus themselves)
 */
export function EmptyState({
  ref,
  className,
  icon,
  title,
  description,
  actions,
  ...props
}: EmptyStateProps) {
  return (
    <div
      ref={ref}
      role="status"
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      {icon != null ? (
        <div className="flex size-12 items-center justify-center text-fg-tertiary [&_svg]:size-12">
          {icon}
        </div>
      ) : null}
      <div className="flex max-w-sm flex-col gap-1">
        <p className="text-ui-lg font-semibold text-fg-primary">{title}</p>
        {description != null ? (
          <p className="text-body-sm text-fg-secondary">{description}</p>
        ) : null}
      </div>
      {actions != null ? (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

EmptyState.displayName = "EmptyState";
