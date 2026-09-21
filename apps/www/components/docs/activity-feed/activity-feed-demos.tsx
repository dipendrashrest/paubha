"use client";

import {
  ActivityFeed,
  ActivityFeedGroup,
  ActivityFeedItem,
  ActivityFeedPanel,
  ActivityFeedTimelineItem,
} from "@paubha/registry/ui/activity-feed";
import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { ArrowRight } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

export function ActivityFeedHero() {
  return (
    <ComponentPlayground
      code={`<ActivityFeed>
  <ActivityFeedItem
    avatar={<Avatar initials="AC" alt="Anna Chen" size="sm" />}
    title={<>
      <span className="font-semibold">Anna Chen</span> commented on Project Atlas
    </>}
    timestamp="2h ago"
  />
</ActivityFeed>`}
    >
      <div className="w-full max-w-md rounded-md border border-border-default bg-bg-primary p-4">
        <ActivityFeed>
          <ActivityFeedItem
            avatar={<Avatar initials="AC" alt="Anna Chen" size="sm" />}
            title={
              <>
                <span className="font-semibold">Anna Chen</span> commented on
                Project Atlas
              </>
            }
            timestamp="2h ago"
          />
        </ActivityFeed>
      </div>
    </ComponentPlayground>
  );
}

export function ActivityFeedSimple() {
  return (
    <ComponentPlayground
      code={`<ActivityFeed>
  <ActivityFeedItem
    avatar={<Avatar initials="AC" alt="Anna Chen" size="sm" />}
    title={<>
      <span className="font-semibold">Anna Chen</span> commented on Project Atlas
    </>}
    timestamp="2h ago"
  />
  <ActivityFeedItem
    avatar={<Avatar initials="JL" alt="Jordan Lee" size="sm" />}
    title={<>
      <span className="font-semibold">Jordan Lee</span> invited you to a meeting
    </>}
    timestamp="4h ago"
  />
</ActivityFeed>`}
    >
      <div className="w-full max-w-md rounded-md border border-border-default bg-bg-primary p-4">
        <ActivityFeed>
          <ActivityFeedItem
            avatar={<Avatar initials="AC" alt="Anna Chen" size="sm" />}
            title={
              <>
                <span className="font-semibold">Anna Chen</span> commented on
                Project Atlas
              </>
            }
            timestamp="2h ago"
          />
          <ActivityFeedItem
            avatar={<Avatar initials="JL" alt="Jordan Lee" size="sm" />}
            title={
              <>
                <span className="font-semibold">Jordan Lee</span> invited you to
                a meeting
              </>
            }
            timestamp="4h ago"
          />
          <ActivityFeedItem
            avatar={<Avatar initials="OR" alt="Olivia Rhye" size="sm" />}
            title={
              <>
                <span className="font-semibold">Olivia Rhye</span> uploaded 3
                files to Design Assets
              </>
            }
            timestamp="1d ago"
          />
        </ActivityFeed>
      </div>
    </ComponentPlayground>
  );
}

export function ActivityFeedTimeline() {
  return (
    <ComponentPlayground
      code={`<ActivityFeed className="gap-0">
  <ActivityFeedTimelineItem
    title="Project Atlas launched"
    timestamp="Today · 10:20 AM"
    status={
      <Badge variant="brand" fill="subtle" size="sm">
        Completed
        <ArrowRight className="size-3" aria-hidden="true" />
      </Badge>
    }
  />
  <ActivityFeedTimelineItem
    title="Design review scheduled"
    timestamp="Yesterday · 4:30 PM"
    status={
      <Badge variant="warning" fill="subtle" size="sm">
        In Progress
        <ArrowRight className="size-3" aria-hidden="true" />
      </Badge>
    }
  />
</ActivityFeed>`}
    >
      <div className="flex w-full max-w-[520px] flex-col gap-3 rounded-md border border-border-default bg-bg-primary p-4">
        <p className="text-ui-xs font-medium text-fg-secondary">Timeline feed</p>
        <ActivityFeed className="gap-0">
          <ActivityFeedTimelineItem
            title="Project Atlas launched"
            timestamp="Today · 10:20 AM"
            status={
              <Badge variant="brand" fill="subtle" size="sm">
                Completed
                <ArrowRight className="size-3" aria-hidden="true" />
              </Badge>
            }
          />
          <ActivityFeedTimelineItem
            title="Design review scheduled"
            timestamp="Yesterday · 4:30 PM"
            status={
              <Badge variant="warning" fill="subtle" size="sm">
                In Progress
                <ArrowRight className="size-3" aria-hidden="true" />
              </Badge>
            }
          />
          <ActivityFeedTimelineItem
            title="Database migration completed"
            timestamp="Oct 12 · 9:05 AM"
            status={
              <Badge variant="success" fill="subtle" size="sm">
                Success
                <ArrowRight className="size-3" aria-hidden="true" />
              </Badge>
            }
          />
          <ActivityFeedTimelineItem
            title="Weekly sync scheduled"
            timestamp="Oct 10 · 2:00 PM"
            status={
              <Badge variant="gray" fill="subtle" size="sm">
                Scheduled
                <ArrowRight className="size-3" aria-hidden="true" />
              </Badge>
            }
            last
          />
        </ActivityFeed>
      </div>
    </ComponentPlayground>
  );
}

