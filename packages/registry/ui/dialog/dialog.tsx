"use client";

import { cn } from "@paubha/registry/lib/cn";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type * as React from "react";

export const Dialog = AlertDialogPrimitive.Root;
export const DialogTrigger = AlertDialogPrimitive.Trigger;

// Figma notes: optional open feedback at duration/fast (100ms) ease-out; reduced motion
// uses duration/instant.
const MOTION =
  "transition-opacity duration-(--duration-fast) ease-out starting:opacity-0 motion-reduce:duration-(--duration-instant)";

export interface DialogContentProps
  extends React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Content> {}

/**
 * role=alertdialog (Radix AlertDialog) · aria-modal=true · aria-labelledby → DialogTitle ·
 * aria-describedby → DialogDescription · focus lands on DialogCancel (the safe action) on
 * open; Tab/Shift+Tab stay trapped · Escape takes the cancel path and restores focus to the
 * trigger · background is inert · outside click does not close (requires an explicit
 * choice) · open fade duration/fast (100ms) ease-out, instant under prefers-reduced-motion
 */
export function DialogContent({
  ref,
  className,
  ...props
}: DialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay
        className={cn("fixed inset-0 z-(--z-overlay) bg-bg-overlay", MOTION)}
      />
      <AlertDialogPrimitive.Content
        ref={ref}
        aria-modal="true"
        className={cn(
          "fixed top-1/2 left-1/2 z-(--z-modal) w-[440px] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border border-border-default bg-bg-primary shadow-lg",
          MOTION,
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
      className={cn("text-body-lg font-semibold text-fg-primary", className)}
      {...props}
    />
  );
}

DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps
  extends React.ComponentPropsWithRef<
    typeof AlertDialogPrimitive.Description
  > {}

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
        "inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-border-default bg-bg-primary px-4 text-ui-md font-medium text-fg-primary outline-none transition-colors",
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
   * Colors the action to match the dialog's intent: brand for Confirm/Info, error for
   * Destructive. Figma's Alert Dialog (node `6089:37431`) publishes three `Variant`
   * values (Confirm, Destructive, Info); Info uses the same `bg/brand-solid` action as
   * Confirm and differs only by composition (single action, no DialogCancel).
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
        "inline-flex h-9 shrink-0 items-center justify-center rounded-md px-4 text-ui-md font-medium outline-none transition-colors",
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
