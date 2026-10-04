import { cn } from "@paubha/registry/lib/cn";
import * as React from "react";
import { Divider } from "../divider/divider";

export interface FeatureListItemProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

/**
 * Single feature row · icon is decorative · title + description for content
 */
export function FeatureListItem({
  ref,
  className,
  icon,
  title,
  description,
  ...props
}: FeatureListItemProps) {
  const hasIcon = icon != null;

  return (
    <div
      ref={ref}
      className={cn(
        "grid gap-4 py-8 sm:gap-8",
        hasIcon
          ? "sm:grid-cols-[2.5rem_1fr_1.2fr]"
          : "sm:grid-cols-[1fr_1.2fr]",
        className,
      )}
      {...props}
    >
      {hasIcon ? (
        <span className="flex size-10 items-center justify-center rounded-md bg-bg-brand-subtle text-fg-brand [&_svg]:size-5">
          {icon}
        </span>
      ) : null}
      <h3 className="text-ui-lg font-semibold text-fg-primary">{title}</h3>
      {description != null ? (
        <p className="text-body-md text-fg-secondary">{description}</p>
      ) : null}
    </div>
  );
}

FeatureListItem.displayName = "FeatureListItem";

export interface FeatureListProps extends React.ComponentPropsWithRef<"div"> {
  /** Insert Dividers between children. */
  divided?: boolean;
}

/**
 * Stacked feature rows for marketing · no interactive role · Dividers optional
 */
export function FeatureList({
  ref,
  className,
  divided = true,
  children,
  ...props
}: FeatureListProps) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div ref={ref} className={cn("flex w-full flex-col", className)} {...props}>
      {items.map((child, i) => (
        <div key={i}>
          {divided && i > 0 ? <Divider className="my-0" /> : null}
          {child}
        </div>
      ))}
    </div>
  );
}

FeatureList.displayName = "FeatureList";
