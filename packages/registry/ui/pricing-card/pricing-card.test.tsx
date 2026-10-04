import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { PricingCard, PricingCardGrid } from "./pricing-card";

describe("PricingCard", () => {
  it("renders plan content", () => {
    render(
      <PricingCard
        name="Team"
        description="Priority support"
        price="$49"
        features={["All components", "Slack channel"]}
        action={<button type="button">Start trial</button>}
        featured
        badge={<span>Popular</span>}
      />,
    );
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("$49")).toBeInTheDocument();
    expect(screen.getByText("All components")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start trial" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <PricingCardGrid>
        <PricingCard
          name="Free"
          price="$0"
          features={["MIT license"]}
          action={<button type="button">Get started</button>}
        />
        <PricingCard
          name="Team"
          price="$49"
          featured
          features={["Priority support"]}
          action={<button type="button">Start trial</button>}
        />
      </PricingCardGrid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
