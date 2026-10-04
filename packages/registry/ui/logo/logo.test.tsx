import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Logo } from "./logo";

const getLogo = () => screen.getByRole("img", { name: "Paubha" });

describe("Logo", () => {
  it("renders with role=img and an accessible name of the brand name", () => {
    render(<Logo />);
    expect(getLogo()).toBeInTheDocument();
  });

  it("renders inline SVG vectors (no bitmaps), all hidden from AT", () => {
    render(<Logo />);
    const logo = getLogo();
    expect(logo.querySelectorAll("img")).toHaveLength(0);
    const svgs = logo.querySelectorAll("svg");
    expect(svgs).toHaveLength(2);
    for (const svg of svgs) {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("defaults to combined at 40px with a theme-aware wordmark", () => {
    render(<Logo />);
    const logo = getLogo();
    expect(logo).toHaveAttribute("data-variant", "combined");
    const [mark, wordmark] = logo.querySelectorAll("svg");
    expect(mark).toHaveClass("size-10", "fill-bg-brand-solid");
    expect(mark.querySelectorAll("path")).toHaveLength(3);
    expect(wordmark).toHaveClass("h-[17.328px]", "text-fg-primary");
    expect(wordmark.querySelectorAll("path")).toHaveLength(6);
  });

  it("renders only the brand mark for variant=icon, default 40px", () => {
    render(<Logo variant="icon" />);
    const svgs = getLogo().querySelectorAll("svg");
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveAttribute("viewBox", "0 0 40 40");
    expect(svgs[0]).toHaveClass("size-10");
  });

  it.each([
    [16, "size-4"],
    [20, "size-5"],
    [24, "size-6"],
    [32, "size-8"],
    [48, "size-12"],
  ] as const)("sizes the icon to %ipx", (size, cls) => {
    render(<Logo variant="icon" size={size} />);
    expect(getLogo().querySelector("svg")).toHaveClass(cls);
  });

  it("renders only the wordmark for variant=wordmark, default 28px", () => {
    render(<Logo variant="wordmark" />);
    const svgs = getLogo().querySelectorAll("svg");
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveAttribute("viewBox", "0 0 86 28");
    expect(svgs[0]).toHaveClass("h-7", "text-fg-primary");
  });

  it("sizes the wordmark", () => {
    render(<Logo variant="wordmark" size={20} />);
    expect(getLogo().querySelector("svg")).toHaveClass("h-5");
  });

  it("scales the combined lockup uniformly", () => {
    render(<Logo size={24} />);
    const [mark, wordmark] = getLogo().querySelectorAll("svg");
    expect(mark).toHaveClass("size-6");
    expect(wordmark).toHaveClass("h-[10.397px]");
  });

  it("uses the on-brand (white) wordmark for combined-dark, regardless of theme", () => {
    render(<Logo variant="combined-dark" />);
    const [mark, wordmark] = getLogo().querySelectorAll("svg");
    expect(mark).toHaveClass("fill-bg-brand-solid");
    expect(wordmark).toHaveClass("text-fg-on-brand");
    expect(wordmark).not.toHaveClass("text-fg-primary");
  });

  it("never hardcodes a fill color", () => {
    const { container } = render(<Logo />);
    for (const path of container.querySelectorAll("path")) {
      expect(path).not.toHaveAttribute("fill");
    }
  });

  it("merges a custom className without dropping layout classes", () => {
    render(<Logo className="mt-4" />);
    const logo = getLogo();
    expect(logo).toHaveClass("mt-4");
    expect(logo).toHaveClass("inline-flex");
  });

  it("forwards a ref to the underlying div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Logo ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations across all four variants", async () => {
    const { container, rerender } = render(<Logo variant="icon" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Logo variant="wordmark" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Logo variant="combined" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Logo variant="combined-dark" size={48} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
