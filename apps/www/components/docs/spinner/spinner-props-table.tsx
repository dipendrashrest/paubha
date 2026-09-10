import { definePropDefs } from "@/lib/prop-defs";
import type { SpinnerProps } from "@paubha/registry/ui/spinner";
import { PropsTable } from "../_shared/props-table";

const spinnerProps = definePropDefs<SpinnerProps>()([
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Diameter — 16 / 24 / 32px.",
  },
]);

export function SpinnerPropsTable() {
  return <PropsTable rows={[...spinnerProps]} />;
}
