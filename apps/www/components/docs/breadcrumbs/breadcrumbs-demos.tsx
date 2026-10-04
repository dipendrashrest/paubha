"use client";

import {
  BreadcrumbDropdown,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  Breadcrumbs,
} from "@paubha/registry/ui/breadcrumbs";
import { DropdownMenuItem } from "@paubha/registry/ui/dropdown-menu";
import { Home } from "lucide-react";
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

export function BreadcrumbsSlash() {
  return (
    <ComponentPlayground
      code={`<Breadcrumbs separator="slash">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
  <BreadcrumbItem current>Project Atlas</BreadcrumbItem>
</Breadcrumbs>`}
    >
      <Breadcrumbs separator="slash">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
        <BreadcrumbItem current>Project Atlas</BreadcrumbItem>
      </Breadcrumbs>
    </ComponentPlayground>
  );
}

export function BreadcrumbsCollapsed() {
  return (
    <ComponentPlayground
      code={`<Breadcrumbs>
  <BreadcrumbItem href="/" icon={<Home />}>Home</BreadcrumbItem>
  <BreadcrumbEllipsis onClick={expand} />
  <BreadcrumbItem href="/settings">Settings</BreadcrumbItem>
  <BreadcrumbItem current>General</BreadcrumbItem>
</Breadcrumbs>`}
    >
      <Breadcrumbs>
        <BreadcrumbItem href="/" icon={<Home />}>
          Home
        </BreadcrumbItem>
        <BreadcrumbEllipsis />
        <BreadcrumbItem href="/settings">Settings</BreadcrumbItem>
        <BreadcrumbItem current>General</BreadcrumbItem>
      </Breadcrumbs>
    </ComponentPlayground>
  );
}

export function BreadcrumbsDropdownDemo() {
  return (
    <ComponentPlayground
      code={`<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
  <BreadcrumbDropdown
    menu={
      <>
        <DropdownMenuItem>Project Atlas</DropdownMenuItem>
        <DropdownMenuItem>Project Borealis</DropdownMenuItem>
      </>
    }
  >
    Project Atlas
  </BreadcrumbDropdown>
</Breadcrumbs>`}
    >
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
        <BreadcrumbDropdown
          menu={
            <>
              <DropdownMenuItem>Project Atlas</DropdownMenuItem>
              <DropdownMenuItem>Project Borealis</DropdownMenuItem>
            </>
          }
        >
          Project Atlas
        </BreadcrumbDropdown>
      </Breadcrumbs>
    </ComponentPlayground>
  );
}
