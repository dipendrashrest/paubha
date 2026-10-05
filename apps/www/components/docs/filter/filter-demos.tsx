"use client";

import { Checkbox } from "@paubha/registry/ui/checkbox";
import {
  ActiveFilters,
  FilterBar,
  FilterChip,
  FilterChips,
  FilterPanel,
  FilterPanelFooter,
  FilterPanelGroup,
  FilterPanelTitle,
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
      <div className="w-full max-w-xl">
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
      <div className="w-full max-w-xl">
        <ActiveFilters onClear={() => {}}>
          <FilterChip label="Status: Open" selected onRemove={() => {}} />
          <FilterChip label="Assignee: Sarah" selected onRemove={() => {}} />
        </ActiveFilters>
      </div>
    </ComponentPlayground>
  );
}

export function FilterPanelDemo() {
  return (
    <ComponentPlayground
      code={`<FilterPanel aria-label="Filters">
  <FilterPanelTitle>Filters</FilterPanelTitle>
  <FilterPanelGroup label="Status">
    <Checkbox label="Open" />
    <Checkbox label="Closed" />
  </FilterPanelGroup>
  <FilterPanelFooter onClear={() => {}} onApply={() => {}} />
</FilterPanel>`}
    >
      <div className="w-full max-w-md">
        <FilterPanel aria-label="Filters">
          <FilterPanelTitle>Filters</FilterPanelTitle>
          <FilterPanelGroup label="Status">
            <Checkbox label="Open" />
            <Checkbox label="Closed" />
          </FilterPanelGroup>
          <FilterPanelFooter onClear={() => {}} onApply={() => {}} />
        </FilterPanel>
      </div>
    </ComponentPlayground>
  );
}
