import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("renders with role=status and an accessible name of Loading", () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("announces via aria-live=polite", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("defaults to the md size", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass("size-6");
  });

  it("applies the requested size", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("size-8");
  });

  it("is animated via animate-spin", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass("animate-spin");
  });

  it("defaults to brand color via currentColor", () => {
    render(<Spinner />);
    const status = screen.getByRole("status");
    expect(status).toHaveClass("text-fg-brand");
    // The <mask> also contains a <path> (with no class) one level deeper —
    // select the visible arc, a direct child of the <svg>, not that one.
    const arc = status.querySelector("svg > path");
    expect(arc).toHaveClass("stroke-current");
  });

  it("lets a passed text-* className override the default brand color", () => {
    render(<Spinner className="text-fg-on-brand" />);
    const status = screen.getByRole("status");
    expect(status).toHaveClass("text-fg-on-brand");
    expect(status).not.toHaveClass("text-fg-brand");
  });

  it("merges a custom className without dropping variant classes", () => {
    render(<Spinner className="mt-4" />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("mt-4");
    expect(spinner).toHaveClass("animate-spin");
  });

  it("forwards a ref to the underlying element", () => {
    const ref = React.createRef<HTMLOutputElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLOutputElement);
  });

  it("has no axe violations at any size", async () => {
    const { container, rerender } = render(<Spinner size="sm" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Spinner size="md" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Spinner size="lg" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
