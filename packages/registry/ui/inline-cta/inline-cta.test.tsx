import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { InlineCta } from "./inline-cta";

describe("InlineCta", () => {
  it("renders banner content", () => {
    render(
      <InlineCta
        title="Upgrade to Pro"
        description="Unlock advanced analytics."
        actions={<button type="button">Upgrade</button>}
      />,
    );
    expect(screen.getByText("Upgrade to Pro")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Upgrade" })).toBeInTheDocument();
  });

  it("calls onDismiss when dismissible", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <InlineCta title="New feature" dismissible onDismiss={onDismiss} />,
    );
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <InlineCta
        variant="card"
        title="Finish setup"
        description="Complete onboarding."
        actions={<button type="button">Continue</button>}
        dismissible
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
