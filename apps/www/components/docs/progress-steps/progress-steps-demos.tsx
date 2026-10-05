"use client";

import {
  ProgressStep,
  ProgressSteps,
} from "@paubha/registry/ui/progress-steps";
import { ComponentPlayground } from "../_shared/component-playground";

const card = "w-full rounded-md border border-border-default bg-bg-primary p-6";

export function ProgressStepsHero() {
  return (
    <ComponentPlayground
      code={`<ProgressSteps variant="horizontal">
  <ProgressStep status="complete" label="Account" />
  <ProgressStep status="current" label="Profile" />
  <ProgressStep status="upcoming" label="Settings" />
  <ProgressStep status="upcoming" label="Review" />
</ProgressSteps>`}
    >
      <div className={`${card} max-w-xl`}>
        <ProgressSteps variant="horizontal">
          <ProgressStep status="complete" label="Account" />
          <ProgressStep status="current" label="Profile" />
          <ProgressStep status="upcoming" label="Settings" />
          <ProgressStep status="upcoming" label="Review" />
        </ProgressSteps>
      </div>
    </ComponentPlayground>
  );
}

export function ProgressStepsVertical() {
  return (
    <ComponentPlayground
      code={`<ProgressSteps variant="vertical">
  <ProgressStep
    status="complete"
    label="Create account"
    description="Account created successfully with verified email address."
  />
  <ProgressStep
    status="current"
    label="Add details"
    description="Enter your personal information and set up profile preferences."
  />
  <ProgressStep
    status="upcoming"
    label="Configure"
    description="Adjust privacy and notification settings."
  />
  <ProgressStep
    status="upcoming"
    label="Launch"
    description="Finalize setup and deploy your workspace."
  />
</ProgressSteps>`}
    >
      <div className={`${card} max-w-lg`}>
        <ProgressSteps variant="vertical">
          <ProgressStep
            status="complete"
            label="Create account"
            description="Account created successfully with verified email address."
          />
          <ProgressStep
            status="current"
            label="Add details"
            description="Enter your personal information and set up profile preferences."
          />
          <ProgressStep
            status="upcoming"
            label="Configure"
            description="Adjust privacy and notification settings."
          />
          <ProgressStep
            status="upcoming"
            label="Launch"
            description="Finalize setup and deploy your workspace."
          />
        </ProgressSteps>
      </div>
    </ComponentPlayground>
  );
}

export function ProgressStepsNumbered() {
  return (
    <ComponentPlayground
      code={`<ProgressSteps variant="numbered">
  <ProgressStep status="complete" label="Shipping" />
  <ProgressStep status="current" label="Payment" />
  <ProgressStep status="upcoming" label="Confirmation" />
</ProgressSteps>`}
    >
      <div className={`${card} max-w-xl`}>
        <ProgressSteps variant="numbered">
          <ProgressStep status="complete" label="Shipping" />
          <ProgressStep status="current" label="Payment" />
          <ProgressStep status="upcoming" label="Confirmation" />
        </ProgressSteps>
      </div>
    </ComponentPlayground>
  );
}

export function ProgressStepsDescription() {
  return (
    <ComponentPlayground
      code={`<ProgressSteps variant="description">
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
</ProgressSteps>`}
    >
      <div className={`${card} max-w-xl`}>
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
