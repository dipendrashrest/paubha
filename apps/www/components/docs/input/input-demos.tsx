"use client";

import { Input } from "@paubha/registry/ui/input";
import { CreditCard, Mail, Search } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

const sizes = ["sm", "md", "lg", "xl", "2xl"] as const;

export function InputHero() {
  return (
    <ComponentPlayground code={`<Input placeholder="you@example.com" />`}>
      <Input placeholder="you@example.com" className="max-w-xs" />
    </ComponentPlayground>
  );
}

export function InputSizes() {
  return (
    <ComponentPlayground
      code={sizes
        .map((s) => `<Input size="${s}" placeholder="Size ${s}" />`)
        .join("\n")}
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        {sizes.map((size) => (
          <Input key={size} size={size} placeholder={`Size ${size}`} />
        ))}
      </div>
    </ComponentPlayground>
  );
}

export function InputWithIcons() {
  return (
    <ComponentPlayground
      code={`<Input leadingIcon={<Search />} placeholder="Search..." />
<Input trailingIcon={<Mail />} placeholder="you@example.com" />`}
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Input leadingIcon={<Search />} placeholder="Search..." />
        <Input trailingIcon={<Mail />} placeholder="you@example.com" />
      </div>
    </ComponentPlayground>
  );
}

export function InputAddons() {
  return (
    <ComponentPlayground
      code={`<Input leadingText="https://" placeholder="example.com" aria-label="Website" />
<Input
  leadingAddon={
    <select aria-label="Currency" className="bg-transparent text-body-sm text-fg-secondary outline-none">
      <option>USD</option>
      <option>EUR</option>
    </select>
  }
  placeholder="Enter amount"
  aria-label="Amount"
/>
<Input leadingIcon={<CreditCard />} placeholder="1234 1234 1234 1234" aria-label="Card number" />`}
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Input
          leadingText="https://"
          placeholder="example.com"
          aria-label="Website"
        />
        <Input
          leadingAddon={
            <select
              aria-label="Currency"
              className="bg-transparent text-body-sm text-fg-secondary outline-none"
            >
              <option>USD</option>
              <option>EUR</option>
            </select>
          }
          placeholder="Enter amount"
          aria-label="Amount"
        />
        <Input
          leadingIcon={<CreditCard />}
          placeholder="1234 1234 1234 1234"
          aria-label="Card number"
          inputMode="numeric"
        />
      </div>
    </ComponentPlayground>
  );
}

export function InputStates() {
  return (
    <ComponentPlayground
      code={`<Input placeholder="Default" />
<Input placeholder="Disabled" disabled />
<Input placeholder="Invalid" error />`}
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Input placeholder="Default" />
        <Input placeholder="Disabled" disabled />
        <Input placeholder="Invalid" error />
      </div>
    </ComponentPlayground>
  );
}
