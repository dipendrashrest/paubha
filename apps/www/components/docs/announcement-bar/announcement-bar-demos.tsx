"use client";

import { AnnouncementBar } from "@paubha/registry/ui/announcement-bar";
import { Badge } from "@paubha/registry/ui/badge";
import { ComponentPlayground } from "../_shared/component-playground";

export function AnnouncementBarHero() {
  return (
    <ComponentPlayground
      code={`<AnnouncementBar
  badge={<Badge variant="brand" fill="solid" size="sm">New</Badge>}
  action={<a href="/docs">Read the docs</a>}
  dismissible
>
  Application patterns just shipped.
</AnnouncementBar>`}
    >
      <div className="w-full max-w-2xl">
        <AnnouncementBar
          badge={
            <Badge variant="brand" fill="solid" size="sm">
              New
            </Badge>
          }
          action={
            <a
              href="/docs"
              className="font-medium text-fg-brand underline-offset-2 hover:underline"
            >
              Read the docs
            </a>
          }
          dismissible
        >
          Application patterns just shipped.
        </AnnouncementBar>
      </div>
    </ComponentPlayground>
  );
}
