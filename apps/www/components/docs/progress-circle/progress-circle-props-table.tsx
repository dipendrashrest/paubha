import { definePropDefs } from "@/lib/prop-defs";
import type { ProgressCircleProps } from "@paubha/registry/ui/progress-circle";
import { PropsTable } from "../_shared/props-table";

const progressCircleProps = definePropDefs<ProgressCircleProps>()([
  {
    name: "value",
    type: "number",
    description: "Current progress value, from 0 to max.",
  },
  {
    name: "max",
    type: "number",
    defaultValue: "100",
    description: "Maximum value.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Circle diameter.",
  },
  {
    name: "showPercentage",
    type: "boolean",
    defaultValue: "true",
    description: "Shows the percentage as text in the center.",
  },
  {
    name: "aria-label",
    type: "string",
    description:
      "Required. Describes what is loading, since the value is conveyed via ARIA, not the visual arc.",
  },
]);

export function ProgressCirclePropsTable() {
  return <PropsTable rows={[...progressCircleProps]} />;
}
