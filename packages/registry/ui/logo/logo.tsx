import type * as React from "react";
import { cn } from "../../lib/cn";

export type LogoVariant = "icon" | "wordmark" | "combined" | "combined-dark";

export interface LogoProps
  extends Omit<React.ComponentPropsWithRef<"div">, "children"> {
  /**
   * `icon` — brand mark only, for favicons/app icons/compact placements.
   * `wordmark` — text-only lockup, for headers/footers/docs.
   * `combined` — icon + wordmark, theme-aware (wordmark uses fg-primary).
   * `combined-dark` — icon + wordmark for placement on a dark or brand-colored
   * surface regardless of the app's active theme (wordmark is fixed on-brand white,
   * not theme-aware) — e.g. a dark footer band on an otherwise light marketing page.
   */
  variant?: LogoVariant;
}

/**
 * role=img · accessible name is the brand name ("Paubha"), the icon glyph and wordmark
 * text are aria-hidden since the wrapper already carries the name · non-interactive,
 * no focus state · purely decorative/branding content, not a control
 */
export function Logo({
  ref,
  className,
  variant = "combined",
  ...props
}: LogoProps) {
  const showIcon = variant !== "wordmark";
  const showWordmark = variant !== "icon";

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Paubha"
      className={cn("inline-flex shrink-0 items-center gap-2.5", className)}
      {...props}
    >
      {showIcon ? (
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-md bg-bg-brand-solid text-[22px] leading-8 font-bold text-fg-on-brand"
        >
          A
        </span>
      ) : null}
      {showWordmark ? (
        <span
          aria-hidden="true"
          className={cn(
            "text-[20px] leading-7 font-semibold whitespace-nowrap",
            variant === "combined-dark"
              ? "text-fg-on-brand"
              : "text-fg-primary",
          )}
        >
          Paubha
        </span>
      ) : null}
    </div>
  );
}

Logo.displayName = "Logo";
