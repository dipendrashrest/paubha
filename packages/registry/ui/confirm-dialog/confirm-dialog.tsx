"use client";

import type * as React from "react";
import {
  Dialog,
  DialogAction,
  DialogActions,
  DialogBody,
  DialogCancel,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../dialog/dialog";

export interface ConfirmDialogProps {
  /** Control that opens the dialog. */
  trigger: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  /** Brand for confirm / error for destructive. */
  intent?: "brand" | "error";
  onConfirm?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Confirm / destructive prompt · Dialog (alertdialog) · Cancel + Action ·
 * focus trap / Escape from Dialog · Action uses glow-focus
 */
export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  intent = "brand",
  onConfirm,
  open,
  onOpenChange,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          {description != null ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogBody>
        <DialogActions>
          <DialogCancel>{cancelLabel}</DialogCancel>
          <DialogAction variant={intent} onClick={onConfirm}>
            {confirmLabel}
          </DialogAction>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

ConfirmDialog.displayName = "ConfirmDialog";
