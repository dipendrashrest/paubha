import { definePropDefs } from "@/lib/prop-defs";
import type { InputProps } from "@paubha/registry/ui/input";
import { PropsTable } from "../_shared/props-table";

const inputProps = definePropDefs<InputProps>()([
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl" | "2xl"',
    defaultValue: '"md"',
    description: "Density: 32 / 40 / 48 / 56 / 64px wrapper height.",
  },
  {
    name: "leadingText",
    type: "ReactNode",
    description:
      'Fixed, non-editable prefix before the value (e.g. "https://").',
  },
  {
    name: "leadingAddon",
    type: "ReactNode",
    description:
      "Separate control before the value, such as a currency selector. Label it.",
  },
  {
    name: "trailingAddon",
    type: "ReactNode",
    description: "Separate control after the value. Label it.",
  },
  {
    name: "error",
    type: "boolean",
    description:
      "Marks the input invalid, setting aria-invalid and the error border color.",
  },
  {
    name: "leadingIcon",
    type: "ReactNode",
    description:
      "Instance-swap icon slot before the text, auto-sized to match `size`.",
  },
  {
    name: "trailingIcon",
    type: "ReactNode",
    description:
      "Instance-swap icon slot after the text, auto-sized to match `size`.",
  },
  {
    name: "wrapperRef",
    type: "Ref<HTMLDivElement>",
    description:
      "Ref to the bordered wrapper, if you need it separately from the input itself.",
  },
]);

export function InputPropsTable() {
  return <PropsTable rows={[...inputProps]} />;
}
