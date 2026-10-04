import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { DataToolbar } from "./data-toolbar";

describe("DataToolbar", () => {
  it("renders slots", () => {
    render(
      <DataToolbar
        search={<input aria-label="Search" />}
        actions={<button type="button">Add</button>}
      />,
    );
    expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <DataToolbar
        search={<input aria-label="Search" />}
        actions={<button type="button">Export</button>}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
