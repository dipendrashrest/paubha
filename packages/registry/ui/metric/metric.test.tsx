import { render, screen } from "@testing-library/react";
import { Activity, DollarSign, Users } from "lucide-react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Badge } from "../badge/badge";
import { Metric, MetricGroup } from "./metric";

describe("Metric", () => {
  it("renders label and value", () => {
    render(<Metric label="Total Revenue" value="$48,250" />);
    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("$48,250")).toBeInTheDocument();
  });

  it("renders delta badge and description", () => {
    render(
      <Metric
        label="Total Revenue"
        value="$48,250"
        delta={
          <Badge variant="success" fill="subtle" size="sm">
            +12.5%
          </Badge>
        }
        description="vs last month"
      />,
    );
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });

  it("renders an upward trend row", () => {
    const { container } = render(
      <Metric
        label="Active Users"
        value="2,847"
        trend="up"
        delta="+8.2%"
        description="from last week"
      />,
    );
    expect(screen.getByText("+8.2%")).toBeInTheDocument();
    expect(screen.getByText("from last week")).toBeInTheDocument();
    expect(container.querySelector("svg.lucide-arrow-up-right")).toBeTruthy();
  });

  it("renders a downward trend row", () => {
    const { container } = render(
      <Metric
        label="Churn"
        value="1.4%"
        trend="down"
        delta="-2.1%"
        description="from last month"
      />,
    );
    expect(screen.getByText("-2.1%")).toBeInTheDocument();
    expect(
      container.querySelector("svg.lucide-arrow-down-right"),
    ).toBeTruthy();
  });

  it("renders a sparkline from series data", () => {
    const { container } = render(
      <Metric
        label="Conversion Rate"
        value="3.24%"
        delta={
          <Badge variant="success" fill="subtle" size="sm">
            +0.4%
          </Badge>
        }
        sparkline={[2, 4, 3, 6, 5, 8, 7]}
      />,
    );
    expect(container.querySelector("polyline")).toBeTruthy();
  });

  it("forwards a ref to the root", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Metric ref={ref} label="Ref" value="1" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations for a stat card", async () => {
    const { container } = render(
      <Metric
        label="Total Revenue"
        value="$48,250"
        delta={
          <Badge variant="success" fill="subtle" size="sm">
            +12.5%
          </Badge>
        }
        description="vs last month"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with sparkline", async () => {
    const { container } = render(
      <Metric
        label="Conversion Rate"
        value="3.24%"
        sparkline={[1, 3, 2, 5, 4, 6]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("MetricGroup", () => {
  it("renders compact metrics with dividers", () => {
    const { container } = render(
      <MetricGroup>
        <Metric compact icon={<Users />} label="Users" value="12.4K" />
        <Metric compact icon={<DollarSign />} label="Revenue" value="$8.2K" />
        <Metric compact icon={<Activity />} label="Growth" value="24.8%" />
      </MetricGroup>,
    );
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("12.4K")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(container.querySelectorAll('[role="separator"]')).toHaveLength(2);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <MetricGroup>
        <Metric compact label="Users" value="12.4K" />
        <Metric compact label="Orders" value="1,847" />
      </MetricGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
