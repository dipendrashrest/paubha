"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

const accentVariants = cva("w-1 shrink-0 self-stretch", {
  variants: {
    variant: {
      info: "bg-bg-info-solid",
      success: "bg-bg-success-solid",
      warning: "bg-bg-warning-solid",
      error: "bg-bg-error-solid",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export type ToastVariant = NonNullable<
  VariantProps<typeof accentVariants>["variant"]
>;

export interface ToastProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title">,
    VariantProps<typeof accentVariants> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Called when the close button is activated. Omit to hide the close button. */
  onDismiss?: () => void;
}

/**
 * role="alert" · aria-live="assertive" for error/warning, "polite" for info/success ·
 * content is announced immediately by screen readers on mount · close button has
 * aria-label="Dismiss" · Escape dismisses when rendered via <Toaster />
 */
export function Toast({
  ref,
  className,
  variant = "info",
  title,
  description,
  onDismiss,
  ...props
}: ToastProps) {
  return (
    <div
      ref={ref}
      role="alert"
      aria-live={
        variant === "error" || variant === "warning" ? "assertive" : "polite"
      }
      className={cn(
        "flex w-90 items-stretch overflow-hidden rounded-lg border border-border-default bg-bg-primary shadow-lg",
        className,
      )}
      {...props}
    >
      <div className={accentVariants({ variant })} aria-hidden="true" />
      <div className="flex flex-1 items-start justify-between gap-3 px-4 py-3">
        <div className="flex flex-col gap-1">
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
            <X className="size-4" />
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

const ToastContext = React.createContext<ToastContextValue | null>(null);

/** Imperative toast API — call from inside a <ToastProvider>. */
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
 * show a toast. Renders its own fixed-position stack — no separate <Toaster /> needed.
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
      setToasts((current) => [...current, { id, duration, ...options }]);
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
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-end gap-3 p-6 sm:inset-x-auto sm:right-0"
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
