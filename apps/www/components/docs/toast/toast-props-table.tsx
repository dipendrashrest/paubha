import { definePropDefs } from "@/lib/prop-defs";
import type { ToastOptions, ToastProps } from "@paubha/registry/ui/toast";
import { PropsTable } from "../_shared/props-table";

const toastProps = definePropDefs<ToastProps>()([
  {
    name: "title",
    type: "ReactNode",
    description: "The toast's primary message.",
  },
  {
    name: "description",
    type: "ReactNode",
    description: "Optional supporting text below the title.",
  },
  {
    name: "variant",
    type: '"info" | "success" | "warning" | "error"',
    defaultValue: '"info"',
    description:
      "Accent color and aria-live urgency (assertive for warning/error).",
  },
  {
    name: "onDismiss",
    type: "() => void",
    description:
      "Called when the close button is activated. Omit to hide the close button.",
  },
]);

const toastOptionsProps = definePropDefs<ToastOptions>()([
  {
    name: "duration",
    type: "number",
    defaultValue: "6000",
    description:
      "Milliseconds before auto-dismiss. Set to 0 to disable auto-dismiss.",
  },
]);

export function ToastPropsTable() {
  return (
    <>
      <h3 className="text-[1.25em] font-semibold">Toast</h3>
      <PropsTable rows={[...toastProps]} />
      <h3 className="text-[1.25em] font-semibold">
        useToast().toast(options): additional options
      </h3>
      <PropsTable rows={[...toastOptionsProps]} />
    </>
  );
}
