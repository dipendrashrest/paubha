import { render, screen } from "@testing-library/react";
import { Mail } from "lucide-react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { IconList, IconListItem } from "./icon-list";

describe("IconList", () => {
  it("renders items", () => {
    render(
      <IconList>
        <IconListItem
          icon={<Mail aria-hidden="true" />}
          title="Email"
          description="hello@paubha.tech"
        />
      </IconList>,
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("hello@paubha.tech")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <IconList>
        <IconListItem
          icon={<Mail aria-hidden="true" />}
          title="Email"
          description="hello@paubha.tech"
        />
      </IconList>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
