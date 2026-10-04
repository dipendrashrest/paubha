import { cn } from "@paubha/registry/lib/cn";
import { X } from "lucide-react";
import type * as React from "react";

export interface AnnouncementBarProps
  extends Omit<React.ComponentPropsWithRef<"section">, "title"> {
  /** Leading badge / pill slot. */
  badge?: React.ReactNode;
  /** Primary message. */
  children: React.ReactNode;
  /** Trailing link / CTA slot. */
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

/**
 * Site-wide top announcement · section aria-label="Announcement" (region) · Enter/Space dismisses · dismiss aria-label="Dismiss" ·
 * focus-visible:shadow-[var(--shadow-glow-focus)] on dismiss
 */
export function AnnouncementBar({
  ref,
  className,
  badge,
  children,
  action,
  dismissible = false,
  onDismiss,
  ...props
}: AnnouncementBarProps) {
  return (
    <section
      ref={ref}
      aria-label="Announcement"
      className={cn(
        "flex w-full items-center justify-center gap-3 border-b border-border-brand bg-bg-brand-subtle px-4 py-3",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-wrap items-center justify-center gap-2 text-center text-ui-sm font-medium text-fg-primary">
        {badge != null ? <span className="shrink-0">{badge}</span> : null}
        <span className="min-w-0">{children}</span>
        {action != null ? <span className="shrink-0">{action}</span> : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="shrink-0 rounded-sm p-1 text-fg-brand transition-colors hover:bg-bg-secondary-hover focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
        >
          <X aria-hidden="true" className="size-3.5" />
        </button>
      ) : null}
    </section>
  );
}

AnnouncementBar.displayName = "AnnouncementBar";
