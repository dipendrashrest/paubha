"use client";

import { Checkbox } from "@paubha/registry/ui/checkbox";
import { ComponentPlayground } from "../_shared/component-playground";

export function CheckboxHero() {
  return (
    <ComponentPlayground
      code={`<Checkbox label="Accept terms and conditions" />`}
    >
      <Checkbox label="Accept terms and conditions" />
    </ComponentPlayground>
  );
}

export function CheckboxStates() {
  return (
    <ComponentPlayground
      code={`<Checkbox label="Unchecked" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Indeterminate" defaultChecked="indeterminate" />
<Checkbox label="Disabled" disabled />`}
    >
      <div className="flex flex-col gap-3">
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" defaultChecked="indeterminate" />
        <Checkbox label="Disabled" disabled />
      </div>
    </ComponentPlayground>
  );
}

export function CheckboxSizes() {
  return (
    <ComponentPlayground
      code={`<Checkbox size="sm" label="Small" defaultChecked />
<Checkbox size="md" label="Medium" defaultChecked />
<Checkbox size="lg" label="Large" defaultChecked />`}
    >
      <div className="flex flex-col gap-3">
        <Checkbox size="sm" label="Small" defaultChecked />
        <Checkbox size="md" label="Medium" defaultChecked />
        <Checkbox size="lg" label="Large" defaultChecked />
      </div>
    </ComponentPlayground>
  );
}
