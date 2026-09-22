import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, ChevronDown } from "lucide-react";
import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  [
    "flex w-full items-center justify-between gap-2 rounded-sm border border-border-default bg-bg-primary text-fg-primary transition-colors outline-none",
    "data-[placeholder]:text-fg-tertiary",
    "focus-visible:border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)]",
    "disabled:cursor-not-allowed disabled:bg-bg-secondary disabled:text-fg-disabled",
    "aria-invalid:border-border-error",
    "aria-invalid:focus-visible:border-border-error aria-invalid:focus-visible:shadow-[var(--shadow-glow-focus-error)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-ui-md",
        md: "h-10 px-4 text-ui-lg",
        lg: "h-12 px-5 text-ui-lg",
        xl: "h-14 px-6 text-ui-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SelectSize = NonNullable<
  VariantProps<typeof selectTriggerVariants>["size"]
>;

export interface SelectTriggerProps
  extends React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  /** Marks the trigger as invalid — sets aria-invalid and the error border color. */
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
        <ChevronDown className="size-4 shrink-0 text-fg-tertiary" />
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
 * SelectV2 — "restrained" variant (additive only; does not alter `Select` above).
 *
 * No dedicated Figma frame for Select's own v2 could be located this session despite an
 * extensive search (canvas crawl across the file's `2120:*`, `0:1`, `6033:*`, `6089:*`,
 * `6098:*`, `6318:*` epochs, plus `list_file_components_for_code_connect` — blocked, no
 * Code Connect seat — and `search_design_system`, which only ever resolves to unrelated
 * connected libraries, never this file's own local/unpublished nodes). What IS confirmed
 * real in this file is Pagination's own "Pagination / v2 — restrained" frame
 * (`6318:9133`, sibling to base Pagination `6089:35899` on canvas `6033:30`, screenshotted
 * directly) — the only real "v2 restrained" precedent anywhere in the file tonight. Its
 * actual, confirmed distinction from v1 is subtler than "fewer affordances": same
 * bg/primary + border/default + text tokens, same sizes, just squircle `radius/md` chrome
 * instead of v1's fully-round pill shape, a tighter per-size gap scale, and one added
 * `hover` state absent from v1's real symbol set.
 *
 * Select has no "pill vs. squircle" axis to restrain (its trigger is already squircle,
 * not a pill), so that specific transformation doesn't carry over literally. Absent
 * Select's own spec, this build applies the same underlying *intent* evidenced by
 * Pagination's real v2 — dial back a bolder default treatment toward something quieter —
 * translated the only way that's meaningful for a text/chrome control: the trigger is
 * transparent/ghost by default (no border or fill) and only gains visible chrome on
 * hover, open, focus, or error, rather than always presenting a bordered box. Sizes,
 * radius, and every token binding are otherwise unchanged from the confirmed `Select`
 * scale — this is a deliberate, flagged interpretation, not a transcribed Figma spec. See
 * SYNC_LOG.md for the full search trail and an open question for a human to confirm or
 * correct this once/if Select's real v2 frame is added to Figma.
 */
export const SelectV2 = SelectPrimitive.Root;

const selectTriggerV2Variants = cva(
  [
    "flex w-full items-center justify-between gap-2 rounded-md border border-transparent bg-transparent text-fg-primary transition-colors outline-none",
    "data-[placeholder]:text-fg-tertiary",
    "hover:bg-bg-secondary-hover",
    "data-[state=open]:border-border-default data-[state=open]:bg-bg-primary",
    "focus-visible:border-border-brand focus-visible:bg-bg-primary focus-visible:shadow-[var(--shadow-glow-focus)]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-fg-disabled disabled:hover:bg-transparent",
    // Validation state stays visible regardless of hover/open — restrained chrome must
    // never hide an error from the user.
    "aria-invalid:border-border-error aria-invalid:bg-bg-primary",
    "aria-invalid:focus-visible:border-border-error aria-invalid:focus-visible:shadow-[var(--shadow-glow-focus-error)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-ui-md",
        md: "h-10 px-4 text-ui-lg",
        lg: "h-12 px-5 text-ui-lg",
        xl: "h-14 px-6 text-ui-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface SelectTriggerV2Props
  extends React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerV2Variants> {
  /** Marks the trigger as invalid — sets aria-invalid and the error border color. */
  error?: boolean;
}

/**
 * role=combobox · aria-expanded reflects open state · aria-invalid on error · Arrow keys
 * navigate options · Enter selects · Escape closes · type-ahead search supported · focus
 * ring uses shadow-glow-focus, or shadow-glow-focus-error when focused while invalid ·
 * ghost by default — chrome (border/bg) only appears on hover, open, focus, or error, so
 * the restrained treatment never hides validation state
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
        <ChevronDown className="size-4 shrink-0 text-fg-tertiary" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

SelectTriggerV2.displayName = "SelectTriggerV2";

export interface SelectContentV2Props
  extends React.ComponentPropsWithRef<typeof SelectPrimitive.Content> {}

/** Same structure as SelectContent, with a lighter shadow — quieter panel chrome to match SelectTriggerV2. */
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
// as-is — Pagination's real v2 restrained frame shows the individual item/page chrome is
// unchanged from v1 (only the outer shape/gap scale differs), so there's no confirmed
// basis to fork these into V2-specific copies.
