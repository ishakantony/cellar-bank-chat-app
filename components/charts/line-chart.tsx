"use client";

import { BaseChart } from "./base-chart";

export function LineChart({ data }: { data: any[] }) {
  const names = data.map((d) => d.name || d.month || d.date || "");
  const values = data.map((d) => d.value || d.price || 0);

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
        type: "line",
        data: values,
        smooth: true,
        itemStyle: { color: "#3b82f6" },
        areaStyle: { opacity: 0 },
      },
    ],
    grid: { left: "10%", right: "5%", top: "10%", bottom: "15%" },
  };

  return <BaseChart option={option} />;
}
