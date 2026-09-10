import { definePropDefs } from "@/lib/prop-defs";
import type { SliderProps } from "@paubha/registry/ui/slider";
import { PropsTable } from "../_shared/props-table";

const sliderProps = definePropDefs<SliderProps>()([
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Track/thumb size.",
  },
  {
    name: "error",
    type: "boolean",
    defaultValue: "false",
    description: "Shows the track fill and thumb in the error color.",
  },
  {
    name: "defaultValue",
    type: "number[]",
    description: "Uncontrolled initial value — a single-element array for one thumb.",
  },
  {
    name: "value",
    type: "number[]",
    description: "Controlled value — pair with onValueChange.",
  },
  {
    name: "min",
    type: "number",
    defaultValue: "0",
    description: "Minimum value.",
  },
  {
    name: "max",
    type: "number",
    defaultValue: "100",
    description: "Maximum value.",
  },
  {
    name: "step",
    type: "number",
    defaultValue: "1",
    description: "Increment per keyboard/drag step.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Prevents interaction.",
  },
]);

export function SliderPropsTable() {
  return <PropsTable rows={[...sliderProps]} />;
}
