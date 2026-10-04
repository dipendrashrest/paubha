import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { DatePicker } from "./date-picker";

describe("DatePicker", () => {
  it("renders the placeholder trigger", () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(
      screen.getByRole("button", { name: "Pick a date" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<DatePicker value={new Date(2026, 8, 22)} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations when disabled", async () => {
    const { container } = render(<DatePicker disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("stages a day, commits on Apply, discards on Cancel", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        defaultValue={new Date(2026, 9, 13)}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Oct 13, 2026" }));
    await user.click(screen.getByRole("button", { name: /October 20/ }));
    expect(onValueChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.getByRole("button", { name: "Oct 13, 2026" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Oct 13, 2026" }));
    await user.click(screen.getByRole("button", { name: /October 20/ }));
    await user.click(screen.getByRole("button", { name: "Apply" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Oct 20, 2026" })).toBeVisible();
  });

  it("has no axe violations when open", async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2026, 9, 13)} />);
    await user.click(screen.getByRole("button", { name: "Oct 13, 2026" }));
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
