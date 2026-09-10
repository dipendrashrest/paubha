import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Logo } from "./logo";

describe("Logo", () => {
  it("renders with role=img and an accessible name of the brand name", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: "Paubha" })).toBeInTheDocument();
  });

  it("defaults to the combined variant (icon + wordmark)", () => {
    render(<Logo />);
    const logo = screen.getByRole("img", { name: "Paubha" });
    expect(logo).toHaveTextContent("A");
    expect(logo).toHaveTextContent("Paubha");
  });

  it("renders only the icon glyph for variant=icon", () => {
    render(<Logo variant="icon" />);
    const logo = screen.getByRole("img", { name: "Paubha" });
    expect(logo).toHaveTextContent("A");
    expect(logo).not.toHaveTextContent("Paubha");
  });

  it("renders only the wordmark text for variant=wordmark", () => {
    render(<Logo variant="wordmark" />);
    const logo = screen.getByRole("img", { name: "Paubha" });
    expect(logo.textContent).toBe("Paubha");
  });

  it("uses a fixed on-brand (white) wordmark color for variant=combined-dark, not the theme-aware default", () => {
    render(<Logo variant="combined-dark" />);
    const wordmark = screen.getByText("Paubha");
    expect(wordmark).toHaveClass("text-fg-on-brand");
    expect(wordmark).not.toHaveClass("text-fg-primary");
  });

  it("merges a custom className without dropping layout classes", () => {
    render(<Logo className="mt-4" />);
    const logo = screen.getByRole("img", { name: "Paubha" });
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

    rerender(<Logo variant="combined-dark" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
