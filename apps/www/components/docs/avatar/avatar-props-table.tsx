import { definePropDefs } from "@/lib/prop-defs";
import type {
  AvatarAddButtonProps,
  AvatarGroupProps,
  AvatarLabelGroupProps,
  AvatarProfilePhotoProps,
  AvatarProps,
} from "@paubha/registry/ui/avatar";
import { PropsTable } from "../_shared/props-table";

const avatarProps = definePropDefs<AvatarProps>()([
  {
    name: "src",
    type: "string",
    description:
      "Image URL. Falls back to initials, then the user icon, if missing or it fails to load.",
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
    name: "type",
    type: '"image" | "initials" | "icon"',
    description:
      "What to render. Defaults to `image` when `src` is set, else `initials` when letters can be derived, else `icon` (Lucide `User`).",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
    defaultValue: '"md"',
    description: "Diameter: 24 / 32 / 40 / 48 / 64 / 80px.",
  },
  {
    name: "indicator",
    type: '"none" | "online" | "offline" | "company" | "verified"',
    defaultValue: '"none"',
    description:
      "Bottom-right marker. Online = `bg-success-solid` dot, offline = `fg-disabled` dot, company/verified = Lucide `Building2`/`BadgeCheck` in `fg-brand`. Appended to the accessible name.",
  },
]);

const profilePhotoProps = definePropDefs<AvatarProfilePhotoProps>()([
  { name: "src", type: "string", description: "Same as Avatar." },
  { name: "alt", type: "string", description: "Same as Avatar." },
  { name: "initials", type: "string", description: "Same as Avatar." },
  {
    name: "type",
    type: '"image" | "initials" | "icon"',
    description: "Same as Avatar.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description:
      "Diameter: 72 / 96 / 160px, with a 4px `bg-primary` ring and `shadow-md`.",
  },
  {
    name: "verified",
    type: "boolean",
    defaultValue: "false",
    description:
      'Shows a `BadgeCheck` badge and appends ", verified" to the accessible name.',
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
    description: 'Accessible name; the "+" glyph itself is decorative.',
  },
]);

const labelGroupProps = definePropDefs<AvatarLabelGroupProps>()([
  {
    name: "avatar",
    type: "ReactNode",
    description: "An `<Avatar />` element; its `size` is overridden to match.",
  },
  {
    name: "name",
    type: "ReactNode",
    description: "Primary line, `fg-primary`; type scales with `size`.",
  },
  {
    name: "secondaryText",
    type: "ReactNode",
    description: "Optional supporting line (email, role), `fg-secondary`.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    defaultValue: '"md"',
    description: "Avatar 32 / 40 / 48 / 64px; name 13 / 14 / 16 / 18px.",
  },
]);

export function AvatarPropsTable() {
  return (
    <>
      <h3 className="text-[1.25em] font-semibold">Avatar</h3>
      <PropsTable rows={[...avatarProps]} />
      <h3 className="text-[1.25em] font-semibold">AvatarProfilePhoto</h3>
      <PropsTable rows={[...profilePhotoProps]} />
      <h3 className="text-[1.25em] font-semibold">AvatarGroup</h3>
      <PropsTable rows={[...groupProps]} />
      <h3 className="text-[1.25em] font-semibold">AvatarAddButton</h3>
      <PropsTable rows={[...addButtonProps]} />
      <h3 className="text-[1.25em] font-semibold">AvatarLabelGroup</h3>
      <PropsTable rows={[...labelGroupProps]} />
    </>
  );
}
