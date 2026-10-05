import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { ProgressStep, ProgressSteps } from "./progress-steps";

describe("ProgressSteps", () => {
  it("renders a horizontal progress list", () => {
    render(
      <ProgressSteps>
        <ProgressStep status="complete" label="Shipping" />
        <ProgressStep status="current" label="Payment" />
        <ProgressStep status="upcoming" label="Confirmation" />
      </ProgressSteps>,
    );
    expect(
      screen.getByRole("navigation", { name: "Progress" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByText("Confirmation")).toBeInTheDocument();
  });

  it("marks the current step with aria-current", () => {
    render(
      <ProgressSteps>
        <ProgressStep status="complete" label="Account" />
        <ProgressStep status="current" label="Profile" />
        <ProgressStep status="upcoming" label="Settings" />
      </ProgressSteps>,
    );
    expect(screen.getByText("Profile").closest("li")).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(screen.getByText("Account").closest("li")).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("renders vertical orientation with descriptions", () => {
    render(
      <ProgressSteps orientation="vertical">
        <ProgressStep
          status="complete"
          label="Create Account"
          description="Account created successfully."
        />
        <ProgressStep
          status="current"
          label="Add Details"
          description="Enter personal information."
        />
        <ProgressStep
          status="upcoming"
          label="Launch"
          description="Deploy workspace."
        />
      </ProgressSteps>,
    );
    expect(screen.getByText("Create Account")).toBeInTheDocument();
    expect(screen.getByText("Enter personal information.")).toBeInTheDocument();
    expect(screen.getByText("Deploy workspace.")).toBeInTheDocument();
  });

  it("respects an explicit stepNumber override", () => {
    render(
      <ProgressSteps>
        <ProgressStep status="current" label="Payment" stepNumber={5} />
      </ProgressSteps>,
    );
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("forwards a ref to the nav root", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <ProgressSteps ref={ref}>
        <ProgressStep status="current" label="One" />
      </ProgressSteps>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("NAV");
  });

  it("has no axe violations for horizontal numbered steps", async () => {
    const { container } = render(
      <ProgressSteps>
        <ProgressStep status="complete" label="Shipping" />
        <ProgressStep status="current" label="Payment" />
        <ProgressStep status="upcoming" label="Confirmation" />
      </ProgressSteps>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations for vertical steps with descriptions", async () => {
    const { container } = render(
      <ProgressSteps orientation="vertical">
        <ProgressStep
          status="complete"
          label="Create Account"
          description="Verified email."
        />
        <ProgressStep
          status="current"
          label="Add Details"
          description="Profile preferences."
        />
        <ProgressStep
          status="upcoming"
          label="Launch"
          description="Deploy workspace."
        />
      </ProgressSteps>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it.each(["horizontal", "vertical", "numbered", "description"] as const)(
    "renders the %s variant with no axe violations",
    async (variant) => {
      const { container } = render(
        <ProgressSteps variant={variant}>
          <ProgressStep status="complete" label="One" description="Done" />
          <ProgressStep status="current" label="Two" description="Now" />
          <ProgressStep status="upcoming" label="Three" description="Next" />
        </ProgressSteps>,
      );
      expect(screen.getAllByRole("listitem")).toHaveLength(3);
      expect(screen.getByText("Two").closest("li")).toHaveAttribute(
        "aria-current",
        "step",
      );
      expect(await axe(container)).toHaveNoViolations();
    },
  );

  it("uses a brand top rule on the current description step", () => {
    render(
      <ProgressSteps variant="description">
        <ProgressStep status="current" label="Now" />
        <ProgressStep status="upcoming" label="Next" />
      </ProgressSteps>,
    );
    expect(screen.getByText("Now").closest("li")).toHaveClass(
      "border-border-brand",
    );
    expect(screen.getByText("Next").closest("li")).toHaveClass(
      "border-border-default",
    );
  });

  it("shows step numbers only in the numbered variant", () => {
    const { rerender } = render(
      <ProgressSteps variant="numbered">
        <ProgressStep status="current" label="Pay" />
      </ProgressSteps>,
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    rerender(
      <ProgressSteps variant="horizontal">
        <ProgressStep status="current" label="Pay" />
      </ProgressSteps>,
    );
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});
