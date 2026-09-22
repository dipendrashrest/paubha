import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export type LogoVariant = "icon" | "wordmark" | "combined" | "combined-dark";

export interface LogoProps
  extends Omit<React.ComponentPropsWithRef<"div">, "children"> {
  /**
   * `icon`: brand mark only, for favicons/app icons/compact placements.
   * `wordmark`: text-only lockup, for headers/footers/docs.
   * `combined`: icon + wordmark, theme-aware (swaps to the dark lockup in dark mode).
   * `combined-dark`: icon + wordmark for placement on a dark or brand-colored
   * surface regardless of the app's active theme, e.g. a dark footer band on an
   * otherwise light marketing page.
   */
  variant?: LogoVariant;
}

const LOGO_SRC = {
  icon: "/logo/icon.png",
  wordmark: "/logo/wordmark.png",
  combined: "/logo/combined.png",
  "combined-dark": "/logo/combined-dark.png",
} as const;

/**
 * role=img · accessible name is the brand name ("Paubha"), the bitmap is
 * aria-hidden since the wrapper already carries the name · non-interactive,
 * no focus state · purely decorative/branding content, not a control
 */
export function Logo({
  ref,
  className,
  variant = "combined",
  ...props
}: LogoProps) {
  return (
    <div
      ref={ref}
      role="img"
      aria-label="Paubha"
      className={cn("inline-flex shrink-0 items-center", className)}
      {...props}
    >
      {variant === "icon" ? (
        <img src={LOGO_SRC.icon} alt="" aria-hidden="true" className="size-8" />
      ) : null}
      {variant === "wordmark" ? (
        <img
          src={LOGO_SRC.wordmark}
          alt=""
          aria-hidden="true"
          className="h-8 w-auto dark:brightness-0 dark:invert"
        />
      ) : null}
      {variant === "combined" ? (
        <>
          <img
            src={LOGO_SRC.combined}
            alt=""
            aria-hidden="true"
            className="h-8 w-auto dark:hidden"
          />
          <img
            src={LOGO_SRC["combined-dark"]}
            alt=""
            aria-hidden="true"
            className="hidden h-8 w-auto dark:block"
          />
        </>
      ) : null}
      {variant === "combined-dark" ? (
        <img
          src={LOGO_SRC["combined-dark"]}
          alt=""
          aria-hidden="true"
          className="h-8 w-auto"
        />
      ) : null}
    </div>
  );
}

Logo.displayName = "Logo";
