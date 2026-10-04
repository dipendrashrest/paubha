import { cn } from "@paubha/registry/lib/cn";
import * as React from "react";

export interface CookieBannerProps
  extends Omit<React.ComponentPropsWithRef<"section">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Accept / decline / settings buttons. */
  actions?: React.ReactNode;
}

/**
 * Cookie / consent bar · <section> labelled by its title = region landmark · Reject has equal weight to Accept · actions are native buttons with glow-focus (from Button) · Tab moves between actions · stacks vertically below sm
 */
export function CookieBanner({
  ref,
  className,
  title = "We use cookies",
  description = "Necessary cookies keep the site working. Optional ones help us improve Paubha.",
  actions,
  ...props
}: CookieBannerProps) {
  const uid = React.useId();
  const titleId = title != null ? `${uid}-title` : undefined;

  return (
    <section
      ref={ref}
      aria-labelledby={titleId}
      className={cn(
        "flex w-full flex-col gap-4 rounded-md border border-border-default bg-bg-elevated p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        {title != null ? (
          <p id={titleId} className="text-ui-md font-semibold text-fg-primary">
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
    </section>
  );
}

CookieBanner.displayName = "CookieBanner";
