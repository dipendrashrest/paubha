import { definePropDefs } from "@/lib/prop-defs";
import type { SelectTriggerProps } from "@paubha/registry/ui/select";
import { PropsTable } from "../_shared/props-table";

const selectTriggerProps = definePropDefs<SelectTriggerProps>()([
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    defaultValue: '"md"',
    description: "Density: 32 / 40 / 48 / 56px trigger height.",
  },
  {
    name: "error",
    type: "boolean",
    description:
      "Marks the trigger invalid, setting aria-invalid and the error border color.",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Disables the trigger, preventing opening the listbox.",
  },
]);

export function SelectPropsTable() {
  return (
    <>
      <h3 className="text-[1.25em] font-semibold">SelectTrigger</h3>
      <PropsTable rows={[...selectTriggerProps]} />
      <p className="text-body-sm text-fg-secondary">
        <code>Select</code>, <code>SelectValue</code>,{" "}
        <code>SelectContent</code>, <code>SelectItem</code>,{" "}
        <code>SelectGroup</code>, <code>SelectLabel</code>, and{" "}
        <code>SelectSeparator</code> pass their props straight through to the
        underlying Radix UI Select primitives.
      </p>
    </>
  );
}
