import { definePropDefs } from "@/lib/prop-defs";
import type {
  DialogActionProps,
  DialogContentProps,
} from "@paubha/registry/ui/dialog";
import { PropsTable } from "../_shared/props-table";

const dialogProps = definePropDefs<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}>()([
  {
    name: "open",
    type: "boolean",
    description: "Controlled open state, pair with onOpenChange.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    description: "Uncontrolled initial open state.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
]);

const dialogContentProps = definePropDefs<DialogContentProps>()([
  {
    name: "children",
    type: "ReactNode",
    description: "Typically DialogBody + DialogActions.",
  },
]);

const dialogActionProps = definePropDefs<DialogActionProps>()([
  {
    name: "variant",
    type: '"brand" | "error"',
    defaultValue: '"brand"',
    description:
      "Colors the action: brand for Confirm/Info, error for Destructive.",
  },
]);

export function DialogPropsTable() {
  return <PropsTable rows={[...dialogProps]} />;
}

export function DialogContentPropsTable() {
  return <PropsTable rows={[...dialogContentProps]} />;
}

export function DialogActionPropsTable() {
  return <PropsTable rows={[...dialogActionProps]} />;
}
