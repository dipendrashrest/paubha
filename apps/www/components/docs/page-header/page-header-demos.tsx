"use client";

import { Button } from "@paubha/registry/ui/button";
import { PageHeader } from "@paubha/registry/ui/page-header";
import { ComponentPlayground } from "../_shared/component-playground";

export function PageHeaderHero() {
  return (
    <ComponentPlayground
      code={`<PageHeader
  title="Settings"
  description="Manage your account preferences."
  actions={<Button variant="secondary" size="sm">Save</Button>}
/>`}
    >
      <div className="w-full max-w-xl">
        <PageHeader
          title="Settings"
          description="Manage your account preferences."
          actions={
            <Button variant="secondary" size="sm">
              Save
            </Button>
          }
        />
      </div>
    </ComponentPlayground>
  );
}

export function PageHeaderWithBreadcrumb() {
  return (
    <ComponentPlayground
      code={`<PageHeader
  breadcrumb={
    <p className="text-ui-sm text-fg-tertiary">
      Home / Settings / Profile
    </p>
  }
  title="Profile"
  description="Update your public profile information."
  actions={<Button variant="secondary" size="sm">Edit</Button>}
/>`}
    >
      <div className="w-full max-w-xl">
        <PageHeader
          breadcrumb={
            <p className="text-ui-sm text-fg-tertiary">
              Home / Settings / Profile
            </p>
          }
          title="Profile"
          description="Update your public profile information."
          actions={
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          }
        />
      </div>
    </ComponentPlayground>
  );
}
