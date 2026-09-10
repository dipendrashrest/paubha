import { type VariantProps, cva } from "class-variance-authority";
import { Info, X } from "lucide-react";
import type * as React from "react";
import { cn } from "../../lib/cn";

const alertVariants = cva(
  "flex w-full items-start gap-3 rounded-sm border p-4",
  {
    variants: {
      variant: {
        info: "border-border-info bg-bg-info-subtle text-fg-info",
        success: "border-border-success bg-bg-success-subtle text-fg-success",
        warning: "border-border-warning bg-bg-warning-subtle text-fg-warning",
        error: "border-border-error bg-bg-error-subtle text-fg-error",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

export type AlertVariant = NonNullable<
  VariantProps<typeof alertVariants>["variant"]
>;

// error/warning interrupt (role=alert, assertive); info/success are ambient updates (role=status, polite)
const roleByVariant: Record<AlertVariant, "alert" | "status"> = {
  info: "status",
  success: "status",
  warning: "alert",
  error: "alert",
};

export interface AlertProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
}

/**
 * role=alert (error/warning) or role=status (info/success) · dismiss button has
 * aria-label="Dismiss" · auto-announced by screen readers
 */
export function Alert({
  ref,
  className,
  variant = "info",
  title,
  description,
  actionLabel,
  onAction,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      ref={ref}
      role={roleByVariant[variant]}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Info aria-hidden="true" className="size-5 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        {title ? (
          <p className="w-full text-ui-md font-medium">{title}</p>
        ) : null}
        {description ? (
          <p className="w-full text-body-sm text-fg-secondary">{description}</p>
        ) : null}
        {actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className={cn(
              "rounded-xs px-2 py-1 text-ui-sm font-medium",
              "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
            )}
          >
            {actionLabel}
          </button>
        ) : null}
        {children}
      </div>
      {dismissible ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className={cn(
            "size-4 shrink-0 rounded-xs outline-none",
            "focus-visible:shadow-[var(--shadow-glow-focus)]",
          )}
        >
          <X className="size-full" />
        </button>
      ) : null}
    </div>
  );
}

Alert.displayName = "Alert";

export { alertVariants };
