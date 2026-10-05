"use client";

import { Button } from "@paubha/registry/ui/button";
import { InlineCta } from "@paubha/registry/ui/inline-cta";
import { Sparkles } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

export function InlineCtaHero() {
  return (
    <ComponentPlayground
      code={`<InlineCta
  title="Upgrade to Pro"
  description="Unlock advanced analytics and unlimited seats."
  actions={<Button size="sm">Upgrade</Button>}
  dismissible
  onDismiss={() => {}}
/>`}
    >
      <div className="w-full max-w-xl">
        <InlineCta
          title="Upgrade to Pro"
          description="Unlock advanced analytics and unlimited seats."
          actions={<Button size="sm">Upgrade</Button>}
          dismissible
          onDismiss={() => {}}
        />
      </div>
    </ComponentPlayground>
  );
}

export function InlineCtaCard() {
  return (
    <ComponentPlayground
      code={`<InlineCta
  variant="card"
  title="Invite your team"
  description="Collaborate on projects with shared workspaces."
  actions={<Button size="sm">Invite</Button>}
/>`}
    >
      <div className="w-full max-w-sm">
        <InlineCta
          variant="card"
          title="Invite your team"
          description="Collaborate on projects with shared workspaces."
          actions={<Button size="sm">Invite</Button>}
        />
      </div>
    </ComponentPlayground>
  );
}

export function InlineCtaLink() {
  return (
    <ComponentPlayground
      code={`<InlineCta
  variant="link"
  description="Need help setting up?"
  actions={<a href="/docs">Check out our getting started guide →</a>}
/>`}
    >
      <div className="w-full max-w-xl">
        <InlineCta
          variant="link"
          description="Need help setting up?"
          actions={<a href="/docs">Check out our getting started guide →</a>}
        />
      </div>
    </ComponentPlayground>
  );
}

export function InlineCtaFloating() {
  return (
    <ComponentPlayground
      code={`<InlineCta
  variant="floating"
  icon={<Sparkles />}
  title="New: AI-powered insights"
/>`}
    >
      <InlineCta
        variant="floating"
        icon={<Sparkles />}
        title="New: AI-powered insights"
      />
    </ComponentPlayground>
  );
}
