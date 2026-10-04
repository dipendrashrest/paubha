"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import {
  Comment,
  CommentAction,
  CommentList,
} from "@paubha/registry/ui/comment";
import { Heart, Reply } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

export function CommentHero() {
  return (
    <ComponentPlayground
      code={`<CommentList>
  <Comment
    avatar={<Avatar initials="AR" alt="Ava Ruiz" size="sm" />}
    author="Ava Ruiz"
    timestamp="2h ago"
    actions={<CommentAction icon={<Reply />}>Reply</CommentAction>}
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
              <>
                <CommentAction icon={<Reply />}>Reply</CommentAction>
                <CommentAction icon={<Heart />}>Like</CommentAction>
              </>
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
