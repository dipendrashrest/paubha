"use client";

import { Button } from "@paubha/registry/ui/button";
import { SectionHeader } from "@paubha/registry/ui/section-header";
import { ComponentPlayground } from "../_shared/component-playground";

export function SectionHeaderHero() {
  return (
    <ComponentPlayground
      code={`<SectionHeader
  title="Team members"
  description="12 people"
  actions={<Button variant="secondary" size="sm">Invite</Button>}
/>`}
    >
      <div className="w-full max-w-xl rounded-md border border-border-default bg-bg-primary p-4">
        <SectionHeader
          title="Team members"
          description="12 people"
          actions={
            <Button variant="secondary" size="sm">
              Invite
            </Button>
          }
        />
      </div>
    </ComponentPlayground>
  );
}

export function SectionHeaderBordered() {
  return (
    <ComponentPlayground
      code={`<SectionHeader
  title="Recent activity"
  description="Updates from the last 7 days"
  bordered
  actions={<Button variant="secondary" size="sm">View all</Button>}
/>`}
    >
      <div className="w-full max-w-xl rounded-md border border-border-default bg-bg-primary p-4">
        <SectionHeader
          title="Recent activity"
          description="Updates from the last 7 days"
          bordered
          actions={
            <Button variant="secondary" size="sm">
              View all
            </Button>
          }
        />
      </div>
    </ComponentPlayground>
  );
}
