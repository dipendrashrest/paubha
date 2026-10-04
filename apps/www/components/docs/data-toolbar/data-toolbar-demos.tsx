"use client";

import { Button } from "@paubha/registry/ui/button";
import { DataToolbar } from "@paubha/registry/ui/data-toolbar";
import { FilterChip } from "@paubha/registry/ui/filter";
import { SearchField } from "@paubha/registry/ui/search-field";
import { ComponentPlayground } from "../_shared/component-playground";

export function DataToolbarHero() {
  return (
    <ComponentPlayground
      code={`<DataToolbar
  search={<SearchField placeholder="Search projects" />}
  filters={<FilterChip label="Active" selected />}
  actions={<Button size="sm">New project</Button>}
/>`}
    >
      <div className="w-full">
        <DataToolbar
          search={<SearchField placeholder="Search projects" />}
          filters={<FilterChip label="Active" selected />}
          actions={<Button size="sm">New project</Button>}
        />
      </div>
    </ComponentPlayground>
  );
}
