import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export interface CommentProps
  extends Omit<React.ComponentPropsWithRef<"article">, "title"> {
  avatar?: React.ReactNode;
  author: React.ReactNode;
  timestamp?: React.ReactNode;
  /** Reply / like / more slot. */
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Comment thread item · article · avatar decorative relative to author ·
 * action buttons must carry glow-focus themselves
 */
export function Comment({
  ref,
  className,
  avatar,
  author,
  timestamp,
  actions,
  children,
  ...props
}: CommentProps) {
  return (
    <article ref={ref} className={cn("flex gap-3", className)} {...props}>
      {avatar != null ? <div className="shrink-0">{avatar}</div> : null}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <p className="text-ui-sm font-semibold text-fg-primary">{author}</p>
          {timestamp != null ? (
            <p className="text-ui-xs text-fg-tertiary">{timestamp}</p>
          ) : null}
        </div>
        {children != null ? (
          <p className="mt-1 text-body-sm text-fg-secondary">{children}</p>
        ) : null}
        {actions != null ? (
          <div className="mt-2 flex items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </article>
  );
}

Comment.displayName = "Comment";

export interface CommentListProps extends React.ComponentPropsWithRef<"div"> {}

export function CommentList({ ref, className, ...props }: CommentListProps) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-5", className)}
      {...props}
    />
  );
}

CommentList.displayName = "CommentList";
