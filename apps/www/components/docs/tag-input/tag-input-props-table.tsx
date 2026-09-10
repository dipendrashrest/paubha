import { definePropDefs } from "@/lib/prop-defs";
import type { TagInputProps } from "@paubha/registry/ui/tag-input";
import { PropsTable } from "../_shared/props-table";

const tagInputProps = definePropDefs<TagInputProps>()([
  {
    name: "tags",
    type: "string[]",
    description: "The current list of tags (controlled).",
  },
  {
    name: "onTagsChange",
    type: "(tags: string[]) => void",
    description: "Called whenever a tag is added or removed.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Container height, matching the standard density scale.",
  },
  {
    name: "placeholder",
    type: "string",
    defaultValue: '"Add tag..."',
    description: "Placeholder for the text input.",
  },
  {
    name: "error",
    type: "boolean",
    defaultValue: "false",
    description: "Shows the error border color.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables adding, removing, and focusing.",
  },
  {
    name: "preventDuplicates",
    type: "boolean",
    defaultValue: "true",
    description: "Blocks adding a tag that already exists (case-insensitive).",
  },
]);

export function TagInputPropsTable() {
  return <PropsTable rows={[...tagInputProps]} />;
}
