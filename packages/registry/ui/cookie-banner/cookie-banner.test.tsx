import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { CookieBanner } from "./cookie-banner";

describe("CookieBanner", () => {
  it("renders title and actions", () => {
    render(<CookieBanner actions={<button type="button">Accept</button>} />);
    expect(screen.getByText("We use cookies")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <CookieBanner actions={<button type="button">Accept</button>} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
