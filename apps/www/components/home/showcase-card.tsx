import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export function ShowcaseCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-md border border-border-default bg-bg-primary p-5 shadow-xs",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
