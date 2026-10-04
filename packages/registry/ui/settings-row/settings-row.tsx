import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface SettingsRowProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Trailing control — Switch, Select, etc. */
  control?: React.ReactNode;
}

/**
 * Settings list row · title + description + control slot · no interactive
 * role of its own · control must carry glow-focus
 */
export function SettingsRow({
  ref,
  className,
  title,
  description,
  control,
  ...props
}: SettingsRowProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-6 border-b border-border-default py-4 last:border-b-0",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <p className="text-ui-md font-semibold text-fg-primary">{title}</p>
        {description != null ? (
          <p className="mt-0.5 text-body-sm text-fg-secondary">{description}</p>
        ) : null}
      </div>
      {control != null ? <div className="shrink-0">{control}</div> : null}
    </div>
  );
}

SettingsRow.displayName = "SettingsRow";
