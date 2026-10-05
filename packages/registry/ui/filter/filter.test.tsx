import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Checkbox } from "../checkbox/checkbox";
import {
  ActiveFilters,
  FilterBar,
  FilterChip,
  FilterChips,
  FilterPanel,
  FilterPanelFooter,
  FilterPanelGroup,
  FilterPanelTitle,
} from "./filter";

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

  it("calls onRemove from the dismiss button", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<FilterChip label="Open" selected onRemove={onRemove} />);
    await user.click(screen.getByRole("button", { name: "Remove Open" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
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
    await user.click(screen.getByRole("button", { name: "Clear all filters" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});

describe("FilterPanel", () => {
  it("fires Apply and Clear", async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();
    const onClear = vi.fn();
    render(
      <FilterPanel aria-label="Filters">
        <FilterPanelTitle>Filters</FilterPanelTitle>
        <FilterPanelGroup label="Status">
          <Checkbox label="Open" />
        </FilterPanelGroup>
        <FilterPanelFooter onApply={onApply} onClear={onClear} />
      </FilterPanel>,
    );
    await user.click(screen.getByRole("button", { name: "Apply Filters" }));
    await user.click(screen.getByRole("button", { name: "Clear all" }));
    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FilterPanel aria-label="Filters">
        <FilterPanelTitle>Filters</FilterPanelTitle>
        <FilterPanelGroup label="Status">
          <Checkbox label="Open" />
        </FilterPanelGroup>
        <FilterPanelFooter />
      </FilterPanel>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
