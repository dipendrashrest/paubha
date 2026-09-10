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
    description: "Fill style — tinted background, bordered/transparent, or solid on-color.",
  },
  {
    name: "size",
    type: '"sm" | "md"',
    defaultValue: '"sm"',
    description: "Padding and font size.",
  },
  {
    name: "iconOnly",
    type: "boolean",
    defaultValue: "false",
    description: "Renders as a compact square icon-only badge instead of a text label.",
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
    description: 'Shows a dismiss button with aria-label="Remove" after the label.',
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
