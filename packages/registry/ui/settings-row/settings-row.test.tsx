import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { SettingsRow } from "./settings-row";

describe("SettingsRow", () => {
  it("renders title and control", () => {
    render(
      <SettingsRow
        title="Email notifications"
        description="Product updates only."
        control={<button type="button">Toggle</button>}
      />,
    );
    expect(screen.getByText("Email notifications")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <SettingsRow
        title="Marketing emails"
        control={<button type="button">On</button>}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
