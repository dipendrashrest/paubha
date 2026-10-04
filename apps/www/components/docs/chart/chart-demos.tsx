"use client";

import {
  BarChart,
  ChartCard,
  DonutChart,
  LineChart,
} from "@paubha/registry/ui/chart";
import { ComponentPlayground } from "../_shared/component-playground";

const barData = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 68 },
  { label: "Wed", value: 55 },
  { label: "Thu", value: 80 },
  { label: "Fri", value: 63 },
];

const lineData = [
  { label: "Jan", value: 32, previous: 28 },
  { label: "Feb", value: 45, previous: 36 },
  { label: "Mar", value: 38, previous: 42 },
  { label: "Apr", value: 58, previous: 48 },
  { label: "May", value: 72, previous: 55 },
];

const donutData = [
  { label: "Product", value: 48, color: "brand" as const },
  { label: "Services", value: 28, color: "success" as const },
  { label: "Other", value: 24, color: "gray" as const },
];

export function ChartHero() {
  return (
    <ComponentPlayground
      code={`<ChartCard title="Weekly revenue">
  <BarChart
    data={[
      { label: "Mon", value: 42 },
      { label: "Tue", value: 68 },
      { label: "Wed", value: 55 },
      { label: "Thu", value: 80 },
      { label: "Fri", value: 63 },
    ]}
    aria-label="Weekly revenue by day"
  />
</ChartCard>`}
    >
      <div className="w-full max-w-md">
        <ChartCard title="Weekly revenue">
          <BarChart data={barData} aria-label="Weekly revenue by day" />
        </ChartCard>
      </div>
    </ComponentPlayground>
  );
}

export function ChartLine() {
  return (
    <ComponentPlayground
      code={`<ChartCard title="Active users">
  <LineChart
    data={[
      { label: "Jan", value: 32, previous: 28 },
      { label: "Feb", value: 45, previous: 36 },
      { label: "Mar", value: 38, previous: 42 },
      { label: "Apr", value: 58, previous: 48 },
      { label: "May", value: 72, previous: 55 },
    ]}
    showPrevious
    aria-label="Active users over time"
  />
</ChartCard>`}
    >
      <div className="w-full max-w-md">
        <ChartCard title="Active users">
          <LineChart
            data={lineData}
            showPrevious
            aria-label="Active users over time"
          />
        </ChartCard>
      </div>
    </ComponentPlayground>
  );
}

export function ChartDonut() {
  return (
    <ComponentPlayground
      code={`<ChartCard title="Revenue mix">
  <DonutChart
    data={[
      { label: "Product", value: 48, color: "brand" },
      { label: "Services", value: 28, color: "success" },
      { label: "Other", value: 24, color: "gray" },
    ]}
    centerValue="100%"
    centerLabel="Total"
    aria-label="Revenue mix by category"
  />
</ChartCard>`}
    >
      <div className="w-full max-w-md">
        <ChartCard title="Revenue mix">
          <DonutChart
            data={donutData}
            centerValue="100%"
            centerLabel="Total"
            aria-label="Revenue mix by category"
          />
        </ChartCard>
      </div>
    </ComponentPlayground>
  );
}
