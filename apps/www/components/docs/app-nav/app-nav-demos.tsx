"use client";

import {
  AppNav,
  AppNavBrand,
  AppNavLink,
  AppNavLinks,
  AppSidebar,
  AppSidebarItem,
  AppSidebarSection,
} from "@paubha/registry/ui/app-nav";
import { Folder, Home, Settings } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

export function AppNavHero() {
  return (
    <ComponentPlayground
      code={`<AppNav>
  <AppNavBrand>
    <span className="text-ui-md font-semibold text-fg-primary">Paubha</span>
  </AppNavBrand>
  <AppNavLinks>
    <AppNavLink href="/home" active>Home</AppNavLink>
    <AppNavLink href="/projects">Projects</AppNavLink>
    <AppNavLink href="/settings">Settings</AppNavLink>
  </AppNavLinks>
</AppNav>`}
    >
      <div className="w-full overflow-hidden rounded-md border border-border-default">
        <AppNav>
          <AppNavBrand>
            <span className="text-ui-md font-semibold text-fg-primary">
              Paubha
            </span>
          </AppNavBrand>
          <AppNavLinks>
            <AppNavLink href="/home" active>
              Home
            </AppNavLink>
            <AppNavLink href="/projects">Projects</AppNavLink>
            <AppNavLink href="/settings">Settings</AppNavLink>
          </AppNavLinks>
        </AppNav>
      </div>
    </ComponentPlayground>
  );
}

export function AppSidebarDemo() {
  return (
    <ComponentPlayground
      code={`<AppSidebar
  logo={
    <span className="text-ui-md font-semibold text-fg-primary">Paubha</span>
  }
>
  <AppSidebarSection label="Main">
    <AppSidebarItem icon={<Home />} active>Home</AppSidebarItem>
    <AppSidebarItem icon={<Folder />}>Projects</AppSidebarItem>
    <AppSidebarItem icon={<Settings />}>Settings</AppSidebarItem>
  </AppSidebarSection>
</AppSidebar>`}
    >
      <div className="h-72 overflow-hidden rounded-md border border-border-default">
        <AppSidebar
          className="h-full"
          logo={
            <span className="text-ui-md font-semibold text-fg-primary">
              Paubha
            </span>
          }
        >
          <AppSidebarSection label="Main">
            <AppSidebarItem icon={<Home />} active>
              Home
            </AppSidebarItem>
            <AppSidebarItem icon={<Folder />}>Projects</AppSidebarItem>
            <AppSidebarItem icon={<Settings />}>Settings</AppSidebarItem>
          </AppSidebarSection>
        </AppSidebar>
      </div>
    </ComponentPlayground>
  );
}
