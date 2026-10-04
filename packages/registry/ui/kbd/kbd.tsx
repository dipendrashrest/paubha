import { cn } from "@paubha/registry/lib/cn";
import * as React from "react";

export interface KbdProps extends React.ComponentPropsWithRef<"kbd"> {}

/**
 * Single key cap — Figma "_Kbd key" (node 2173:20033): bg-secondary, border-default,
 * radius-xs, 8px/4px padding, 12/16 medium label in fg-secondary (26px tall).
 *
 * Accessibility: native kbd element · not interactive, no focus state · screen readers read
 * the key label · mark the shortcut aria-hidden when it only repeats an action's visible
 * label (menu item, tooltip) · use aria-keyshortcuts on the actual control for the real hint
 */
export function Kbd({ ref, className, children, ...props }: KbdProps) {
  return (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xs border border-border-default bg-bg-secondary px-2 py-1 text-center font-sans text-ui-xs font-medium text-fg-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

Kbd.displayName = "Kbd";

export interface KbdGroupProps extends React.ComponentPropsWithRef<"span"> {}

/**
 * Key combination — Figma "Kbd" (node 2173:20035): keys separated by a decorative "+"
 * (11/16 regular, fg-secondary, aria-hidden) with a 4px gap,
 * e.g. <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>.
 */
export function KbdGroup({
  ref,
  className,
  children,
  ...props
}: KbdGroupProps) {
  const items = React.Children.toArray(children);

  return (
    <span
      ref={ref}
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {items.map((item, index) => (
        <React.Fragment key={React.isValidElement(item) ? item.key : index}>
          {item}
          {index < items.length - 1 ? (
            <span
              aria-hidden="true"
              className="text-[11px] leading-4 font-normal text-fg-secondary"
            >
              +
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </span>
  );
}

KbdGroup.displayName = "KbdGroup";
