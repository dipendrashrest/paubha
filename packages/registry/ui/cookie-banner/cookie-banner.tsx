import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

export interface CookieBannerProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Accept / decline / settings buttons. */
  actions?: React.ReactNode;
}

/**
 * Cookie / consent bar · role=region · actions carry glow-focus from Button
 */
export function CookieBanner({
  ref,
  className,
  title = "We use cookies",
  description = "Necessary cookies keep the site working. Optional ones help us improve Paubha.",
  actions,
  ...props
}: CookieBannerProps) {
  const titleId =
    typeof title === "string" ? "cookie-banner-title" : undefined;

  return (
    <div
      ref={ref}
      role="region"
      aria-labelledby={titleId}
      className={cn(
        "flex w-full flex-col gap-4 rounded-md border border-border-default bg-bg-elevated p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        {title != null ? (
          <p
            id={titleId}
            className="text-ui-md font-semibold text-fg-primary"
          >
            {title}
          </p>
        ) : null}
        {description != null ? (
          <p className="mt-0.5 text-body-sm text-fg-secondary">{description}</p>
        ) : null}
      </div>
      {actions != null ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

CookieBanner.displayName = "CookieBanner";
