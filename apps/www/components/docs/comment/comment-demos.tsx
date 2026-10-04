"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { Button } from "@paubha/registry/ui/button";
import { Comment, CommentList } from "@paubha/registry/ui/comment";
import { ComponentPlayground } from "../_shared/component-playground";

export function CommentHero() {
  return (
    <ComponentPlayground
      code={`<CommentList>
  <Comment
    avatar={<Avatar initials="AR" alt="Ava Ruiz" size="sm" />}
    author="Ava Ruiz"
    timestamp="2h ago"
    actions={<Button variant="ghost" size="sm">Reply</Button>}
  >
    Tokens finally match Figma.
  </Comment>
</CommentList>`}
    >
      <div className="w-full max-w-md">
        <CommentList>
          <Comment
            avatar={<Avatar initials="AR" alt="Ava Ruiz" size="sm" />}
            author="Ava Ruiz"
            timestamp="2h ago"
            actions={
              <Button variant="ghost" size="sm">
                Reply
              </Button>
            }
          >
            Tokens finally match Figma.
          </Comment>
          <Comment
            avatar={<Avatar initials="JK" alt="Jules Kim" size="sm" />}
            author="Jules Kim"
            timestamp="1h ago"
          >
            Same — glow-focus is the whole brand.
          </Comment>
        </CommentList>
      </div>
    </ComponentPlayground>
  );
}
