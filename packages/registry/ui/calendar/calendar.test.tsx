import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Calendar, CalendarMini, CalendarWeek } from "./calendar";

function getDayButton(day: number, nameHint?: RegExp | string) {
  const buttons = screen.getAllByRole("button", {
    name: nameHint ?? new RegExp(`\\b${day}\\b`),
  });
  // Prefer an in-month day when duplicates exist (leading/trailing outside days).
  return (
    buttons.find((btn) => !btn.className.includes("text-fg-tertiary")) ??
    buttons[0]
  );
}

describe("Calendar", () => {
  it("renders the month label and weekday headers", () => {
    render(<Calendar defaultMonth={new Date(2026, 2, 1)} />);
    expect(screen.getByText("March 2026")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Su" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Sa" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("selects a day in single mode and calls onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        defaultMonth={new Date(2026, 2, 1)}
        onValueChange={onValueChange}
      />,
    );
    await user.click(getDayButton(15, /March 15, 2026/));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    const selected = onValueChange.mock.calls[0][0] as Date;
    expect(selected.getFullYear()).toBe(2026);
    expect(selected.getMonth()).toBe(2);
    expect(selected.getDate()).toBe(15);
  });

  it("navigates months with prev/next buttons", async () => {
    const user = userEvent.setup();
    const onMonthChange = vi.fn();
    render(
      <Calendar
        defaultMonth={new Date(2026, 2, 1)}
        onMonthChange={onMonthChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("April 2026")).toBeInTheDocument();
    expect(onMonthChange).toHaveBeenCalledTimes(1);
    expect((onMonthChange.mock.calls[0][0] as Date).getMonth()).toBe(3);

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("March 2026")).toBeInTheDocument();
  });

  it("supports range selection", async () => {
    const user = userEvent.setup();
    const onRangeValueChange = vi.fn();
    render(
      <Calendar
        mode="range"
        defaultMonth={new Date(2026, 2, 1)}
        onRangeValueChange={onRangeValueChange}
      />,
    );
    await user.click(getDayButton(10, /March 10, 2026/));
    expect(onRangeValueChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        from: expect.any(Date),
        to: undefined,
      }),
    );
    await user.click(getDayButton(14, /March 14, 2026/));
    const last = onRangeValueChange.mock.calls.at(-1)?.[0] as {
      from: Date;
      to: Date;
    };
    expect(last.from.getDate()).toBe(10);
    expect(last.to.getDate()).toBe(14);
  });

  it("uses a roving tabindex and moves focus with arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        defaultMonth={new Date(2026, 2, 1)}
        defaultValue={new Date(2026, 2, 15)}
      />,
    );
    const day15 = screen.getByRole("button", { name: /March 15, 2026/ });
    expect(day15).toHaveAttribute("tabindex", "0");
    expect(
      screen
        .getAllByRole("button")
        .filter((b) => b.getAttribute("tabindex") === "0")
        .filter((b) => /2026/.test(b.getAttribute("aria-label") ?? "")),
    ).toHaveLength(1);
    day15.focus();
    await user.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("button", { name: /March 16, 2026/ }),
    ).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(
      screen.getByRole("button", { name: /March 23, 2026/ }),
    ).toHaveFocus();
    await user.keyboard("{PageDown}");
    expect(screen.getByText("April 2026")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /April 23, 2026/ }),
    ).toHaveFocus();
  });

  it("forwards a ref to the root", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Calendar ref={ref} defaultMonth={new Date(2026, 0, 1)} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Calendar
        defaultMonth={new Date(2026, 2, 1)}
        defaultValue={new Date(2026, 2, 15)}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations in range mode", async () => {
    const { container } = render(
      <Calendar
        mode="range"
        defaultMonth={new Date(2026, 2, 1)}
        defaultRangeValue={{
          from: new Date(2026, 2, 10),
          to: new Date(2026, 2, 14),
        }}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("CalendarMini", () => {
  it("renders a compact calendar", () => {
    render(<CalendarMini defaultMonth={new Date(2026, 5, 1)} />);
    expect(screen.getByText("Jun 2026")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <CalendarMini defaultMonth={new Date(2026, 5, 1)} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("CalendarWeek", () => {
  it("renders seven day chips and selects a day", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <CalendarWeek
        weekOf={new Date(2026, 2, 15)}
        defaultValue={new Date(2026, 2, 15)}
        onValueChange={onValueChange}
      />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(7);
    await user.click(screen.getByRole("button", { name: /March 16, 2026/ }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect((onValueChange.mock.calls[0][0] as Date).getDate()).toBe(16);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <CalendarWeek weekOf={new Date(2026, 2, 15)} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
