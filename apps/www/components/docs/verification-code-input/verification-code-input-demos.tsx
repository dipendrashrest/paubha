"use client";

import { VerificationCodeInput } from "@paubha/registry/ui/verification-code-input";
import { ComponentPlayground } from "../_shared/component-playground";

export function VerificationCodeInputHero() {
  return (
    <ComponentPlayground
      code={'<VerificationCodeInput aria-label="6-digit verification code" />'}
    >
      <VerificationCodeInput aria-label="6-digit verification code" />
    </ComponentPlayground>
  );
}

export function VerificationCodeInputLength() {
  return (
    <ComponentPlayground
      code={
        '<VerificationCodeInput length={4} aria-label="4-digit verification code" />'
      }
    >
      <VerificationCodeInput
        length={4}
        aria-label="4-digit verification code"
      />
    </ComponentPlayground>
  );
}

export function VerificationCodeInputError() {
  return (
    <ComponentPlayground
      code={
        '<VerificationCodeInput\n  defaultValue="123456"\n  error\n  errorMessage="Invalid verification code. Please try again."\n  aria-label="Verification code"\n/>'
      }
    >
      <VerificationCodeInput
        defaultValue="123456"
        error
        errorMessage="Invalid verification code. Please try again."
        aria-label="Verification code"
      />
    </ComponentPlayground>
  );
}

export function VerificationCodeInputDisabled() {
  return (
    <ComponentPlayground
      code={'<VerificationCodeInput disabled aria-label="Verification code" />'}
    >
      <VerificationCodeInput disabled aria-label="Verification code" />
    </ComponentPlayground>
  );
}
