import { definePropDefs } from "@/lib/prop-defs";
import type {
  TooltipContentProps,
  TooltipProviderProps,
} from "@paubha/registry/ui/tooltip";
import { PropsTable } from "../_shared/props-table";

const tooltipProviderProps = definePropDefs<TooltipProviderProps>()([
  {
    name: "delayDuration",
    type: "number",
    defaultValue: "400",
    description:
      "Show delay in milliseconds, set to Figma's 400ms (Radix's own default is 700).",
  },
]);

const tooltipContentProps = definePropDefs<TooltipContentProps>()([
  {
    name: "side",
    type: '"top" | "right" | "bottom" | "left"',
    defaultValue: '"top"',
    description: "Which side of the trigger to render on (Radix Popper prop).",
  },
  {
    name: "sideOffset",
    type: "number",
    defaultValue: "6",
    description: "Distance from the trigger, in pixels.",
  },
  {
    name: "align",
    type: '"start" | "center" | "end"',
    defaultValue: '"center"',
    description: "Alignment along the given side (Radix Popper prop).",
  },
]);

export function TooltipPropsTable() {
  return (
    <>
      <p className="text-ui-sm text-fg-secondary">
        <code>Tooltip</code> and <code>TooltipTrigger</code> are direct
        re-exports of Radix's own primitives. <code>TooltipProvider</code> wraps
        Radix's provider with a 400ms default delay. See{" "}
        <a href="https://www.radix-ui.com/primitives/docs/components/tooltip">
          Radix's Tooltip docs
        </a>{" "}
        for their full prop surface (delayDuration, disableHoverableContent,
        etc).
      </p>
      <h3 className="text-[1.25em] font-semibold">TooltipProvider</h3>
      <PropsTable rows={[...tooltipProviderProps]} />
      <h3 className="text-[1.25em] font-semibold">TooltipContent</h3>
      <PropsTable rows={[...tooltipContentProps]} />
    </>
  );
}
