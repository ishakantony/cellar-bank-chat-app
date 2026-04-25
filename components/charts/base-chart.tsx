"use client";

import ReactECharts from "echarts-for-react";

interface BaseChartProps {
  option: any;
}

export function BaseChart({ option }: BaseChartProps) {
  const themedOption = {
    backgroundColor: "transparent",
    textStyle: {
      color: "rgba(255,255,255,0.78)",
    },
    title: {
      textStyle: { color: "#ffffff" },
      ...option.title,
    },
    legend: {
      textStyle: { color: "rgba(255,255,255,0.52)" },
      ...option.legend,
    },
    tooltip: {
      backgroundColor: "#152035",
      borderColor: "rgba(255,255,255,0.12)",
      textStyle: { color: "rgba(255,255,255,0.86)" },
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
