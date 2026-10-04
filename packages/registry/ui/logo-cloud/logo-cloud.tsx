import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

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
        <p className="text-center text-ui-sm text-fg-tertiary">{label}</p>
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
}

/** Text or mark stand-in for a brand logo. */
export function LogoCloudItem({
  ref,
  className,
  name,
  children,
  ...props
}: LogoCloudItemProps) {
  return (
    <span
      ref={ref}
      role="img"
      aria-label={name}
      className={cn(
        "text-ui-lg font-semibold tracking-tight text-fg-disabled",
        className,
      )}
      {...props}
    >
      {children ?? name}
    </span>
  );
}

LogoCloudItem.displayName = "LogoCloudItem";
