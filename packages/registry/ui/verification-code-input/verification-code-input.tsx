"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface VerificationCodeInputProps
  extends Omit<React.ComponentPropsWithRef<"div">, "onChange" | "defaultValue"> {
  /** Number of digit cells. */
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Shows every cell in the error color and marks them aria-invalid. */
  error?: boolean;
  disabled?: boolean;
  /** Required — describes the whole group, e.g. "6-digit verification code". */
  "aria-label": string;
}

/**
 * Wrapped in role="group" with aria-label · each cell is its own input with
 * aria-label="Digit N of M" · typing a digit auto-advances to the next cell · Backspace
 * on an empty cell moves focus to the previous one · pasting a full code fills every
 * cell at once · error state is announced via aria-invalid on each cell · focus ring
 * visible via shadow-glow-focus
 */
export function VerificationCodeInput({
  ref,
  className,
  length = 6,
  value,
  defaultValue,
  onValueChange,
  error = false,
  disabled = false,
  "aria-label": ariaLabel,
  ...props
}: VerificationCodeInputProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const rawValue = isControlled ? (value ?? "") : internalValue;
  const digits = Array.from({ length }, (_, i) => rawValue[i] ?? "");
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  function commit(next: string) {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  }

  function handleChange(index: number, raw: string) {
    const char = raw.replace(/\D/g, "").slice(-1);
    const next = digits.slice();
    next[index] = char;
    commit(next.join(""));
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      const next = digits.slice();
      next[index - 1] = "";
      commit(next.join(""));
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    commit(pasted);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div
      ref={ref}
      // biome-ignore lint/a11y/useSemanticElements: <fieldset> requires a <legend> for its accessible name and can't take aria-label the same way; a labeled group of inputs via role="group" matches Figma's a11y spec exactly
      role="group"
      aria-label={ariaLabel}
      className={cn("flex gap-2", className)}
      {...props}
    >
      {digits.map((digit, index) => (
        <input
          // biome-ignore lint/suspicious/noArrayIndexKey: cells are positional and never reordered/inserted/removed
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={error || undefined}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          className={cn(
            "h-14 w-12 shrink-0 rounded-md border bg-bg-primary text-center text-display-xs font-semibold text-fg-primary outline-none",
            "focus-visible:border-2 focus-visible:border-border-brand focus-visible:text-fg-brand focus-visible:shadow-[var(--shadow-glow-focus)]",
            error
              ? "border-2 border-border-error text-fg-error"
              : "border-border-default",
            "disabled:cursor-not-allowed disabled:bg-bg-secondary disabled:text-fg-disabled",
          )}
        />
      ))}
    </div>
  );
}

VerificationCodeInput.displayName = "VerificationCodeInput";
