"use client";

import { cn } from "@paubha/registry/lib/cn";
import { Check, Copy } from "lucide-react";
import * as React from "react";

export interface CliSnippetProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title" | "onCopy"> {
  /** Optional eyebrow label above the command. */
  label?: React.ReactNode;
  /** The command string shown in mono. */
  command: string;
  /** Optional supporting line under the command. */
  description?: React.ReactNode;
  /** Show the copy button (Figma `showCopy`). */
  showCopy?: boolean;
  /** Called after the command is copied. */
  onCopy?: (command: string) => void;
}

/**
 * CLI snippet · command in <pre><code> (mono, wraps) and selectable ·
 * optional label + description · copy button is a native <button> with
 * aria-label="Copy command" (Enter/Space activates; announces "Copied" via
 * aria-live) · focus ring visible on Tab (glow-focus)
 */
export function CliSnippet({
  ref,
  className,
  label,
  command,
  description,
  showCopy = false,
  onCopy,
  ...props
}: CliSnippetProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    onCopy?.(command);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1500);
  };

  const Icon = copied ? Check : Copy;

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1 rounded-md border border-border-default bg-bg-primary p-4",
        className,
      )}
      {...props}
    >
      {label != null ? (
        <p className="text-ui-sm text-fg-tertiary">{label}</p>
      ) : null}
      <div className="flex items-center gap-3">
        <pre className="min-w-0 flex-1 whitespace-pre-wrap break-words font-mono text-[14px] font-medium leading-5 tracking-[-0.1px] text-fg-primary">
          <code>{command}</code>
        </pre>
        {showCopy ? (
          <>
            <button
              type="button"
              aria-label="Copy command"
              onClick={handleCopy}
              className="flex shrink-0 items-center justify-center rounded-sm p-1.5 text-fg-secondary outline-none transition-colors hover:bg-bg-secondary-hover focus-visible:shadow-[var(--shadow-glow-focus)]"
            >
              <Icon className="size-4" aria-hidden="true" />
            </button>
            <output className="sr-only">{copied ? "Copied" : ""}</output>
          </>
        ) : null}
      </div>
      {description != null ? (
        <p className="text-body-sm text-fg-secondary">{description}</p>
      ) : null}
    </div>
  );
}

CliSnippet.displayName = "CliSnippet";
