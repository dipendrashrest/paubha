import { definePropDefs } from "@/lib/prop-defs";
import type { SkeletonProps } from "@paubha/registry/ui/skeleton";
import { PropsTable } from "../_shared/props-table";

const skeletonProps = definePropDefs<SkeletonProps>()([
  {
    name: "variant",
    type: '"text" | "circle" | "rectangle"',
    defaultValue: '"text"',
    description:
      "Text gets a real default size (h-4 w-full, one line of text); circle and rectangle have no default size, so size them via className.",
  },
]);

export function SkeletonPropsTable() {
  return <PropsTable rows={[...skeletonProps]} />;
}
