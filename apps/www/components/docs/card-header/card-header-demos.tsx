"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { Button } from "@paubha/registry/ui/button";
import { CardHeader } from "@paubha/registry/ui/card-header";
import { ComponentPlayground } from "../_shared/component-playground";

export function CardHeaderHero() {
  return (
    <ComponentPlayground
      code={`<CardHeader
  title="Project Atlas"
  description="Last updated 2h ago"
  actions={<Button variant="secondary" size="sm">Edit</Button>}
/>`}
    >
      <div className="w-full max-w-md rounded-md border border-border-default bg-bg-primary">
        <CardHeader
          title="Project Atlas"
          description="Last updated 2h ago"
          actions={
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          }
        />
      </div>
    </ComponentPlayground>
  );
}

export function CardHeaderWithAvatar() {
  return (
    <ComponentPlayground
      code={`<CardHeader
  avatar={<Avatar initials="AC" alt="Anna Chen" size="md" />}
  title="Anna Chen"
  description="@annachen"
  actions={<Button variant="secondary" size="sm">Follow</Button>}
/>`}
    >
      <div className="w-full max-w-md rounded-md border border-border-default bg-bg-primary">
        <CardHeader
          avatar={<Avatar initials="AC" alt="Anna Chen" size="md" />}
          title="Anna Chen"
          description="@annachen"
          actions={
            <Button variant="secondary" size="sm">
              Follow
            </Button>
          }
        />
      </div>
    </ComponentPlayground>
  );
}
