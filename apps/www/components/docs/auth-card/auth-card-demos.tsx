"use client";

import { AuthCard } from "@paubha/registry/ui/auth-card";
import { Button } from "@paubha/registry/ui/button";
import { Field } from "@paubha/registry/ui/field";
import { Input } from "@paubha/registry/ui/input";
import { Logo } from "@paubha/registry/ui/logo";
import { ComponentPlayground } from "../_shared/component-playground";

export function AuthCardHero() {
  return (
    <ComponentPlayground
      code={`<AuthCard
  mark={<Logo variant="combined" size={32} />}
  title="Log in"
  description="Welcome back to Paubha."
>
  <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
    <Field label="Email">
      <Input type="email" placeholder="you@company.com" />
    </Field>
    <Field label="Password">
      <Input type="password" placeholder="••••••••" />
    </Field>
    <Button type="submit">Log in</Button>
  </form>
</AuthCard>`}
    >
      <AuthCard
        mark={<Logo variant="icon" size={32} />}
        title="Log in"
        description="Welcome back to Paubha."
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field label="Email">
            <Input type="email" placeholder="you@company.com" />
          </Field>
          <Field label="Password">
            <Input type="password" placeholder="••••••••" />
          </Field>
          <Button type="submit">Log in</Button>
        </form>
      </AuthCard>
    </ComponentPlayground>
  );
}
