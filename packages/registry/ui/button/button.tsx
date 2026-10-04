import { cn } from "@paubha/registry/lib/cn";
import { withIconSize } from "@paubha/registry/lib/with-icon-size";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "rounded-sm font-medium transition-colors",
    "disabled:pointer-events-none disabled:opacity-100",
    "focus-visible:outline-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-bg-brand-solid text-fg-on-brand shadow-sm",
          "hover:bg-bg-brand-solid-hover",
          "active:bg-bg-brand-solid-active",
          "disabled:bg-bg-disabled disabled:text-fg-disabled disabled:shadow-none",
        ].join(" "),
        secondary: [
          "border border-border-default bg-bg-primary text-fg-primary shadow-xs",
          "hover:border-border-strong hover:bg-bg-secondary-hover",
          "active:border-border-strong active:bg-bg-tertiary",
          "focus-visible:border-border-brand",
          "disabled:bg-bg-primary disabled:text-fg-disabled disabled:border-border-default",
        ].join(" "),
        tertiary: [
          "bg-transparent text-fg-primary",
          "hover:bg-bg-tertiary-hover",
          "active:bg-bg-tertiary",
          "disabled:bg-transparent disabled:text-fg-disabled",
        ].join(" "),
        // Figma: Link keeps fg/brand across hover/active, no underline.
        link: [
          "bg-transparent text-fg-brand",
          "disabled:bg-transparent disabled:text-fg-disabled",
        ].join(" "),
      },
      destructive: {
        false: "focus-visible:shadow-[var(--shadow-glow-focus)]",
        true: "focus-visible:shadow-[var(--shadow-glow-focus-error)]",
      },
      size: {
        sm: "h-8 gap-1 px-3 text-ui-md",
        md: "h-10 gap-2 px-4 text-ui-lg",
        lg: "h-12 gap-2 px-5 text-ui-lg",
        xl: "h-14 gap-3 px-6 text-ui-lg",
        "2xl": "h-16 gap-3 px-8 text-ui-lg",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        destructive: true,
        className: [
          "bg-bg-error-solid text-fg-on-error",
          "hover:bg-bg-error-solid-hover",
          "active:bg-bg-error-solid-active",
        ].join(" "),
      },
      {
        variant: "secondary",
        destructive: true,
        className: [
          "border-border-error text-fg-error",
          "hover:border-border-error hover:bg-bg-error-subtle",
          "active:border-border-error active:bg-bg-error-subtle",
          "focus-visible:border-border-error",
        ].join(" "),
      },
      {
        variant: ["tertiary", "link"],
        destructive: true,
        className: [
          "text-fg-error",
          "hover:bg-bg-error-subtle",
          "active:bg-bg-error-subtle",
        ].join(" "),
      },
    ],
    defaultVariants: {
      variant: "primary",
      destructive: false,
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ComponentPropsWithRef<"button">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  /** Destructive intent, independent of `variant`. Swaps to error colors and the error focus ring. */
  destructive?: boolean;
  /** Instance-swap icon slot rendered before the label. Sized to match the button's `size`. */
  leadingIcon?: React.ReactNode;
  /** Instance-swap icon slot rendered after the label. Sized to match the button's `size`. */
  trailingIcon?: React.ReactNode;
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 animate-spin", className)}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * role=button · Enter/Space activates · focus ring visible on Tab (glow-focus-error when destructive) · disabled prevents interaction · loading state announces via aria-busy
 */
export function Button({
  ref,
  className,
  variant,
  destructive = false,
  size = "md",
  loading = false,
  disabled,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  // Icon sizes per Figma (canvas 2120:2, node 2121:38/2121:74/2121:110):
  // sm -> 16px, md/lg -> 20px, xl/2xl -> 24px.
  const iconSizeClassName =
    size === "xl" || size === "2xl"
      ? "size-6"
      : size === "sm"
        ? "size-4"
        : "size-5";

  return (
    <button
      ref={ref}
      type="button"
      className={cn(buttonVariants({ variant, destructive, size }), className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {leadingIcon ? withIconSize(leadingIcon, iconSizeClassName) : null}
      {children}
      {loading ? (
        <Spinner className={iconSizeClassName} />
      ) : trailingIcon ? (
        withIconSize(trailingIcon, iconSizeClassName)
      ) : null}
    </button>
  );
}

Button.displayName = "Button";

export { buttonVariants };
