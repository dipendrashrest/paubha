import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home, Plus, Settings, Users } from "lucide-react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  AppIconNav,
  AppIconNavAction,
  AppIconNavItem,
  AppNav,
  AppNavBrand,
  AppNavLink,
  AppNavLinks,
  AppSidebar,
  AppSidebarItem,
  AppSidebarSection,
} from "./app-nav";

describe("AppNav", () => {
  it("renders brand, active link, and actions", () => {
    render(
      <AppNav
        logo={<AppNavBrand>Paubha</AppNavBrand>}
        actions={<button type="button">Profile</button>}
      >
        <AppNavLinks>
          <AppNavLink href="/overview" active>
            Overview
          </AppNavLink>
          <AppNavLink href="/projects">Projects</AppNavLink>
        </AppNavLinks>
      </AppNav>,
    );

    expect(screen.getByText("Paubha")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Projects" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("button", { name: "Profile" })).toBeInTheDocument();
  });

  it("supports button links without href", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <AppNav>
        <AppNavLinks>
          <AppNavLink onClick={onClick} active>
            Inbox
          </AppNavLink>
        </AppNavLinks>
      </AppNav>,
    );
    await user.click(screen.getByRole("button", { name: "Inbox" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations with an active link", async () => {
    const { container } = render(
      <AppNav logo={<AppNavBrand>Paubha</AppNavBrand>}>
        <AppNavLinks>
          <AppNavLink href="/" active>
            Home
          </AppNavLink>
          <AppNavLink href="/docs">Docs</AppNavLink>
        </AppNavLinks>
      </AppNav>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("AppSidebar", () => {
  it("renders sections with an active item", () => {
    render(
      <AppSidebar logo={<span>Logo</span>} footer={<span>v1.0</span>}>
        <AppSidebarSection label="Workspace">
          <AppSidebarItem href="/home" icon={<Home />} active>
            Home
          </AppSidebarItem>
          <AppSidebarItem href="/team" icon={<Users />}>
            Team
          </AppSidebarItem>
        </AppSidebarSection>
      </AppSidebar>,
    );

    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Team" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByText("v1.0")).toBeInTheDocument();
  });

  it("has no axe violations with an active item", async () => {
    const { container } = render(
      <AppSidebar logo={<span>Paubha</span>}>
        <AppSidebarSection label="Main">
          <AppSidebarItem href="/" icon={<Home />} active>
            Dashboard
          </AppSidebarItem>
          <AppSidebarItem href="/settings" icon={<Settings />}>
            Settings
          </AppSidebarItem>
        </AppSidebarSection>
      </AppSidebar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("AppIconNav", () => {
  it("renders icon items and a brand action", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(
      <AppIconNav>
        <AppIconNavItem icon={<Home />} label="Home" active />
        <AppIconNavAction
          icon={<Plus />}
          aria-label="Create"
          onClick={onAction}
        />
        <AppIconNavItem icon={<Settings />} label="Settings" />
      </AppIconNav>,
    );

    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await user.click(screen.getByRole("button", { name: "Create" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <AppIconNav>
        <AppIconNavItem icon={<Home />} label="Home" active />
        <AppIconNavAction icon={<Plus />} aria-label="Create" />
        <AppIconNavItem icon={<Settings />} label="Settings" />
      </AppIconNav>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
