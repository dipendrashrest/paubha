import { definePropDefs } from "@/lib/prop-defs";
import type { TableProps } from "@paubha/registry/ui/table";
import { PropsTable } from "../_shared/props-table";

const tableProps = definePropDefs<TableProps>()([
  {
    name: "variant",
    type: '"default" | "striped" | "bordered"',
    defaultValue: '"default"',
    description: "Row alternation and outer border/rounded treatment.",
  },
]);

export function TablePropsTable() {
  return <PropsTable rows={[...tableProps]} />;
}
