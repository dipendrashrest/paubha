import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
});
