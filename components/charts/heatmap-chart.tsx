"use client";

import { BaseChart } from "./base-chart";

export function HeatmapChart({ data }: { data: any[] }) {
  const xValues = [...new Set(data.map((d) => d.x || d.category || ""))];
  const yValues = [...new Set(data.map((d) => d.y || d.series || ""))];
  const values = data.map((d) => d.value || d.amount || 0);
  const minVal = values.length > 0 ? Math.min(...values) : 0;
  const maxVal = values.length > 0 ? Math.max(...values) : 100;

  const option = {
    xAxis: {
      type: "category",
      data: xValues,
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
    },
    yAxis: {
      type: "category",
      data: yValues,
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
    },
    visualMap: {
      min: minVal,
      max: maxVal,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "0%",
      inRange: { color: ["#1e3a5f", "#3b82f6", "#f59e0b", "#ef4444"] },
      textStyle: { color: "#a3a3a3" },
    },
    series: [
      {
        type: "heatmap",
        data: data.map((d) => [d.x || d.category, d.y || d.series, d.value || d.amount]),
        label: { show: true, color: "#ffffff" },
      },
    ],
    grid: { left: "15%", right: "10%", top: "10%", bottom: "20%" },
  };

  return <BaseChart option={option} />;
}
