import { definePropDefs } from "@/lib/prop-defs";
import type { PopoverContentProps } from "@asteria-ui/registry/ui/popover";
import { PropsTable } from "../_shared/props-table";

const contentProps = definePropDefs<PopoverContentProps>()([
  {
    name: "side",
    type: '"top" | "bottom" | "left" | "right"',
    defaultValue: '"bottom"',
    description: "Which side of the trigger to render on.",
  },
  {
    name: "sideOffset",
    type: "number",
    defaultValue: "8",
    description: "Distance in pixels from the trigger.",
  },
]);

export function PopoverPropsTable() {
  return (
    <>
      <h3 className="text-[1.25em] font-semibold">PopoverContent</h3>
      <PropsTable rows={[...contentProps]} />
      <p className="text-body-sm text-fg-secondary">
        <code>Popover</code>, <code>PopoverTrigger</code>,{" "}
        <code>PopoverAnchor</code>, and <code>PopoverClose</code> pass their
        props straight through to the underlying Radix UI Popover primitives.
      </p>
    </>
  );
}
