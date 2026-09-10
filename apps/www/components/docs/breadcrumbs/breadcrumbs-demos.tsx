"use client";

import { BreadcrumbItem, Breadcrumbs } from "@paubha/registry/ui/breadcrumbs";
import { ComponentPlayground } from "../_shared/component-playground";

export function BreadcrumbsHero() {
  return (
    <ComponentPlayground
      code={`<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem current>Installation</BreadcrumbItem>
</Breadcrumbs>`}
    >
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
        <BreadcrumbItem current>Installation</BreadcrumbItem>
      </Breadcrumbs>
    </ComponentPlayground>
  );
}
