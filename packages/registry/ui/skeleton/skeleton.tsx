import { cn } from "@paubha/registry/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

const skeletonVariants = cva("animate-pulse bg-bg-tertiary", {
  variants: {
    variant: {
      text: "h-4 w-full rounded-sm",
      circle: "size-12 rounded-full",
      rectangle: "h-30 w-full rounded-md",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

export type SkeletonVariant = NonNullable<
  VariantProps<typeof skeletonVariants>["variant"]
>;

export interface SkeletonProps extends React.ComponentPropsWithRef<"div"> {
  variant?: SkeletonVariant;
}

/**
 * Figma defaults: text 16px line (radius-sm) · circle 48px (radius-full) ·
 * rectangle 120px tall (radius-md). Override any size via className.
 *
 * aria-hidden=true (purely decorative) · wrap it in a container with aria-busy=true while
 * loading · announce the swap to real content once it's ready (e.g. via a live region)
 */
export function Skeleton({
  ref,
  className,
  variant = "text",
  ...props
}: SkeletonProps) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";

export { skeletonVariants };
