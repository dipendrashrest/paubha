import * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

export interface KbdProps extends React.ComponentPropsWithRef<"kbd"> {}

/**
 * kbd element · screen readers announce the key name · wrap in aria-hidden when used
 * decoratively next to a menu item or tooltip · ensure sufficient contrast for key labels
 */
export function Kbd({ ref, className, children, ...props }: KbdProps) {
  return (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xs border border-border-default bg-bg-secondary px-2 py-1 text-center text-ui-xs font-medium text-fg-secondary",
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
 * Composes multiple Kbd keys into a shortcut, e.g. <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>.
 * Inserts a decorative "+" (aria-hidden) between each key.
 */
export function KbdGroup({ ref, className, children, ...props }: KbdGroupProps) {
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
            <span aria-hidden="true" className="text-ui-xs text-fg-secondary">
              +
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </span>
  );
}

KbdGroup.displayName = "KbdGroup";
