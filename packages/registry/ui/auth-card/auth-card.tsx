import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";
import { Card, CardContent } from "../card/card";

export interface AuthCardProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Brand / logo above the card. */
  mark?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Tabs or form body. */
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Auth page card · Card article · title + form slot + footer · interactive
 * fields/buttons inside must carry glow-focus
 */
export function AuthCard({
  ref,
  className,
  mark,
  title,
  description,
  children,
  footer,
  ...props
}: AuthCardProps) {
  return (
    <div
      ref={ref}
      className={cn("flex w-full max-w-md flex-col items-center", className)}
      {...props}
    >
      {mark != null ? <div className="mb-8">{mark}</div> : null}
      <Card variant="elevated" className="w-full hover:bg-bg-primary">
        <CardContent className="gap-6 p-6 sm:p-8">
          {title != null || description != null ? (
            <div className="flex flex-col gap-1">
              {title != null ? (
                <p className="text-ui-lg font-semibold text-fg-primary">
                  {title}
                </p>
              ) : null}
              {description != null ? (
                <p className="text-body-sm text-fg-secondary">{description}</p>
              ) : null}
            </div>
          ) : null}
          {children}
          {footer != null ? <div>{footer}</div> : null}
        </CardContent>
      </Card>
    </div>
  );
}

AuthCard.displayName = "AuthCard";
