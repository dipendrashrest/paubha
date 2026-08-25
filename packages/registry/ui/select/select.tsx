import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, ChevronDown } from "lucide-react";
import type * as React from "react";
import { cn } from "../../lib/cn";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  [
    "flex w-full items-center justify-between gap-2 rounded-md border border-border-default bg-bg-primary text-fg-primary transition-colors outline-none",
    "data-[placeholder]:text-fg-tertiary",
    "focus-visible:border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)]",
    "disabled:cursor-not-allowed disabled:bg-bg-secondary disabled:text-fg-disabled",
    "aria-invalid:border-border-error",
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
 * navigate options · Enter selects · Escape closes · type-ahead search supported
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
