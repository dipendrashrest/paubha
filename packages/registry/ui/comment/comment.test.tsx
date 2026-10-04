import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Comment, CommentList } from "./comment";

describe("Comment", () => {
  it("renders author and body", () => {
    render(
      <Comment author="Ava Ruiz" timestamp="2h ago">
        Tokens finally match Figma.
      </Comment>,
    );
    expect(screen.getByText("Ava Ruiz")).toBeInTheDocument();
    expect(screen.getByText("Tokens finally match Figma.")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <CommentList>
        <Comment author="Ava Ruiz">Hello</Comment>
        <Comment author="Jules Kim">World</Comment>
      </CommentList>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
