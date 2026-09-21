"use client";

import { cn } from "@paubha/registry/lib/cn";
import { Check, Copy } from "lucide-react";
import * as React from "react";

/** Shared chrome for docs icon-only controls: hover + a darker pressed/selected fill. */
export const docsIconButtonClassName = [
  "inline-flex size-8 shrink-0 items-center justify-center rounded-sm",
  "text-fg-tertiary transition-colors",
  "hover:bg-bg-secondary-hover hover:text-fg-secondary",
  "active:bg-bg-tertiary-hover active:text-fg-secondary",
  "aria-pressed:bg-bg-tertiary-hover aria-pressed:text-fg-secondary",
  "data-[copied]:bg-bg-tertiary-hover data-[copied]:text-fg-secondary",
  "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
].join(" ");

export function DocsIconButton({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button type="button" className={cn(docsIconButtonClassName, className)} {...props}>
      {children}
    </button>
  );
}

export function CodeCopyButton({
  getText,
  className,
}: {
  getText: () => string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const resetRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    return () => window.clearTimeout(resetRef.current);
  }, []);

  return (
    <DocsIconButton
      className={className}
      aria-label={copied ? "Copied" : "Copy"}
      data-copied={copied ? "" : undefined}
      onClick={() => {
        const text = getText().replace(/\n$/, "");
        void navigator.clipboard.writeText(text);
        setCopied(true);
        window.clearTimeout(resetRef.current);
        resetRef.current = window.setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
    </DocsIconButton>
  );
}

export function CodeSnippet({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border-default bg-bg-secondary",
        className,
      )}
    >
      <CodeCopyButton
        className="absolute top-2 right-2 z-10"
        getText={() => code}
      />
      <pre className="overflow-x-auto p-4 pr-12 font-mono text-ui-sm text-fg-primary">
        <code>{code}</code>
      </pre>
    </div>
  );
}
