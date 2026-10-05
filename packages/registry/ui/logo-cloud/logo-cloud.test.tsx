import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { LogoCloud, LogoCloudItem } from "./logo-cloud";

describe("LogoCloud", () => {
  it("renders label and logos", () => {
    render(
      <LogoCloud label="Trusted by">
        <LogoCloudItem name="Northwind" />
        <LogoCloudItem name="Helix" />
      </LogoCloud>,
    );
    expect(screen.getByText("Trusted by")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Northwind" })).toBeInTheDocument();
  });

  it("renders a decorative mark without changing the accessible name", () => {
    render(<LogoCloudItem name="Orbit" mark={<svg data-testid="mark" />} />);
    expect(screen.getByRole("img", { name: "Orbit" })).toBeInTheDocument();
    expect(screen.getByTestId("mark").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <LogoCloud label="Customers">
        <LogoCloudItem name="Orbit" />
      </LogoCloud>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
