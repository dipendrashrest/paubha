import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { MarketingHero } from "./marketing-hero";

describe("MarketingHero", () => {
  it("renders title and description", () => {
    render(
      <MarketingHero
        title="Paubha"
        description="Open-source components."
        actions={<button type="button">Start</button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "Paubha" })).toBeInTheDocument();
    expect(screen.getByText("Open-source components.")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <MarketingHero title="Hello" description="World" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
