"use client";

import { cn } from "@paubha/registry/lib/cn";
import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, ChevronDown } from "lucide-react";
import type * as React from "react";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

// Shared trigger chrome, transcribed from Figma "Select" (6089:412) and
// "Select / v2 — restrained" (6318:8939): bg/primary + border/default at rest; focus is a
// 2px border/brand + glow-focus; disabled is bg/disabled + border/disabled + fg/disabled;
// error is border/error. Radius radius/sm (8) at every size.
const triggerBase = [
  "flex w-full items-center justify-between gap-0 rounded-sm border border-border-default bg-bg-primary text-fg-primary transition-colors outline-none",
  "data-[placeholder]:text-fg-tertiary",
  "focus-visible:border-2 focus-visible:border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)]",
  "disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-fg-disabled disabled:[&>svg]:text-fg-disabled",
  "aria-invalid:border-border-error",
  "aria-invalid:focus-visible:border-border-error aria-invalid:focus-visible:shadow-[var(--shadow-glow-focus-error)]",
].join(" ");

// Per-size height / padding / type / chevron size, read off each Figma symbol.
const triggerSizes = {
  sm: "h-8 px-3 py-1 text-ui-sm font-medium [&>svg]:size-4",
  md: "h-10 px-3 py-2 text-body-sm [&>svg]:size-5",
  lg: "h-12 px-4 py-2 text-body-md [&>svg]:size-5",
  xl: "h-14 px-4 py-3 text-body-lg [&>svg]:size-6",
  "2xl": "h-16 px-8 py-4 text-ui-lg font-medium [&>svg]:size-6",
} as const;

const selectTriggerVariants = cva(triggerBase, {
  variants: { size: triggerSizes },
  defaultVariants: { size: "md" },
});

export type SelectSize = NonNullable<
  VariantProps<typeof selectTriggerVariants>["size"]
>;

export interface SelectTriggerProps
  extends React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  /** Marks the trigger as invalid; sets aria-invalid and the error border color. */
  error?: boolean;
}

/**
 * role=combobox · aria-expanded reflects open state · aria-invalid on error · Arrow keys
 * navigate options · Enter selects · Escape closes · type-ahead search supported · focus
 * ring uses shadow-glow-focus, or shadow-glow-focus-error when focused while invalid
 */
export function SelectTrigger({
  ref,
  className,
  size,
  error,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(selectTriggerVariants({ size }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="shrink-0 text-fg-tertiary" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

SelectTrigger.displayName = "SelectTrigger";

export interface SelectContentProps
  extends React.ComponentPropsWithRef<typeof SelectPrimitive.Content> {}

export function SelectContent({
  ref,
  className,
  children,
  position = "popper",
  sideOffset = 4,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-96 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border-default bg-bg-elevated shadow-lg",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

SelectContent.displayName = "SelectContent";

export interface SelectItemProps
  extends React.ComponentPropsWithRef<typeof SelectPrimitive.Item> {}

export function SelectItem({
  ref,
  className,
  children,
  ...props
}: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-xs px-2 py-1.5 text-ui-md text-fg-primary outline-none select-none",
        "data-[highlighted]:bg-bg-secondary-hover",
        "data-[disabled]:pointer-events-none data-[disabled]:text-fg-disabled",
        className,
      )}
      {...props}
    >
      <span className="flex-1">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4 text-fg-brand" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

SelectItem.displayName = "SelectItem";

export function SelectLabel({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "px-2 py-1.5 text-ui-xs font-medium text-fg-tertiary",
        className,
      )}
      {...props}
    />
  );
}

export function SelectSeparator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn("my-1 h-px bg-border-default", className)}
      {...props}
    />
  );
}

/**
 * SelectV2, the "restrained" variant from Figma "Select / v2 — restrained" (6318:8939).
 * Same sizes, tokens, and states as `Select`, plus a dedicated hover state
 * (bg/secondary + border/strong).
 */
export const SelectV2 = SelectPrimitive.Root;

const selectTriggerV2Variants = cva(
  [
    triggerBase,
    "hover:border-border-strong hover:bg-bg-secondary",
    "disabled:hover:border-border-disabled disabled:hover:bg-bg-disabled",
    "aria-invalid:hover:border-border-error",
  ].join(" "),
  {
    variants: { size: triggerSizes },
    defaultVariants: { size: "md" },
  },
);

export interface SelectTriggerV2Props
  extends React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerV2Variants> {
  /** Marks the trigger as invalid; sets aria-invalid and the error border color. */
  error?: boolean;
}

/**
 * role=combobox · aria-expanded reflects open state · aria-invalid on error · Arrow keys
 * navigate options · Enter selects · Escape closes · type-ahead search supported · focus
 * ring uses shadow-glow-focus, or shadow-glow-focus-error when focused while invalid ·
 * disabled prevents interaction
 */
export function SelectTriggerV2({
  ref,
  className,
  size,
  error,
  children,
  ...props
}: SelectTriggerV2Props) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(selectTriggerV2Variants({ size }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="shrink-0 text-fg-tertiary" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

SelectTriggerV2.displayName = "SelectTriggerV2";

export interface SelectContentV2Props
  extends React.ComponentPropsWithRef<typeof SelectPrimitive.Content> {}

/** Same structure as SelectContent, with a lighter shadow: quieter panel chrome to match SelectTriggerV2. */
export function SelectContentV2({
  ref,
  className,
  children,
  position = "popper",
  sideOffset = 4,
  ...props
}: SelectContentV2Props) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-96 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border-default bg-bg-elevated shadow-md",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

SelectContentV2.displayName = "SelectContentV2";

// SelectV2 reuses SelectGroup, SelectValue, SelectItem, SelectLabel, and SelectSeparator
// as-is; the Figma v2 frame only restyles the trigger.
