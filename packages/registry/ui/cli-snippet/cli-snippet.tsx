import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

export interface CliSnippetProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Optional eyebrow label above the command. */
  label?: React.ReactNode;
  /** The command string shown in mono. */
  command: string;
  /** Optional supporting line under the command. */
  description?: React.ReactNode;
}

/**
 * Marketing CLI callout · non-interactive code presentation · command is
 * selectable text · no copy button (keep pattern lean)
 */
export function CliSnippet({
  ref,
  className,
  label,
  command,
  description,
  ...props
}: CliSnippetProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md border border-border-default bg-bg-primary p-4",
        className,
      )}
      {...props}
    >
      {label != null ? (
        <p className="text-ui-sm font-medium text-fg-tertiary">{label}</p>
      ) : null}
      <pre
        className={cn(
          "overflow-x-auto font-mono text-ui-md font-semibold text-fg-primary",
          label != null && "mt-1",
        )}
      >
        <code>{command}</code>
      </pre>
      {description != null ? (
        <p className="mt-2 text-body-sm text-fg-secondary">{description}</p>
      ) : null}
    </div>
  );
}

CliSnippet.displayName = "CliSnippet";
