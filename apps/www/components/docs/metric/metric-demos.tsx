"use client";

import { Metric, MetricGroup } from "@paubha/registry/ui/metric";
import { Eye, Users, Zap } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

export function MetricHero() {
  return (
    <ComponentPlayground
      code={`<Metric
  label="Views"
  value="2,000"
  trend="up"
  delta="40%"
  description="vs last month"
/>`}
    >
      <div className="w-full max-w-xs">
        <Metric
          label="Views"
          value="2,000"
          trend="up"
          delta="40%"
          description="vs last month"
        />
      </div>
    </ComponentPlayground>
  );
}

export function MetricSparkline() {
  return (
    <ComponentPlayground
      code={`<Metric
  label="Active users"
  value="1,240"
  sparkline={[2, 4, 3, 6, 5, 8, 7, 9]}
/>`}
    >
      <div className="w-full max-w-xs">
        <Metric
          label="Active users"
          value="1,240"
          sparkline={[2, 4, 3, 6, 5, 8, 7, 9]}
        />
      </div>
    </ComponentPlayground>
  );
}

export function MetricGroupDemo() {
  return (
    <ComponentPlayground
      code={`<MetricGroup>
  <Metric compact icon={<Eye />} label="Views" value="12.4k" />
  <Metric compact icon={<Users />} label="Users" value="3,281" />
  <Metric compact icon={<Zap />} label="Sessions" value="8.1k" />
</MetricGroup>`}
    >
      <div className="w-full max-w-lg">
        <MetricGroup>
          <Metric compact icon={<Eye />} label="Views" value="12.4k" />
          <Metric compact icon={<Users />} label="Users" value="3,281" />
          <Metric compact icon={<Zap />} label="Sessions" value="8.1k" />
        </MetricGroup>
      </div>
    </ComponentPlayground>
  );
}
