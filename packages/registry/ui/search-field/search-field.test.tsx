import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { SearchField } from "./search-field";

describe("SearchField", () => {
  it("renders a search input", () => {
    render(<SearchField />);
    expect(screen.getByRole("searchbox", { name: "Search" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<SearchField placeholder="Find a project" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
