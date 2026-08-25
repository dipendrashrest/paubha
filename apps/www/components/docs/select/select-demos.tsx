"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@asteria-ui/registry/ui/select";
import { ComponentPlayground } from "../_shared/component-playground";

const sizes = ["sm", "md", "lg", "xl"] as const;

function Frameworks() {
  return (
    <SelectContent>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
      <SelectItem value="solid" disabled>
        Solid (coming soon)
      </SelectItem>
    </SelectContent>
  );
}

export function SelectHero() {
  return (
    <ComponentPlayground
      code={`<Select>
  <SelectTrigger aria-label="Framework" className="max-w-xs">
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="react">React</SelectItem>
    <SelectItem value="vue">Vue</SelectItem>
    <SelectItem value="svelte">Svelte</SelectItem>
  </SelectContent>
</Select>`}
    >
      <Select>
        <SelectTrigger aria-label="Framework" className="max-w-xs">
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <Frameworks />
      </Select>
    </ComponentPlayground>
  );
}

export function SelectSizes() {
  return (
    <ComponentPlayground
      code={sizes
        .map(
          (s) =>
            `<Select><SelectTrigger size="${s}" aria-label="Size ${s}"><SelectValue placeholder="Size ${s}" /></SelectTrigger>...</Select>`,
        )
        .join("\n")}
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        {sizes.map((size) => (
          <Select key={size}>
            <SelectTrigger size={size} aria-label={`Size ${size}`}>
              <SelectValue placeholder={`Size ${size}`} />
            </SelectTrigger>
            <Frameworks />
          </Select>
        ))}
      </div>
    </ComponentPlayground>
  );
}

export function SelectStates() {
  return (
    <ComponentPlayground
      code={`<Select><SelectTrigger aria-label="Default"><SelectValue placeholder="Default" /></SelectTrigger>...</Select>
<Select><SelectTrigger aria-label="Disabled" disabled><SelectValue placeholder="Disabled" /></SelectTrigger>...</Select>
<Select><SelectTrigger aria-label="Invalid" error><SelectValue placeholder="Invalid" /></SelectTrigger>...</Select>`}
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Select>
          <SelectTrigger aria-label="Default">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <Frameworks />
        </Select>
        <Select>
          <SelectTrigger aria-label="Disabled" disabled>
            <SelectValue placeholder="Disabled" />
          </SelectTrigger>
          <Frameworks />
        </Select>
        <Select>
          <SelectTrigger aria-label="Invalid" error>
            <SelectValue placeholder="Invalid" />
          </SelectTrigger>
          <Frameworks />
        </Select>
      </div>
    </ComponentPlayground>
  );
}
