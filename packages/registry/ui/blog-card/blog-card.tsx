import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";
import { Card, CardContent, CardDescription } from "../card/card";

export interface BlogCardProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Tag / category badge slot. */
  tag?: React.ReactNode;
  title: React.ReactNode;
  excerpt?: React.ReactNode;
  /** Author meta row (avatar + name + date). */
  meta?: React.ReactNode;
}

/**
 * Blog index card · Card article role · title + excerpt + meta · no link
 * chrome (wrap or pass onClick on Card via className parent)
 */
export function BlogCard({
  ref,
  className,
  tag,
  title,
  excerpt,
  meta,
  ...props
}: BlogCardProps) {
  return (
    <Card
      ref={ref}
      variant="outlined"
      className={cn("hover:bg-bg-primary", className)}
      {...props}
    >
      <CardContent className="flex h-full flex-col gap-4 p-5">
        {tag != null ? <div>{tag}</div> : null}
        <p className="text-ui-lg font-semibold text-fg-primary">{title}</p>
        {excerpt != null ? (
          <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
        ) : null}
        {meta != null ? <div className="mt-auto pt-1">{meta}</div> : null}
      </CardContent>
    </Card>
  );
}

BlogCard.displayName = "BlogCard";

export interface BlogCardGridProps extends React.ComponentPropsWithRef<"div"> {}

export function BlogCardGrid({ ref, className, ...props }: BlogCardGridProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    />
  );
}

BlogCardGrid.displayName = "BlogCardGrid";
