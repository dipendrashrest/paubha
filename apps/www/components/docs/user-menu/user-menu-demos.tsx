"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { DropdownMenuItem } from "@paubha/registry/ui/dropdown-menu";
import { UserMenu, UserMenuDivider } from "@paubha/registry/ui/user-menu";
import { LogOut, Moon, Settings, User } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

export function UserMenuHero() {
  return (
    <ComponentPlayground
      code={`<UserMenu
  avatar={<Avatar initials="SL" alt="Sofia Lindqvist" size="md" />}
  name="Sofia Lindqvist"
  email="sofia@example.com"
>
  <DropdownMenuItem leadingIcon={<User />}>Profile</DropdownMenuItem>
  <DropdownMenuItem leadingIcon={<Settings />}>Settings</DropdownMenuItem>
  <DropdownMenuItem leadingIcon={<Moon />}>Theme: System</DropdownMenuItem>
  <UserMenuDivider />
  <DropdownMenuItem leadingIcon={<LogOut />}>Sign out</DropdownMenuItem>
</UserMenu>`}
    >
      <UserMenu
        avatar={<Avatar initials="SL" alt="Sofia Lindqvist" size="md" />}
        name="Sofia Lindqvist"
        email="sofia@example.com"
      >
        <DropdownMenuItem leadingIcon={<User />}>Profile</DropdownMenuItem>
        <DropdownMenuItem leadingIcon={<Settings />}>Settings</DropdownMenuItem>
        <DropdownMenuItem leadingIcon={<Moon />}>
          Theme: System
        </DropdownMenuItem>
        <UserMenuDivider />
        <DropdownMenuItem leadingIcon={<LogOut />}>Sign out</DropdownMenuItem>
      </UserMenu>
    </ComponentPlayground>
  );
}
