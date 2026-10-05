import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("disables the trigger", () => {
    render(
      <UserMenu avatar={<span>AR</span>} disabled>
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </UserMenu>,
    );
    expect(screen.getByRole("button", { name: "Account menu" })).toBeDisabled();
  });

  it("shows name and email in the open menu", async () => {
    const user = userEvent.setup();
    render(
      <UserMenu avatar={<span>AR</span>} name="Sofia" email="s@example.com">
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </UserMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Account menu" }));
    expect(await screen.findByText("s@example.com")).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "Profile" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations when open with a header", async () => {
    const user = userEvent.setup();
    render(
      <UserMenu avatar={<span>AR</span>} name="Sofia" email="s@example.com">
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </UserMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Account menu" }));
    const menu = await screen.findByRole("menu");
    expect(await axe(menu)).toHaveNoViolations();
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
