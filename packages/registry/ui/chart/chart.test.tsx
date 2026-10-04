import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { AreaChart, BarChart, ChartCard, DonutChart, LineChart } from "./chart";

const barData = [
  { label: "Mon", value: 40 },
  { label: "Tue", value: 65 },
  { label: "Wed", value: 50 },
  { label: "Thu", value: 80 },
  { label: "Fri", value: 55 },
];

const lineData = [
  { label: "Jan", value: 30, previous: 20 },
  { label: "Feb", value: 45, previous: 35 },
  { label: "Mar", value: 40, previous: 50 },
  { label: "Apr", value: 70, previous: 55 },
];

const donutData = [
  { label: "Brand", value: 40, color: "brand" as const },
  { label: "Success", value: 25, color: "success" as const },
  { label: "Warning", value: 20, color: "warning" as const },
  { label: "Other", value: 15, color: "gray" as const },
];

describe("ChartCard", () => {
  it("renders title and children", () => {
    render(
      <ChartCard
        title="Revenue"
        actions={<button type="button">Export</button>}
      >
        <BarChart data={barData} aria-label="Weekly revenue" />
      </ChartCard>,
    );
    expect(
      screen.getByRole("heading", { name: "Revenue" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Weekly revenue" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ChartCard title="Revenue">
        <BarChart data={barData} aria-label="Weekly revenue" />
      </ChartCard>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("BarChart", () => {
  it("renders with role img and aria-label", () => {
    render(<BarChart data={barData} aria-label="Weekly activity" />);
    expect(
      screen.getByRole("img", { name: "Weekly activity" }),
    ).toBeInTheDocument();
  });

  it("forwards a ref to the root", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<BarChart ref={ref} data={barData} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <BarChart data={barData} aria-label="Weekly activity" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("LineChart", () => {
  it("renders current and previous series", () => {
    render(
      <LineChart data={lineData} showPrevious aria-label="Monthly trend" />,
    );
    expect(
      screen.getByRole("img", { name: "Monthly trend" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <LineChart data={lineData} showPrevious aria-label="Monthly trend" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("DonutChart", () => {
  it("renders center value and legend labels", () => {
    render(
      <DonutChart
        data={donutData}
        centerValue="100"
        centerLabel="Total"
        aria-label="Share by segment"
      />,
    );
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <DonutChart
        data={donutData}
        centerValue="100"
        centerLabel="Total"
        aria-label="Share by segment"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("AreaChart", () => {
  it("renders with series and reference line", () => {
    render(
      <AreaChart
        series={[
          { label: "Current", values: [20, 40, 35, 60, 55], tone: "brand" },
          { label: "Baseline", values: [15, 25, 30, 40, 38], tone: "gray" },
        ]}
        labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
        referenceLine={50}
        aria-label="Traffic vs baseline"
      />,
    );
    expect(
      screen.getByRole("img", { name: "Traffic vs baseline" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <AreaChart
        series={[
          { label: "Current", values: [20, 40, 35, 60, 55], tone: "brand" },
        ]}
        labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
        aria-label="Weekly traffic"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
