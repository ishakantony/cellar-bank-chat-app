"use client";

import { BaseChart } from "./base-chart";

export function WaterfallChart({ data }: { data: any[] }) {
  const names = data.map((d) => d.name || d.label || "");
  const values = data.map((d) => d.value || d.amount || 0);

  const positive = values.map((v) => (v >= 0 ? v : 0));
  const negative = values.map((v) => (v < 0 ? v : 0));

  const option = {
    xAxis: {
      type: "category",
      data: names,
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
      splitLine: { lineStyle: { color: "#404040" } },
    },
    series: [
      {
        type: "bar",
        stack: "total",
        data: positive,
        itemStyle: { color: "#10b981" },
      },
      {
        type: "bar",
        stack: "total",
        data: negative,
        itemStyle: { color: "#ef4444" },
      },
    ],
    grid: { left: "10%", right: "5%", top: "10%", bottom: "15%" },
  };

  return <BaseChart option={option} />;
}
