import { cn } from "@paubha/registry/lib/cn";
import { X } from "lucide-react";
import type * as React from "react";

export interface FilterBarProps extends React.ComponentPropsWithRef<"div"> {}

/**
 * Horizontal filter toolbar shell · layout only · put Selects / chip triggers
 * as children · focusable controls must carry shadow-glow-focus themselves
 */
export function FilterBar({ ref, className, ...props }: FilterBarProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-wrap items-center gap-2 border-b border-border-default px-4 py-3",
        className,
      )}
      {...props}
    />
  );
}

FilterBar.displayName = "FilterBar";

export interface FilterChipProps
  extends Omit<React.ComponentPropsWithRef<"button">, "children"> {
  label: React.ReactNode;
  selected?: boolean;
  onRemove?: () => void;
}

/**
 * Toggleable filter chip · role=button · aria-pressed · Enter/Space ·
 * focus-visible:shadow-glow-focus · optional sibling remove button
 */
export function FilterChip({
  ref,
  className,
  label,
  selected = false,
  onRemove,
  disabled,
  ...props
}: FilterChipProps) {
  const removeLabel =
    typeof label === "string" ? `Remove ${label}` : "Remove filter";

  return (
    <div className={cn("inline-flex items-stretch", className)}>
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        disabled={disabled}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-ui-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
          "disabled:pointer-events-none disabled:text-fg-disabled",
          onRemove != null && "rounded-r-none border-r-0",
          selected
            ? "border-border-brand bg-bg-brand-subtle text-fg-brand"
            : "border-border-default bg-bg-primary text-fg-primary hover:bg-bg-secondary-hover",
        )}
        {...props}
      >
        {label}
      </button>
      {onRemove != null ? (
        <button
          type="button"
          aria-label={removeLabel}
          disabled={disabled}
          onClick={onRemove}
          className={cn(
            "inline-flex h-8 items-center rounded-r-full border border-l-0 pr-2.5 pl-1 text-ui-sm transition-colors",
            "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
            "disabled:pointer-events-none disabled:text-fg-disabled",
            selected
              ? "border-border-brand bg-bg-brand-subtle text-fg-brand hover:bg-bg-brand-subtle"
              : "border-border-default bg-bg-primary text-fg-tertiary hover:bg-bg-secondary-hover",
          )}
        >
          <X aria-hidden="true" className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

FilterChip.displayName = "FilterChip";

export interface FilterChipsProps extends React.ComponentPropsWithRef<"div"> {}

export function FilterChips({ ref, className, ...props }: FilterChipsProps) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

FilterChips.displayName = "FilterChips";

export interface ActiveFiltersProps extends React.ComponentPropsWithRef<"div"> {
  /** Clear-all control label. @default "Clear all" */
  clearLabel?: React.ReactNode;
  onClear?: () => void;
}

/**
 * Active filter summary row · clear-all button has glow-focus · chips as children
 */
export function ActiveFilters({
  ref,
  className,
  children,
  clearLabel = "Clear all",
  onClear,
  ...props
}: ActiveFiltersProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-wrap items-center gap-2 px-4 py-2",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        {children}
      </div>
      {onClear != null ? (
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-sm px-2 py-1 text-ui-sm font-medium text-fg-brand transition-colors hover:underline focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
        >
          {clearLabel}
        </button>
      ) : null}
    </div>
  );
}

ActiveFilters.displayName = "ActiveFilters";
