"use client";

import { SettingsRow } from "@paubha/registry/ui/settings-row";
import { Switch } from "@paubha/registry/ui/switch";
import { ComponentPlayground } from "../_shared/component-playground";

export function SettingsRowHero() {
  return (
    <ComponentPlayground
      code={`<>
  <SettingsRow
    title="Email notifications"
    description="Product updates only."
    control={<Switch defaultChecked aria-label="Email notifications" />}
  />
  <SettingsRow
    title="Marketing emails"
    description="One note a month. No spam."
    control={<Switch aria-label="Marketing emails" />}
  />
</>`}
    >
      <div className="w-full max-w-lg">
        <SettingsRow
          title="Email notifications"
          description="Product updates only."
          control={<Switch defaultChecked aria-label="Email notifications" />}
        />
        <SettingsRow
          title="Marketing emails"
          description="One note a month. No spam."
          control={<Switch aria-label="Marketing emails" />}
        />
      </div>
    </ComponentPlayground>
  );
}
