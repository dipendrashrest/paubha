"use client";

import { DatePicker } from "@paubha/registry/ui/date-picker";
import { ComponentPlayground } from "../_shared/component-playground";

export function DatePickerHero() {
  return (
    <ComponentPlayground
      code={`<DatePicker placeholder="Pick a date" />`}
    >
      <DatePicker placeholder="Pick a date" />
    </ComponentPlayground>
  );
}
