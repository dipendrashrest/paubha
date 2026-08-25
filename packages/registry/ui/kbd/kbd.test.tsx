import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Kbd, KbdGroup } from "./kbd";

describe("Kbd", () => {
  it("renders as a kbd element with the key label", () => {
    render(<Kbd>K</Kbd>);
    const kbd = screen.getByText("K");
    expect(kbd.tagName).toBe("KBD");
  });

  it("forwards a ref to the underlying kbd element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Kbd ref={ref}>K</Kbd>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("KBD");
  });

  it("merges a custom className without dropping the base classes", () => {
    render(<Kbd className="mt-4">K</Kbd>);
    const kbd = screen.getByText("K");
    expect(kbd).toHaveClass("mt-4");
    expect(kbd).toHaveClass("bg-bg-secondary");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Kbd>K</Kbd>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("KbdGroup", () => {
  it("renders each key and a decorative + between them", () => {
    render(
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );
    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
    const separator = screen.getByText("+");
    expect(separator).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render a trailing separator after the last key", () => {
    render(
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );
    expect(screen.getAllByText("+")).toHaveLength(1);
  });

  it("supports more than two keys", () => {
    render(
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );
    expect(screen.getAllByText("+")).toHaveLength(2);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
