"use client";

import { cn } from "@paubha/registry/lib/cn";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

export interface RadioGroupProps
  extends React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root> {}

/**
 * role=radiogroup · each item role=radio · arrow keys navigate · Space selects · one item
 * is always selected · label clickable (linked via for/id)
 */
export function RadioGroup({ ref, className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends Omit<
    React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>,
    "children"
  > {
  label?: React.ReactNode;
}

/**
 * State bindings confirmed against Figma's real `_Radio Item` symbol set (node
 * 2121:15180, 10 symbols: Unselected/Selected x default/hover/focus/active/disabled,
 * single size only, confirmed no size axis exists in this file, unlike several other
 * components audited tonight). Unselected hover -> border/strong (added). Unselected
 * active and Selected hover/active render identical to their own default state in
 * Figma, so no extra CSS was needed for those. Selected disabled -> bg/tertiary +
 * border/default + a fg/disabled dot (all three were previously wrong/missing; code
 * inherited the unselected-disabled bg and never overrode the checked border or dot
 * color). Figma's focus state additionally tints the circle's own border to
 * brand/100 (#dbe5fe) on top of the glow-focus shadow; there is no semantic token for
 * that primitive alone, so it was deliberately left unbound rather than invented.
 * See SYNC_LOG.md OPEN QUESTIONS.
 */
export function RadioGroupItem({
  ref,
  className,
  id,
  label,
  ...props
}: RadioGroupItemProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;

  return (
    <div className="inline-flex items-center gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={controlId}
        className={cn(
          "group peer flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-border-default bg-bg-primary",
          "data-[state=unchecked]:hover:border-border-strong",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
          "data-[state=checked]:border-border-brand data-[state=checked]:bg-bg-brand-solid",
          "disabled:cursor-not-allowed disabled:bg-bg-secondary",
          "data-[state=checked]:disabled:border-border-default data-[state=checked]:disabled:bg-bg-tertiary",
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-fg-on-brand group-disabled:bg-fg-disabled" />
      </RadioGroupPrimitive.Item>
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

RadioGroupItem.displayName = "RadioGroupItem";