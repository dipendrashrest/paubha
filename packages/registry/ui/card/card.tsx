import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/cn";

const cardVariants = cva("flex flex-col overflow-hidden rounded-lg text-left outline-none", {
  variants: {
    variant: {
      default: "border border-border-default bg-bg-primary hover:bg-bg-secondary hover:shadow-sm",
      outlined: "border border-border-strong bg-bg-primary hover:bg-bg-secondary hover:shadow-sm",
      elevated: "bg-bg-primary shadow-sm hover:shadow-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends Omit<React.ComponentPropsWithRef<"div">, "onClick">,
    VariantProps<typeof cardVariants> {
  /** Renders the card as an interactive element: role="button", focusable, Enter/Space activates. */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * role="article" by default · interactive cards (onClick supplied) get role="button",
 * tabIndex=0, and Enter/Space activation, matching a real button · focus ring visible via
 * shadow-glow-focus when interactive · ensure sufficient contrast between the card
 * background and its content text
 */
export function Card({
  ref,
  className,
  variant,
  onClick,
  children,
  ...props
}: CardProps) {
  const interactive = Boolean(onClick);

  return (
    <div
      ref={ref}
      role={interactive ? "button" : "article"}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
      className={cn(
        cardVariants({ variant }),
        interactive && "cursor-pointer focus-visible:shadow-[var(--shadow-glow-focus)]",
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
  /** Required — pass "" for a purely decorative image. */
  alt: string;
}

export function CardImage({ className, alt, ...props }: CardImageProps) {
  return (
    <img
      className={cn("h-40 w-full shrink-0 bg-bg-tertiary object-cover", className)}
      {...props}
      alt={alt}
    />
  );
}

CardImage.displayName = "CardImage";

export function CardContent({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("flex flex-col gap-2 p-4", className)} {...props} />;
}

CardContent.displayName = "CardContent";

export function CardTitle({ className, ...props }: React.ComponentPropsWithRef<"p">) {
  return (
    <p
      className={cn("text-body-md font-semibold text-fg-primary", className)}
      {...props}
    />
  );
}

CardTitle.displayName = "CardTitle";

export function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  return <p className={cn("text-body-sm text-fg-secondary", className)} {...props} />;
}

CardDescription.displayName = "CardDescription";

export { cardVariants };
