import { cn } from "@paubha/registry/lib/cn";
import { withIconSize } from "@paubha/registry/lib/with-icon-size";
import { cva } from "class-variance-authority";
import type * as React from "react";

const inputWrapperVariants = cva(
  [
    "flex w-full items-center gap-2 rounded-sm border border-border-default bg-bg-primary transition-colors",
    "hover:border-border-strong",
    "focus-within:border-border-brand focus-within:shadow-[var(--shadow-glow-focus)]",
    "has-[:disabled]:border-border-disabled has-[:disabled]:bg-bg-disabled",
    "has-[[aria-invalid=true]]:border-border-error",
    "has-[[aria-invalid=true]]:focus-within:border-border-error has-[[aria-invalid=true]]:focus-within:shadow-[var(--shadow-glow-focus-error)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-3 py-1",
        lg: "h-12 px-3 py-2",
        xl: "h-14 px-4 py-3",
        "2xl": "h-16 px-8 py-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type InputSize = "sm" | "md" | "lg" | "xl" | "2xl";

const textSizeClassName: Record<InputSize, string> = {
  sm: "text-body-sm",
  md: "text-body-sm",
  lg: "text-body-md",
  xl: "text-body-md",
  "2xl": "text-ui-lg font-medium",
};

const iconSizeClassName: Record<InputSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-5",
  xl: "size-6",
  "2xl": "size-6",
};

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<"input">, "size"> {
  size?: InputSize;
  /** Marks the input as invalid; sets aria-invalid and the error border color. */
  error?: boolean;
  /** Instance-swap icon slot before the text (e.g. CreditCard for Figma's Payment type). */
  leadingIcon?: React.ReactNode;
  /** Instance-swap icon slot after the text. */
  trailingIcon?: React.ReactNode;
  /** Fixed, non-editable prefix before the value (Figma's Leading Text type, e.g. "https://"). */
  leadingText?: React.ReactNode;
  /** Separate control before the value (Figma's Leading Dropdown type, e.g. a currency selector). Give it its own accessible label. */
  leadingAddon?: React.ReactNode;
  /** Separate control after the value (Figma's Trailing Dropdown type). Give it its own accessible label. */
  trailingAddon?: React.ReactNode;
  /** Ref to the bordered wrapper; `className` also targets the wrapper. */
  wrapperRef?: React.Ref<HTMLDivElement>;
}

/**
 * role=textbox · requires an associated label via Field · aria-invalid=true on error ·
 * aria-describedby links to the error/helper message (wired by Field) · focus ring uses
 * shadow-glow-focus, or shadow-glow-focus-error when focused while invalid · leading text
 * is presentational, not part of the value · leading/trailing addons are separate controls
 * with their own labels and tab stops. Figma (node 6198:22642) states:
 * default/hover/focus/filled/disabled/error/error-focus; "filled" needs no prop.
 */
export function Input({
  ref,
  wrapperRef,
  className,
  size = "md",
  error,
  leadingIcon,
  trailingIcon,
  leadingText,
  leadingAddon,
  trailingAddon,
  ...props
}: InputProps) {
  return (
    <div
      ref={wrapperRef}
      className={cn(inputWrapperVariants({ size }), className)}
    >
      {leadingAddon}
      {leadingIcon ? withIconSize(leadingIcon, iconSizeClassName[size]) : null}
      {leadingText ? (
        <span
          className={cn(
            "flex shrink-0 items-center gap-1 whitespace-nowrap bg-bg-secondary px-1 text-fg-secondary",
            textSizeClassName[size],
          )}
        >
          {leadingText}
        </span>
      ) : null}
      <input
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-fg-primary outline-none placeholder:text-fg-tertiary",
          "disabled:cursor-not-allowed disabled:text-fg-disabled disabled:placeholder:text-fg-disabled",
          textSizeClassName[size],
        )}
        {...props}
      />
      {trailingIcon
        ? withIconSize(trailingIcon, iconSizeClassName[size])
        : null}
      {trailingAddon}
    </div>
  );
}

Input.displayName = "Input";

export { inputWrapperVariants };
