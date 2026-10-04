import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { DropdownMenuItem } from "../dropdown-menu/dropdown-menu";
import { UserMenu } from "./user-menu";

describe("UserMenu", () => {
  it("renders the avatar trigger", () => {
    render(
      <UserMenu avatar={<span>AR</span>} label="Account menu">
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </UserMenu>,
    );
    expect(
      screen.getByRole("button", { name: "Account menu" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <UserMenu avatar={<span>AR</span>}>
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </UserMenu>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
