"use client";

import { FileIcon, Upload, X } from "lucide-react";
import type * as React from "react";
import { useId, useRef, useState } from "react";
import { cn } from "@paubha/registry/lib/cn";

export interface FileUploadProps
  extends Omit<React.ComponentPropsWithRef<"div">, "onChange"> {
  /** Accepted MIME types / extensions (native accept attr). */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** Hint under the drop label. */
  description?: React.ReactNode;
  label?: React.ReactNode;
  onFilesChange?: (files: File[]) => void;
}

/**
 * Drag-and-drop upload zone · native file input · focus-visible glow on
 * browse control · aria-disabled when disabled · drop target is decorative
 * relative to the labelled input
 */
export function FileUpload({
  ref,
  className,
  accept,
  multiple = false,
  disabled = false,
  description = "SVG, PNG, JPG or GIF (max. 10MB)",
  label = "Click to upload or drag and drop",
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
        "flex w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed px-6 py-10 text-center transition-colors",
        dragging
          ? "border-border-brand bg-bg-brand-subtle"
          : "border-border-default bg-bg-secondary",
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
      <div className="flex size-10 items-center justify-center rounded-full bg-bg-primary text-fg-tertiary shadow-xs">
        <Upload aria-hidden="true" className="size-5" />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor={inputId}
          className={cn(
            "cursor-pointer text-ui-md font-medium text-fg-brand",
            "rounded-sm focus-within:outline-none",
          )}
        >
          {label}
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            className="sr-only focus-visible:outline-none"
            onChange={(e) => emitFiles(e.target.files)}
          />
        </label>
        {description != null ? (
          <p className="text-body-sm text-fg-tertiary">{description}</p>
        ) : null}
      </div>
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
  ...props
}: FileUploadItemProps) {
  const showProgress = typeof progress === "number" && progress < 100;

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-start gap-3 rounded-md border border-border-default bg-bg-primary p-4",
        className,
      )}
      {...props}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-border-default bg-bg-secondary text-fg-tertiary">
        <FileIcon aria-hidden="true" className="size-5" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-ui-md font-medium text-fg-primary">
              {name}
            </p>
            {size != null ? (
              <p className="text-ui-sm text-fg-tertiary">{size}</p>
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
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1.5 w-full overflow-hidden rounded-full bg-bg-tertiary"
          >
            <div
              className="h-full rounded-full bg-bg-brand-solid transition-[width]"
              style={{ width: `${Math.max(0, Math.min(100, progress ?? 0))}%` }}
            />
          </div>
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
    <div ref={ref} className={cn("flex w-full flex-col gap-3", className)} {...props} />
  );
}

FileUploadList.displayName = "FileUploadList";
