"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { DropdownMenuItem } from "@paubha/registry/ui/dropdown-menu";
import { UserMenu } from "@paubha/registry/ui/user-menu";
import { ComponentPlayground } from "../_shared/component-playground";

export function UserMenuHero() {
  return (
    <ComponentPlayground
      code={`<UserMenu avatar={<Avatar initials="AR" alt="Ava Ruiz" size="sm" />}>
  <DropdownMenuItem>Profile</DropdownMenuItem>
  <DropdownMenuItem>Settings</DropdownMenuItem>
  <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
</UserMenu>`}
    >
      <UserMenu avatar={<Avatar initials="AR" alt="Ava Ruiz" size="sm" />}>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
      </UserMenu>
    </ComponentPlayground>
  );
}
