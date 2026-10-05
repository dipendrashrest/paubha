import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";
import { Badge } from "../badge/badge";
import { Button } from "../button/button";
import { Divider } from "../divider/divider";

// Figma container radius is a hardcoded 10px (no token) -> closest, radius-md.
const containerClassName =
  "flex w-full flex-wrap items-center rounded-md border border-border-default bg-bg-primary px-4 py-3";

export interface FilterBarProps extends React.ComponentPropsWithRef<"div"> {}

/**
 * Bordered filter toolbar shell · layout only · put Input / Select controls and
 * a link Button as children · focusable controls carry shadow-glow-focus themselves
 */
export function FilterBar({ ref, className, ...props }: FilterBarProps) {
  return (
    <div
      ref={ref}
      className={cn(containerClassName, "gap-2", className)}
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
 * Toggleable filter chip (Badge, gray subtle / brand when selected) · role=button ·
 * aria-pressed · Enter/Space · focus-visible:shadow-glow-focus · optional Badge
 * dismiss button labelled "Remove <label>"
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
    <Badge
      variant={selected ? "brand" : "gray"}
      fill="subtle"
      size="sm"
      dismissible={onRemove != null && !disabled}
      onDismiss={onRemove}
      dismissLabel={removeLabel}
      className={cn(disabled && "text-fg-disabled", className)}
    >
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        disabled={disabled}
        className="rounded-full focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)] disabled:pointer-events-none"
        {...props}
      >
        {label}
      </button>
    </Badge>
  );
}

FilterChip.displayName = "FilterChip";

export interface FilterChipsProps extends React.ComponentPropsWithRef<"div"> {}

export function FilterChips({ ref, className, ...props }: FilterChipsProps) {
  return (
    <div
      ref={ref}
      className={cn(containerClassName, "gap-2", className)}
      {...props}
    />
  );
}

FilterChips.displayName = "FilterChips";

export interface ActiveFiltersProps extends React.ComponentPropsWithRef<"div"> {
  /** Clear-all control label. @default "Clear all filters" */
  clearLabel?: React.ReactNode;
  onClear?: () => void;
}

/**
 * Active filter summary row · chips as children · clear-all is a link Button
 * (glow-focus built in)
 */
export function ActiveFilters({
  ref,
  className,
  children,
  clearLabel = "Clear all filters",
  onClear,
  ...props
}: ActiveFiltersProps) {
  return (
    <div
      ref={ref}
      className={cn(containerClassName, "gap-3", className)}
      {...props}
    >
      {children}
      {onClear != null ? (
        <Button variant="link" size="sm" onClick={onClear}>
          {clearLabel}
        </Button>
      ) : null}
    </div>
  );
}

ActiveFilters.displayName = "ActiveFilters";

export interface FilterPanelProps extends React.ComponentPropsWithRef<"div"> {}

/**
 * Dropdown filter panel shell · compose FilterPanelTitle, FilterPanelGroup
 * (Checkbox / Input children) and FilterPanelFooter · role=group, name it with
 * aria-label or aria-labelledby
 */
export function FilterPanel({ ref, className, ...props }: FilterPanelProps) {
  return (
    <div
      ref={ref}
      role="group"
      className={cn(
        "flex w-full flex-col gap-5 rounded-md border border-border-default bg-bg-elevated p-5",
        className,
      )}
      {...props}
    />
  );
}

FilterPanel.displayName = "FilterPanel";

export interface FilterPanelTitleProps
  extends React.ComponentPropsWithRef<"div"> {}

/** Panel heading with the divider below it. */
export function FilterPanelTitle({
  ref,
  className,
  children,
  ...props
}: FilterPanelTitleProps) {
  return (
    <>
      <div
        ref={ref}
        className={cn("text-body-lg font-semibold text-fg-primary", className)}
        {...props}
      >
        {children}
      </div>
      <Divider />
    </>
  );
}

FilterPanelTitle.displayName = "FilterPanelTitle";

export interface FilterPanelGroupProps
  extends React.ComponentPropsWithRef<"div"> {
  label: React.ReactNode;
}

/** Labelled column of controls (e.g. Status checkboxes, Date Range inputs). */
export function FilterPanelGroup({
  ref,
  className,
  label,
  children,
  ...props
}: FilterPanelGroupProps) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-start gap-3", className)}
      {...props}
    >
      <span className="text-ui-md font-medium text-fg-primary">{label}</span>
      {children}
    </div>
  );
}

FilterPanelGroup.displayName = "FilterPanelGroup";

export interface FilterPanelFooterProps
  extends React.ComponentPropsWithRef<"div"> {
  /** @default "Clear all" */
  clearLabel?: React.ReactNode;
  /** @default "Apply Filters" */
  applyLabel?: React.ReactNode;
  onClear?: () => void;
  onApply?: () => void;
}

/** Divider + Clear all (tertiary) / Apply (primary) actions. */
export function FilterPanelFooter({
  ref,
  className,
  clearLabel = "Clear all",
  applyLabel = "Apply Filters",
  onClear,
  onApply,
  ...props
}: FilterPanelFooterProps) {
  return (
    <>
      <Divider />
      <div
        ref={ref}
        className={cn("flex w-full items-center justify-between", className)}
        {...props}
      >
        <Button variant="tertiary" size="sm" onClick={onClear}>
          {clearLabel}
        </Button>
        <Button variant="primary" size="sm" onClick={onApply}>
          {applyLabel}
        </Button>
      </div>
    </>
  );
}

FilterPanelFooter.displayName = "FilterPanelFooter";
