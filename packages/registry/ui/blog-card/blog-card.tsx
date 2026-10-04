import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";
import { Card, CardContent, CardDescription } from "../card/card";

export interface BlogCardProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Cover image slot (180px tall, 8px radius, bg-tertiary placeholder). */
  cover?: React.ReactNode;
  /** When set, the title renders as a link: the card's single focus stop. */
  href?: string;
  /** Tag / category badge slot. */
  tag?: React.ReactNode;
  title: React.ReactNode;
  excerpt?: React.ReactNode;
  /** Author meta row (avatar + name + date). */
  meta?: React.ReactNode;
}

/**
 * role="article" · optional cover, tag, title, excerpt (clamped to 3 lines),
 * meta · with `href` the title is a link and the card's single Tab stop, with
 * a visible shadow-glow-focus ring · decorative cover images use alt=""
 */
export function BlogCard({
  ref,
  className,
  cover,
  href,
  tag,
  title,
  excerpt,
  meta,
  ...props
}: BlogCardProps) {
  return (
    <Card ref={ref} className={className} {...props}>
      <CardContent className="flex h-full flex-col gap-4 p-5">
        {cover != null ? (
          <div className="h-[180px] w-full shrink-0 overflow-hidden rounded-sm bg-bg-tertiary [&>img]:size-full [&>img]:object-cover">
            {cover}
          </div>
        ) : null}
        {tag != null ? <div>{tag}</div> : null}
        <p className="text-ui-lg font-semibold text-fg-primary">
          {href ? (
            <a
              href={href}
              className="rounded-xs outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </p>
        {excerpt != null ? (
          <CardDescription className="line-clamp-3 text-body-sm">
            {excerpt}
          </CardDescription>
        ) : null}
        {meta != null ? (
          <div className="mt-auto pt-1 text-ui-xs text-fg-tertiary">{meta}</div>
        ) : null}
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
