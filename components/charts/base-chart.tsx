"use client";

import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface BaseChartProps {
  option: EChartsOption;
}

function asObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

export function BaseChart({ option }: BaseChartProps) {
  const themedOption: EChartsOption = {
    backgroundColor: "transparent",
    textStyle: {
      color: "rgba(255,255,255,0.78)",
    },
    title: {
      textStyle: { color: "#ffffff" },
      ...asObject(option.title),
    },
    legend: {
      textStyle: { color: "rgba(255,255,255,0.52)" },
      ...asObject(option.legend),
    },
    tooltip: {
      backgroundColor: "#152035",
      borderColor: "rgba(255,255,255,0.12)",
      textStyle: { color: "rgba(255,255,255,0.86)" },
      ...asObject(option.tooltip),
    },
    ...option,
  };

  return (
    <div data-testid="echarts-container" className="w-full" style={{ height: 280 }}>
      <ReactECharts
        option={themedOption}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
}
