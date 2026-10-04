import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { CliSnippet } from "./cli-snippet";

describe("CliSnippet", () => {
  it("renders command", () => {
    render(
      <CliSnippet
        label="Quick start"
        command="npx paubha@latest add button"
        description="Tokens and a11y included."
      />,
    );
    expect(screen.getByText("Quick start")).toBeInTheDocument();
    expect(
      screen.getByText("npx paubha@latest add button"),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <CliSnippet command="npx paubha@latest add button" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
