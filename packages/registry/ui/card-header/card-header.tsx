import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface CardHeaderProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Primary heading, used when not composing with CardHeaderTitle. */
  title?: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Leading media slot, typically an Avatar. */
  avatar?: React.ReactNode;
  /** Trailing actions slot, typically Button(s). */
  actions?: React.ReactNode;
  /**
   * Extra content below the title row (e.g. Tabs). When present, the header
   * stacks vertically: title row, then children.
   */
  children?: React.ReactNode;
}

/**
 * Reusable card header strip: layout shell with optional avatar / title /
 * description / actions / tabs slots · no interactive role of its own · pass
 * focusable controls via the actions / children slots (they must carry
 * shadow-glow-focus themselves) · compose with CardHeaderTitle /
 * CardHeaderDescription / CardHeaderActions / CardHeaderMedia when you need
 * finer control than the convenience props
 */
export function CardHeader({
  ref,
  className,
  title,
  description,
  avatar,
  actions,
  children,
  ...props
}: CardHeaderProps) {
  const hasConvenienceContent =
    title != null || description != null || avatar != null || actions != null;
  const hasTabsSlot = children != null;

  return (
    <div
      ref={ref}
      className={cn("flex w-full flex-col gap-3 px-5 py-4", className)}
      {...props}
    >
      {hasConvenienceContent ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {avatar ? <div className="shrink-0">{avatar}</div> : null}
            <div className="flex min-w-0 flex-col gap-0.5">
              {title != null ? (
                <CardHeaderTitle>{title}</CardHeaderTitle>
              ) : null}
              {description != null ? (
                <CardHeaderDescription>{description}</CardHeaderDescription>
              ) : null}
            </div>
          </div>
          {actions != null ? (
            <CardHeaderActions>{actions}</CardHeaderActions>
          ) : null}
        </div>
      ) : null}
      {hasTabsSlot ? children : null}
    </div>
  );
}

CardHeader.displayName = "CardHeader";

export interface CardHeaderTitleProps
  extends React.ComponentPropsWithRef<"p"> {}

export function CardHeaderTitle({
  ref,
  className,
  ...props
}: CardHeaderTitleProps) {
  return (
    <p
      ref={ref}
      className={cn("text-ui-md font-semibold text-fg-primary", className)}
      {...props}
    />
  );
}

CardHeaderTitle.displayName = "CardHeaderTitle";

export interface CardHeaderDescriptionProps
  extends React.ComponentPropsWithRef<"p"> {}

export function CardHeaderDescription({
  ref,
  className,
  ...props
}: CardHeaderDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn("text-ui-sm text-fg-tertiary", className)}
      {...props}
    />
  );
}

CardHeaderDescription.displayName = "CardHeaderDescription";

export interface CardHeaderActionsProps
  extends React.ComponentPropsWithRef<"div"> {}

export function CardHeaderActions({
  ref,
  className,
  ...props
}: CardHeaderActionsProps) {
  return (
    <div
      ref={ref}
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  );
}

CardHeaderActions.displayName = "CardHeaderActions";

export interface CardHeaderMediaProps
  extends React.ComponentPropsWithRef<"div"> {}

/** Avatar / leading-media slot for composition API usage. */
export function CardHeaderMedia({
  ref,
  className,
  ...props
}: CardHeaderMediaProps) {
  return <div ref={ref} className={cn("shrink-0", className)} {...props} />;
}

CardHeaderMedia.displayName = "CardHeaderMedia";
