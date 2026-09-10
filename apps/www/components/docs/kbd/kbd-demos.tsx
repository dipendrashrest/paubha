"use client";

import { Kbd, KbdGroup } from "@paubha/registry/ui/kbd";
import { ComponentPlayground } from "../_shared/component-playground";

export function KbdHero() {
  return (
    <ComponentPlayground
      code={`<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`}
    >
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </ComponentPlayground>
  );
}

export function KbdSingleKey() {
  return (
    <ComponentPlayground code={"<Kbd>Esc</Kbd>"}>
      <Kbd>Esc</Kbd>
    </ComponentPlayground>
  );
}

export function KbdThreeKeys() {
  return (
    <ComponentPlayground
      code={`<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`}
    >
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </ComponentPlayground>
  );
}

export function KbdInMenuItem() {
  return (
    <ComponentPlayground
      code={`<div className="flex items-center justify-between gap-8">
  <span>Search</span>
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
</div>`}
    >
      <div className="flex w-48 items-center justify-between gap-8 rounded-sm border border-border-default bg-bg-primary px-3 py-2 text-ui-sm text-fg-primary">
        <span>Search</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
    </ComponentPlayground>
  );
}
