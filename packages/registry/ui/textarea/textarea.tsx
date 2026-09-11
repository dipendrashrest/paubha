import { cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/cn";

const textareaVariants = cva(
  [
    "w-full resize-y rounded-sm border border-border-default bg-bg-primary text-fg-primary transition-colors",
    "placeholder:text-fg-tertiary",
    "focus:border-border-brand focus:shadow-[var(--shadow-glow-focus)] focus:outline-none",
    "disabled:cursor-not-allowed disabled:bg-bg-secondary disabled:text-fg-disabled",
    "aria-invalid:border-border-error aria-invalid:text-fg-error",
  ].join(" "),
  {
    variants: {
      size: {
        // NOTE: Figma's real published Textarea (node 2121:15056) shows all
        // 4 sizes at much smaller literal heights (sm/md/lg/xl = 34/42/50/58px,
        // a single-line "minimum height" collapsed symbol) — these existing
        // min-h-20..32 values are a deliberate larger multi-row default and
        // were NOT changed this pass; see SYNC_LOG.md for the full comparison
        // and why this was logged rather than acted on autonomously.
        sm: "min-h-20 px-3 py-1.5 text-ui-md",
        md: "min-h-24 px-4 py-2 text-ui-lg",
        lg: "min-h-28 px-5 py-3 text-ui-lg",
        xl: "min-h-32 px-6 py-4 text-ui-lg",
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
  /** Marks the textarea as invalid — sets aria-invalid and the error border/text color. */
  error?: boolean;
}

/**
 * role=textbox, multiline · requires an associated label via Field · aria-invalid=true on
 * error · resizable via the native drag handle · Figma's published Textarea (node
 * 2121:15056) confirms all 4 sizes (sm/md/lg/xl) are real, not just sm/md as an earlier
 * prose spec claimed — its real state axis is default/hover/focus/active/disabled/error
 * (no distinct "filled" state exists despite doc prose mentioning one)
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
