import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Slider } from "./slider";

describe("Slider", () => {
  it("renders a slider with the correct aria value attributes", () => {
    render(<Slider aria-label="Volume" defaultValue={[40]} min={0} max={100} />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("aria-valuenow", "40");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });

  it("adjusts the value with arrow keys", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Slider
        aria-label="Volume"
        defaultValue={[40]}
        min={0}
        max={100}
        step={1}
        onValueChange={onValueChange}
      />,
    );
    screen.getByRole("slider").focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith([41]);
  });

  it("jumps to min/max with Home/End", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Slider
        aria-label="Volume"
        defaultValue={[40]}
        min={0}
        max={100}
        onValueChange={onValueChange}
      />,
    );
    screen.getByRole("slider").focus();
    await user.keyboard("{End}");
    expect(onValueChange).toHaveBeenLastCalledWith([100]);
    await user.keyboard("{Home}");
    expect(onValueChange).toHaveBeenLastCalledWith([0]);
  });

  it("is disabled and unfocusable when disabled", () => {
    render(<Slider aria-label="Volume" defaultValue={[40]} disabled />);
    expect(screen.getByRole("slider")).toHaveAttribute("data-disabled");
  });

  it("shows the focus-visible glow-focus shadow class on the thumb", () => {
    render(<Slider aria-label="Volume" defaultValue={[40]} />);
    expect(screen.getByRole("slider")).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("applies error color and error-focus-glow classes when error is set", () => {
    render(<Slider aria-label="Volume" defaultValue={[40]} error />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveClass("border-border-error");
    expect(slider).toHaveClass("focus-visible:shadow-[var(--shadow-glow-focus-error)]");
    expect(slider).not.toHaveClass("focus-visible:shadow-[var(--shadow-glow-focus)]");
  });

  it("forwards a ref to the root element", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Slider ref={ref} aria-label="Volume" defaultValue={[40]} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("has no axe violations for default and error states", async () => {
    const { container, rerender } = render(
      <Slider aria-label="Volume" defaultValue={[40]} />,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Slider aria-label="Volume" defaultValue={[40]} error />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
