import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Testimonial, TestimonialGrid } from "./testimonial";

describe("Testimonial", () => {
  it("renders quote and author", () => {
    render(
      <Testimonial
        quote="Paubha saved us weeks."
        author="Ava Ruiz"
        role="Design lead"
      />,
    );
    expect(screen.getByText(/Paubha saved us weeks/)).toBeInTheDocument();
    expect(screen.getByText("Ava Ruiz")).toBeInTheDocument();
  });

  it("renders the author in medium weight", () => {
    render(<Testimonial quote="Great" author="Sofia Lindqvist" />);
    expect(screen.getByText("Sofia Lindqvist")).toHaveClass("font-medium");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <TestimonialGrid>
        <Testimonial quote="Great." author="Sam" />
      </TestimonialGrid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
