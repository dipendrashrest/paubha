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

  it("renders footer and has no axe violations with all slots", async () => {
    const { container } = render(
      <AuthCard
        mark={<span>Logo</span>}
        title="Sign in"
        description="Welcome back."
        footer={<a href="/signup">Create one</a>}
      >
        <button type="button" disabled>
          Continue
        </button>
      </AuthCard>,
    );
    expect(
      screen.getByRole("link", { name: "Create one" }),
    ).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
