import { definePropDefs } from "@/lib/prop-defs";
import type { SkeletonProps } from "@paubha/registry/ui/skeleton";
import { PropsTable } from "../_shared/props-table";

const skeletonProps = definePropDefs<SkeletonProps>()([
  {
    name: "variant",
    type: '"text" | "circle" | "rectangle"',
    defaultValue: '"text"',
    description:
      "Shape and default size: text is one 16px line (h-4 w-full, radius-sm), circle is 48px (size-12, fully round), rectangle is 120px tall (h-30 w-full, radius-md). Override the size via className.",
  },
]);

export function SkeletonPropsTable() {
  return <PropsTable rows={[...skeletonProps]} />;
}
