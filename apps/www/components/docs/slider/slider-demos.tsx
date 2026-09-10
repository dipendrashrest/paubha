"use client";

import { Slider } from "@paubha/registry/ui/slider";
import { ComponentPlayground } from "../_shared/component-playground";

export function SliderHero() {
  return (
    <ComponentPlayground code={'<Slider aria-label="Volume" defaultValue={[40]} />'}>
      <div className="w-full max-w-sm">
        <Slider aria-label="Volume" defaultValue={[40]} />
      </div>
    </ComponentPlayground>
  );
}

export function SliderSizes() {
  return (
    <ComponentPlayground
      code={`<Slider size="sm" defaultValue={[40]} aria-label="Small" />
<Slider size="md" defaultValue={[40]} aria-label="Medium" />
<Slider size="lg" defaultValue={[40]} aria-label="Large" />`}
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Slider size="sm" defaultValue={[40]} aria-label="Small" />
        <Slider size="md" defaultValue={[40]} aria-label="Medium" />
        <Slider size="lg" defaultValue={[40]} aria-label="Large" />
      </div>
    </ComponentPlayground>
  );
}

export function SliderStates() {
  return (
    <ComponentPlayground
      code={`<Slider defaultValue={[60]} aria-label="Default" />
<Slider defaultValue={[60]} error aria-label="Error" />
<Slider defaultValue={[60]} disabled aria-label="Disabled" />`}
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Slider defaultValue={[60]} aria-label="Default" />
        <Slider defaultValue={[60]} error aria-label="Error" />
        <Slider defaultValue={[60]} disabled aria-label="Disabled" />
      </div>
    </ComponentPlayground>
  );
}
