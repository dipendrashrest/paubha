import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { ConfirmDialog } from "./confirm-dialog";

describe("ConfirmDialog", () => {
  it("renders the trigger", () => {
    render(
      <ConfirmDialog
        trigger={<button type="button">Delete</button>}
        title="Delete project?"
        description="This cannot be undone."
        intent="error"
        confirmLabel="Delete"
      />,
    );
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("has no axe violations when closed", async () => {
    const { container } = render(
      <ConfirmDialog
        trigger={<button type="button">Delete</button>}
        title="Delete project?"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
