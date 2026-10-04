import { render, screen } from "@testing-library/react";
import { Boxes } from "lucide-react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { FeatureList, FeatureListItem } from "./feature-list";

describe("FeatureList", () => {
  it("renders items", () => {
    render(
      <FeatureList>
        <FeatureListItem
          icon={<Boxes aria-hidden="true" />}
          title="Copy, don’t install"
          description="Own every line."
        />
        <FeatureListItem title="Accessible" description="Axe coverage." />
      </FeatureList>,
    );
    expect(screen.getByText("Copy, don’t install")).toBeInTheDocument();
    expect(screen.getByText("Accessible")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FeatureList>
        <FeatureListItem
          icon={<Boxes aria-hidden="true" />}
          title="Copy, don’t install"
          description="Own every line."
        />
      </FeatureList>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
