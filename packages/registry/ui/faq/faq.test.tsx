import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Faq } from "./faq";

describe("Faq", () => {
  it("renders questions", () => {
    render(
      <Faq
        items={[
          { question: "Is it free?", answer: "Yes, MIT." },
          { question: "Commercial use?", answer: "Allowed." },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { name: "FAQ" })).toBeInTheDocument();
    expect(screen.getByText("Is it free?")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Faq
        title="Questions"
        items={[
          { question: "Is it free?", answer: "Yes, MIT." },
          { question: "Commercial use?", answer: "Allowed." },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
