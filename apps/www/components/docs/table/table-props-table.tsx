import { definePropDefs } from "@/lib/prop-defs";
import type { TableProps } from "@paubha/registry/ui/table";
import { PropsTable } from "../_shared/props-table";

const tableProps = definePropDefs<TableProps>()([
  {
    name: "variant",
    type: '"default" | "striped" | "bordered"',
    defaultValue: '"default"',
    description:
      "default: row dividers only · striped: fills odd body rows · bordered: strong outer, row, and column dividers. Every variant sits in a rounded, bordered container.",
  },
]);

export function TablePropsTable() {
  return <PropsTable rows={[...tableProps]} />;
}
