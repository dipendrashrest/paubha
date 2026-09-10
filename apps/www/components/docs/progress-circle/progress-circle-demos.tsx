"use client";

import { ProgressCircle } from "@paubha/registry/ui/progress-circle";
import { ComponentPlayground } from "../_shared/component-playground";

export function ProgressCircleHero() {
  return (
    <ComponentPlayground code={'<ProgressCircle value={75} aria-label="Upload progress" />'}>
      <ProgressCircle value={75} aria-label="Upload progress" />
    </ComponentPlayground>
  );
}

export function ProgressCircleSizes() {
  return (
    <ComponentPlayground
      code={`<ProgressCircle size="sm" value={75} aria-label="Progress" />
<ProgressCircle size="md" value={75} aria-label="Progress" />
<ProgressCircle size="lg" value={75} aria-label="Progress" />`}
    >
      <div className="flex items-center gap-4">
        <ProgressCircle size="sm" value={75} aria-label="Progress" />
        <ProgressCircle size="md" value={75} aria-label="Progress" />
        <ProgressCircle size="lg" value={75} aria-label="Progress" />
      </div>
    </ComponentPlayground>
  );
}

export function ProgressCircleNoPercentage() {
  return (
    <ComponentPlayground
      code={'<ProgressCircle value={60} showPercentage={false} aria-label="Loading" />'}
    >
      <ProgressCircle value={60} showPercentage={false} aria-label="Loading" />
    </ComponentPlayground>
  );
}
