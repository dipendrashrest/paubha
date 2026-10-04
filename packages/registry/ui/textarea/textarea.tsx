import { cn } from "@paubha/registry/lib/cn";
import { cva } from "class-variance-authority";
import type * as React from "react";

const textareaVariants = cva(
  [
    "w-full resize-y rounded-sm border border-border-default bg-bg-primary text-fg-primary transition-colors",
    "placeholder:text-fg-tertiary",
    "hover:border-border-strong active:border-border-brand",
    "focus-visible:border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:border-border-default disabled:bg-bg-disabled disabled:text-fg-disabled disabled:placeholder:text-fg-disabled",
    "aria-invalid:border-border-error aria-invalid:text-fg-error",
  ].join(" "),
  {
    variants: {
      size: {
        // Figma is source of truth (Paubha-UI node 2121:15056): min-heights
        // sm/md/lg/xl = 34/42/50/58px = padding + one line of body-sm/body-md.
        sm: "min-h-[34px] px-3 py-1.5 text-body-sm",
        md: "min-h-[42px] px-4 py-2 text-body-md",
        lg: "min-h-[50px] px-5 py-3 text-body-md",
        xl: "min-h-[58px] px-6 py-4 text-body-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type TextareaSize = "sm" | "md" | "lg" | "xl";

export interface TextareaProps
  extends Omit<React.ComponentPropsWithRef<"textarea">, "size"> {
  size?: TextareaSize;
  /** Marks the textarea as invalid; sets aria-invalid and the error border/text color. */
  error?: boolean;
}

/**
 * role=textbox, multiline · requires an associated label via Field · Tab focuses, glow-focus
 * ring visible · aria-invalid=true on error · disabled prevents interaction · resizable via
 * the native drag handle. Figma (node 2121:15056): sizes sm/md/lg/xl, states
 * default/hover/focus/active/disabled/error.
 */
export function Textarea({
  ref,
  className,
  size,
  error,
  ...props
}: TextareaProps) {
  return (
    <textarea
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(textareaVariants({ size }), className)}
      {...props}
    />
  );
}

Textarea.displayName = "Textarea";

export { textareaVariants };
