import { definePropDefs } from "@/lib/prop-defs";
import type {
  BreadcrumbDropdownProps,
  BreadcrumbItemProps,
  BreadcrumbsProps,
} from "@paubha/registry/ui/breadcrumbs";
import { PropsTable } from "../_shared/props-table";

const breadcrumbItemProps = definePropDefs<BreadcrumbItemProps>()([
  {
    name: "current",
    type: "boolean",
    defaultValue: "false",
    description:
      'Marks this as the current page: renders as non-interactive text with aria-current="page" instead of a link.',
  },
  {
    name: "icon",
    type: "ReactNode",
    description: "Leading icon (Lucide) rendered before the label.",
  },
  {
    name: "href",
    type: "string",
    description:
      "Link target (native anchor prop). Ignored when current is set.",
  },
]);

const breadcrumbsProps = definePropDefs<BreadcrumbsProps>()([
  {
    name: "separator",
    type: '"chevron" | "slash"',
    defaultValue: '"chevron"',
    description: "Separator auto-inserted between children.",
  },
]);

const breadcrumbDropdownProps = definePropDefs<BreadcrumbDropdownProps>()([
  {
    name: "menu",
    type: "ReactNode",
    description:
      "DropdownMenuItem elements shown when the current-page trigger is opened.",
  },
  {
    name: "icon",
    type: "ReactNode",
    description: "Leading icon (Lucide) rendered before the label.",
  },
]);

export function BreadcrumbsPropsTable() {
  return (
    <>
      <h3 className="text-[1.25em] font-semibold">Breadcrumbs</h3>
      <PropsTable rows={[...breadcrumbsProps]} />
      <h3 className="text-[1.25em] font-semibold">BreadcrumbItem</h3>
      <PropsTable rows={[...breadcrumbItemProps]} />
      <h3 className="text-[1.25em] font-semibold">BreadcrumbDropdown</h3>
      <PropsTable rows={[...breadcrumbDropdownProps]} />
      <p className="text-ui-sm text-fg-secondary">
        <code>BreadcrumbEllipsis</code> forwards native <code>button</code>{" "}
        props; its accessible name defaults to "Show more breadcrumbs".
      </p>
    </>
  );
}
