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

  it("matches the Figma key cap tokens", () => {
    render(<Kbd>K</Kbd>);
    const kbd = screen.getByText("K");
    for (const cls of [
      "rounded-xs",
      "border-border-default",
      "px-2",
      "py-1",
      "font-sans",
      "text-ui-xs",
      "font-medium",
      "text-fg-secondary",
    ]) {
      expect(kbd).toHaveClass(cls);
    }
  });

  it("has no axe violations", async () => {
    const { container } = render(<Kbd>K</Kbd>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("KbdGroup", () => {
  it("forwards a ref and spaces keys with a 4px gap", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(
      <KbdGroup ref={ref}>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );
    expect(ref.current).toHaveClass("gap-1");
  });

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
    expect(separator).toHaveClass(
      "text-[11px]",
      "font-normal",
      "text-fg-secondary",
    );
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
