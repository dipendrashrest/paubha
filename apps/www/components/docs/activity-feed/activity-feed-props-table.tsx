import { definePropDefs } from "@/lib/prop-defs";
import type {
  ActivityFeedGroupProps,
  ActivityFeedItemProps,
  ActivityFeedPanelProps,
  ActivityFeedProps,
  ActivityFeedTimelineItemProps,
} from "@paubha/registry/ui/activity-feed";
import { PropsTable } from "../_shared/props-table";

const feedProps = definePropDefs<ActivityFeedProps>()([
  {
    name: "className",
    type: "string",
    description: "Merged onto the root list element.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    description: "ActivityFeedItem or ActivityFeedTimelineItem children.",
  },
]);

const itemProps = definePropDefs<ActivityFeedItemProps>()([
  {
    name: "avatar",
    type: "React.ReactNode",
    description: 'Leading media, typically <Avatar size="sm" />.',
  },
  {
    name: "title",
    type: "React.ReactNode",
    description: "Primary activity line (actor + action).",
  },
  {
    name: "timestamp",
    type: "React.ReactNode",
    description: "Relative or absolute time under the title.",
  },
  {
    name: "unread",
    type: "boolean",
    defaultValue: "false",
    description: "Shows a brand unread indicator on the trailing edge.",
  },
]);

const groupProps = definePropDefs<ActivityFeedGroupProps>()([
  {
    name: "label",
    type: "React.ReactNode",
    description: 'Section label, e.g. "Today", "Yesterday".',
  },
  {
    name: "children",
    type: "React.ReactNode",
    description: "Usually an ActivityFeed of items.",
  },
]);

const timelineProps = definePropDefs<ActivityFeedTimelineItemProps>()([
  {
    name: "title",
    type: "React.ReactNode",
    description: "Event title.",
  },
  {
    name: "timestamp",
    type: "React.ReactNode",
    description: "Trailing timestamp on the title row.",
  },
  {
    name: "status",
    type: "React.ReactNode",
    description: "Status row under the title, pass a Paubha Badge.",
  },
  {
    name: "last",
    type: "boolean",
    defaultValue: "false",
    description: "Hides the downward timeline connector.",
  },
]);

const panelProps = definePropDefs<ActivityFeedPanelProps>()([
  {
    name: "title",
    type: "React.ReactNode",
    defaultValue: '"Notifications"',
    description: "Panel heading.",
  },
  {
    name: "onMarkAllRead",
    type: "() => void",
    description: 'Shows the "Mark all read" button when provided.',
  },
  {
    name: "markAllReadLabel",
    type: "React.ReactNode",
    defaultValue: '"Mark all read"',
    description: "Label for the mark-all action.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    description: "Usually an ActivityFeed of items.",
  },
]);

export function ActivityFeedPropsTable() {
  return <PropsTable rows={[...feedProps]} />;
}

export function ActivityFeedItemPropsTable() {
  return <PropsTable rows={[...itemProps]} />;
}

export function ActivityFeedGroupPropsTable() {
  return <PropsTable rows={[...groupProps]} />;
}

export function ActivityFeedTimelineItemPropsTable() {
  return <PropsTable rows={[...timelineProps]} />;
}

export function ActivityFeedPanelPropsTable() {
  return <PropsTable rows={[...panelProps]} />;
}
