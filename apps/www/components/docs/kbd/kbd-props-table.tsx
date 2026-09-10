import { definePropDefs } from "@/lib/prop-defs";
import type { KbdGroupProps, KbdProps } from "@paubha/registry/ui/kbd";
import { PropsTable } from "../_shared/props-table";

const kbdProps = definePropDefs<KbdProps>()([
  {
    name: "children",
    type: "ReactNode",
    description: "The key label, e.g. a letter, symbol, or word like \"Esc\".",
  },
]);

const kbdGroupProps = definePropDefs<KbdGroupProps>()([
  {
    name: "children",
    type: "ReactNode",
    description: "One or more Kbd elements. A decorative \"+\" is inserted between each.",
  },
]);

export function KbdPropsTable() {
  return <PropsTable rows={[...kbdProps]} />;
}

export function KbdGroupPropsTable() {
  return <PropsTable rows={[...kbdGroupProps]} />;
}
