import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChartRenderer } from "@/components/charts/chart-renderer";

describe("ChartRenderer", () => {
  it("renders structured pie chart", () => {
    render(
      <ChartRenderer
        data={{
          mode: "structured",
          chartType: "pie",
          title: "Allocation",
          data: [{ name: "A", value: 10 }],
        }}
      />
    );
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  });

  it("renders fallback for unknown chart type", () => {
    render(
      <ChartRenderer
        data={{
          mode: "structured",
          chartType: "unknown",
          title: "Test",
          data: [],
        }}
      />
    );
    expect(screen.getByText(/data format isn't supported/i)).toBeInTheDocument();
  });

  it("renders custom chart", () => {
    render(
      <ChartRenderer
        data={{
          mode: "custom",
          title: "Custom",
          echartsOption: { series: [{ type: "bar", data: [1, 2, 3] }] },
        }}
      />
    );
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });
});
