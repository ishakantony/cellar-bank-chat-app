import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PieChart } from "@/components/charts/pie-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { AreaChart } from "@/components/charts/area-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { HeatmapChart } from "@/components/charts/heatmap-chart";
import { TreemapChart } from "@/components/charts/treemap-chart";
import { WaterfallChart } from "@/components/charts/waterfall-chart";
import { RadarChart } from "@/components/charts/radar-chart";

const sampleData = [
  { name: "A", value: 10 },
  { name: "B", value: 20 },
  { name: "C", value: 30 },
];

const sampleTimeSeries = [
  { month: "2025-04", value: 100 },
  { month: "2025-05", value: 120 },
  { month: "2025-06", value: 110 },
];

describe("Chart components", () => {
  it("PieChart renders without crashing", () => {
    render(<PieChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("BarChart renders without crashing", () => {
    render(<BarChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("LineChart renders without crashing", () => {
    render(<LineChart data={sampleTimeSeries} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("AreaChart renders without crashing", () => {
    render(<AreaChart data={sampleTimeSeries} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("DonutChart renders without crashing", () => {
    render(<DonutChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("HeatmapChart renders without crashing", () => {
    render(<HeatmapChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("TreemapChart renders without crashing", () => {
    render(<TreemapChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("WaterfallChart renders without crashing", () => {
    render(<WaterfallChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("RadarChart renders without crashing", () => {
    render(<RadarChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });
});
