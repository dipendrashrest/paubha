"use client";

import { Button } from "@paubha/registry/ui/button";
import { Field } from "@paubha/registry/ui/field";
import { Input } from "@paubha/registry/ui/input";
import { Check } from "lucide-react";
import * as React from "react";
import { Photo } from "./photo";
import { MarketingShell } from "./shell";

const BENEFITS = [
  "Early access to new application patterns",
  "A short note when each batch ships",
  "A vote on what we build next",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistMarketingPage() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const [done, setDone] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError(undefined);
    setDone(true);
  }

  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pt-12 pb-20 lg:min-h-[calc(100dvh-8rem)] lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="pb-enter max-w-md">
          <h1 className="text-display-md font-semibold tracking-[-0.03em] text-fg-primary sm:text-display-lg">
            Get on the early access list.
          </h1>
          <p className="mt-4 text-body-lg text-fg-secondary">
            We are adding patterns every month. Tell us where to send the news.
          </p>

          {done ? (
            <output className="mt-8 rounded-md border border-border-success bg-bg-success-subtle p-4 text-ui-md text-fg-primary">
              You are on the list. We will write to {email.trim()} when the next
              batch ships.
            </output>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
              <Field
                label="Work email"
                description="One email per release. Unsubscribe any time."
                error={error}
                required
              >
                <Input
                  type="email"
                  name="email"
                  size="lg"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Button type="submit" size="lg" className="whitespace-nowrap">
                Join the list
              </Button>
            </form>
          )}

          <ul className="mt-10 flex flex-col gap-3 border-t border-border-default pt-8">
            {BENEFITS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-body-md text-fg-secondary"
              >
                <Check
                  className="mt-0.5 size-5 shrink-0 text-fg-brand"
                  aria-hidden="true"
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <Photo
          name="office-corridor"
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="pb-enter-late aspect-[4/5] rounded-md border border-border-default"
        />
      </section>
    </MarketingShell>
  );
}
