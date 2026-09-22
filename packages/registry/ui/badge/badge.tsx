import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full border font-medium",
  {
    variants: {
      variant: {
        gray: "",
        brand: "",
        success: "",
        warning: "",
        error: "",
      },
      fill: {
        subtle: "",
        outline: "border-solid",
        solid: "border-transparent",
      },
      size: {
        sm: "px-2 py-0.5 text-ui-xs",
        md: "px-3 py-1 text-ui-sm",
      },
      iconOnly: {
        true: "aspect-square p-1",
        false: "",
      },
    },
    compoundVariants: [
      // subtle (bg-*-subtle, colored text, colored border) — the original default look
      { variant: "gray", fill: "subtle", className: "border-border-default bg-bg-secondary text-fg-primary" },
      { variant: "brand", fill: "subtle", className: "border-border-brand bg-bg-brand-subtle text-fg-brand" },
      { variant: "success", fill: "subtle", className: "border-border-success bg-bg-success-subtle text-fg-success" },
      { variant: "warning", fill: "subtle", className: "border-border-warning bg-bg-warning-subtle text-fg-warning" },
      { variant: "error", fill: "subtle", className: "border-border-error bg-bg-error-subtle text-fg-error" },
      // outline (transparent bg, colored border + text)
      { variant: "gray", fill: "outline", className: "border-border-default text-fg-primary" },
      { variant: "brand", fill: "outline", className: "border-border-brand text-fg-brand" },
      { variant: "success", fill: "outline", className: "border-border-success text-fg-success" },
      { variant: "warning", fill: "outline", className: "border-border-warning text-fg-warning" },
      { variant: "error", fill: "outline", className: "border-border-error text-fg-error" },
      // solid (filled bg, on-color text) — gray has no dedicated solid token, uses tertiary bg
      { variant: "gray", fill: "solid", className: "bg-bg-tertiary text-fg-primary" },
      { variant: "brand", fill: "solid", className: "bg-bg-brand-solid text-fg-on-brand" },
      { variant: "success", fill: "solid", className: "bg-bg-success-solid text-fg-on-success" },
      { variant: "warning", fill: "solid", className: "bg-bg-warning-solid text-fg-on-warning" },
      { variant: "error", fill: "solid", className: "bg-bg-error-solid text-fg-on-error" },
    ],
    defaultVariants: {
      variant: "gray",
      fill: "subtle",
      size: "sm",
      iconOnly: false,
    },
  },
);

export interface BadgeProps
  extends React.ComponentPropsWithRef<"output">,
    VariantProps<typeof badgeVariants> {
  /** Shows a small decorative status dot before the label. */
  showDot?: boolean;
  /** Shows a dismiss button after the label. */
  dismissible?: boolean;
  /** Called when the dismiss button is activated. */
  onDismiss?: () => void;
  /** Renders as a compact icon-only badge (no visible label) — pass an icon as children. */
  iconOnly?: boolean;
}

/**
 * role=status · dismiss button role=button with aria-label="Remove" · dot indicator is
 * decorative (aria-hidden)
 */
export function Badge({
  ref,
  className,
  variant,
  fill,
  size = "sm",
  iconOnly = false,
  showDot = false,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: BadgeProps) {
  const dotSizeClassName = size === "md" ? "size-2" : "size-1.5";
  const dismissSizeClassName = size === "md" ? "size-3.5" : "size-3";

  return (
    <output
      ref={ref}
      className={cn(badgeVariants({ variant, fill, size, iconOnly }), className)}
      {...props}
    >
      {showDot ? (
        <span
          aria-hidden="true"
          className={cn(dotSizeClassName, "shrink-0 rounded-full bg-current")}
        />
      ) : null}
      {children}
      {dismissible ? (
        <button
          type="button"
          aria-label="Remove"
          onClick={onDismiss}
          className={cn(
            dismissSizeClassName,
            "shrink-0 rounded-full text-current outline-none",
            "focus-visible:shadow-[var(--shadow-glow-focus)]",
          )}
        >
          <X className="size-full" />
        </button>
      ) : null}
    </output>
  );
}

Badge.displayName = "Badge";

export { badgeVariants };
