import { definePropDefs } from "@/lib/prop-defs";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionTriggerProps,
} from "@paubha/registry/ui/accordion";
import { PropsTable } from "../_shared/props-table";

const accordionProps = definePropDefs<{
  type: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}>()([
  {
    name: "type",
    type: '"single" | "multiple"',
    description: "Whether one section or several can be open at a time.",
  },
  {
    name: "collapsible",
    type: "boolean",
    defaultValue: "false",
    description: "When type=\"single\", allows closing the open section by clicking it again.",
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    description: "Uncontrolled initial open item(s) — string for single, string[] for multiple.",
  },
  {
    name: "value",
    type: "string | string[]",
    description: "Controlled open item(s) — pair with onValueChange.",
  },
  {
    name: "onValueChange",
    type: "(value: string | string[]) => void",
    description: "Called when the open item(s) change.",
  },
]);

const accordionItemProps = definePropDefs<AccordionItemProps>()([
  {
    name: "value",
    type: "string",
    description: "Unique identifier for this item.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Prevents the item from being opened or closed.",
  },
]);

const accordionTriggerProps = definePropDefs<AccordionTriggerProps>()([
  {
    name: "children",
    type: "ReactNode",
    description: "The header label.",
  },
]);

const accordionContentProps = definePropDefs<AccordionContentProps>()([
  {
    name: "children",
    type: "ReactNode",
    description: "The revealed content.",
  },
]);

export function AccordionPropsTable() {
  return <PropsTable rows={[...accordionProps]} />;
}

export function AccordionItemPropsTable() {
  return <PropsTable rows={[...accordionItemProps]} />;
}

export function AccordionTriggerPropsTable() {
  return <PropsTable rows={[...accordionTriggerProps]} />;
}

export function AccordionContentPropsTable() {
  return <PropsTable rows={[...accordionContentProps]} />;
}
