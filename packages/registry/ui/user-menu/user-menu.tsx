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
  children?: React.ReactNode;
}

/**
 * Account menu · DropdownMenu + Avatar trigger · trigger carries glow-focus ·
 * items inherit menu keyboard / ARIA from DropdownMenuItem
 */
export function UserMenu({
  ref,
  className,
  avatar,
  label = "Account menu",
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
            className="rounded-full outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
          >
            {avatar}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

UserMenu.displayName = "UserMenu";
