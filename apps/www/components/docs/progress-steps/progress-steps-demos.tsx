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
