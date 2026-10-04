import { cn } from "@paubha/registry/lib/cn";
import { Check } from "lucide-react";
import type * as React from "react";
import { Card, CardContent } from "../card/card";

export interface PricingCardProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  name: React.ReactNode;
  description?: React.ReactNode;
  /** Price amount (e.g. `$49` or a node). */
  price: React.ReactNode;
  /** Period label after price, defaults to `/ mo`. */
  period?: React.ReactNode;
  features?: React.ReactNode[];
  /** CTA slot, usually a Button or Link. */
  action?: React.ReactNode;
  /** Badge slot (e.g. Popular). */
  badge?: React.ReactNode;
  /** Highlights the plan with brand border. */
  featured?: boolean;
}

/**
 * Pricing plan card · role from Card (article) · feature list is decorative
 * relative to name/price · CTA focus handled by the action slot
 */
export function PricingCard({
  ref,
  className,
  name,
  description,
  price,
  period = "/ mo",
  features,
  action,
  badge,
  featured = false,
  ...props
}: PricingCardProps) {
  return (
    <Card
      ref={ref}
      variant={featured ? "elevated" : "outlined"}
      className={cn(
        "hover:bg-bg-primary",
        featured && "border border-border-brand ring-1 ring-border-brand",
        className,
      )}
      {...props}
    >
      <CardContent className="flex h-full flex-col gap-5 p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-ui-lg font-semibold text-fg-primary">{name}</p>
            {description != null ? (
              <p className="mt-1 text-body-sm text-fg-secondary">
                {description}
              </p>
            ) : null}
          </div>
          {badge != null ? <div className="shrink-0">{badge}</div> : null}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-display-xs font-semibold text-fg-primary">
            {price}
          </span>
          {period != null ? (
            <span className="text-ui-sm text-fg-tertiary">{period}</span>
          ) : null}
        </div>
        {features != null && features.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {features.map((feature, i) => (
              <li
                key={
                  typeof feature === "string" || typeof feature === "number"
                    ? String(feature)
                    : i
                }
                className="flex items-start gap-2 text-body-sm text-fg-secondary"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-fg-success"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {action != null ? (
          <div className="mt-auto w-full [&_a]:w-full [&_button]:w-full">
            {action}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

PricingCard.displayName = "PricingCard";

export interface PricingCardGridProps
  extends React.ComponentPropsWithRef<"div"> {}

export function PricingCardGrid({
  ref,
  className,
  ...props
}: PricingCardGridProps) {
  return (
    <div
      ref={ref}
      className={cn("grid w-full gap-4 lg:grid-cols-3", className)}
      {...props}
    />
  );
}

PricingCardGrid.displayName = "PricingCardGrid";
