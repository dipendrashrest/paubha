"use client";

import { SearchField } from "@paubha/registry/ui/search-field";
import { ComponentPlayground } from "../_shared/component-playground";

export function SearchFieldHero() {
  return (
    <ComponentPlayground
      code={`<SearchField placeholder="Find a component" />`}
    >
      <div className="w-full max-w-sm">
        <SearchField placeholder="Find a component" />
      </div>
    </ComponentPlayground>
  );
}
