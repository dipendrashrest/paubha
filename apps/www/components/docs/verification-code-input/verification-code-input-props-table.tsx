import { definePropDefs } from "@/lib/prop-defs";
import type { VerificationCodeInputProps } from "@asteria-ui/registry/ui/verification-code-input";
import { PropsTable } from "../_shared/props-table";

const verificationCodeInputProps = definePropDefs<VerificationCodeInputProps>()([
  {
    name: "length",
    type: "number",
    defaultValue: "6",
    description: "Number of digit cells.",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "Uncontrolled initial code.",
  },
  {
    name: "value",
    type: "string",
    description: "Controlled code — pair with onValueChange.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called with the accumulated code on every change.",
  },
  {
    name: "error",
    type: "boolean",
    defaultValue: "false",
    description: "Shows every cell in the error color and marks them aria-invalid.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables every cell.",
  },
  {
    name: "aria-label",
    type: "string",
    description: "Required — describes the whole group, e.g. \"6-digit verification code\".",
  },
]);

export function VerificationCodeInputPropsTable() {
  return <PropsTable rows={[...verificationCodeInputProps]} />;
}
