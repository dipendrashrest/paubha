import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

export interface IconListItemProps
  extends Omit<React.ComponentPropsWithRef<"li">, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

/**
 * Icon + title + description row · icon decorative · list semantics from parent
 */
export function IconListItem({
  ref,
  className,
  icon,
  title,
  description,
  ...props
}: IconListItemProps) {
  return (
    <li ref={ref} className={cn("flex gap-3", className)} {...props}>
      {icon != null ? (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-bg-secondary text-fg-brand [&_svg]:size-5">
          {icon}
        </span>
      ) : null}
      <div className="min-w-0">
        <p className="text-ui-md font-semibold text-fg-primary">{title}</p>
        {description != null ? (
          <p className="text-body-sm text-fg-secondary">{description}</p>
        ) : null}
      </div>
    </li>
  );
}

IconListItem.displayName = "IconListItem";

export interface IconListProps extends React.ComponentPropsWithRef<"ul"> {}

/**
 * Stacked icon rows for contact / detail lists · role=list · no interactive chrome
 */
export function IconList({ ref, className, ...props }: IconListProps) {
  return (
    <ul
      ref={ref}
      className={cn("flex flex-col gap-5", className)}
      {...props}
    />
  );
}

IconList.displayName = "IconList";
