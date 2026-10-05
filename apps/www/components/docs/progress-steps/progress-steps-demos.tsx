"use client";

import {
  ProgressStep,
  ProgressSteps,
} from "@paubha/registry/ui/progress-steps";
import { ComponentPlayground } from "../_shared/component-playground";

export function ProgressStepsHero() {
  return (
    <ComponentPlayground
      code={`<ProgressSteps>
  <ProgressStep status="complete" label="Account" />
  <ProgressStep status="current" label="Profile" />
  <ProgressStep status="upcoming" label="Done" />
</ProgressSteps>`}
    >
      <div className="w-full max-w-lg rounded-md border border-border-default bg-bg-primary p-4">
        <ProgressSteps>
          <ProgressStep status="complete" label="Account" />
          <ProgressStep status="current" label="Profile" />
          <ProgressStep status="upcoming" label="Done" />
        </ProgressSteps>
      </div>
    </ComponentPlayground>
  );
}

export function ProgressStepsVertical() {
  return (
    <ComponentPlayground
      code={`<ProgressSteps orientation="vertical">
  <ProgressStep
    status="complete"
    label="Account details"
    description="Name and email"
  />
  <ProgressStep
    status="current"
    label="Profile"
    description="Avatar and bio"
  />
  <ProgressStep
    status="upcoming"
    label="Review"
    description="Confirm and submit"
  />
</ProgressSteps>`}
    >
      <div className="w-full max-w-sm rounded-md border border-border-default bg-bg-primary p-4">
        <ProgressSteps orientation="vertical">
          <ProgressStep
            status="complete"
            label="Account details"
            description="Name and email"
          />
          <ProgressStep
            status="current"
            label="Profile"
            description="Avatar and bio"
          />
          <ProgressStep
            status="upcoming"
            label="Review"
            description="Confirm and submit"
          />
        </ProgressSteps>
      </div>
    </ComponentPlayground>
  );
}

export function ProgressStepsVariants() {
  return (
    <ComponentPlayground
      code={`<ProgressSteps variant="horizontal">…</ProgressSteps>
<ProgressSteps variant="description">…</ProgressSteps>`}
    >
      <div className="flex w-full max-w-lg flex-col gap-6 rounded-md border border-border-default bg-bg-primary p-4">
        <ProgressSteps variant="horizontal">
          <ProgressStep status="complete" label="Account" />
          <ProgressStep status="current" label="Profile" />
          <ProgressStep status="upcoming" label="Review" />
        </ProgressSteps>
        <ProgressSteps variant="description">
          <ProgressStep
            status="complete"
            label="Personal"
            description="Set up primary login"
          />
          <ProgressStep
            status="current"
            label="Preferences"
            description="Choose theme and time zone"
          />
          <ProgressStep
            status="upcoming"
            label="Submit"
            description="Review and launch"
          />
        </ProgressSteps>
      </div>
    </ComponentPlayground>
  );
}
