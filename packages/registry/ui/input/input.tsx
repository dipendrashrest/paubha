import { cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/cn";
import { withIconSize } from "../../lib/with-icon-size";

const inputWrapperVariants = cva(
  [
    "flex w-full items-center rounded-sm border border-border-default bg-bg-primary transition-colors",
    "hover:border-border-strong",
    "focus-within:border-border-brand focus-within:shadow-[var(--shadow-glow-focus)]",
    "has-[:disabled]:bg-bg-secondary",
    "has-[[aria-invalid=true]]:border-border-error",
    "has-[[aria-invalid=true]]:focus-within:border-border-error has-[[aria-invalid=true]]:focus-within:shadow-[var(--shadow-glow-focus-error)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-9 gap-2 px-3 py-2",
        md: "h-10 gap-2 px-3 py-2.5",
        lg: "h-11 gap-2 px-3.5 py-2.5",
        xl: "h-12 gap-2 px-4 py-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type InputSize = "sm" | "md" | "lg" | "xl";

const textSizeClassName: Record<InputSize, string> = {
  sm: "text-ui-md",
  md: "text-ui-lg",
  lg: "text-ui-lg",
  xl: "text-ui-lg",
};

const iconSizeClassName: Record<InputSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-5",
  xl: "size-5",
};

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<"input">, "size"> {
  size?: InputSize;
  /** Marks the input as invalid — sets aria-invalid and the error border color. */
  error?: boolean;
  /** Instance-swap icon slot rendered before the input text. */
  leadingIcon?: React.ReactNode;
  /** Instance-swap icon slot rendered after the input text. */
  trailingIcon?: React.ReactNode;
  /** className for the bordered wrapper; `className` targets the wrapper, matching every other component. */
  wrapperRef?: React.Ref<HTMLDivElement>;
}

/**
 * role=textbox · requires an associated label via Field · aria-invalid=true on error ·
 * aria-describedby links to the error/helper message (wired by Field) · focus ring uses
 * shadow-glow-focus, or shadow-glow-focus-error when focused while invalid (Figma's
 * error-focus state, node 6198:22642) · "filled" (Figma's node 6198:22642 density spec)
 * needs no separate prop — entered text renders fg-primary while the placeholder renders
 * fg-tertiary natively, matching Figma's filled-vs-empty distinction · Figma's real state
 * axis is default/hover/focus/filled/disabled/error/error-focus — there is no distinct
 * "readonly" state, so none was added
 */
export function Input({
  ref,
  wrapperRef,
  className,
  size = "md",
  error,
  leadingIcon,
  trailingIcon,
  ...props
}: InputProps) {
  return (
    <div
      ref={wrapperRef}
      className={cn(inputWrapperVariants({ size }), className)}
    >
      {leadingIcon ? withIconSize(leadingIcon, iconSizeClassName[size]) : null}
      <input
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "min-w-0 flex-1 bg-transparent font-medium text-fg-primary outline-none placeholder:text-fg-tertiary",
          "disabled:cursor-not-allowed disabled:text-fg-disabled",
          textSizeClassName[size],
        )}
        {...props}
      />
      {trailingIcon
        ? withIconSize(trailingIcon, iconSizeClassName[size])
        : null}
    </div>
  );
}

Input.displayName = "Input";

export { inputWrapperVariants };
