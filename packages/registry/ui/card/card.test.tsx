import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  Card,
  CardContent,
  CardDescription,
  CardEyebrow,
  CardFooter,
  CardHeader,
  CardImage,
  CardMeta,
  CardTitle,
} from "./card";

function FullCard(props: {
  onClick?: () => void;
  disabled?: boolean;
  error?: boolean;
}) {
  return (
    <Card {...props}>
      <CardImage src="/photo.jpg" alt="" />
      <CardContent>
        <CardHeader>
          <CardEyebrow>DESIGN GUIDE</CardEyebrow>
          <CardTitle>Designing for clarity</CardTitle>
          <CardDescription>Make interfaces easier to read.</CardDescription>
        </CardHeader>
        <CardFooter>
          <CardMeta>Product team</CardMeta>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

function BasicCard(props: { onClick?: () => void }) {
  return (
    <Card onClick={props.onClick}>
      <CardImage src="/photo.jpg" alt="" />
      <CardContent>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          A brief description of the card content goes here.
        </CardDescription>
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

  it("matches Figma default/hover/focus tokens", () => {
    render(<FullCard onClick={() => {}} />);
    const card = screen.getByRole("button");
    expect(card).toHaveClass(
      "rounded-sm",
      "border-border-default",
      "bg-bg-primary",
      "hover:bg-bg-secondary-hover",
      "hover:border-border-strong",
      "focus-visible:border-border-brand",
    );
  });

  it("disabled: aria-disabled, not focusable, blocks activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<FullCard onClick={onClick} disabled />);
    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("aria-disabled", "true");
    expect(card).not.toHaveAttribute("tabIndex");
    expect(card).toHaveClass("bg-bg-disabled", "border-border-disabled");
    await user.click(card);
    card.focus();
    await user.keyboard("{Enter}");
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByText("Designing for clarity")).toHaveClass(
      "group-data-[disabled]/card:text-fg-disabled",
    );
  });

  it("error: error surface/border and error meta color", () => {
    render(<FullCard error />);
    const card = screen.getByRole("article");
    expect(card).toHaveAttribute("data-error");
    expect(card).toHaveClass("bg-bg-error-subtle", "border-border-error");
    expect(screen.getByText("Product team")).toHaveClass(
      "group-data-[error]/card:text-fg-error",
    );
  });

  it("uses the error focus ring for an interactive error card", () => {
    render(<FullCard error onClick={() => {}} />);
    expect(screen.getByRole("button")).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus-error)]",
    );
  });

  it("has no axe violations across default, disabled and error states", async () => {
    const { container, rerender } = render(<FullCard />);
    expect(await axe(container)).toHaveNoViolations();
    rerender(<FullCard onClick={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
    rerender(<FullCard onClick={() => {}} disabled />);
    expect(await axe(container)).toHaveNoViolations();
    rerender(<FullCard disabled />);
    expect(await axe(container)).toHaveNoViolations();
    rerender(<FullCard error />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations for static and interactive cards", async () => {
    const { container, rerender } = render(<BasicCard />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<BasicCard onClick={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
