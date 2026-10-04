import { cn } from "@paubha/registry/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

// Figma (Paubha-UI / Card, node 8126:19780): State = Default / Hover / Focus /
// Disabled / Error. Hover and Focus are CSS; Disabled and Error are props.
// `outlined` and `elevated` predate the Figma spec and are kept for API
// compatibility.
const cardVariants = cva(
  "group/card flex flex-col overflow-hidden rounded-sm text-left outline-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-border-default bg-bg-primary hover:border-border-strong hover:bg-bg-secondary-hover",
        outlined:
          "border border-border-strong bg-bg-primary hover:bg-bg-secondary-hover",
        elevated: "bg-bg-primary shadow-sm hover:shadow-md",
      },
      disabled: {
        true: "cursor-not-allowed border border-border-disabled bg-bg-disabled text-fg-disabled shadow-none hover:border-border-disabled hover:bg-bg-disabled hover:shadow-none",
        false: "",
      },
      error: {
        true: "border border-border-error bg-bg-error-subtle hover:border-border-error hover:bg-bg-error-subtle",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
      error: false,
    },
  },
);

export interface CardProps
  extends Omit<React.ComponentPropsWithRef<"div">, "onClick">,
    Omit<VariantProps<typeof cardVariants>, "disabled" | "error"> {
  /** Renders the card as an interactive element: role="button", focusable, Enter/Space activates. */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Disabled state: muted surface and text; an interactive card leaves the tab order and ignores activation. */
  disabled?: boolean;
  /** Error state: error-subtle surface and error border. Pair with a `CardMeta` message explaining the problem. */
  error?: boolean;
}

/**
 * role="article" by default · interactive cards (onClick supplied) get role="button",
 * tabIndex=0, and Enter/Space activation, matching a real button · focus ring visible
 * on Tab via shadow-glow-focus (shadow-glow-focus-error in the error state) when
 * interactive · disabled sets aria-disabled, removes the card from the tab order and
 * blocks activation · error is conveyed by visible text (CardMeta), not color alone
 */
export function Card({
  ref,
  className,
  variant,
  onClick,
  disabled = false,
  error = false,
  children,
  ...props
}: CardProps) {
  const interactive = Boolean(onClick);
  const activatable = interactive && !disabled;

  return (
    <div
      ref={ref}
      role={interactive ? "button" : "article"}
      tabIndex={activatable ? 0 : undefined}
      aria-disabled={disabled || undefined}
      data-disabled={disabled ? "" : undefined}
      data-error={error ? "" : undefined}
      onClick={activatable ? onClick : undefined}
      onKeyDown={
        activatable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
      className={cn(
        cardVariants({ variant, disabled, error }),
        activatable &&
          (error
            ? "cursor-pointer focus-visible:shadow-[var(--shadow-glow-focus-error)]"
            : "cursor-pointer focus-visible:border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)]"),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.displayName = "Card";

export interface CardImageProps extends React.ComponentPropsWithRef<"img"> {
  /** Required; pass "" for a purely decorative image. */
  alt: string;
}

export function CardImage({ className, alt, ...props }: CardImageProps) {
  return (
    <img
      className={cn(
        "h-40 w-full shrink-0 bg-bg-tertiary object-cover",
        className,
      )}
      {...props}
      alt={alt}
    />
  );
}

CardImage.displayName = "CardImage";

/** Body region: 32px padding, 16px between header, footer and any other blocks. */
export function CardContent({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-4 p-8", className)} {...props} />
  );
}

CardContent.displayName = "CardContent";

/** Groups eyebrow, title and description with 12px spacing. */
export function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
}

CardHeader.displayName = "CardHeader";

/** Small overline above the title (e.g. category · read time). */
export function CardEyebrow({
  className,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  return (
    <p
      className={cn(
        "text-ui-sm font-medium text-fg-secondary group-data-[disabled]/card:text-fg-disabled",
        className,
      )}
      {...props}
    />
  );
}

CardEyebrow.displayName = "CardEyebrow";

export function CardTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  return (
    <p
      className={cn(
        "text-display-sm font-semibold text-fg-primary group-data-[disabled]/card:text-fg-disabled",
        className,
      )}
      {...props}
    />
  );
}

CardTitle.displayName = "CardTitle";

export function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  return (
    <p
      className={cn(
        "text-body-md text-fg-secondary group-data-[disabled]/card:text-fg-disabled",
        className,
      )}
      {...props}
    />
  );
}

CardDescription.displayName = "CardDescription";

/** Footer below a divider: meta line plus an optional action (e.g. a link Button). */
export function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 border-t border-border-default pt-4",
        className,
      )}
      {...props}
    />
  );
}

CardFooter.displayName = "CardFooter";

/** Footer meta line; switches to fg-error in the error state and fg-disabled when disabled. */
export function CardMeta({
  className,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  return (
    <p
      className={cn(
        "text-ui-sm font-medium text-fg-secondary group-data-[error]/card:text-fg-error group-data-[disabled]/card:text-fg-disabled",
        className,
      )}
      {...props}
    />
  );
}

CardMeta.displayName = "CardMeta";

export { cardVariants };
