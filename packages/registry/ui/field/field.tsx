import { cn } from "@paubha/registry/lib/cn";
import * as React from "react";

interface ControllableProps {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export interface FieldProps
  extends Omit<React.ComponentPropsWithRef<"div">, "children"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  /**
   * Marks the field as required. Appends a literal " *" to the label (matching
   * Figma's confirmed `required` state, node 2120:5) and passes `required` through
   * to the wrapped control so native form validation/aria-required stays in sync.
   * The asterisk is `aria-hidden`; the control's own `required` attribute is what
   * assistive tech announces.
   */
  required?: boolean;
  /**
   * Success message shown in place of the helper text, in `fg-success` (matching
   * Figma's confirmed `success` state, node 2120:5); mirrors how `error` renders
   * its own message below the control. Ignored while `error` is set.
   */
  success?: React.ReactNode;
  /**
   * Disables the field (Figma `disabled` state, node 6391:253): label and helper
   * text switch to `fg-disabled` and `disabled` is passed to the control. Also
   * inferred when the child control itself has `disabled` set.
   */
  disabled?: boolean;
  /** The form control to wire up (Input, Textarea, Select, ...); receives id, aria-describedby, aria-invalid, error, and required automatically. */
  children: React.ReactElement<ControllableProps>;
}

/**
 * Label linked to the control via for/id · helper text wired via aria-describedby ·
 * error message wired via aria-describedby + aria-invalid on the control · required
 * shows a literal "*" after the label (aria-hidden) and sets the control's native
 * `required` attribute · success shows an fg-success message in place of the helper
 * text · disabled dims label/helper to fg-disabled and disables the control
 * (Figma node 2120:5 confirms all 5 states, default/error/disabled/required/success,
 * as real, distinct symbols, not just documentation prose)
 */
export function Field({
  ref,
  className,
  label,
  description,
  error,
  required,
  success,
  disabled: disabledProp,
  children,
  ...props
}: FieldProps) {
  const controlId = React.useId();
  const descriptionId = `${controlId}-description`;
  const errorId = `${controlId}-error`;
  const successId = `${controlId}-success`;
  const invalid = Boolean(error);
  const disabled = Boolean(disabledProp ?? children.props.disabled);
  const showSuccess = Boolean(success) && !invalid;
  const showDescription = Boolean(description) && !showSuccess;
  const describedBy = [
    showDescription ? descriptionId : null,
    invalid ? errorId : null,
    showSuccess ? successId : null,
  ]
    .filter(Boolean)
    .join(" ");

  const control = React.cloneElement(children, {
    id: controlId,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": invalid || undefined,
    error: invalid,
    required: required || undefined,
    disabled: disabled || undefined,
  });

  return (
    <div
      ref={ref}
      data-disabled={disabled || undefined}
      className={cn("flex w-full flex-col gap-1.5", className)}
      {...props}
    >
      {label ? (
        <label
          htmlFor={controlId}
          className={cn(
            "text-ui-sm font-medium",
            disabled ? "text-fg-disabled" : "text-fg-primary",
          )}
        >
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </label>
      ) : null}
      {control}
      {showDescription ? (
        <p
          id={descriptionId}
          className={cn(
            "text-ui-xs font-medium",
            disabled ? "text-fg-disabled" : "text-fg-tertiary",
          )}
        >
          {description}
        </p>
      ) : null}
      {showSuccess ? (
        <p id={successId} className="text-ui-xs font-medium text-fg-success">
          {success}
        </p>
      ) : null}
      {invalid ? (
        <p id={errorId} className="text-ui-xs font-medium text-fg-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

Field.displayName = "Field";
