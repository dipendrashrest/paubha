import { cn } from "@paubha/registry/lib/cn";
import { ArrowRight, X } from "lucide-react";
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
          "flex-col gap-5 rounded-md border border-border-default bg-bg-primary p-6",
        variant === "banner" &&
          "items-center rounded-md border border-border-brand bg-bg-brand-subtle px-4 py-3",
        isLink &&
          "items-center gap-1 rounded-sm border border-border-default bg-bg-brand-subtle px-4 py-3",
        isFloating &&
          "w-auto items-center rounded-full border border-border-default bg-bg-elevated py-1.5 pr-4 pl-1.5 shadow-sm",
        className,
      )}
      {...props}
    >
      {icon != null ? (
        <div
          className={cn(
            "shrink-0 text-fg-brand [&_svg]:size-5",
            isFloating &&
              "flex size-[34px] items-center justify-center rounded-full bg-bg-brand-subtle",
          )}
        >
          {icon}
        </div>
      ) : null}
      <div
        className={cn(
          "flex min-w-0 flex-1",
          isCard
            ? "flex-col gap-5"
            : isLink
              ? "flex-wrap items-center gap-1"
              : "flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3",
        )}
      >
        <div
          className={cn(
            "flex min-w-0 flex-col",
            isCard ? "gap-1.5" : "gap-0.5",
            !isCard && !isLink && "flex-1",
          )}
        >
          {title != null ? (
            <p
              className={cn(
                "text-fg-primary",
                isCard
                  ? "text-display-xs font-semibold"
                  : "text-ui-md font-medium",
              )}
            >
              {title}
            </p>
          ) : null}
          {description != null ? (
            <p className="text-body-sm text-fg-secondary">{description}</p>
          ) : null}
          {children}
        </div>
        {actions != null ? (
          <div
            className={cn(
              "flex shrink-0 items-center",
              isLink ? "gap-1 text-ui-md font-medium text-fg-link" : "gap-3",
            )}
          >
            {actions}
          </div>
        ) : null}
      </div>
      {isFloating && !dismissible ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 text-fg-tertiary"
        />
      ) : null}
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
