"use client";

import { BaseChart } from "./base-chart";

export function BarChart({ data }: { data: any[] }) {
  const names = data.map((d) => d.name || d.label || d.category || "");
  const values = data.map((d) => d.value || d.amount || 0);

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
        data: values,
        itemStyle: { color: "#10b981" },
      },
    ],
    grid: { left: "10%", right: "5%", top: "10%", bottom: "15%" },
  };

  return <BaseChart option={option} />;
}
