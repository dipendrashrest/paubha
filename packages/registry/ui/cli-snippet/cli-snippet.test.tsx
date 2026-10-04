import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

  it("copies the command and has no axe violations with showCopy", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    const { container } = render(
      <CliSnippet label="npx" command="npx paubha@latest init" showCopy />,
    );
    expect(await axe(container)).toHaveNoViolations();
    fireEvent.click(screen.getByRole("button", { name: "Copy command" }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("npx paubha@latest init"),
    );
    expect(await screen.findByText("Copied")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
