import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders title, description, and actions", () => {
    render(
      <EmptyState
        title="No projects yet"
        description="Create your first project to get started."
        actions={<button type="button">Create project</button>}
      />,
    );
    expect(screen.getByText("No projects yet")).toBeInTheDocument();
    expect(
      screen.getByText("Create your first project to get started."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create project" }),
    ).toBeInTheDocument();
  });

  it("exposes role=status", () => {
    render(<EmptyState title="Nothing here" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <EmptyState
        title="No results"
        description="Try a different search."
        actions={<button type="button">Clear filters</button>}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
