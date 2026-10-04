"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { BlogCard, BlogCardGrid } from "@paubha/registry/ui/blog-card";
import { ComponentPlayground } from "../_shared/component-playground";

export function BlogCardHero() {
  return (
    <ComponentPlayground
      code={`<BlogCardGrid>
  <BlogCard
    tag={<Badge variant="gray" fill="subtle" size="sm">Design systems</Badge>}
    title="Why copy-paste beats another npm UI kit"
    excerpt="Owning the source means you can theme, fork, and ship."
    meta={
      <div className="flex items-center gap-2">
        <Avatar initials="AR" alt="Ava Ruiz" size="sm" />
        <div>
          <p className="text-ui-sm font-semibold">Ava Ruiz</p>
          <p className="text-ui-xs text-fg-tertiary">Sep 12, 2026</p>
        </div>
      </div>
    }
  />
</BlogCardGrid>`}
    >
      <BlogCardGrid className="max-w-sm">
        <BlogCard
          tag={
            <Badge variant="gray" fill="subtle" size="sm">
              Design systems
            </Badge>
          }
          title="Why copy-paste beats another npm UI kit"
          excerpt="Owning the source means you can theme, fork, and ship."
          meta={
            <div className="flex items-center gap-2">
              <Avatar initials="AR" alt="Ava Ruiz" size="sm" />
              <div>
                <p className="text-ui-sm font-semibold text-fg-primary">
                  Ava Ruiz
                </p>
                <p className="text-ui-xs text-fg-tertiary">Sep 12, 2026</p>
              </div>
            </div>
          }
        />
      </BlogCardGrid>
    </ComponentPlayground>
  );
}
