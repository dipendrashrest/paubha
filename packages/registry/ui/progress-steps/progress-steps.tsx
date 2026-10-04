import { cn } from "@paubha/registry/lib/cn";
import { Check } from "lucide-react";
import * as React from "react";

export type ProgressStepStatus = "complete" | "current" | "upcoming";

type ProgressStepsContextValue = {
  orientation: "horizontal" | "vertical";
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
      orientation: "horizontal",
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
  /** Layout direction. @default "horizontal" */
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
  children,
  "aria-label": ariaLabel = "Progress",
  ...props
}: ProgressStepsProps) {
  const items = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <nav ref={ref} aria-label={ariaLabel} className={className} {...props}>
      <ol
        className={cn(
          orientation === "horizontal"
            ? "flex w-full items-center"
            : "flex flex-col",
        )}
      >
        {items.map((child, index) => (
          <ProgressStepsContext.Provider
            key={child.key ?? index}
            value={{
              orientation,
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
  /** Override the auto-assigned 1-based step number. */
  stepNumber?: number;
}

/**
 * listitem in a ProgressSteps ol · aria-current="step" when status=current ·
 * complete = success solid + Check · current = brand solid + number ·
 * upcoming = bordered muted number · connector color follows prior complete
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
  const { orientation, isLast, stepNumber } =
    useProgressStepsContext(stepNumberProp);
  const isHorizontal = orientation === "horizontal";

  const indicator = (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-ui-md font-semibold",
        status === "complete" && "bg-bg-success-solid text-fg-on-success",
        status === "current" && "bg-bg-brand-solid text-fg-on-brand",
        status === "upcoming" &&
          "border-2 border-border-default bg-bg-primary text-fg-tertiary",
      )}
      aria-hidden="true"
    >
      {status === "complete" ? (
        <Check className="size-4" strokeWidth={2.5} />
      ) : (
        stepNumber
      )}
    </span>
  );

  const labelClass = cn(
    "text-ui-md",
    status === "complete" && "font-semibold text-fg-primary",
    status === "current" && "font-semibold text-fg-brand",
    status === "upcoming" && "font-normal text-fg-tertiary",
  );

  const descriptionClass = cn(
    "text-ui-xs font-medium",
    status === "current" ? "text-fg-secondary" : "text-fg-tertiary",
  );

  const connectorClass = cn(
    "bg-border-default",
    status === "complete" && "bg-bg-success-solid",
  );

  if (isHorizontal) {
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
        <div className="flex shrink-0 flex-col items-center gap-2">
          {indicator}
          <div className="flex max-w-[8rem] flex-col items-center gap-0.5 text-center">
            <span className={labelClass}>{label}</span>
            {description != null ? (
              <span className={descriptionClass}>{description}</span>
            ) : null}
          </div>
        </div>
        {!isLast ? (
          <div
            aria-hidden="true"
            className={cn("mx-3 h-0.5 min-w-4 flex-1", connectorClass)}
          />
        ) : null}
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
      <div className="flex w-8 shrink-0 flex-col items-center">
        {indicator}
        {!isLast ? (
          <div
            aria-hidden="true"
            className={cn("mt-1 w-0.5 flex-1 min-h-10", connectorClass)}
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
