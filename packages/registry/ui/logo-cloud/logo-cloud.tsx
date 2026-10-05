import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface LogoCloudProps extends React.ComponentPropsWithRef<"div"> {
  /** Optional eyebrow above the logos. */
  label?: React.ReactNode;
}

/**
 * Social-proof logo strip · decorative logos as children · label is plain text ·
 * no interactive role of its own
 */
export function LogoCloud({
  ref,
  className,
  label,
  children,
  ...props
}: LogoCloudProps) {
  return (
    <div
      ref={ref}
      className={cn("flex w-full flex-col items-center gap-4", className)}
      {...props}
    >
      {label != null ? (
        <p className="text-center text-ui-sm font-medium text-fg-tertiary">
          {label}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {children}
      </div>
    </div>
  );
}

LogoCloud.displayName = "LogoCloud";

export interface LogoCloudItemProps
  extends React.ComponentPropsWithRef<"span"> {
  /** Accessible name when the child mark is decorative. */
  name: string;
  /** Optional 24px mark before the wordmark (Figma showMark / mark slot). Decorative. */
  mark?: React.ReactNode;
}

/** Text or mark stand-in for a brand logo. */
export function LogoCloudItem({
  ref,
  className,
  name,
  mark,
  children,
  ...props
}: LogoCloudItemProps) {
  return (
    <span
      ref={ref}
      role="img"
      aria-label={name}
      className={cn(
        "inline-flex items-center gap-1.5 text-ui-lg font-medium text-fg-tertiary",
        className,
      )}
      {...props}
    >
      {mark != null ? (
        <span
          aria-hidden="true"
          className="inline-flex size-6 shrink-0 [&>svg]:size-full"
        >
          {mark}
        </span>
      ) : null}
      {children ?? name}
    </span>
  );
}

LogoCloudItem.displayName = "LogoCloudItem";
