import { cn } from "@paubha/registry/lib/cn";
import { X } from "lucide-react";
import type * as React from "react";

export type InlineCtaVariant = "banner" | "card" | "link" | "floating";

export interface InlineCtaProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  variant?: InlineCtaVariant;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

/**
 * Contextual promo / nudge · role=region when titled · dismiss button
 * aria-label="Dismiss" · focus-visible:shadow-glow-focus on dismiss
 */
export function InlineCta({
  ref,
  className,
  variant = "banner",
  icon,
  title,
  description,
  actions,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: InlineCtaProps) {
  const isCard = variant === "card";
  const isLink = variant === "link";
  const isFloating = variant === "floating";

  return (
    <div
      ref={ref}
      role={title != null ? "region" : undefined}
      aria-label={typeof title === "string" ? title : undefined}
      className={cn(
        "relative flex w-full gap-3",
        isCard &&
          "flex-col rounded-md border border-border-default bg-bg-primary p-5 shadow-xs",
        (variant === "banner" || isFloating) &&
          "items-center rounded-md border border-border-brand bg-bg-brand-subtle px-4 py-3",
        isLink && "items-center border-b border-border-default py-3",
        isFloating && "w-auto shadow-sm",
        className,
      )}
      {...props}
    >
      {icon != null ? (
        <div className="shrink-0 text-fg-brand [&_svg]:size-5">{icon}</div>
      ) : null}
      <div
        className={cn(
          "flex min-w-0 flex-1",
          isCard
            ? "flex-col gap-1"
            : "flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3",
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          {title != null ? (
            <p className="text-ui-md font-semibold text-fg-primary">{title}</p>
          ) : null}
          {description != null ? (
            <p className="text-body-sm text-fg-secondary">{description}</p>
          ) : null}
          {children}
        </div>
        {actions != null ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="shrink-0 rounded-sm p-1 text-fg-tertiary transition-colors hover:bg-bg-secondary-hover hover:text-fg-primary focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

InlineCta.displayName = "InlineCta";
