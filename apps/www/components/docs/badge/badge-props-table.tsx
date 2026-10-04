import { definePropDefs } from "@/lib/prop-defs";
import type { BadgeProps } from "@paubha/registry/ui/badge";
import { PropsTable } from "../_shared/props-table";

const badgeProps = definePropDefs<BadgeProps>()([
  {
    name: "variant",
    type: '"gray" | "brand" | "success" | "warning" | "error"',
    defaultValue: '"gray"',
    description: "Color treatment.",
  },
  {
    name: "fill",
    type: '"subtle" | "outline" | "solid"',
    defaultValue: '"subtle"',
    description:
      "Fill style: tinted background, bordered/transparent, or solid on-color.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"sm"',
    description: "Height (20/28/32px), padding, font, and icon size.",
  },
  {
    name: "iconOnly",
    type: "boolean",
    defaultValue: "false",
    description:
      'Icon-only type: pass the icon as children plus an aria-label; renders role="img".',
  },
  {
    name: "leadingIcon",
    type: "React.ReactNode",
    description: "Leading icon slot, sized 16px (sm) or 20px (md, lg).",
  },
  {
    name: "leadingAvatar",
    type: "React.ReactNode",
    description: "Leading avatar slot, sized 12px (sm) or 14px (md, lg).",
  },
  {
    name: "trailingIcon",
    type: "React.ReactNode",
    description: "Trailing icon slot, sized 16px (sm) or 20px (md, lg).",
  },
  {
    name: "showDot",
    type: "boolean",
    defaultValue: "false",
    description: "Shows a small decorative status dot before the label.",
  },
  {
    name: "dismissible",
    type: "boolean",
    defaultValue: "false",
    description: "Shows a dismiss button after the label.",
  },
  {
    name: "dismissLabel",
    type: "string",
    defaultValue: '"Remove"',
    description:
      'Accessible name for the dismiss button; be specific, e.g. "Remove Design category".',
  },
  {
    name: "onDismiss",
    type: "() => void",
    description: "Called when the dismiss button is activated.",
  },
]);

export function BadgePropsTable() {
  return <PropsTable rows={[...badgeProps]} />;
}
