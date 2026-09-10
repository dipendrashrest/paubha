import { definePropDefs } from "@/lib/prop-defs";
import type { CardProps } from "@paubha/registry/ui/card";
import { PropsTable } from "../_shared/props-table";

const cardProps = definePropDefs<CardProps>()([
  {
    name: "variant",
    type: '"default" | "outlined" | "elevated"',
    defaultValue: '"default"',
    description: "Visual style of the container.",
  },
  {
    name: "onClick",
    type: "(event: MouseEvent) => void",
    description: "Makes the card interactive — role=\"button\", focusable, Enter/Space activates.",
  },
]);

export function CardPropsTable() {
  return <PropsTable rows={[...cardProps]} />;
}
