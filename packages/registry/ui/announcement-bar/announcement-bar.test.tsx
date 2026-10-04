import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { AnnouncementBar } from "./announcement-bar";

describe("AnnouncementBar", () => {
  it("renders message and action", () => {
    render(
      <AnnouncementBar action={<a href="/pricing">See pricing</a>}>
        Pro plan is 20% off
      </AnnouncementBar>,
    );
    expect(screen.getByText("Pro plan is 20% off")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See pricing" })).toBeInTheDocument();
  });

  it("calls onDismiss", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <AnnouncementBar dismissible onDismiss={onDismiss}>
        News
      </AnnouncementBar>,
    );
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <AnnouncementBar badge={<span>New</span>}>Launch week</AnnouncementBar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
