import { type VariantProps, cva } from "class-variance-authority";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type * as React from "react";
import { cn } from "../../lib/cn";

export interface PaginationProps extends React.ComponentPropsWithRef<"nav"> {}

/** nav with aria-label="Pagination" — wrap PaginationContent + PaginationItem children */
export function Pagination({
  ref,
  className,
  "aria-label": ariaLabel = "Pagination",
  ...props
}: PaginationProps) {
  return (
    <nav ref={ref} aria-label={ariaLabel} className={className} {...props} />
  );
}

Pagination.displayName = "Pagination";

const itemSizeContext = {
  sm: "size-7 text-ui-xs",
  md: "size-9 text-ui-md",
  lg: "size-11 text-ui-md",
} as const;

export type PaginationSize = keyof typeof itemSizeContext;

export interface PaginationContentProps
  extends React.ComponentPropsWithRef<"ul"> {
  size?: PaginationSize;
}

export function PaginationContent({
  ref,
  className,
  size = "md",
  ...props
}: PaginationContentProps) {
  return (
    <ul
      ref={ref}
      data-pagination-size={size}
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

PaginationContent.displayName = "PaginationContent";

export function PaginationItem({
  className,
  ...props
}: React.ComponentPropsWithRef<"li">) {
  return <li className={className} {...props} />;
}

const pageLinkVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-md border font-medium outline-none transition-colors",
    "focus-visible:shadow-[var(--shadow-glow-focus)]",
  ].join(" "),
  {
    variants: {
      size: itemSizeContext,
      active: {
        true: "border-transparent bg-bg-brand-solid text-fg-on-brand",
        false:
          "border-border-default bg-bg-primary text-fg-primary hover:bg-bg-secondary-hover",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  },
);

export interface PaginationLinkProps
  extends React.ComponentPropsWithRef<"button">,
    VariantProps<typeof pageLinkVariants> {
  /** Marks this page as the current page — sets aria-current="page". */
  isActive?: boolean;
}

/** Individual page number — role=button (native <button>), aria-current="page" when active */
export function PaginationLink({
  ref,
  className,
  size = "md",
  isActive = false,
  type = "button",
  ...props
}: PaginationLinkProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        pageLinkVariants({ size, active: isActive }),
        className,
      )}
      {...props}
    />
  );
}

PaginationLink.displayName = "PaginationLink";

const navButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-md border border-border-default bg-bg-primary text-fg-primary outline-none transition-colors",
    "hover:bg-bg-secondary-hover",
    "focus-visible:shadow-[var(--shadow-glow-focus)]",
    "disabled:cursor-not-allowed disabled:text-fg-disabled disabled:hover:bg-bg-primary",
  ].join(" "),
  {
    variants: {
      size: itemSizeContext,
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface PaginationNavButtonProps
  extends React.ComponentPropsWithRef<"button">,
    VariantProps<typeof navButtonVariants> {}

export function PaginationPrevious({
  ref,
  className,
  size = "md",
  type = "button",
  "aria-label": ariaLabel = "Previous page",
  ...props
}: PaginationNavButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      className={cn(navButtonVariants({ size }), className)}
      {...props}
    >
      <ChevronLeft className="size-3.5" aria-hidden="true" />
    </button>
  );
}

PaginationPrevious.displayName = "PaginationPrevious";

export function PaginationNext({
  ref,
  className,
  size = "md",
  type = "button",
  "aria-label": ariaLabel = "Next page",
  ...props
}: PaginationNavButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      className={cn(navButtonVariants({ size }), className)}
      {...props}
    >
      <ChevronRight className="size-3.5" aria-hidden="true" />
    </button>
  );
}

PaginationNext.displayName = "PaginationNext";

export function PaginationEllipsis({
  className,
  size = "md",
  ...props
}: React.ComponentPropsWithRef<"span"> & { size?: PaginationSize }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center text-fg-tertiary",
        itemSizeContext[size],
        className,
      )}
      {...props}
    >
      <MoreHorizontal className="size-3.5" aria-hidden="true" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
