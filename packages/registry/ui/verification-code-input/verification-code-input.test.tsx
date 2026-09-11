import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { VerificationCodeInput } from "./verification-code-input";

describe("VerificationCodeInput", () => {
  it("renders a group with the given number of digit cells", () => {
    render(<VerificationCodeInput length={4} aria-label="4-digit code" />);
    expect(screen.getByRole("group", { name: "4-digit code" })).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("labels each cell with its position", () => {
    render(<VerificationCodeInput length={3} aria-label="Code" />);
    expect(screen.getByRole("textbox", { name: "Digit 1 of 3" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Digit 2 of 3" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Digit 3 of 3" })).toBeInTheDocument();
  });

  it("auto-advances to the next cell on digit entry", async () => {
    const user = userEvent.setup();
    render(<VerificationCodeInput length={3} aria-label="Code" />);
    await user.click(screen.getByRole("textbox", { name: "Digit 1 of 3" }));
    await user.keyboard("1");
    expect(screen.getByRole("textbox", { name: "Digit 2 of 3" })).toHaveFocus();
  });

  it("moves to the previous cell on backspace when the current cell is empty", async () => {
    const user = userEvent.setup();
    render(<VerificationCodeInput length={3} aria-label="Code" />);
    await user.click(screen.getByRole("textbox", { name: "Digit 1 of 3" }));
    await user.keyboard("1");
    await user.keyboard("{Backspace}");
    expect(screen.getByRole("textbox", { name: "Digit 1 of 3" })).toHaveFocus();
  });

  it("calls onValueChange with the accumulated code", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <VerificationCodeInput length={3} aria-label="Code" onValueChange={onValueChange} />,
    );
    await user.click(screen.getByRole("textbox", { name: "Digit 1 of 3" }));
    await user.keyboard("1");
    await user.keyboard("2");
    expect(onValueChange).toHaveBeenLastCalledWith("12");
  });

  it("fills every cell on paste", async () => {
    const user = userEvent.setup();
    render(<VerificationCodeInput length={4} aria-label="Code" defaultValue="" />);
    const first = screen.getByRole("textbox", { name: "Digit 1 of 4" });
    await user.click(first);
    await user.paste("1234");
    expect(screen.getByRole("textbox", { name: "Digit 1 of 4" })).toHaveValue("1");
    expect(screen.getByRole("textbox", { name: "Digit 4 of 4" })).toHaveValue("4");
  });

  it("marks cells aria-invalid when error is set", () => {
    render(<VerificationCodeInput length={3} aria-label="Code" error />);
    expect(screen.getByRole("textbox", { name: "Digit 1 of 3" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("applies the error-focus ring class alongside the normal focus ring when error is set", () => {
    render(<VerificationCodeInput length={3} aria-label="Code" error />);
    const cell = screen.getByRole("textbox", { name: "Digit 1 of 3" });
    expect(cell.className).toContain("focus-visible:shadow-[var(--shadow-glow-focus)]");
    expect(cell.className).toContain(
      "aria-invalid:focus-visible:shadow-[var(--shadow-glow-focus-error)]",
    );
  });

  it("disables every cell when disabled is set", () => {
    render(<VerificationCodeInput length={3} aria-label="Code" disabled />);
    for (const cell of screen.getAllByRole("textbox")) {
      expect(cell).toBeDisabled();
    }
  });

  it("forwards a ref to the group element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<VerificationCodeInput ref={ref} length={3} aria-label="Code" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations for default and error states", async () => {
    const { container, rerender } = render(
      <VerificationCodeInput length={4} aria-label="Code" />,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(<VerificationCodeInput length={4} aria-label="Code" error />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
