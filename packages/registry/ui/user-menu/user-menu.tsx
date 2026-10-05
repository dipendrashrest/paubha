"use client";

import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu";

export interface UserMenuProps
  extends Omit<React.ComponentPropsWithRef<"div">, "children"> {
  /** Avatar (or other trigger) slot. */
  avatar: React.ReactNode;
  /** Accessible name for the trigger. */
  label?: string;
  /** Account name shown in the menu header. */
  name?: React.ReactNode;
  /** Account email shown under the name. */
  email?: React.ReactNode;
  /** Disables the trigger (avatar dims to 35%). */
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Account menu · DropdownMenu + Avatar trigger · Enter/Space/ArrowDown opens,
 * Esc closes, arrows move between items · trigger carries glow-focus · disabled
 * trigger is inert · items inherit menu keyboard / ARIA from DropdownMenuItem
 */
export function UserMenu({
  ref,
  className,
  avatar,
  label = "Account menu",
  name,
  email,
  disabled,
  children,
  ...props
}: UserMenuProps) {
  return (
    <div ref={ref} className={cn("inline-flex", className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={label}
            disabled={disabled}
            className={cn(
              "inline-flex size-12 items-center justify-center rounded-full border border-border-default bg-bg-primary p-1 outline-none transition-colors",
              "hover:bg-bg-secondary-hover focus-visible:shadow-[var(--shadow-glow-focus)]",
              "disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-bg-disabled disabled:hover:bg-bg-disabled disabled:[&>*]:opacity-35",
            )}
          >
            {avatar}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={cn(
            // Figma "User Menu" panel: 264px, 8px padding, 8px rhythm around dividers,
            // rows px-3 py-2 ui-md Medium (heavier than the base Dropdown Menu rows).
            "w-[264px] p-2",
            "[&_[role=menuitem]]:px-3 [&_[role=menuitem]]:py-2 [&_[role=menuitem]]:text-ui-md [&_[role=menuitem]]:font-medium",
          )}
        >
          {name != null || email != null ? (
            <>
              <div
                role="presentation"
                className="flex flex-col gap-0.5 px-3 py-2 font-medium"
              >
                {name != null ? (
                  <p className="text-ui-md text-fg-primary">{name}</p>
                ) : null}
                {email != null ? (
                  <p className="text-ui-sm text-fg-secondary">{email}</p>
                ) : null}
              </div>
              <UserMenuDivider />
            </>
          ) : null}
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

UserMenu.displayName = "UserMenu";

/** Decorative divider between menu groups (8px above and below, per Figma). */
export function UserMenuDivider({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("my-1 h-px w-full bg-border-default", className)}
      {...props}
    />
  );
}

UserMenuDivider.displayName = "UserMenuDivider";
