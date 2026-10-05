import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { TeamCard, TeamCardGrid } from "./team-card";

describe("TeamCard", () => {
  it("renders member", () => {
    render(
      <TeamCard
        name="Ava Ruiz"
        role="Design systems"
        avatar={<span>AR</span>}
      />,
    );
    expect(screen.getByText("Ava Ruiz")).toBeInTheDocument();
    expect(screen.getByText("Design systems")).toBeInTheDocument();
  });

  it("uses the default Card border and a medium-weight name", () => {
    render(<TeamCard name="Ava Ruiz" role="Design" />);
    expect(screen.getByText("Ava Ruiz")).toHaveClass("font-medium");
    expect(screen.getByRole("article")).toHaveClass("border-border-default");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <TeamCardGrid>
        <TeamCard name="Ava Ruiz" role="Design" />
        <TeamCard name="Jules Kim" role="Eng" />
      </TeamCardGrid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
