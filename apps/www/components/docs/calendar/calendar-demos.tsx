"use client";

import { Calendar } from "@paubha/registry/ui/calendar";
import { ComponentPlayground } from "../_shared/component-playground";

export function CalendarHero() {
  return (
    <ComponentPlayground
      code={`<Calendar mode="single" defaultValue={new Date()} />`}
    >
      <Calendar mode="single" defaultValue={new Date()} />
    </ComponentPlayground>
  );
}

export function CalendarRange() {
  return (
    <ComponentPlayground
      code={`<Calendar
  mode="range"
  defaultRangeValue={{
    from: new Date(2026, 8, 8),
    to: new Date(2026, 8, 14),
  }}
/>`}
    >
      <Calendar
        mode="range"
        defaultRangeValue={{
          from: new Date(2026, 8, 8),
          to: new Date(2026, 8, 14),
        }}
      />
    </ComponentPlayground>
  );
}
