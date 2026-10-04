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
 * Comment thread item · role=article · avatar decorative relative to author ·
 * actions are real buttons with text labels (use CommentAction) · Tab moves
 * between actions, Enter/Space activates · glow-focus ring visible on Tab
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
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <p className="text-ui-sm font-semibold text-fg-primary">{author}</p>
          {timestamp != null ? (
            <p className="text-ui-xs font-medium text-fg-tertiary">
              {timestamp}
            </p>
          ) : null}
        </div>
        {children != null ? (
          <p className="text-body-sm text-fg-secondary">{children}</p>
        ) : null}
        {actions != null ? (
          <div className="flex items-center gap-1 pt-1">{actions}</div>
        ) : null}
      </div>
    </article>
  );
}

Comment.displayName = "Comment";

export interface CommentActionProps
  extends React.ComponentPropsWithRef<"button"> {
  icon?: React.ReactNode;
}

/** Reply / Like style action: 14px icon + ui-xs medium label. */
export function CommentAction({
  ref,
  className,
  icon,
  children,
  type = "button",
  ...props
}: CommentActionProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2 py-1 text-ui-xs font-medium text-fg-secondary outline-none transition-colors hover:bg-bg-secondary-hover focus-visible:shadow-[var(--shadow-glow-focus)] disabled:pointer-events-none disabled:text-fg-disabled [&_svg]:size-3.5 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

CommentAction.displayName = "CommentAction";

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
