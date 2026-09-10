"use client";

import { Button } from "@paubha/registry/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@paubha/registry/ui/popover";
import { ComponentPlayground } from "../_shared/component-playground";

export function PopoverHero() {
  return (
    <ComponentPlayground
      code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Popover Title</PopoverTitle>
    <PopoverDescription>
      This is a popover content area. It can contain any text or elements.
    </PopoverDescription>
  </PopoverContent>
</Popover>`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            This is a popover content area. It can contain any text or
            elements.
          </PopoverDescription>
        </PopoverContent>
      </Popover>
    </ComponentPlayground>
  );
}

const sides = ["top", "bottom", "left", "right"] as const;

export function PopoverSides() {
  return (
    <ComponentPlayground
      code={sides
        .map(
          (side) =>
            `<Popover><PopoverTrigger asChild><Button variant="secondary">${side}</Button></PopoverTrigger><PopoverContent side="${side}">...</PopoverContent></Popover>`,
        )
        .join("\n")}
    >
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="capitalize">
              {side}
            </Button>
          </PopoverTrigger>
          <PopoverContent side={side}>
            <PopoverTitle>Popover Title</PopoverTitle>
            <PopoverDescription>Positioned on the {side}.</PopoverDescription>
          </PopoverContent>
        </Popover>
      ))}
    </ComponentPlayground>
  );
}

export function PopoverWithClose() {
  return (
    <ComponentPlayground
      code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Popover Title</PopoverTitle>
    <PopoverDescription>Dismiss it with the button below.</PopoverDescription>
    <PopoverClose asChild>
      <Button size="sm" className="mt-3">Got it</Button>
    </PopoverClose>
  </PopoverContent>
</Popover>`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            Dismiss it with the button below.
          </PopoverDescription>
          <PopoverClose asChild>
            <Button size="sm" className="mt-3">
              Got it
            </Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </ComponentPlayground>
  );
}
