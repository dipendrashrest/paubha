"use client";

import { Button } from "@paubha/registry/ui/button";
import { EmptyState } from "@paubha/registry/ui/empty-state";
import { FolderOpen } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

export function EmptyStateHero() {
  return (
    <ComponentPlayground
      code={`<EmptyState
  icon={<FolderOpen />}
  title="No projects yet"
  description="Create your first project to get started."
  actions={<Button>Create project</Button>}
/>`}
    >
      <div className="w-full max-w-md rounded-md border border-border-default bg-bg-primary">
        <EmptyState
          icon={<FolderOpen />}
          title="No projects yet"
          description="Create your first project to get started."
          actions={<Button>Create project</Button>}
        />
      </div>
    </ComponentPlayground>
  );
}
