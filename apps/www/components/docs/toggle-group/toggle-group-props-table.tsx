import { definePropDefs } from "@/lib/prop-defs";
import type { ToggleGroupItemProps, ToggleGroupProps } from "@asteria-ui/registry/ui/toggle-group";
import { PropsTable } from "../_shared/props-table";

const toggleGroupProps = definePropDefs<ToggleGroupProps>()([
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Item size, propagated to every ToggleGroupItem via context.",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "Uncontrolled initial selected value.",
  },
  {
    name: "value",
    type: "string",
    description: "Controlled selected value — pair with onValueChange.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the selected item changes.",
  },
]);

const toggleGroupItemProps = definePropDefs<ToggleGroupItemProps>()([
  {
    name: "value",
    type: "string",
    description: "Unique identifier for this item.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    description: "Overrides the size inherited from the parent ToggleGroup.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Prevents selecting this item.",
  },
]);

export function ToggleGroupPropsTable() {
  return <PropsTable rows={[...toggleGroupProps]} />;
}

export function ToggleGroupItemPropsTable() {
  return <PropsTable rows={[...toggleGroupItemProps]} />;
}
