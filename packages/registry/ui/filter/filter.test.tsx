import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { ActiveFilters, FilterBar, FilterChip, FilterChips } from "./filter";

describe("FilterBar", () => {
  it("renders children", () => {
    render(
      <FilterBar>
        <FilterChip label="Status" />
      </FilterBar>,
    );
    expect(screen.getByRole("button", { name: "Status" })).toBeInTheDocument();
  });
});

describe("FilterChip", () => {
  it("toggles aria-pressed", () => {
    render(<FilterChip label="Active" selected />);
    expect(screen.getByRole("button", { name: "Active" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FilterChips>
        <FilterChip label="High" selected />
        <FilterChip label="Medium" />
      </FilterChips>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("ActiveFilters", () => {
  it("calls onClear", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(
      <ActiveFilters onClear={onClear}>
        <FilterChip label="Assignee: Sarah" selected />
      </ActiveFilters>,
    );
    await user.click(screen.getByRole("button", { name: "Clear all" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
