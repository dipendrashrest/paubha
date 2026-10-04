"use client";

import { IconList, IconListItem } from "@paubha/registry/ui/icon-list";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

export function IconListHero() {
  return (
    <ComponentPlayground
      code={`<IconList>
  <IconListItem
    icon={<Mail aria-hidden="true" />}
    title="Email"
    description="hello@paubha.tech"
  />
  <IconListItem
    icon={<MessageSquare aria-hidden="true" />}
    title="GitHub"
    description="Issues & discussions"
  />
  <IconListItem
    icon={<MapPin aria-hidden="true" />}
    title="Office"
    description="Remote-first · Lisbon"
  />
</IconList>`}
    >
      <div className="w-full max-w-sm">
        <IconList>
          <IconListItem
            icon={<Mail aria-hidden="true" />}
            title="Email"
            description="hello@paubha.tech"
          />
          <IconListItem
            icon={<MessageSquare aria-hidden="true" />}
            title="GitHub"
            description="Issues & discussions"
          />
          <IconListItem
            icon={<MapPin aria-hidden="true" />}
            title="Office"
            description="Remote-first · Lisbon"
          />
        </IconList>
      </div>
    </ComponentPlayground>
  );
}
