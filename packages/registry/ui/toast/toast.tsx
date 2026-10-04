"use client";

import { cn } from "@paubha/registry/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import * as React from "react";

// Figma (node 6089:35745): the whole card is tinted per variant (bg/{variant}-subtle);
// the status icon sits in a 32px round chip filled with the variant's 100 step.
const toastVariants = cva(
  "flex w-90 items-start gap-3 rounded-lg p-4 shadow-sm",
  {
    variants: {
      variant: {
        info: "bg-bg-info-subtle text-fg-info",
        success: "bg-bg-success-subtle text-fg-success",
        warning: "bg-bg-warning-subtle text-fg-warning",
        error: "bg-bg-error-subtle text-fg-error",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

export type ToastVariant = NonNullable<
  VariantProps<typeof toastVariants>["variant"]
>;

// Figma binds the chip fill to the primitive {variant}/100 — no semantic token exists yet.
const chipByVariant: Record<ToastVariant, string> = {
  info: "bg-(--info-100)",
  success: "bg-(--success-100)",
  warning: "bg-(--warning-100)",
  error: "bg-(--error-100)",
};

// Same per-variant glyph mapping as Alert (Figma ships a distinct status icon per variant).
const iconByVariant: Record<ToastVariant, typeof Info> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
};

export interface ToastProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title">,
    VariantProps<typeof toastVariants> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Called when the close button is activated or Escape is pressed. Omit to hide the close button. */
  onDismiss?: () => void;
}

/**
 * role="alert" · aria-live="assertive" for error/warning, "polite" for info/success ·
 * announced without moving focus · Tab reaches the dismiss button (aria-label="Dismiss",
 * glow-focus ring) · Escape dismisses while focus is inside the toast · timeout is
 * configurable via `duration`
 */
export function Toast({
  ref,
  className,
  variant = "info",
  title,
  description,
  onDismiss,
  onKeyDown,
  ...props
}: ToastProps) {
  const resolved = variant ?? "info";
  const VariantIcon = iconByVariant[resolved];
  return (
    <div
      ref={ref}
      role="alert"
      aria-live={
        variant === "error" || variant === "warning" ? "assertive" : "polite"
      }
      className={cn(toastVariants({ variant }), className)}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.key === "Escape" && onDismiss && !event.defaultPrevented) {
          onDismiss();
        }
      }}
      {...props}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          chipByVariant[resolved],
        )}
      >
        <VariantIcon aria-hidden="true" className="size-5" />
      </span>
      <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-ui-md font-semibold text-fg-primary">{title}</p>
          {description ? (
            <p className="text-ui-sm text-fg-secondary">{description}</p>
          ) : null}
        </div>
        {onDismiss ? (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
            className={cn(
              "shrink-0 rounded-xs text-fg-tertiary outline-none transition-colors",
              "hover:text-fg-secondary focus-visible:shadow-[var(--shadow-glow-focus)]",
            )}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

Toast.displayName = "Toast";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  /** Milliseconds before auto-dismiss. Set to 0 to disable auto-dismiss. */
  duration?: number;
}

interface ToastEntry extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

/** Figma usage note: never stack three or more toasts — the oldest is dropped. */
const MAX_VISIBLE_TOASTS = 2;

const ToastContext = React.createContext<ToastContextValue | null>(null);

/** Imperative toast API. Call from inside a <ToastProvider>. */
export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return context;
}

let nextToastId = 0;

/**
 * Wrap the app (or a subtree) in <ToastProvider> and call useToast().toast({...}) to
 * show a toast. Renders its own fixed-position stack (max 2), no separate <Toaster /> needed.
 */
export function ToastProvider({
  children,
  duration: defaultDuration = 6000,
}: {
  children: React.ReactNode;
  duration?: number;
}) {
  const [toasts, setToasts] = React.useState<ToastEntry[]>([]);

  const dismiss = React.useCallback((id: number) => {
    setToasts((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const toast = React.useCallback(
    ({ duration = defaultDuration, ...options }: ToastOptions) => {
      const id = nextToastId++;
      setToasts((current) =>
        [...current, { id, duration, ...options }].slice(-MAX_VISIBLE_TOASTS),
      );
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [defaultDuration, dismiss],
  );

  const value = React.useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-(--z-toast) flex flex-col items-end gap-3 p-6 sm:inset-x-auto sm:right-0"
        aria-live="off"
      >
        {toasts.map(({ id, ...entry }) => (
          <div key={id} className="pointer-events-auto">
            <Toast {...entry} onDismiss={() => dismiss(id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
