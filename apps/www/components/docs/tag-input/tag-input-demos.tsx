"use client";

import { TagInput } from "@paubha/registry/ui/tag-input";
import * as React from "react";
import { ComponentPlayground } from "../_shared/component-playground";

export function TagInputHero() {
  const [tags, setTags] = React.useState(["React", "Figma"]);
  return (
    <ComponentPlayground
      code={`const [tags, setTags] = useState(["React", "Figma"]);

<TagInput tags={tags} onTagsChange={setTags} aria-label="Tags" />`}
    >
      <div className="w-full max-w-sm">
        <TagInput tags={tags} onTagsChange={setTags} aria-label="Tags" />
      </div>
    </ComponentPlayground>
  );
}

export function TagInputSizes() {
  const [sm, setSm] = React.useState(["React"]);
  const [md, setMd] = React.useState(["React"]);
  const [lg, setLg] = React.useState(["React"]);
  return (
    <ComponentPlayground
      code={`<TagInput size="sm" tags={tags} onTagsChange={setTags} aria-label="Small" />
<TagInput size="md" tags={tags} onTagsChange={setTags} aria-label="Medium" />
<TagInput size="lg" tags={tags} onTagsChange={setTags} aria-label="Large" />`}
    >
      <div className="flex w-full max-w-sm flex-col gap-4">
        <TagInput size="sm" tags={sm} onTagsChange={setSm} aria-label="Small" />
        <TagInput size="md" tags={md} onTagsChange={setMd} aria-label="Medium" />
        <TagInput size="lg" tags={lg} onTagsChange={setLg} aria-label="Large" />
      </div>
    </ComponentPlayground>
  );
}

export function TagInputError() {
  const [tags, setTags] = React.useState(["React"]);
  return (
    <ComponentPlayground code={'<TagInput tags={tags} onTagsChange={setTags} error aria-label="Tags" />'}>
      <div className="w-full max-w-sm">
        <TagInput tags={tags} onTagsChange={setTags} error aria-label="Tags" />
      </div>
    </ComponentPlayground>
  );
}

export function TagInputDisabled() {
  return (
    <ComponentPlayground
      code={'<TagInput tags={["React", "Figma"]} onTagsChange={() => {}} disabled aria-label="Tags" />'}
    >
      <div className="w-full max-w-sm">
        <TagInput
          tags={["React", "Figma"]}
          onTagsChange={() => {}}
          disabled
          aria-label="Tags"
        />
      </div>
    </ComponentPlayground>
  );
}
