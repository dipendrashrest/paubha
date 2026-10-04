import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { AuthCard } from "./auth-card";

describe("AuthCard", () => {
  it("renders title and children", () => {
    render(
      <AuthCard title="Log in" description="Welcome back.">
        <button type="button">Continue</button>
      </AuthCard>,
    );
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <AuthCard title="Log in">
        <button type="button">Continue</button>
      </AuthCard>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
