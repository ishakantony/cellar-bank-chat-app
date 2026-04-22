"use client";

import ReactECharts from "echarts-for-react";

interface BaseChartProps {
  option: any;
}

export function BaseChart({ option }: BaseChartProps) {
  const themedOption = {
    backgroundColor: "transparent",
    textStyle: {
      color: "#e5e5e5",
    },
    title: {
      textStyle: { color: "#ffffff" },
      ...option.title,
    },
    legend: {
      textStyle: { color: "#a3a3a3" },
      ...option.legend,
    },
    tooltip: {
      backgroundColor: "#262626",
      borderColor: "#404040",
      textStyle: { color: "#e5e5e5" },
      ...option.tooltip,
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
