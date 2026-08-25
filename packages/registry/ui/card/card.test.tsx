import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Card, CardContent, CardDescription, CardImage, CardTitle } from "./card";

function BasicCard(props: { onClick?: () => void }) {
  return (
    <Card onClick={props.onClick}>
      <CardImage src="/photo.jpg" alt="" />
      <CardContent>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A brief description of the card content goes here.</CardDescription>
      </CardContent>
    </Card>
  );
}

describe("Card", () => {
  it("renders with role=article when not interactive", () => {
    render(<BasicCard />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("renders with role=button and is focusable when onClick is supplied", () => {
    render(<BasicCard onClick={() => {}} />);
    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("tabIndex", "0");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<BasicCard onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("activates via Enter and Space when interactive", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<BasicCard onClick={onClick} />);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("shows the focus-visible glow-focus shadow class only when interactive", () => {
    const { rerender } = render(<BasicCard onClick={() => {}} />);
    expect(screen.getByRole("button")).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );

    rerender(<BasicCard />);
    expect(screen.getByRole("article")).not.toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("forwards a ref to the underlying element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Card ref={ref}>
        <CardContent>
          <CardTitle>Title</CardTitle>
        </CardContent>
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges a custom className without dropping variant classes", () => {
    render(
      <Card className="mt-4">
        <CardContent>
          <CardTitle>Title</CardTitle>
        </CardContent>
      </Card>,
    );
    const card = screen.getByRole("article");
    expect(card).toHaveClass("mt-4");
    expect(card).toHaveClass("border-border-default");
  });

  it("applies elevated variant classes", () => {
    render(
      <Card variant="elevated">
        <CardContent>
          <CardTitle>Title</CardTitle>
        </CardContent>
      </Card>,
    );
    expect(screen.getByRole("article")).toHaveClass("shadow-sm");
  });

  it("has no axe violations for static and interactive cards", async () => {
    const { container, rerender } = render(<BasicCard />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<BasicCard onClick={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
