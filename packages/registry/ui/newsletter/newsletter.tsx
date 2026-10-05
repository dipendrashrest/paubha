"use client";

import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";
import { useId, useState } from "react";
import { Button } from "../button/button";
import { Input } from "../input/input";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface NewsletterProps
  extends Omit<React.ComponentPropsWithRef<"form">, "title" | "onSubmit"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Submit button label. @default "Subscribe" */
  submitLabel?: React.ReactNode;
  placeholder?: string;
  /** Shown under the form when the email is invalid. @default "Enter a valid email address." */
  errorMessage?: React.ReactNode;
  onSubscribe?: (email: string) => void;
  /** Shown after a successful submit. Can be a node or a function of the email. */
  successMessage?: React.ReactNode | ((email: string) => React.ReactNode);
}

/**
 * Email capture form · native form (noValidate, own email check) · input labelled via
 * aria-label · invalid email sets aria-invalid + aria-describedby to the error text ·
 * input and submit button carry glow-focus
 */
export function Newsletter({
  ref,
  className,
  title = "Stay in the loop",
  description = "New components and patterns, one email a month.",
  submitLabel = "Subscribe",
  placeholder = "you@company.com",
  errorMessage = "Enter a valid email address.",
  onSubscribe,
  successMessage = "You’re subscribed.",
  ...props
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const errorId = useId();

  if (done) {
    const message =
      typeof successMessage === "function"
        ? successMessage(email)
        : successMessage;
    return (
      <div
        className={cn(
          "flex w-full flex-col gap-2 rounded-md border border-border-default bg-bg-primary p-6",
          className,
        )}
      >
        <p className="text-ui-lg font-semibold text-fg-primary">{message}</p>
        {description != null ? (
          <p className="text-body-sm text-fg-secondary">{description}</p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      ref={ref}
      className={cn(
        "flex w-full flex-col gap-4 rounded-md border border-border-default bg-bg-primary p-6",
        className,
      )}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL_PATTERN.test(email.trim())) {
          setInvalid(true);
          return;
        }
        setInvalid(false);
        onSubscribe?.(email.trim());
        setDone(true);
      }}
      {...props}
    >
      <div className="flex flex-col gap-1">
        {title != null ? (
          <p className="text-ui-lg font-semibold text-fg-primary">{title}</p>
        ) : null}
        {description != null ? (
          <p className="text-body-sm text-fg-secondary">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (invalid) setInvalid(false);
          }}
          error={invalid}
          aria-describedby={invalid ? errorId : undefined}
          placeholder={placeholder}
          aria-label="Email"
          className="flex-1"
        />
        <Button type="submit" size="md" className="shrink-0">
          {submitLabel}
        </Button>
      </div>
      {invalid && errorMessage != null ? (
        <p id={errorId} className="text-ui-xs text-fg-error">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}

Newsletter.displayName = "Newsletter";
