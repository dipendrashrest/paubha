import { definePropDefs } from "@/lib/prop-defs";
import type { CheckboxProps } from "@paubha/registry/ui/checkbox";
import { PropsTable } from "../_shared/props-table";

const checkboxProps = definePropDefs<CheckboxProps>()([
  {
    name: "label",
    type: "ReactNode",
    description: "Clickable label, linked to the control via for/id.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Box size (16/20/24px) with matching label type and gap.",
  },
  {
    name: "checked",
    type: 'boolean | "indeterminate"',
    description: "Controlled checked state.",
  },
  {
    name: "defaultChecked",
    type: 'boolean | "indeterminate"',
    description: "Uncontrolled initial checked state.",
  },
  {
    name: "onCheckedChange",
    type: '(checked: boolean | "indeterminate") => void',
    description: "Called when the checkbox is toggled.",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Prevents toggling.",
  },
]);

export function CheckboxPropsTable() {
  return <PropsTable rows={[...checkboxProps]} />;
}
