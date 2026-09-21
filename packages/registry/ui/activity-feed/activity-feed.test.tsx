import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Avatar } from "../avatar/avatar";
import { Badge } from "../badge/badge";
import {
  ActivityFeed,
  ActivityFeedGroup,
  ActivityFeedItem,
  ActivityFeedPanel,
  ActivityFeedTimelineItem,
} from "./activity-feed";

describe("ActivityFeed", () => {
  it("renders a list with listitems", () => {
    render(
      <ActivityFeed>
        <ActivityFeedItem
          avatar={<Avatar initials="AC" alt="Anna Chen" size="sm" />}
          title="Anna Chen commented"
          timestamp="2h ago"
        />
      </ActivityFeed>,
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveTextContent("Anna Chen commented");
    expect(screen.getByText("2h ago")).toBeInTheDocument();
  });

  it("shows an unread indicator when unread", () => {
    const { container } = render(
      <ActivityFeed>
        <ActivityFeedItem title="Unread event" unread />
      </ActivityFeed>,
    );
    expect(
      container.querySelector('[aria-hidden="true"].bg-bg-brand-solid'),
    ).toBeTruthy();
  });

  it("forwards a ref to the root list", () => {
    const ref = React.createRef<HTMLUListElement>();
    render(<ActivityFeed ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });

  it("has no axe violations for a simple list", async () => {
    const { container } = render(
      <ActivityFeed>
        <ActivityFeedItem
          avatar={<Avatar initials="AC" alt="Anna Chen" size="sm" />}
          title="Anna Chen commented on Project Atlas"
          timestamp="2h ago"
        />
      </ActivityFeed>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("ActivityFeedGroup", () => {
  it("renders a date label above items", () => {
    render(
      <ActivityFeedGroup label="Today">
        <ActivityFeed>
          <ActivityFeedItem title="Event" timestamp="10:20 AM" />
        </ActivityFeed>
      </ActivityFeedGroup>,
    );
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Event")).toBeInTheDocument();
  });
});

describe("ActivityFeedTimelineItem", () => {
  it("renders title, timestamp, and status", () => {
    render(
      <ActivityFeed>
        <ActivityFeedTimelineItem
          title="Project Atlas launched"
          timestamp="Today · 10:20 AM"
          status={<Badge variant="brand" fill="subtle" size="sm">Completed</Badge>}
          last
        />
      </ActivityFeed>,
    );
    expect(screen.getByText("Project Atlas launched")).toBeInTheDocument();
    expect(screen.getByText("Today · 10:20 AM")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ActivityFeed>
        <ActivityFeedTimelineItem
          title="Design review scheduled"
          timestamp="Yesterday · 4:30 PM"
          status={
            <Badge variant="warning" fill="subtle" size="sm">
              In Progress
            </Badge>
          }
          last
        />
      </ActivityFeed>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("ActivityFeedPanel", () => {
  it("renders the panel title and mark-all action", async () => {
    const user = userEvent.setup();
    const onMarkAllRead = vi.fn();
    render(
      <ActivityFeedPanel onMarkAllRead={onMarkAllRead}>
        <ActivityFeed>
          <ActivityFeedItem title="Olivia mentioned you" unread />
        </ActivityFeed>
      </ActivityFeedPanel>,
    );
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Mark all read" }));
    expect(onMarkAllRead).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations with unread items", async () => {
    const { container } = render(
      <ActivityFeedPanel onMarkAllRead={() => {}}>
        <ActivityFeed>
          <ActivityFeedItem
            avatar={<Avatar initials="OR" alt="Olivia Rhye" size="sm" />}
            title="Olivia Rhye uploaded new design assets"
            timestamp="1d ago"
            unread
          />
        </ActivityFeed>
      </ActivityFeedPanel>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
