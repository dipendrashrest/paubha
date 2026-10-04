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

  it("has no axe violations", async () => {
    const { container } = render(
      <LogoCloud label="Customers">
        <LogoCloudItem name="Orbit" />
      </LogoCloud>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
