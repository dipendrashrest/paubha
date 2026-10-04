import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface MarketingHeroProps
  extends Omit<React.ComponentPropsWithRef<"section">, "title"> {
  /** Optional badge / eyebrow above the title. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary / secondary CTA group. */
  actions?: React.ReactNode;
  /** Optional media / product preview column. */
  media?: React.ReactNode;
  /** Fine print under actions. */
  footnote?: React.ReactNode;
}

/**
 * Marketing page hero shell · one composition: brand-level title + one supporting
 * line + CTA group + optional media · no interactive role of its own
 */
export function MarketingHero({
  ref,
  className,
  eyebrow,
  title,
  description,
  actions,
  media,
  footnote,
  ...props
}: MarketingHeroProps) {
  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden border-b border-border-default",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-20",
          media != null &&
            "lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-20",
        )}
      >
        <div className="flex flex-col gap-6">
          {eyebrow != null ? <div>{eyebrow}</div> : null}
          <h1 className="max-w-xl text-balance text-display-lg font-semibold tracking-[-0.04em] text-fg-primary">
            {title}
          </h1>
          {description != null ? (
            <p className="max-w-md text-balance text-body-lg text-fg-secondary">
              {description}
            </p>
          ) : null}
          {actions != null ? (
            <div className="flex flex-wrap items-center gap-3">{actions}</div>
          ) : null}
          {footnote != null ? (
            <p className="text-ui-sm text-fg-tertiary">{footnote}</p>
          ) : null}
        </div>
        {media != null ? <div className="min-w-0">{media}</div> : null}
      </div>
    </section>
  );
}

MarketingHero.displayName = "MarketingHero";
