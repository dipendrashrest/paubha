import { definePropDefs } from "@/lib/prop-defs";
import type {
  AvatarAddButtonProps,
  AvatarGroupProps,
  AvatarLabelGroupProps,
  AvatarProps,
} from "@paubha/registry/ui/avatar";
import { PropsTable } from "../_shared/props-table";

const avatarProps = definePropDefs<AvatarProps>()([
  {
    name: "src",
    type: "string",
    description:
      "Image URL. Falls back to initials if missing or it fails to load.",
  },
  {
    name: "alt",
    type: "string",
    description:
      "Accessible name. Also used to derive initials when `initials` is omitted.",
  },
  {
    name: "initials",
    type: "string",
    description:
      "Fallback letters on `bg-brand-subtle` / `fg-brand`. Max two characters.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
    defaultValue: '"md"',
    description: "Diameter: 24 / 32 / 40 / 48 / 64 / 80px.",
  },
  {
    name: "status",
    type: '"online" | "offline"',
    description:
      "Optional presence dot. Online uses success-500; offline uses gray-300.",
  },
]);

const groupProps = definePropDefs<AvatarGroupProps>()([
  {
    name: "max",
    type: "number",
    defaultValue: "4",
    description: "How many avatars to show before a +N overflow chip.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
    defaultValue: '"md"',
    description: "Applied to every child and the overflow chip.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "One or more `<Avatar />` elements.",
  },
]);

const addButtonProps = definePropDefs<AvatarAddButtonProps>()([
  {
    name: "size",
    type: '"md" | "lg" | "xl"',
    defaultValue: '"md"',
    description: "Diameter: 40 / 48 / 64px, matching Avatar's own md/lg/xl.",
  },
  {
    name: "aria-label",
    type: "string",
    defaultValue: '"Add"',
    description: "Accessible name — the \"+\" glyph itself is decorative.",
  },
]);

const labelGroupProps = definePropDefs<AvatarLabelGroupProps>()([
  {
    name: "avatar",
    type: "ReactNode",
    description: "An `<Avatar />` element — its `size` is overridden to match.",
  },
  {
    name: "name",
    type: "ReactNode",
    description: "Primary line — `text-ui-sm` / `fg-primary`.",
  },
  {
    name: "secondaryText",
    type: "ReactNode",
    description: "Optional supporting line (email, role) — `text-ui-xs` / `fg-secondary`.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
    defaultValue: '"md"',
    description: "Passed through to the avatar.",
  },
]);

export function AvatarPropsTable() {
  return (
    <>
      <h3 className="text-[1.25em] font-semibold">Avatar</h3>
      <PropsTable rows={[...avatarProps]} />
      <h3 className="text-[1.25em] font-semibold">AvatarGroup</h3>
      <PropsTable rows={[...groupProps]} />
      <h3 className="text-[1.25em] font-semibold">AvatarAddButton</h3>
      <PropsTable rows={[...addButtonProps]} />
      <h3 className="text-[1.25em] font-semibold">AvatarLabelGroup</h3>
      <PropsTable rows={[...labelGroupProps]} />
    </>
  );
}
