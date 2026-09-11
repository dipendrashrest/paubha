import { definePropDefs } from "@/lib/prop-defs";
import type { FieldProps } from "@paubha/registry/ui/field";
import { PropsTable } from "../_shared/props-table";

const fieldProps = definePropDefs<FieldProps>()([
  {
    name: "label",
    type: "ReactNode",
    description: "Linked to the control via for/id.",
  },
  {
    name: "description",
    type: "ReactNode",
    description: "Helper text, wired into the control's aria-describedby.",
  },
  {
    name: "error",
    type: "ReactNode",
    description:
      "Error message. When present, sets aria-invalid on the control and adds its id to aria-describedby alongside the description.",
  },
  {
    name: "required",
    type: "boolean",
    description:
      "Appends a literal \" *\" to the label (aria-hidden) and sets the control's native required attribute.",
  },
  {
    name: "success",
    type: "ReactNode",
    description:
      "Success message shown in place of the description, in fg-success. Ignored while error is set.",
  },
  {
    name: "children",
    type: "ReactElement",
    description:
      "A single form control (Input, Textarea, ...) — receives id, aria-describedby, aria-invalid, error, and required automatically via cloneElement.",
  },
]);

export function FieldPropsTable() {
  return <PropsTable rows={[...fieldProps]} />;
}
