"use client";

import { cn } from "@paubha/registry/lib/cn";
import { FileIcon, Upload, X } from "lucide-react";
import type * as React from "react";
import { useId, useRef, useState } from "react";
import { Button } from "../button/button";
import { ProgressBar } from "../progress-bar/progress-bar";

export interface FileUploadProps
  extends Omit<React.ComponentPropsWithRef<"div">, "onChange"> {
  /** Accepted MIME types / extensions (native accept attr). */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** Hint under the drop label. */
  description?: React.ReactNode;
  /** Zone title. */
  label?: React.ReactNode;
  /** Browse button text. */
  browseLabel?: React.ReactNode;
  onFilesChange?: (files: File[]) => void;
}

/**
 * Drag-and-drop upload zone · the Browse button (glow-focus, Enter/Space) opens
 * the native file picker, so the drop target stays a decorative convenience ·
 * the hidden input is removed from the tab order · disabled disables the button
 */
export function FileUpload({
  ref,
  className,
  accept,
  multiple = false,
  disabled = false,
  description = "Accepts PNG, JPG, PDF up to 10MB",
  label = "Drag & drop files here",
  browseLabel = "Browse Files",
  onFilesChange,
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [dragging, setDragging] = useState(false);

  const emitFiles = (list: FileList | null) => {
    if (!list || disabled) return;
    onFilesChange?.(Array.from(list));
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 rounded-md border bg-bg-primary p-8 text-center transition-colors",
        dragging
          ? "border-border-brand bg-bg-brand-subtle"
          : "border-border-default",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
      onDragEnter={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        emitFiles(e.dataTransfer.files);
      }}
      {...props}
    >
      <div className="flex items-center justify-center rounded-full bg-bg-brand-subtle p-2 text-fg-brand">
        <Upload aria-hidden="true" className="size-6" />
      </div>
      <div className="flex w-full flex-col items-center gap-1">
        <p className="text-ui-md font-semibold text-fg-primary">{label}</p>
        <p className="text-ui-sm text-fg-tertiary">or</p>
      </div>
      {description != null ? (
        <p className="text-ui-sm text-fg-tertiary">{description}</p>
      ) : null}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        onChange={(e) => emitFiles(e.target.files)}
      />
      <Button
        type="button"
        size="sm"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        {browseLabel}
      </Button>
    </div>
  );
}

FileUpload.displayName = "FileUpload";

export interface FileUploadItemProps
  extends React.ComponentPropsWithRef<"div"> {
  name: React.ReactNode;
  size?: React.ReactNode;
  /** 0–100 progress. Omit when complete. */
  progress?: number;
  onRemove?: () => void;
  /** Row state. Defaults to uploading while `progress` < 100, else completed. */
  status?: "uploading" | "completed" | "error";
}

/**
 * Single file row with optional progress · remove button has glow-focus
 */
export function FileUploadItem({
  ref,
  className,
  name,
  size,
  progress,
  onRemove,
  status,
  ...props
}: FileUploadItemProps) {
  const showProgress =
    status !== "error" &&
    typeof progress === "number" &&
    progress < 100 &&
    status !== "completed";
  const isError = status === "error";

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-start gap-3 rounded-sm border border-border-default p-3",
        showProgress ? "bg-bg-secondary" : "bg-bg-primary",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-sm p-1 text-fg-primary",
          isError ? "bg-bg-error-subtle text-fg-error" : "bg-bg-brand-subtle",
        )}
      >
        <FileIcon aria-hidden="true" className="size-5" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-ui-md font-medium text-fg-primary">
              {name}
            </p>
            {size != null ? (
              <p
                className={cn(
                  "text-ui-sm",
                  isError ? "text-fg-secondary" : "text-fg-tertiary",
                )}
              >
                {size}
              </p>
            ) : null}
          </div>
          {onRemove != null ? (
            <button
              type="button"
              aria-label={`Remove ${typeof name === "string" ? name : "file"}`}
              onClick={onRemove}
              className="shrink-0 rounded-sm p-1 text-fg-tertiary hover:bg-bg-secondary-hover hover:text-fg-primary focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </div>
        {showProgress ? (
          <ProgressBar
            size="md"
            value={progress ?? 0}
            label={`Uploading ${typeof name === "string" ? name : "file"}`}
          />
        ) : null}
      </div>
    </div>
  );
}

FileUploadItem.displayName = "FileUploadItem";

export interface FileUploadListProps
  extends React.ComponentPropsWithRef<"div"> {}

export function FileUploadList({
  ref,
  className,
  ...props
}: FileUploadListProps) {
  return (
    <div
      ref={ref}
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    />
  );
}

FileUploadList.displayName = "FileUploadList";
