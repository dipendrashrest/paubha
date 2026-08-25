"use client";

import { ToggleGroup, ToggleGroupItem } from "@asteria-ui/registry/ui/toggle-group";
import { ComponentPlayground } from "../_shared/component-playground";

export function ToggleGroupHero() {
  return (
    <ComponentPlayground
      code={`<ToggleGroup defaultValue="day">
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="week">Week</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
</ToggleGroup>`}
    >
      <ToggleGroup defaultValue="day">
        <ToggleGroupItem value="day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
      </ToggleGroup>
    </ComponentPlayground>
  );
}

export function ToggleGroupSizes() {
  return (
    <ComponentPlayground
      code={`<ToggleGroup size="sm" defaultValue="day">...</ToggleGroup>
<ToggleGroup size="md" defaultValue="day">...</ToggleGroup>
<ToggleGroup size="lg" defaultValue="day">...</ToggleGroup>`}
    >
      <div className="flex flex-col items-start gap-4">
        {(["sm", "md", "lg"] as const).map((size) => (
          <ToggleGroup key={size} size={size} defaultValue="day">
            <ToggleGroupItem value="day">Day</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
          </ToggleGroup>
        ))}
      </div>
    </ComponentPlayground>
  );
}

export function ToggleGroupDisabled() {
  return (
    <ComponentPlayground
      code={`<ToggleGroup defaultValue="day">
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="week" disabled>Week</ToggleGroupItem>
</ToggleGroup>`}
    >
      <ToggleGroup defaultValue="day">
        <ToggleGroupItem value="day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week" disabled>
          Week
        </ToggleGroupItem>
      </ToggleGroup>
    </ComponentPlayground>
  );
}
