import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";
import { withIconSize } from "@paubha/registry/lib/with-icon-size";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content> {}

/**
 * role=menu · items role=menuitem · arrow keys navigate · Enter/Space selects · Esc
 * closes · focus is trapped within the open menu
 *
 * Real spec confirmed via `get_metadata`/`get_design_context` on node `2120:17` (file
 * `CDgfoMkj7lP3pXWJ3aOgkH`, node id recovered from the "add Dropdown Menu" build commit's
 * own recorded id — `BUILD_LOG.md` — the same trick that resolved Toast/Popover in earlier
 * units). Published panel symbol (`2121:15472`): `bg/elevated`, `border/default`,
 * `p/xs`+`gap/xs` (4px), `shadow/lg` (already correctly bound — this project's `shadow-lg`
 * utility is remapped in `theme.css` to the brand-tinted token, not raw Tailwind). Panel
 * radius is `radius/md` (12px) — re-confirmed 2026-09-11 after Figma's duplicate "Radius"
 * variable collections were consolidated; the earlier `rounded-md` → `rounded-lg` change
 * was based on the since-deleted, orphaned collection and has been reverted.
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
          "z-50 flex min-w-32 flex-col gap-1 rounded-md border border-border-default bg-bg-elevated p-1 shadow-lg",
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
 * Real per-state spec confirmed via `get_design_context` on the "_Menu Item" base
 * component (`2121:15471`, sibling to the panel above, same node-id-from-commit-message
 * recovery): 5 published states — default (`fg-primary`, no fill), hover
 * (`bg-secondary-hover`), focus (`bg-secondary` + `shadow-glow-focus`), active
 * (`bg-brand-subtle` fill + `fg-brand` text — a real, distinct pressed state Figma
 * publishes that the code had NO treatment for at all before this fix), disabled
 * (`fg-disabled`, no fill change). Radix's single-moving-highlight menu architecture
 * (`data-highlighted` fires for both pointer hover and keyboard arrow-nav) still means
 * hover/focus share one background via `data-[highlighted]:bg-bg-secondary-hover` plus a
 * separate `focus-visible:shadow-glow-focus` ring for real keyboard focus — an
 * already-documented, deliberate compromise from this component's original build (see
 * `BUILD_LOG.md`), reconfirmed here, not re-litigated. The native `:active` (press) state
 * is a real browser pseudo-class independent of Radix's data attributes, so it maps
 * directly to `active:` with no reinvention needed. `destructive` items now get the same
 * error-tinted treatment across hover/focus (already covered by the shared
 * `data-[highlighted]` rule) AND the new active state — previously `destructive` only
 * recolored the default text and the hover/focus background, leaving a destructive item's
 * pressed state incorrectly falling through to the brand-tinted active styles.
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
        "flex items-center gap-2 rounded-xs px-2 py-1.5 text-ui-md text-fg-primary outline-none",
        "data-[highlighted]:bg-bg-secondary-hover",
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
        "active:bg-bg-brand-subtle active:text-fg-brand",
        "data-[disabled]:pointer-events-none data-[disabled]:text-fg-disabled",
        destructive &&
          "text-fg-error data-[highlighted]:bg-bg-error-subtle active:bg-bg-error-subtle active:text-fg-error",
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
