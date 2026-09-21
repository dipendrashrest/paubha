"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@paubha/registry/ui/accordion";
import { ComponentPlayground } from "../_shared/component-playground";

export function AccordionHero() {
  return (
    <ComponentPlayground
      code={`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is Paubha free to use?</AccordionTrigger>
    <AccordionContent>
      Yes — every component is free and MIT-licensed, copy-paste into your own project.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
    >
      <div className="w-full max-w-sm">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is Paubha free to use?</AccordionTrigger>
            <AccordionContent>
              Yes — every component is free and MIT-licensed. Copy the source
              into your own project and own it, no runtime dependency.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ComponentPlayground>
  );
}

export function AccordionMultiple() {
  return (
    <ComponentPlayground
      code={`<Accordion type="multiple" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>First section</AccordionTrigger>
    <AccordionContent>First content.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second section</AccordionTrigger>
    <AccordionContent>Second content.</AccordionContent>
  </AccordionItem>
</Accordion>`}
    >
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Accordion type="multiple" defaultValue={["item-1"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>First section</AccordionTrigger>
            <AccordionContent>
              Multiple sections can be open at the same time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="multiple" defaultValue={["item-2"]}>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second section</AccordionTrigger>
            <AccordionContent>
              Each is an independent Accordion here for the demo layout.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ComponentPlayground>
  );
}

export function AccordionDisabled() {
  return (
    <ComponentPlayground
      code={`<AccordionItem value="item-1" disabled>
  <AccordionTrigger>Disabled section</AccordionTrigger>
  <AccordionContent>Not reachable while disabled.</AccordionContent>
</AccordionItem>`}
    >
      <div className="w-full max-w-sm">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Disabled section</AccordionTrigger>
            <AccordionContent>Not reachable while disabled.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ComponentPlayground>
  );
}
