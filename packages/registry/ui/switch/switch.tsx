import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface SwitchProps
  extends Omit<
    React.ComponentPropsWithRef<typeof SwitchPrimitive.Root>,
    "children"
  > {
  label?: React.ReactNode;
}

/**
 * role=switch · aria-checked=true/false · Space toggles · focus ring visible on Tab ·
 * label clickable (linked via for/id)
 *
 * State bindings confirmed against Figma's real published Switch (node 2121:15243, 10
 * symbols: Off/On x default/hover/focus/active/disabled — single size, confirmed no
 * size axis exists in this file). Off+hover -> bg/secondary (was missing). Off+active
 * and On+hover/active render identical to their own default state in Figma, so no
 * extra CSS needed. Disabled track (both Off and On) -> bg/disabled (Off's disabled
 * track was previously bg/switch-off, unchanged from its default — a real, confirmed
 * bug). Disabled thumb -> bg/secondary in both states (was always bg/primary
 * regardless of disabled) — applied via `group-disabled:` since the thumb is a plain
 * span, not a form control that can match `:disabled` itself.
 */
export function Switch({ ref, className, id, label, ...props }: SwitchProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;

  return (
    <div className="inline-flex items-center gap-3">
      <SwitchPrimitive.Root
        ref={ref}
        id={controlId}
        className={cn(
          "group peer flex h-6 w-11 shrink-0 items-center rounded-full bg-bg-switch-off px-0.5",
          "data-[state=unchecked]:hover:bg-bg-secondary",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
          "data-[state=checked]:justify-end data-[state=checked]:bg-bg-brand-solid",
          "disabled:cursor-not-allowed disabled:opacity-100",
          "data-[state=unchecked]:disabled:bg-bg-disabled data-[state=checked]:disabled:bg-bg-disabled",
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb className="size-5 shrink-0 rounded-full bg-bg-primary shadow-sm group-disabled:bg-bg-secondary" />
      </SwitchPrimitive.Root>
      {label ? (
        <label
          htmlFor={controlId}
          className={cn(
            "select-none text-ui-md font-normal text-fg-primary",
            "peer-disabled:cursor-not-allowed peer-disabled:text-fg-disabled",
          )}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}

Switch.displayName = "Switch";
