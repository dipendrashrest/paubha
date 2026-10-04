import { cn } from "@paubha/registry/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

const chipVariants = cva(
  "flex items-center justify-center rounded-full p-1 [&_svg]:size-6",
  {
    variants: {
      tone: {
        brand: "bg-bg-brand-chip text-fg-brand",
        error: "bg-bg-error-chip text-fg-error",
      },
    },
    defaultVariants: { tone: "brand" },
  },
);

export interface EmptyStateProps
  extends Omit<React.ComponentPropsWithRef<"output">, "title">,
    VariantProps<typeof chipVariants> {
  /** Icon slot (24px Lucide) shown in a round chip above the title. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary / secondary CTA slot. */
  actions?: React.ReactNode;
}

/**
 * Empty / zero-result / first-run / error placeholder · <output> (implicit role=status) ·
 * give the view a clear heading, keep the explanation short, and make the next action
 * a focusable CTA via actions (they carry glow-focus themselves). Do not render while loading.
 */
export function EmptyState({
  ref,
  className,
  tone,
  icon,
  title,
  description,
  actions,
  ...props
}: EmptyStateProps) {
  return (
    <output
      ref={ref}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-bg-primary p-10 text-center shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex w-full flex-col items-center gap-4">
        {icon != null ? (
          <div className={chipVariants({ tone })}>{icon}</div>
        ) : null}
        <div className="flex w-full flex-col gap-2">
          <p className="text-display-xs font-semibold text-fg-primary">
            {title}
          </p>
          {description != null ? (
            <p className="text-body-sm text-fg-secondary">{description}</p>
          ) : null}
        </div>
      </div>
      {actions != null ? (
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      ) : null}
    </output>
  );
}

EmptyState.displayName = "EmptyState";
