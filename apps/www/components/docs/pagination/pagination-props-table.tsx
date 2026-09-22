import { definePropDefs } from "@/lib/prop-defs";
import type {
  PaginationContentProps,
  PaginationLinkProps,
} from "@paubha/registry/ui/pagination";
import { PropsTable } from "../_shared/props-table";

const contentProps = definePropDefs<PaginationContentProps>()([
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Item diameter: 28 / 36 / 44px.",
  },
]);

const linkProps = definePropDefs<PaginationLinkProps>()([
  {
    name: "isActive",
    type: "boolean",
    description: 'Marks this as the current page, setting aria-current="page".',
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Item diameter: 28 / 36 / 44px.",
  },
]);

export function PaginationPropsTable() {
  return (
    <>
      <h3 className="text-[1.25em] font-semibold">PaginationContent</h3>
      <PropsTable rows={[...contentProps]} />
      <h3 className="text-[1.25em] font-semibold">PaginationLink</h3>
      <PropsTable rows={[...linkProps]} />
      <p className="text-body-sm text-fg-secondary">
        <code>Pagination</code>, <code>PaginationItem</code>,{" "}
        <code>PaginationPrevious</code>, <code>PaginationNext</code>, and{" "}
        <code>PaginationEllipsis</code> forward the rest of their props to a
        native <code>&lt;nav&gt;</code>/<code>&lt;li&gt;</code>/
        <code>&lt;button&gt;</code>/<code>&lt;span&gt;</code> respectively.
      </p>
    </>
  );
}
