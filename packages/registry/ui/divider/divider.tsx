import { cn } from "@paubha/registry/lib/cn";
import { cva } from "class-variance-authority";
import type * as React from "react";

// Figma "Divider" (6087:36806): a 1px line bound to border/default, in
// Horizontal and Vertical orientations — nothing else.
const lineVariants = cva("shrink-0 bg-border-default", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

const segmentVariants = cva("flex-1 bg-border-default", {
  variants: {
    orientation: { horizontal: "h-px", vertical: "w-px" },
  },
  defaultVariants: { orientation: "horizontal" },
});

export interface DividerProps extends React.ComponentPropsWithRef<"div"> {
  orientation?: "horizontal" | "vertical";
  /** Optional label rendered between two line segments. */
  label?: React.ReactNode;
}

/**
 * role=separator · aria-orientation=vertical on vertical dividers (horizontal
 * is the implicit default) · structural and non-interactive, so not focusable
 * and no focus state · pass aria-hidden for a purely decorative line
 */
export function Divider({
  ref,
  className,
  orientation = "horizontal",
  label,
  ...props
}: DividerProps) {
  const isVertical = orientation === "vertical";

  if (!label) {
    return (
      // biome-ignore lint/a11y/useSemanticElements: <hr> can't hold the label+line-segment children the other branch needs, so this can't unify with it
      // biome-ignore lint/a11y/useFocusableInteractive: a structural separator (not an interactive/resizable one) correctly has no tabIndex per the ARIA spec
      <div
        ref={ref}
        role="separator"
        aria-orientation={isVertical ? "vertical" : undefined}
        className={cn(lineVariants({ orientation }), className)}
        {...props}
      />
    );
  }

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: a structural separator (not an interactive/resizable one) correctly has no tabIndex per the ARIA spec
    <div
      ref={ref}
      // biome-ignore lint/a11y/useSemanticElements: <hr> can't hold the label+line-segment children this branch needs
      role="separator"
      aria-orientation={isVertical ? "vertical" : undefined}
      className={cn(
        "flex items-center gap-3",
        isVertical ? "h-full flex-col" : "w-full",
        className,
      )}
      {...props}
    >
      <div className={segmentVariants({ orientation })} />
      <span className="shrink-0 text-ui-xs font-medium text-fg-tertiary">
        {label}
      </span>
      <div className={segmentVariants({ orientation })} />
    </div>
  );
}

Divider.displayName = "Divider";
