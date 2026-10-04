import type * as React from "react";
import { cn } from "@paubha/registry/lib/cn";
import { Card, CardContent } from "../card/card";

export interface TeamCardProps
  extends Omit<React.ComponentPropsWithRef<"div">, "role"> {
  /** Avatar slot. */
  avatar?: React.ReactNode;
  name: React.ReactNode;
  role?: React.ReactNode;
}

/**
 * Team member card · Card article · avatar decorative relative to name
 */
export function TeamCard({
  ref,
  className,
  avatar,
  name,
  role,
  ...props
}: TeamCardProps) {
  return (
    <Card
      ref={ref}
      variant="outlined"
      className={cn("hover:bg-bg-primary", className)}
      {...props}
    >
      <CardContent className="flex flex-row items-center gap-3 p-4">
        {avatar != null ? <div className="shrink-0">{avatar}</div> : null}
        <div className="min-w-0">
          <p className="text-ui-md font-semibold text-fg-primary">{name}</p>
          {role != null ? (
            <p className="text-body-sm text-fg-secondary">{role}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

TeamCard.displayName = "TeamCard";

export interface TeamCardGridProps extends React.ComponentPropsWithRef<"div"> {}

export function TeamCardGrid({
  ref,
  className,
  ...props
}: TeamCardGridProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    />
  );
}

TeamCardGrid.displayName = "TeamCardGrid";
