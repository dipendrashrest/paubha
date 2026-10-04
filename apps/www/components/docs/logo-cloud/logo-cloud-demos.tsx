"use client";

import { LogoCloud, LogoCloudItem } from "@paubha/registry/ui/logo-cloud";
import { ComponentPlayground } from "../_shared/component-playground";

export function LogoCloudHero() {
  return (
    <ComponentPlayground
      code={`<LogoCloud label="Trusted by teams shipping design systems">
  <LogoCloudItem name="Northwind" />
  <LogoCloudItem name="Helix" />
  <LogoCloudItem name="Orbit" />
</LogoCloud>`}
    >
      <LogoCloud
        className="w-full max-w-2xl"
        label="Trusted by teams shipping design systems"
      >
        <LogoCloudItem name="Northwind" />
        <LogoCloudItem name="Helix" />
        <LogoCloudItem name="Orbit" />
        <LogoCloudItem name="Parcel" />
      </LogoCloud>
    </ComponentPlayground>
  );
}
