"use client";

import { cn } from "@paubha/registry/lib/cn";
import * as React from "react";

export interface VerificationCodeInputProps
  extends Omit<
    React.ComponentPropsWithRef<"div">,
    "onChange" | "defaultValue"
  > {
  /** Number of digit cells. */
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Shows every cell in the error color and marks them aria-invalid. */
  error?: boolean;
  /** Message shown below the cells while `error` is set; linked via aria-describedby. */
  errorMessage?: React.ReactNode;
  disabled?: boolean;
  /** Required. Describes the whole group, e.g. "6-digit verification code". */
  "aria-label": string;
}

/**
 * Wrapped in role="group" with aria-label · each cell is its own input with
 * aria-label="Digit N of M" · typing a digit auto-advances to the next cell · Backspace
 * on an empty cell moves focus to the previous one · pasting a full code fills every
 * cell at once · error state is announced via aria-invalid on each cell · focus ring
 * visible via shadow-glow-focus, or shadow-glow-focus-error when a cell is focused while
 * `error` is set · `errorMessage` renders below the cells and is linked to every cell
 * via aria-describedby · Figma's "filled" digit state matches default (border-default,
 * fg-primary) so it needs no separate treatment
 */
export function VerificationCodeInput({
  ref,
  className,
  length = 6,
  value,
  defaultValue,
  onValueChange,
  error = false,
  errorMessage,
  disabled = false,
  "aria-label": ariaLabel,
  ...props
}: VerificationCodeInputProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const rawValue = isControlled ? (value ?? "") : internalValue;
  const digits = Array.from({ length }, (_, i) => rawValue[i] ?? "");
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const messageId = React.useId();
  const showMessage = error && errorMessage != null;

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

  function handleKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      const next = digits.slice();
      next[index - 1] = "";
      commit(next.join(""));
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;
    commit(pasted);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  const group = (
    <div
      ref={showMessage ? undefined : ref}
      // biome-ignore lint/a11y/useSemanticElements: <fieldset> requires a <legend> for its accessible name and can't take aria-label the same way; a labeled group of inputs via role="group" matches Figma's a11y spec exactly
      role="group"
      aria-label={ariaLabel}
      className={cn("flex items-center gap-2", !showMessage && className)}
      {...(showMessage ? {} : props)}
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
          aria-describedby={showMessage ? messageId : undefined}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          className={cn(
            "size-9 shrink-0 rounded-md border bg-bg-primary text-center text-display-xs font-semibold text-fg-primary outline-none",
            "focus-visible:border-2 focus-visible:border-border-brand focus-visible:text-fg-brand focus-visible:shadow-[var(--shadow-glow-focus)]",
            error
              ? "border-2 border-border-error text-fg-error"
              : "border-border-default",
            // Matches Input/Select/Slider/Tag Input's established error-focus pattern: the
            // aria-invalid-scoped selector out-specifies the plain focus-visible rule above,
            // so a focused digit in error mode keeps the red border/text and swaps to the
            // error focus ring instead of incorrectly flashing brand blue on focus.
            "aria-invalid:focus-visible:border-border-error aria-invalid:focus-visible:text-fg-error aria-invalid:focus-visible:shadow-[var(--shadow-glow-focus-error)]",
            "disabled:cursor-not-allowed disabled:bg-bg-secondary disabled:text-fg-disabled",
          )}
        />
      ))}
    </div>
  );

  if (!showMessage) return group;

  return (
    <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
      {group}
      <p id={messageId} className="text-body-sm text-fg-error">
        {errorMessage}
      </p>
    </div>
  );
}

VerificationCodeInput.displayName = "VerificationCodeInput";
