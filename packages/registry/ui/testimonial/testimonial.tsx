import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface TestimonialProps
  extends Omit<React.ComponentPropsWithRef<"figure">, "title" | "role"> {
  quote: React.ReactNode;
  /** Author name. */
  author: React.ReactNode;
  /** Role / company line. */
  role?: React.ReactNode;
  /** Leading avatar slot. */
  avatar?: React.ReactNode;
}

/**
 * Quote block for marketing pages · native figure/blockquote · avatar is
 * decorative relative to the cite text
 */
export function Testimonial({
  ref,
  className,
  quote,
  author,
  role,
  avatar,
  ...props
}: TestimonialProps) {
  return (
    <figure
      ref={ref}
      className={cn(
        "flex flex-col gap-3 rounded-md border border-border-default bg-bg-primary p-6",
        className,
      )}
      {...props}
    >
      <blockquote className="text-body-lg text-fg-primary">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-[17px] flex items-center gap-3">
        {avatar != null ? <div className="shrink-0">{avatar}</div> : null}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-ui-md font-medium text-fg-primary">{author}</p>
          {role != null ? (
            <p className="text-ui-sm text-fg-tertiary">{role}</p>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}

Testimonial.displayName = "Testimonial";

export interface TestimonialGridProps
  extends React.ComponentPropsWithRef<"div"> {}

export function TestimonialGrid({
  ref,
  className,
  ...props
}: TestimonialGridProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    />
  );
}

TestimonialGrid.displayName = "TestimonialGrid";
