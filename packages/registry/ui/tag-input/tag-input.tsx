"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

const containerVariants = cva(
  "flex flex-wrap items-center gap-1.5 rounded-md border bg-bg-primary px-3 outline-none",
  {
    variants: {
      size: {
        sm: "min-h-8",
        md: "min-h-10",
        lg: "min-h-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface TagInputProps
  extends Omit<React.ComponentPropsWithRef<"div">, "onChange">,
    VariantProps<typeof containerVariants> {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  /** Prevents adding a tag that already exists (case-insensitive). Defaults to true. */
  preventDuplicates?: boolean;
}

/**
 * Container role="group" · each tag's remove button has aria-label="Remove [tag]" ·
 * Enter or Comma creates a tag from the current input text · Backspace on an empty input
 * removes the last tag · disabled state uses aria-disabled · focus ring visible via
 * shadow-glow-focus, or shadow-glow-focus-error when focused while `error` is set —
 * matching Input/Select/Slider's established error-focus pattern (audit fix: the focus
 * ring previously stayed brand-tinted even while `error` was true).
 */
export function TagInput({
  ref,
  className,
  size = "md",
  tags,
  onTagsChange,
  placeholder = "Add tag...",
  error = false,
  disabled = false,
  preventDuplicates = true,
  ...props
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  function addTag(raw: string) {
    const value = raw.trim();
    if (!value) return;
    if (preventDuplicates && tags.some((tag) => tag.toLowerCase() === value.toLowerCase())) {
      setInputValue("");
      return;
    }
    onTagsChange([...tags, value]);
    setInputValue("");
  }

  function removeTag(index: number) {
    onTagsChange(tags.filter((_, i) => i !== index));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(inputValue);
    } else if (event.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  }

  return (
    <div
      ref={ref}
      // biome-ignore lint/a11y/useSemanticElements: <fieldset> requires a <legend> for its accessible name and can't take aria-label the same way; a labeled group of tags via role="group" matches Figma's a11y spec exactly
      role="group"
      aria-disabled={disabled || undefined}
      className={cn(
        containerVariants({ size }),
        error ? "border-2 border-border-error" : "border-border-default",
        error
          ? "has-[input:focus-visible]:border-2 has-[input:focus-visible]:border-border-error has-[input:focus-visible]:shadow-[var(--shadow-glow-focus-error)]"
          : "has-[input:focus-visible]:border-2 has-[input:focus-visible]:border-border-brand has-[input:focus-visible]:shadow-[var(--shadow-glow-focus)]",
        disabled && "cursor-not-allowed bg-bg-secondary",
        className,
      )}
      onClick={() => inputRef.current?.focus()}
      {...props}
    >
      {tags.map((tag, index) => (
        <span
          key={tag}
          className="flex shrink-0 items-center gap-1 rounded-sm bg-bg-secondary px-2 py-1 text-ui-xs font-medium text-fg-primary"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation();
              removeTag(index);
            }}
            className="flex shrink-0 items-center justify-center text-fg-tertiary outline-none hover:text-fg-primary focus-visible:shadow-[var(--shadow-glow-focus)] disabled:pointer-events-none"
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        className="min-w-24 flex-1 bg-transparent text-body-sm text-fg-primary outline-none placeholder:text-fg-tertiary disabled:cursor-not-allowed"
      />
    </div>
  );
}

TagInput.displayName = "TagInput";

