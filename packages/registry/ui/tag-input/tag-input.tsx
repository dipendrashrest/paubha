"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

const containerVariants = cva(
  "flex flex-wrap items-center gap-1.5 rounded-sm border bg-bg-primary px-3 outline-none",
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

/**
 * TagInputV2 — additive only; does not alter `TagInput` above.
 *
 * No real "Tag Input / v2 — restrained" Figma frame could be located this session despite a
 * time-boxed, documented search: the standard `2120:2`–`2120:19` range (Tag Input isn't one
 * of the original 19 — it's component 14/14 of the separate 2026-08-25 "14 missing base
 * components" batch per its own build commit `4e24886`, "New base component (14/14)"), `0:1`,
 * and every `6033:*`/`6089:*`/`6098:*`/`6100:*`/`6126:*`/`6318:*` canvas this run's ground
 * rules name all came back empty for a Tag Input frame specifically — direct `get_metadata`
 * pulls on Kbd's confirmed sibling canvas from that same batch (`2169:19985`, which *does*
 * have a real page) show no nested Tag Input frame, and Table (`6089:36971`) / Dialog
 * (`6089:36993`) / Pagination (`6033:30`, its "v2 — restrained" frame `6318:9133`) / Popover
 * (`6033:35565`, its "v2 — restrained" frame `6318:23417`) were all individually walked and
 * contain only their own component's frames. `search_design_system` again surfaced nothing
 * from this file's own local assets (same known limitation logged repeatedly elsewhere in
 * SYNC_LOG.md). The "add Tag Input" commit message itself records no node id to recover.
 * Same class of gap as Select/Card/Accordion/Progress Circle/Slider this run — not inventing
 * a v1 spec, per the ground rules, but still building v2 additively.
 *
 * Per this run's explicit fallback guidance, built from Popover's real, confirmed "v2 —
 * restrained" frame (`6318:23417`) as the structural reference for "what does v2 restrained
 * mean in this file" — NOT the debunked Pagination-based "squircle vs pill / tighter gap"
 * framing corrected earlier tonight. Popover's real v2 delta over its own v1 is narrow and
 * concrete: an added `hover` state and an added `disabled` state, both otherwise pixel-
 * identical to v1's chrome (same tokens, same radius, no invented color). Applied the same
 * shape here: `TagInputV2` adds a real `hover` treatment the base `TagInput` container never
 * had at all (`border-border-strong` on hover, mirroring the `border/strong` hover swap this
 * codebase's own audits have repeatedly confirmed on Input/Checkbox/Radio Group/Switch —
 * i.e. an inference from this file's own recurring, confirmed cross-component hover pattern,
 * not a guess), and a `disabled` state that dims the whole control (`opacity-50`) rather than
 * only tinting the background, matching Popover v2's confirmed disabled treatment
 * (`data-[disabled]:opacity-50`) — everything else (sizes, tag chrome, focus/error-focus
 * ring behavior) is carried over unchanged from `TagInput` above.
 */
export interface TagInputV2Props extends TagInputProps {}

export function TagInputV2({
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
}: TagInputV2Props) {
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
      // biome-ignore lint/a11y/useSemanticElements: same rationale as TagInput above
      role="group"
      aria-disabled={disabled || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        containerVariants({ size }),
        "transition-colors",
        error ? "border-2 border-border-error" : "border-border-default",
        !disabled && !error && "hover:border-border-strong",
        error
          ? "has-[input:focus-visible]:border-2 has-[input:focus-visible]:border-border-error has-[input:focus-visible]:shadow-[var(--shadow-glow-focus-error)]"
          : "has-[input:focus-visible]:border-2 has-[input:focus-visible]:border-border-brand has-[input:focus-visible]:shadow-[var(--shadow-glow-focus)]",
        disabled && "cursor-not-allowed opacity-50",
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

TagInputV2.displayName = "TagInputV2";
