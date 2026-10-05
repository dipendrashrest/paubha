"use client";

import { Button } from "@paubha/registry/ui/button";
import { Checkbox } from "@paubha/registry/ui/checkbox";
import { Divider } from "@paubha/registry/ui/divider";
import { Field } from "@paubha/registry/ui/field";
import { Input } from "@paubha/registry/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@paubha/registry/ui/tabs";
import Link from "next/link";
import * as React from "react";
import { Headshot, PEOPLE, Photo } from "./photo";
import { PaubhaMark } from "./shell";

function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const emailError =
    submitted && !/^\S+@\S+\.\S+$/.test(email)
      ? "Enter a valid email address."
      : undefined;
  const passwordError =
    submitted && password.length === 0 ? "Enter your password." : undefined;

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <Field label="Email" error={emailError}>
        <Input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field label="Password" error={passwordError}>
        <Input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      <div className="flex items-center justify-between gap-2">
        <Checkbox label="Keep me signed in" />
        <button
          type="button"
          className="rounded-xs text-ui-sm font-medium text-fg-link focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
        >
          Forgot password?
        </button>
      </div>
      <Button type="submit" size="lg" className="w-full">
        Sign in
      </Button>
    </form>
  );
}

function SignUpForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <Field
        label="Full name"
        error={submitted && !name.trim() ? "Enter your name." : undefined}
      >
        <Input
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>
      <Field
        label="Work email"
        error={
          submitted && !/^\S+@\S+\.\S+$/.test(email)
            ? "Enter a valid email address."
            : undefined
        }
      >
        <Input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field
        label="Password"
        description="At least 8 characters."
        error={
          submitted && password.length < 8
            ? "Password must be at least 8 characters."
            : undefined
        }
      >
        <Input
          type="password"
          name="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      <Button type="submit" size="lg" className="w-full">
        Create account
      </Button>
    </form>
  );
}

export function AuthMarketingPage() {
  const person = PEOPLE[2];

  return (
    <div className="grid min-h-[100dvh] bg-bg-primary lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <PaubhaMark className="self-start" />
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="text-display-sm font-semibold tracking-[-0.03em] text-fg-primary">
            Welcome back
          </h1>
          <p className="mt-2 text-body-md text-fg-secondary">
            Sign in to manage your registry and saved components.
          </p>

          <Tabs defaultValue="signin" className="mt-8">
            <TabsList variant="pill" className="w-full">
              <TabsTrigger value="signin" className="flex-1">
                Sign in
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">
                Sign up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-6">
              <SignInForm />
            </TabsContent>
            <TabsContent value="signup" className="mt-6">
              <SignUpForm />
            </TabsContent>
          </Tabs>

          <Divider label="or" className="my-6" />
          <div className="flex flex-col gap-3">
            <Button variant="secondary" size="lg" className="w-full">
              Continue with GitHub
            </Button>
            <Button variant="secondary" size="lg" className="w-full">
              Continue with Google
            </Button>
          </div>
        </div>
        <p className="text-ui-sm text-fg-tertiary">
          Just browsing?{" "}
          <Link
            href="/examples/marketing/saas"
            className="rounded-xs font-medium text-fg-link focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
          >
            Back to Paubha
          </Link>
        </p>
      </div>

      <div className="relative hidden lg:block">
        <Photo
          name="skyscrapers"
          priority
          sizes="(min-width: 1024px) 55vw, 0px"
          className="absolute inset-0 size-full"
          alt="Glass office towers against a clear blue sky"
        />
        <div className="absolute inset-x-8 bottom-8 rounded-lg border border-border-default bg-bg-primary p-6 shadow-md xl:inset-x-12 xl:bottom-12">
          <blockquote className="text-body-lg text-fg-primary">
            “We moved our whole product UI onto Paubha in two sprints. The
            components were already in our repo, so nothing was blocked.”
          </blockquote>
          <div className="mt-4 flex items-center gap-3">
            <Headshot index={2} size={40} />
            <p className="text-ui-md text-fg-secondary">
              <span className="font-semibold text-fg-primary">
                {person.name}
              </span>
              , {person.role}, Northwind
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
