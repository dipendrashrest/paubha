import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface SiteFooterProps extends React.ComponentPropsWithRef<"footer"> {
  /** Brand / mark slot. */
  brand?: React.ReactNode;
  /** Short blurb under the brand. */
  description?: React.ReactNode;
  /** Column groups, typically SiteFooterColumn children. */
  children?: React.ReactNode;
  /** Bottom legal / copyright row. */
  bottom?: React.ReactNode;
}

/**
 * Marketing / app site footer · native footer landmark · columns are navigation
 * lists · interactive links must carry glow-focus themselves
 */
export function SiteFooter({
  ref,
  className,
  brand,
  description,
  children,
  bottom,
  ...props
}: SiteFooterProps) {
  return (
    <footer
      ref={ref}
      className={cn(
        "w-full border-t border-border-default bg-bg-secondary",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        {(brand != null || description != null) && (
          <div className="flex max-w-xs flex-col gap-3">
            {brand}
            {description != null ? (
              <p className="text-body-sm text-fg-tertiary">{description}</p>
            ) : null}
          </div>
        )}
        {children != null ? (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {children}
          </div>
        ) : null}
      </div>
      {bottom != null ? (
        <div className="border-t border-border-default">
          <div className="mx-auto max-w-6xl px-6 py-4 text-ui-xs text-fg-tertiary">
            {bottom}
          </div>
        </div>
      ) : null}
    </footer>
  );
}

SiteFooter.displayName = "SiteFooter";

export interface SiteFooterColumnProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  title: React.ReactNode;
}

export function SiteFooterColumn({
  ref,
  className,
  title,
  children,
  ...props
}: SiteFooterColumnProps) {
  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      <p className="text-ui-sm font-semibold text-fg-primary">{title}</p>
      <nav
        aria-label={typeof title === "string" ? title : "Footer"}
        className="flex flex-col gap-2"
      >
        {children}
      </nav>
    </div>
  );
}

SiteFooterColumn.displayName = "SiteFooterColumn";

export interface SiteFooterLinkProps extends React.ComponentPropsWithRef<"a"> {}

export function SiteFooterLink({
  ref,
  className,
  ...props
}: SiteFooterLinkProps) {
  return (
    <a
      ref={ref}
      className={cn(
        "text-ui-sm text-fg-tertiary transition-colors hover:text-fg-primary",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
        className,
      )}
      {...props}
    />
  );
}

SiteFooterLink.displayName = "SiteFooterLink";
