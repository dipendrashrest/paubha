import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { ProgressCircle } from "./progress-circle";

describe("ProgressCircle", () => {
  it("renders a progressbar with the correct aria value attributes", () => {
    render(<ProgressCircle value={75} aria-label="Upload progress" />);
    const progress = screen.getByRole("progressbar", { name: "Upload progress" });
    expect(progress).toHaveAttribute("aria-valuenow", "75");
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
  });

  it("shows the rounded percentage as text by default", () => {
    render(<ProgressCircle value={74.6} aria-label="Upload progress" />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("hides the percentage text when showPercentage is false", () => {
    render(<ProgressCircle value={75} showPercentage={false} aria-label="Upload progress" />);
    expect(screen.queryByText("75%")).not.toBeInTheDocument();
  });

  it("clamps the visual value within 0-100 even when out of range", () => {
    render(<ProgressCircle value={150} aria-label="Upload progress" />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("respects a custom max", () => {
    render(<ProgressCircle value={40} max={200} aria-label="Upload progress" />);
    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("forwards a ref to the underlying element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ProgressCircle ref={ref} value={50} aria-label="Upload progress" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations", async () => {
    const { container } = render(<ProgressCircle value={50} aria-label="Upload progress" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
