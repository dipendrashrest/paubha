import { cn } from "@paubha/registry/lib/cn";
import { Check, Circle, CircleDot } from "lucide-react";
import * as React from "react";

export type ProgressStepStatus = "complete" | "current" | "upcoming";

/**
 * Figma variants: `horizontal` (inline marker + label), `vertical`,
 * `numbered` (32px numbered markers, label below), `description`
 * (top-rule columns).
 */
export type ProgressStepsVariant =
  | "horizontal"
  | "vertical"
  | "numbered"
  | "description";

type ProgressStepsContextValue = {
  variant: ProgressStepsVariant;
  index: number;
  isLast: boolean;
  stepNumber: number;
};

const ProgressStepsContext =
  React.createContext<ProgressStepsContextValue | null>(null);

function useProgressStepsContext(
  stepNumberProp?: number,
): ProgressStepsContextValue {
  const ctx = React.useContext(ProgressStepsContext);
  if (!ctx) {
    return {
      variant: "numbered",
      index: 0,
      isLast: true,
      stepNumber: stepNumberProp ?? 1,
    };
  }
  return {
    ...ctx,
    stepNumber: stepNumberProp ?? ctx.stepNumber,
  };
}

/* -------------------------------------------------------------------------- */
/* ProgressSteps                                                              */
/* -------------------------------------------------------------------------- */

export interface ProgressStepsProps extends React.ComponentPropsWithRef<"nav"> {
  /** Visual variant (Figma). Wins over `orientation`. */
  variant?: ProgressStepsVariant;
  /**
   * Layout direction shorthand: `horizontal` → `numbered`, `vertical` →
   * `vertical`. Prefer `variant`.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
}

/**
 * nav with aria-label="Progress" · ordered list of ProgressStep children ·
 * current step uses aria-current="step" · connectors are decorative
 * (aria-hidden) · non-interactive by default. Wire click handlers on
 * completed steps if navigation is needed (add shadow-glow-focus on those
 * controls)
 */
export function ProgressSteps({
  ref,
  className,
  orientation = "horizontal",
  variant: variantProp,
  children,
  "aria-label": ariaLabel = "Progress",
  ...props
}: ProgressStepsProps) {
  const variant: ProgressStepsVariant =
    variantProp ?? (orientation === "vertical" ? "vertical" : "numbered");
  const items = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <nav ref={ref} aria-label={ariaLabel} className={className} {...props}>
      <ol
        className={cn(
          variant === "vertical" && "flex flex-col",
          variant === "numbered" && "flex w-full items-start",
          variant === "horizontal" && "flex w-full items-center",
          variant === "description" && "flex w-full items-start gap-6 px-3",
        )}
      >
        {items.map((child, index) => (
          <ProgressStepsContext.Provider
            key={child.key ?? index}
            value={{
              variant,
              index,
              isLast: index === items.length - 1,
              stepNumber: index + 1,
            }}
          >
            {child}
          </ProgressStepsContext.Provider>
        ))}
      </ol>
    </nav>
  );
}

ProgressSteps.displayName = "ProgressSteps";

/* -------------------------------------------------------------------------- */
/* ProgressStep                                                               */
/* -------------------------------------------------------------------------- */

export interface ProgressStepProps
  extends Omit<React.ComponentPropsWithRef<"li">, "title"> {
  /** Visual / semantic status of this step. */
  status: ProgressStepStatus;
  /** Step label. */
  label: React.ReactNode;
  /** Optional supporting copy under the label. */
  description?: React.ReactNode;
  /** Override the auto-assigned 1-based step number (numbered variant). */
  stepNumber?: number;
}

const MARKER_SIZE: Record<ProgressStepsVariant, string> = {
  horizontal: "size-5",
  vertical: "size-6",
  numbered: "size-8",
  description: "size-4",
};

const MARKER_ICON: Record<ProgressStepsVariant, string> = {
  horizontal: "size-4",
  vertical: "size-[19px]",
  numbered: "size-4",
  description: "size-[13px]",
};

/**
 * listitem in a ProgressSteps ol · aria-current="step" when status=current ·
 * complete = success solid + Check · current = brand solid + CircleDot
 * (number in the numbered variant) · upcoming = bare Circle (bordered number
 * in the numbered variant) · connector color follows prior complete
 */
