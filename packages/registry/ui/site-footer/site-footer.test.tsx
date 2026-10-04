import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { SiteFooter, SiteFooterColumn, SiteFooterLink } from "./site-footer";

describe("SiteFooter", () => {
  it("renders brand, columns, and bottom", () => {
    render(
      <SiteFooter brand={<span>Paubha</span>} description="Tagline" bottom="© 2026">
        <SiteFooterColumn title="Product">
          <SiteFooterLink href="/pricing">Pricing</SiteFooterLink>
        </SiteFooterColumn>
      </SiteFooter>,
    );
    expect(screen.getByText("Paubha")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByText("© 2026")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <SiteFooter brand="Brand" bottom="Legal">
        <SiteFooterColumn title="Company">
          <SiteFooterLink href="/about">About</SiteFooterLink>
        </SiteFooterColumn>
      </SiteFooter>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
