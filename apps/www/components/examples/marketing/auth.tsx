"use client";

import { AuthCard } from "@paubha/registry/ui/auth-card";
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
import { MarketingShell, PaubhaMark } from "./shell";

export function AuthMarketingPage() {
  return (
    <MarketingShell hideNav hideFooter>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <AuthCard
          mark={<PaubhaMark />}
          footer={
            <p className="text-center text-ui-sm text-fg-tertiary">
              Just browsing?{" "}
              <Link
                href="/examples/marketing/saas"
                className="font-medium text-fg-brand focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
              >
                Back to Paubha
              </Link>
            </p>
          }
        >
          <Tabs defaultValue="login">
            <TabsList variant="pill" className="w-full">
              <TabsTrigger value="login" className="flex-1">
                Log in
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">
                Sign up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
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
                <div className="flex items-center justify-between gap-2">
                  <Checkbox label="Remember me" />
                  <button
                    type="button"
                    className="text-ui-sm font-medium text-fg-brand focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
                  >
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" size="md" className="w-full">
                  Log in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <Field label="Full name">
                  <Input placeholder="Jordan Lee" />
                </Field>
                <Field label="Work email">
                  <Input type="email" placeholder="you@company.com" />
                </Field>
                <Field label="Password" description="At least 8 characters.">
                  <Input type="password" placeholder="••••••••" />
                </Field>
                <Checkbox label="I agree to the Terms and Privacy Policy" />
                <Button type="submit" size="md" className="w-full">
                  Create account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <Divider label="or" />

          <Button variant="secondary" size="md" className="w-full">
            Continue with Google
          </Button>
        </AuthCard>
      </div>
    </MarketingShell>
  );
}
