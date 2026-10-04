"use client";

import { Badge } from "@paubha/registry/ui/badge";
import { Button } from "@paubha/registry/ui/button";
import { Card, CardContent } from "@paubha/registry/ui/card";
import { Field } from "@paubha/registry/ui/field";
import { IconList, IconListItem } from "@paubha/registry/ui/icon-list";
import { Input } from "@paubha/registry/ui/input";
import { Textarea } from "@paubha/registry/ui/textarea";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import * as React from "react";
import { MarketingShell } from "./shell";

export function ContactMarketingPage() {
  const [sent, setSent] = React.useState(false);

  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Badge variant="gray" fill="subtle" size="md">
            Contact
          </Badge>
          <h1 className="mt-4 text-display-sm font-semibold tracking-[-0.03em] text-fg-primary">
            Talk to a human
          </h1>
          <p className="mt-3 max-w-md text-body-md text-fg-secondary">
            Support, partnerships, or a weird token question: we read every
            note. Expect a reply within one business day.
          </p>

          <IconList className="mt-10">
            <IconListItem
              icon={<Mail aria-hidden="true" />}
              title="Email"
              description="hello@paubha.tech"
            />
            <IconListItem
              icon={<MessageSquare aria-hidden="true" />}
              title="GitHub"
              description="Issues & discussions on the open-source repo"
            />
            <IconListItem
              icon={<MapPin aria-hidden="true" />}
              title="Office"
              description="Remote-first · Demo HQ in Lisbon"
            />
          </IconList>
        </div>

        <Card variant="elevated" className="hover:bg-bg-primary">
          <CardContent className="gap-5 p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col gap-2 py-8 text-center">
                <p className="text-ui-lg font-semibold text-fg-primary">
                  Message sent
                </p>
                <p className="text-body-sm text-fg-secondary">
                  Thanks. We’ll get back to you shortly.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mx-auto mt-4"
                  onClick={() => setSent(false)}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <Field label="Name" required>
                  <Input name="name" placeholder="Jordan Lee" required />
                </Field>
                <Field label="Work email" required>
                  <Input
                    name="email"
                    type="email"
                    placeholder="jordan@company.com"
                    required
                  />
                </Field>
                <Field
                  label="Message"
                  description="A sentence or two is enough."
                  required
                >
                  <Textarea
                    name="message"
                    placeholder="How can we help?"
                    rows={4}
                    required
                  />
                </Field>
                <Button type="submit" size="md" className="w-full sm:w-auto">
                  Send message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </MarketingShell>
  );
}
