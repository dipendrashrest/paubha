import { cn } from "@paubha/registry/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import type * as React from "react";

// Heights are fixed (20/28/32) so the 1px outline border sits inside the box,
// matching Figma's inside stroke; every fill reserves the same transparent border.
const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-transparent font-medium",
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
        outline: "",
        solid: "",
      },
      size: {
        sm: "h-5 px-2 text-ui-xs",
        md: "h-7 px-3 text-ui-sm",
        lg: "h-8 px-4 text-ui-md",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // subtle: tinted background, colored text, no border
      {
        variant: "gray",
        fill: "subtle",
        className: "bg-bg-secondary text-fg-primary",
      },
      {
        variant: "brand",
        fill: "subtle",
        className: "bg-bg-brand-subtle text-fg-brand",
      },
      {
        variant: "success",
        fill: "subtle",
        className: "bg-bg-success-subtle text-fg-success",
      },
      {
        variant: "warning",
        fill: "subtle",
        className: "bg-bg-warning-subtle text-fg-warning",
      },
      {
        variant: "error",
        fill: "subtle",
        className: "bg-bg-error-subtle text-fg-error",
      },
      // outline: transparent background, colored border + text
      {
        variant: "gray",
        fill: "outline",
        className: "border-border-default text-fg-primary",
      },
      {
        variant: "brand",
        fill: "outline",
        className: "border-border-brand text-fg-brand",
      },
      {
        variant: "success",
        fill: "outline",
        className: "border-border-success text-fg-success",
      },
      {
        variant: "warning",
        fill: "outline",
        className: "border-border-warning text-fg-warning",
      },
      {
        variant: "error",
        fill: "outline",
        className: "border-border-error text-fg-error",
      },
      // solid: filled background, on-color text (gray uses tertiary bg per Figma)
      {
        variant: "gray",
        fill: "solid",
        className: "bg-bg-tertiary text-fg-primary",
      },
      {
        variant: "brand",
        fill: "solid",
        className: "bg-bg-brand-solid text-fg-on-brand",
      },
      {
        variant: "success",
        fill: "solid",
        className: "bg-bg-success-solid text-fg-on-success",
      },
      {
        variant: "warning",
        fill: "solid",
        className: "bg-bg-warning-solid text-fg-on-warning",
      },
      {
        variant: "error",
        fill: "solid",
        className: "bg-bg-error-solid text-fg-on-error",
      },
    ],
    defaultVariants: {
      variant: "gray",
      fill: "subtle",
      size: "sm",
      iconOnly: false,
    },
  },
);

type BadgeSize = "sm" | "md" | "lg";

const slotSize: Record<
  BadgeSize,
  { icon: string; dot: string; avatar: string; dismiss: string }
> = {
  sm: { icon: "size-4", dot: "size-1.5", avatar: "size-3", dismiss: "size-3" },
  md: {
    icon: "size-5",
    dot: "size-2",
    avatar: "size-3.5",
    dismiss: "size-3.5",
  },
  lg: { icon: "size-5", dot: "size-2", avatar: "size-3.5", dismiss: "size-4" },
};

export interface BadgeProps
  extends React.ComponentPropsWithRef<"span">,
    VariantProps<typeof badgeVariants> {
  /** Leading icon slot (Lucide), sized 16px (sm) / 20px (md, lg). Decorative. */
  leadingIcon?: React.ReactNode;
  /** Leading avatar slot, sized 12px (sm) / 14px (md, lg). */
  leadingAvatar?: React.ReactNode;
  /** Trailing icon slot (Lucide), sized 16px (sm) / 20px (md, lg). Decorative. */
  trailingIcon?: React.ReactNode;
  /** Shows a small decorative status dot before the label. */
  showDot?: boolean;
  /** Shows a dismiss button after the label. */
  dismissible?: boolean;
  /** Called when the dismiss button is activated. */
  onDismiss?: () => void;
  /** Accessible name for the dismiss button, e.g. "Remove Design category". */
  dismissLabel?: string;
  /**
   * Renders the icon-only type (no visible label); pass the icon as children and
   * an `aria-label` — the badge is then exposed as role="img" with that name.
   */
  iconOnly?: boolean;
}

/**
 * Static badges are ordinary text (no role) — pass role="status" only when the
 * badge announces a meaningful live update · icon-only badges render role=img and
 * need aria-label · dot, icon, and avatar slots are decorative (aria-hidden) ·
 * dismiss button is a native button (Tab to focus, Enter/Space activates) with a
 * specific aria-label (dismissLabel) and glow-focus ring · never rely on color alone
 */
export function Badge({
  ref,
  className,
  variant,
  fill,
  size,
  iconOnly = false,
  leadingIcon,
  leadingAvatar,
  trailingIcon,
  showDot = false,
  dismissible = false,
  onDismiss,
  dismissLabel = "Remove",
  role,
  children,
  ...props
}: BadgeProps) {
  const slots = slotSize[size ?? "sm"];

  return (
    <span
      ref={ref}
      role={role ?? (iconOnly ? "img" : undefined)}
      className={cn(
        badgeVariants({ variant, fill, size, iconOnly }),
        className,
      )}
      {...props}
    >
      {iconOnly ? (
        <span
          aria-hidden="true"
          className={cn(slots.icon, "inline-flex shrink-0 [&>svg]:size-full")}
        >
          {children}
        </span>
      ) : (
        <>
          {leadingIcon ? (
            <span
              aria-hidden="true"
              className={cn(
                slots.icon,
                "inline-flex shrink-0 [&>svg]:size-full",
              )}
            >
              {leadingIcon}
            </span>
          ) : null}
          {leadingAvatar ? (
            <span
              aria-hidden="true"
              className={cn(
                slots.avatar,
                "inline-flex shrink-0 overflow-hidden rounded-full [&>*]:size-full",
              )}
            >
              {leadingAvatar}
            </span>
          ) : null}
          {showDot ? (
            <span
              aria-hidden="true"
              className={cn(slots.dot, "shrink-0 rounded-full bg-current")}
            />
          ) : null}
          {children}
          {trailingIcon ? (
            <span
              aria-hidden="true"
              className={cn(
                slots.icon,
                "inline-flex shrink-0 [&>svg]:size-full",
              )}
            >
              {trailingIcon}
            </span>
          ) : null}
        </>
      )}
      {dismissible ? (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className={cn(
            slots.dismiss,
            "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full text-current outline-none",
            "focus-visible:shadow-[var(--shadow-glow-focus)]",
          )}
        >
          <X aria-hidden="true" className="size-full" />
        </button>
      ) : null}
    </span>
  );
}

Badge.displayName = "Badge";

export { badgeVariants };
