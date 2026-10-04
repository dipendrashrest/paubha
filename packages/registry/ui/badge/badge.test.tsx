import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Bell, Star } from "lucide-react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its label as plain text with no role by default", () => {
    render(<Badge data-testid="badge">New</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("New");
    expect(badge).not.toHaveAttribute("role");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("exposes role=status when explicitly opted in for live updates", () => {
    // biome-ignore lint/a11y/useSemanticElements: verifying the opt-in live-region role on Badge
    render(<Badge role="status">Syncing</Badge>);
    expect(screen.getByRole("status")).toHaveTextContent("Syncing");
  });

  it("forwards a ref to the underlying span", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>New</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("merges a custom className without dropping variant classes", () => {
    render(
      <Badge data-testid="badge" className="mt-4">
        New
      </Badge>,
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("mt-4", "bg-bg-secondary");
  });

  it("renders subtle fill without a visible border", () => {
    render(
      <Badge data-testid="badge" variant="brand">
        Subtle
      </Badge>,
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("bg-bg-brand-subtle", "text-fg-brand");
    expect(badge).toHaveClass("border-transparent");
    expect(badge).not.toHaveClass("border-border-brand");
  });

  it("applies the outline fill style with a colored border and no background fill", () => {
    render(
      <Badge data-testid="badge" variant="brand" fill="outline">
        Outline
      </Badge>,
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("border-border-brand", "text-fg-brand");
    expect(badge).not.toHaveClass("bg-bg-brand-subtle");
  });

  it("applies the solid fill style with an on-color foreground", () => {
    render(
      <Badge data-testid="badge" variant="success" fill="solid">
        Solid
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass(
      "bg-bg-success-solid",
      "text-fg-on-success",
    );
  });

  it.each([
    ["sm", "h-5", "px-2", "text-ui-xs"],
    ["md", "h-7", "px-3", "text-ui-sm"],
    ["lg", "h-8", "px-4", "text-ui-md"],
  ] as const)("applies %s size metrics", (size, h, px, text) => {
    render(
      <Badge data-testid="badge" size={size}>
        Sized
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass(h, px, text);
  });

  it("renders a decorative status dot that is hidden from screen readers", () => {
    render(
      <Badge data-testid="badge" showDot>
        Active
      </Badge>,
    );
    const dot = screen
      .getByTestId("badge")
      .querySelector("[aria-hidden='true']");
    expect(dot).toBeInTheDocument();
  });

  it("renders leading and trailing icon slots at the size-specific icon size", () => {
    render(
      <Badge
        data-testid="badge"
        size="md"
        leadingIcon={<Star data-testid="lead" />}
        trailingIcon={<Star data-testid="trail" />}
      >
        Starred
      </Badge>,
    );
    expect(screen.getByTestId("lead").parentElement).toHaveClass("size-5");
    expect(screen.getByTestId("trail").parentElement).toHaveClass("size-5");
  });

  it("does not render a dismiss button by default", () => {
    render(<Badge>Static</Badge>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a dismiss button and calls onDismiss when activated", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Badge dismissible onDismiss={onDismiss}>
        Removable
      </Badge>,
    );
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("uses a specific dismiss label when provided", () => {
    render(
      <Badge dismissible dismissLabel="Remove Design category">
        Design
      </Badge>,
    );
    expect(
      screen.getByRole("button", { name: "Remove Design category" }),
    ).toBeInTheDocument();
  });

  it("activates the dismiss button via Enter and Space", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Badge dismissible onDismiss={onDismiss}>
        Removable
      </Badge>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Remove" })).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onDismiss).toHaveBeenCalledTimes(2);
  });

  it("shows the focus-visible glow-focus shadow class on the dismiss button", () => {
    render(<Badge dismissible>Removable</Badge>);
    expect(screen.getByRole("button", { name: "Remove" })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("renders the icon-only type as a labelled image with label padding", () => {
    render(
      <Badge iconOnly aria-label="Notifications">
        <Bell />
      </Badge>,
    );
    const badge = screen.getByRole("img", { name: "Notifications" });
    expect(badge).toHaveClass("h-5", "px-2");
  });

  it("has no axe violations across default, dot, slots, icon-only, live, and dismissible states", async () => {
    const { container, rerender } = render(<Badge>Default</Badge>);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Badge showDot>With dot</Badge>);
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Badge size="lg" leadingIcon={<Star />} trailingIcon={<Star />}>
        Slots
      </Badge>,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Badge iconOnly fill="solid" variant="brand" aria-label="Notifications">
        <Bell />
      </Badge>,
    );
    expect(await axe(container)).toHaveNoViolations();

    // biome-ignore lint/a11y/useSemanticElements: verifying the opt-in live-region role on Badge
    rerender(<Badge role="status">Syncing</Badge>);
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Badge dismissible dismissLabel="Remove Design category">
        Design
      </Badge>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
