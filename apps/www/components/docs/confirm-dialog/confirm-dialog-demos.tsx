"use client";

import { Button } from "@paubha/registry/ui/button";
import { ConfirmDialog } from "@paubha/registry/ui/confirm-dialog";
import { ComponentPlayground } from "../_shared/component-playground";

export function ConfirmDialogHero() {
  return (
    <ComponentPlayground
      code={`<ConfirmDialog
  trigger={<Button variant="destructive" size="sm">Delete</Button>}
  title="Delete project?"
  description="This cannot be undone."
  intent="error"
  confirmLabel="Delete"
/>`}
    >
      <ConfirmDialog
        trigger={
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        }
        title="Delete project?"
        description="This cannot be undone."
        intent="error"
        confirmLabel="Delete"
      />
    </ComponentPlayground>
  );
}