export function ActivityFeedGrouped() {
  return (
    <ComponentPlayground
      code={`<ActivityFeedGroup label="Today">
  <ActivityFeed>
    <ActivityFeedItem ... />
  </ActivityFeed>
</ActivityFeedGroup>
<ActivityFeedGroup label="Yesterday">
  <ActivityFeed>
    <ActivityFeedItem ... />
  </ActivityFeed>
</ActivityFeedGroup>`}
    >
      <div className="flex w-full max-w-md flex-col gap-4 rounded-md border border-border-default bg-bg-primary p-4">
        <ActivityFeedGroup label="Today">
          <ActivityFeed>
            <ActivityFeedItem
              avatar={<Avatar initials="AC" alt="Anna Chen" size="sm" />}
              title={
                <>
                  <span className="font-semibold">Anna Chen</span> commented on
                  Project Atlas
                </>
              }
              timestamp="2h ago"
            />
            <ActivityFeedItem
              avatar={<Avatar initials="JL" alt="Jordan Lee" size="sm" />}
              title={
                <>
                  <span className="font-semibold">Jordan Lee</span> invited you
                  to a meeting
                </>
              }
              timestamp="4h ago"
            />
          </ActivityFeed>
        </ActivityFeedGroup>
        <ActivityFeedGroup label="Yesterday">
          <ActivityFeed>
            <ActivityFeedItem
              avatar={<Avatar initials="OR" alt="Olivia Rhye" size="sm" />}
              title={
                <>
                  <span className="font-semibold">Olivia Rhye</span> uploaded
                  new design assets
                </>
              }
              timestamp="1d ago"
            />
          </ActivityFeed>
        </ActivityFeedGroup>
      </div>
    </ComponentPlayground>
  );
}

export function ActivityFeedNotifications() {
  return (
    <ComponentPlayground
      code={`<ActivityFeedPanel onMarkAllRead={() => {}}>
  <ActivityFeed>
    <ActivityFeedItem
      avatar={<Avatar initials="AC" alt="Anna Chen" size="sm" />}
      title={<>
        <span className="font-semibold">Anna Chen</span> mentioned you in a comment
      </>}
      timestamp="2h ago"
      unread
    />
  </ActivityFeed>
</ActivityFeedPanel>`}
    >
      <ActivityFeedPanel
        className="w-full max-w-md"
        onMarkAllRead={() => {}}
      >
        <ActivityFeed>
          <ActivityFeedItem
            avatar={<Avatar initials="AC" alt="Anna Chen" size="sm" />}
            title={
              <>
                <span className="font-semibold">Anna Chen</span> mentioned you
                in a comment
              </>
            }
            timestamp="2h ago"
            unread
          />
          <ActivityFeedItem
            avatar={<Avatar initials="JL" alt="Jordan Lee" size="sm" />}
            title={
              <>
                <span className="font-semibold">Jordan Lee</span> invited you to
                a meeting
              </>
            }
            timestamp="4h ago"
            unread
          />
          <ActivityFeedItem
            avatar={<Avatar initials="OR" alt="Olivia Rhye" size="sm" />}
            title={
              <>
                <span className="font-semibold">Olivia Rhye</span> uploaded new
                design assets
              </>
            }
            timestamp="1d ago"
          />
        </ActivityFeed>
      </ActivityFeedPanel>
    </ComponentPlayground>
  );
}
