"use client";

import {
  ActiveFilters,
  FilterBar,
  FilterChip,
  FilterChips,
} from "@paubha/registry/ui/filter";
import { ComponentPlayground } from "../_shared/component-playground";

export function FilterHero() {
  return (
    <ComponentPlayground
      code={`<FilterBar>
  <FilterChips>
    <FilterChip label="Status" selected />
    <FilterChip label="Priority" />
    <FilterChip label="Assignee" />
  </FilterChips>
</FilterBar>`}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-md border border-border-default bg-bg-primary">
        <FilterBar>
          <FilterChips>
            <FilterChip label="Status" selected />
            <FilterChip label="Priority" />
            <FilterChip label="Assignee" />
          </FilterChips>
        </FilterBar>
      </div>
    </ComponentPlayground>
  );
}

export function FilterActive() {
  return (
    <ComponentPlayground
      code={`<ActiveFilters onClear={() => {}}>
  <FilterChip label="Status: Open" selected onRemove={() => {}} />
  <FilterChip label="Assignee: Sarah" selected onRemove={() => {}} />
</ActiveFilters>`}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-md border border-border-default bg-bg-primary">
        <ActiveFilters onClear={() => {}}>
          <FilterChip label="Status: Open" selected onRemove={() => {}} />
          <FilterChip label="Assignee: Sarah" selected onRemove={() => {}} />
        </ActiveFilters>
      </div>
    </ComponentPlayground>
  );
}
