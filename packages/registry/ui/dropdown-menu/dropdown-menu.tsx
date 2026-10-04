"use client";

import { cn } from "@paubha/registry/lib/cn";
import { withIconSize } from "@paubha/registry/lib/with-icon-size";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type * as React from "react";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content> {}

/**
 * role=menu · items role=menuitem · ↑/↓ move highlight, Home/End jump, typeahead ·
 * Enter/Space selects · Esc closes and returns focus to the trigger · focus ring visible
 * on keyboard focus · disabled items are skipped
 *
 * Spec: Figma `7JhwsjEdCg2grQsRnK24NF`, page "↳ Dropdown Menu" (`2120:17`), panel symbol
 * `2121:15472`: `bg/elevated`, `border/default`, `space/xs` padding + gap (4px),
 * `radius/md` (12px), `shadow/lg` (brand-tinted via `theme.css`).
 *
 * Layer: `--z-popover` (50), not `--z-dropdown` (10). The panel is portalled to `<body>`,
 * so it stacks against the Dialog/Modal overlay (`--z-overlay` 30) and panel (`--z-modal`
 * 40); `--z-dropdown` would put a menu opened inside a dialog underneath it. Same layer
 * Popover uses, below Toast (60) and Tooltip (70).
 */
export function DropdownMenuContent({
  ref,
  className,
  sideOffset = 4,
  children,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-(--z-popover) flex min-w-32 flex-col gap-1 rounded-md border border-border-default bg-bg-elevated p-1 shadow-lg",
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps
  extends Omit<
    React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item>,
    "children"
  > {
  leadingIcon?: React.ReactNode;
  shortcut?: React.ReactNode;
  /** Styles the item as a destructive action (e.g. "Delete"). */
  destructive?: boolean;
  children?: React.ReactNode;
}

/**
 * Spec: Figma "Menu item" set `2121:15471` (5 states). Row: `space/md` (8px) x-padding +
 * gap, `space/sm` (6px) y-padding, `radius/xs`, 30px tall. Label 13/18 Regular
 * (`ui-sm`); optional 16px leading icon; optional shortcut 12/16 Medium (`ui-xs`,
 * `fg/tertiary` in every state).
 * - default: `fg/primary`, no fill
 * - hover: `bg/secondary-hover` (Radix `data-highlighted`, fired by pointer and arrow keys)
 * - focus: `bg/secondary` + `shadow/glow-focus` (keyboard focus only, via `focus-visible`)
 * - active (pressed): `bg/brand-subtle` + `fg/brand`
 * - disabled: `fg/disabled`, no fill
 * `destructive` is a code-only extension (Figma has no destructive variant): error-tinted
 * text and highlight/pressed fills.
 */
export function DropdownMenuItem({
  ref,
  className,
  leadingIcon,
  shortcut,
  destructive = false,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-xs px-2 py-1.5 text-ui-sm font-normal text-fg-primary outline-none",
        // Radix keeps the focused item `data-highlighted`, and Tailwind emits `data-*`
        // after `:focus-visible`/`:active`, so those two are stacked on the attribute to
        // win the cascade (otherwise hover's fill masks the focus and pressed fills).
        "data-[highlighted]:bg-bg-secondary-hover",
        "focus-visible:shadow-[var(--shadow-glow-focus)] data-[highlighted]:focus-visible:bg-bg-secondary",
        "active:bg-bg-brand-subtle active:text-fg-brand data-[highlighted]:active:bg-bg-brand-subtle",
        "data-[disabled]:pointer-events-none data-[disabled]:text-fg-disabled",
        destructive &&
          "text-fg-error data-[highlighted]:bg-bg-error-subtle data-[highlighted]:focus-visible:bg-bg-error-subtle active:bg-bg-error-subtle active:text-fg-error data-[highlighted]:active:bg-bg-error-subtle",
        className,
      )}
      {...props}
    >
      {leadingIcon ? withIconSize(leadingIcon, "size-4") : null}
      <span className="flex-1">{children}</span>
      {shortcut ? (
        <span className="shrink-0 text-ui-xs font-medium text-fg-tertiary">
          {shortcut}
        </span>
      ) : null}
    </DropdownMenuPrimitive.Item>
  );
}

DropdownMenuItem.displayName = "DropdownMenuItem";
