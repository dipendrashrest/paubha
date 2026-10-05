"use client";

import { Button } from "@paubha/registry/ui/button";
import { Field } from "@paubha/registry/ui/field";
import { Input } from "@paubha/registry/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@paubha/registry/ui/select";
import { Textarea } from "@paubha/registry/ui/textarea";
import { Bug, Mail, MessagesSquare } from "lucide-react";
import * as React from "react";
import { Photo } from "./photo";
import { MarketingShell } from "./shell";

const WAYS = [
  {
    icon: Bug,
    title: "Report a bug or request a component",
    body: "github.com/dipendrashrest/paubha/issues",
    href: "https://github.com/dipendrashrest/paubha/issues",
  },
  {
    icon: MessagesSquare,
    title: "Ask a question or share what you built",
    body: "github.com/dipendrashrest/paubha/discussions",
    href: "https://github.com/dipendrashrest/paubha/discussions",
  },
  {
    icon: Mail,
    title: "Anything else",
    body: "hello@paubha.tech",
  },
] as const;

type Errors = {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
};

export function ContactMarketingPage() {
  const [sent, setSent] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});
  const [topic, setTopic] = React.useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? "")))
      next.email = "Enter a valid email address.";
    if (!topic) next.topic = "Choose a topic.";
    if (String(data.get("message") ?? "").trim().length < 10)
      next.message = "Tell us a little more, at least a sentence.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="flex flex-col">
          <h1 className="text-display-md font-semibold tracking-[-0.03em] text-fg-primary">
            Get in touch with the team
          </h1>
          <p className="mt-3 max-w-md text-body-md text-fg-secondary">
            Paubha is maintained by a small team. We read every message and
            usually reply within two working days.
          </p>

          <ul className="mt-8 flex flex-col gap-5">
            {WAYS.map(({ icon: Icon, title, body, ...rest }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-bg-brand-subtle text-fg-brand">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-ui-md font-semibold text-fg-primary">
                    {title}
                  </p>
                  {"href" in rest ? (
                    <a
                      href={rest.href}
                      className="break-words rounded-xs text-body-sm text-fg-link focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
                    >
                      {body}
                    </a>
                  ) : (
                    <p className="text-body-sm text-fg-secondary">{body}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <Photo
            name="office-corridor"
            priority
            sizes="(min-width: 1024px) 500px, 100vw"
            className="mt-10 aspect-[16/10] rounded-lg"
          />
        </div>

        <div className="rounded-lg border border-border-default bg-bg-primary p-6 shadow-sm sm:p-8 lg:self-start">
          {sent ? (
            <div className="flex flex-col gap-2 py-10">
              <h2 className="text-display-xs font-semibold text-fg-primary">
                Message sent
              </h2>
              <p className="text-body-md text-fg-secondary">
                Thanks for writing. We will reply by email.
              </p>
              <Button
                variant="secondary"
                size="md"
                className="mt-4 self-start"
                onClick={() => {
                  setSent(false);
                  setTopic("");
                }}
              >
                Send another
              </Button>
            </div>
          ) : (
            <form
              noValidate
              className="flex flex-col gap-5"
              onSubmit={onSubmit}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  <Input name="name" autoComplete="name" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <Input name="email" type="email" autoComplete="email" />
                </Field>
              </div>
              <Field label="Topic" error={errors.topic}>
                <Select value={topic} onValueChange={setTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Bug report</SelectItem>
                    <SelectItem value="component">Component request</SelectItem>
                    <SelectItem value="usage">Help using Paubha</SelectItem>
                    <SelectItem value="other">Something else</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Message" error={errors.message}>
                <Textarea name="message" rows={5} />
              </Field>
              <Button type="submit" size="lg" className="self-start">
                Send message
              </Button>
            </form>
          )}
        </div>
      </section>
    </MarketingShell>
  );
}
