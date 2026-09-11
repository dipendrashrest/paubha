import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type * as React from "react";
import { cn } from "../../lib/cn";

export const Dialog = AlertDialogPrimitive.Root;
export const DialogTrigger = AlertDialogPrimitive.Trigger;

export interface DialogContentProps
  extends React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Content> {}

/**
 * role="alertdialog" (via Radix AlertDialog, not plain Dialog) · aria-labelledby points
 * at DialogTitle · aria-describedby points at DialogDescription · focus trapped while
 * open · Escape closes · does not close on outside click (requires an explicit choice) ·
 * auto-focus the safest action (place DialogCancel first, or autoFocus it explicitly)
 */
export function DialogContent({ ref, className, ...props }: DialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-bg-overlay" />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[420px] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border border-border-default bg-bg-primary shadow-lg",
          className,
        )}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}

DialogContent.displayName = "DialogContent";

export function DialogBody({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 px-6 pt-6 pb-4", className)}
      {...props}
    />
  );
}

DialogBody.displayName = "DialogBody";

export interface DialogTitleProps
  extends React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Title> {}

export function DialogTitle({ ref, className, ...props }: DialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("text-ui-lg font-semibold text-fg-primary", className)}
      {...props}
    />
  );
}

DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps
  extends React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Description> {}

export function DialogDescription({
  ref,
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("text-body-sm text-fg-secondary", className)}
      {...props}
    />
  );
}

DialogDescription.displayName = "DialogDescription";

export function DialogActions({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 border-t border-border-default px-6 py-4",
        className,
      )}
      {...props}
    />
  );
}

DialogActions.displayName = "DialogActions";

export interface DialogCancelProps
  extends React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Cancel> {}

export function DialogCancel({ ref, className, ...props }: DialogCancelProps) {
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(
        "inline-flex h-10 shrink-0 items-center justify-center rounded-md border border-border-default bg-bg-primary px-4 text-ui-md font-medium text-fg-primary outline-none transition-colors",
        "hover:bg-bg-secondary-hover",
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
        className,
      )}
      {...props}
    />
  );
}

DialogCancel.displayName = "DialogCancel";

export interface DialogActionProps
  extends React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Action> {
  /**
   * Colors the action to match the dialog's intent — brand for Confirm/Info, error for
   * Destructive. Figma's real published Dialog component (node `6089:37431`, file
   * `CDgfoMkj7lP3pXWJ3aOgkH`) publishes three `Variant` values — Confirm, Destructive,
   * Info — but Info's primary action renders with the exact same `bg/brand-solid` fill
   * as Confirm's (confirmed via live `get_design_context` on `6089:37423`), so it needs
   * no distinct color value here; "Info" is a composition difference (single action, no
   * DialogCancel), not a third color. This 2-value enum already covers all 3 real
   * variants correctly.
   */
  variant?: "brand" | "error";
}

export function DialogAction({
  ref,
  className,
  variant = "brand",
  ...props
}: DialogActionProps) {
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn(
        "inline-flex h-10 shrink-0 items-center justify-center rounded-md px-4 text-ui-md font-medium outline-none transition-colors",
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
        variant === "error"
          ? "bg-bg-error-solid text-fg-on-error hover:bg-bg-error-solid-hover"
          : "bg-bg-brand-solid text-fg-on-brand hover:bg-bg-brand-solid-hover",
        className,
      )}
      {...props}
    />
  );
}

DialogAction.displayName = "DialogAction";