export function ProgressStep({
  ref,
  className,
  status,
  label,
  description,
  stepNumber: stepNumberProp,
  ...props
}: ProgressStepProps) {
  const { variant, isLast, stepNumber } =
    useProgressStepsContext(stepNumberProp);
  const numbered = variant === "numbered";
  const iconClass = MARKER_ICON[variant];

  const indicator = (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        MARKER_SIZE[variant],
        status === "complete" && "bg-bg-success-solid text-fg-on-success",
        status === "current" && "bg-bg-brand-solid text-fg-on-brand",
        status === "upcoming" &&
          (numbered
            ? "border-[1.5px] border-border-strong bg-bg-primary text-fg-secondary"
            : "text-fg-tertiary"),
        numbered && "text-ui-md font-semibold",
      )}
      aria-hidden="true"
    >
      {numbered ? (
        status === "complete" ? (
          <Check className={iconClass} strokeWidth={2.5} />
        ) : (
          stepNumber
        )
      ) : status === "complete" ? (
        <Check className={iconClass} strokeWidth={2.5} />
      ) : status === "current" ? (
        <CircleDot className={iconClass} />
      ) : (
        <Circle className={iconClass} />
      )}
    </span>
  );

  const labelClass = cn(
    "text-ui-md",
    status === "complete" && "font-semibold text-fg-primary",
    status === "current" && "font-semibold text-fg-brand",
    status === "upcoming" &&
      (numbered
        ? "font-semibold text-fg-primary"
        : "font-normal text-fg-secondary"),
  );

  const descriptionClass =
    "text-ui-xs font-medium leading-[18px] text-fg-secondary";

  const connectorClass = cn(
    numbered ? "bg-border-strong" : "bg-border-default",
    status === "complete" && "bg-bg-success-solid",
  );

  if (variant === "horizontal") {
    return (
      <li
        ref={ref}
        aria-current={status === "current" ? "step" : undefined}
        className={cn(
          "flex min-w-0 items-center",
          !isLast && "flex-1",
          className,
        )}
        {...props}
      >
        <div className="flex shrink-0 items-center gap-2">
          {indicator}
          <span className={labelClass}>{label}</span>
        </div>
        {!isLast ? (
          <div
            aria-hidden="true"
            className={cn("h-0.5 min-w-4 flex-1", connectorClass)}
          />
        ) : null}
      </li>
    );
  }

  if (variant === "numbered") {
    return (
      <li
        ref={ref}
        aria-current={status === "current" ? "step" : undefined}
        className={cn(
          "flex min-w-0 items-start gap-4",
          !isLast && "flex-1",
          className,
        )}
        {...props}
      >
        <div className="flex shrink-0 flex-col items-center gap-2">
          {indicator}
          <span className={labelClass}>{label}</span>
          {description != null ? (
            <span className={cn(descriptionClass, "text-center")}>
              {description}
            </span>
          ) : null}
        </div>
        {!isLast ? (
          <div
            aria-hidden="true"
            className="flex h-8 min-w-4 flex-1 items-center"
          >
            <div className={cn("h-0.5 w-full", connectorClass)} />
          </div>
        ) : null}
      </li>
    );
  }

  if (variant === "description") {
    return (
      <li
        ref={ref}
        aria-current={status === "current" ? "step" : undefined}
        className={cn(
          "flex min-w-px flex-1 flex-col gap-3 border-t-2 pt-4",
          status === "current"
            ? "border-border-brand"
            : "border-border-default",
          className,
        )}
        {...props}
      >
        {indicator}
        <div className="flex flex-col gap-2xs">
          <span className={labelClass}>{label}</span>
          {description != null ? (
            <span className={descriptionClass}>{description}</span>
          ) : null}
        </div>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      aria-current={status === "current" ? "step" : undefined}
      className={cn("flex gap-4", className)}
      {...props}
    >
      <div className="flex w-6 shrink-0 flex-col items-center">
        {indicator}
        {!isLast ? (
          <div
            aria-hidden="true"
            className={cn("min-h-10 w-0.5 flex-1", connectorClass)}
          />
        ) : null}
      </div>
      <div
        className={cn("flex min-w-0 flex-1 flex-col gap-1", !isLast && "pb-5")}
      >
        <span className={labelClass}>{label}</span>
        {description != null ? (
          <span className={descriptionClass}>{description}</span>
        ) : null}
      </div>
    </li>
  );
}

ProgressStep.displayName = "ProgressStep";
