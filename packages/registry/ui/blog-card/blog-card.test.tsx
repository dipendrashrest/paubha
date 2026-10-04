import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { BlogCard, BlogCardGrid } from "./blog-card";

describe("BlogCard", () => {
  it("renders post content", () => {
    render(
      <BlogCard
        tag={<span>Design</span>}
        title="Why copy-paste wins"
        excerpt="Own the source."
        meta={<span>Ava Ruiz · Sep 12</span>}
      />,
    );
    expect(screen.getByText("Why copy-paste wins")).toBeInTheDocument();
    expect(screen.getByText("Own the source.")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <BlogCardGrid>
        <BlogCard title="Post one" excerpt="Hello" />
        <BlogCard title="Post two" excerpt="World" />
      </BlogCardGrid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
