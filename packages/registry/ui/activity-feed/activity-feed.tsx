import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

/**
 * Chronological feed of user actions / system events.
 * Native ul/li list semantics · unread dot is decorative (aria-hidden) ·
 * Mark all read is a button with shadow-glow-focus · timeline rail is aria-hidden
 */

export interface ActivityFeedProps extends React.ComponentPropsWithRef<"ul"> {}

export function ActivityFeed({
  ref,
  className,
  children,
  ...props
}: ActivityFeedProps) {
  return (
    <ul ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
      {children}
    </ul>
  );
}

ActivityFeed.displayName = "ActivityFeed";

export interface ActivityFeedItemProps
  extends Omit<React.ComponentPropsWithRef<"li">, "title"> {
  /** Leading media, typically an Avatar at size="sm". */
  avatar?: React.ReactNode;
  /** Primary activity line (name + action). */
  title: React.ReactNode;
  /** Relative or absolute timestamp under the title. */
  timestamp?: React.ReactNode;
  /** Shows a brand unread indicator on the trailing edge. */
  unread?: boolean;
}

export function ActivityFeedItem({
  ref,
  className,
  avatar,
  title,
  timestamp,
  unread = false,
  ...props
}: ActivityFeedItemProps) {
  return (
    <li
      ref={ref}
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      {avatar ? <div className="shrink-0">{avatar}</div> : null}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="text-ui-md text-fg-primary">{title}</div>
        {timestamp ? (
          <div className="text-ui-md text-fg-tertiary">{timestamp}</div>
        ) : null}
      </div>
      {unread ? (
        <span
          aria-hidden="true"
          className="size-2 shrink-0 rounded-full bg-bg-brand-solid"
        />
      ) : null}
    </li>
  );
}

ActivityFeedItem.displayName = "ActivityFeedItem";

export interface ActivityFeedGroupProps
  extends React.ComponentPropsWithRef<"div"> {
  /** Section label, e.g. "Today", "Yesterday". */
  label: React.ReactNode;
}

export function ActivityFeedGroup({
  ref,
  className,
  label,
  children,
  ...props
}: ActivityFeedGroupProps) {
  return (
    <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
      <p className="text-ui-md font-semibold text-fg-primary">{label}</p>
      {children}
    </div>
  );
}

ActivityFeedGroup.displayName = "ActivityFeedGroup";

export interface ActivityFeedTimelineItemProps
  extends Omit<React.ComponentPropsWithRef<"li">, "title"> {
  title: React.ReactNode;
  timestamp?: React.ReactNode;
  /**
   * Status row under the title: pass a Paubha `Badge` (e.g.
   * `<Badge variant="brand" fill="subtle" size="sm">Completed <ArrowRight /></Badge>`).
   */
  status?: React.ReactNode;
  /** Hide the downward connector (last item). */
  last?: boolean;
}

/**
 * Timeline row: brand solid node + border-default rail, title/timestamp row,
 * then a status slot (Badge). Use inside `ActivityFeed` with `className="gap-0"`.
 * Rail is absolutely positioned on the row (including `pb-4`) so it stays continuous.
 */
export function ActivityFeedTimelineItem({
  ref,
  className,
  title,
  timestamp,
  status,
  last = false,
  ...props
}: ActivityFeedTimelineItemProps) {
  return (
    <li
      ref={ref}
      className={cn(
        "group/timeline relative flex gap-3",
        !last && "pb-4",
        className,
      )}
      {...props}
    >
      {/* Incoming stub: meets the previous row's rail at this node's center */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-[5px] h-[11px] w-px bg-border-default group-first/timeline:hidden"
      />
      {/* Outgoing rail: through this row + pb-4, stops at the next row's top edge */}
      {last ? null : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[11px] bottom-0 left-[5px] w-px bg-border-default"
        />
      )}
      <div
        aria-hidden="true"
        className="relative z-10 flex w-3 shrink-0 justify-center pt-1.5"
      >
        <span className="size-2.5 shrink-0 rounded-full bg-bg-brand-solid" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 text-ui-md font-semibold text-fg-primary">
            {title}
          </p>
          {timestamp ? (
            <p className="shrink-0 text-ui-md font-normal text-fg-primary">
              {timestamp}
            </p>
          ) : null}
        </div>
        {status ? <div className="flex items-center">{status}</div> : null}
      </div>
    </li>
  );
}

ActivityFeedTimelineItem.displayName = "ActivityFeedTimelineItem";

export interface ActivityFeedPanelProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Panel heading, defaults to "Notifications". */
  title?: React.ReactNode;
  /** Called when "Mark all read" is activated. */
  onMarkAllRead?: () => void;
  /** Override the mark-all label. */
  markAllReadLabel?: React.ReactNode;
}

export function ActivityFeedPanel({
  ref,
  className,
  title = "Notifications",
  onMarkAllRead,
  markAllReadLabel = "Mark all read",
  children,
  ...props
}: ActivityFeedPanelProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 rounded-md border border-border-default bg-bg-primary p-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-ui-md font-semibold text-fg-primary">{title}</p>
        {onMarkAllRead ? (
          <button
            type="button"
            onClick={onMarkAllRead}
            className={cn(
              "rounded-xs text-ui-md font-medium text-fg-brand outline-none",
              "hover:text-fg-brand",
              "focus-visible:shadow-[var(--shadow-glow-focus)]",
            )}
          >
            {markAllReadLabel}
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}

ActivityFeedPanel.displayName = "ActivityFeedPanel";
