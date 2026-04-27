"use client";

import { BaseChart } from "./base-chart";
import type { ChartDataPoint } from "@/lib/types/chat";

export function BarChart({ data }: { data: ChartDataPoint[] }) {
  const names = data.map((d) => String(d.name ?? d.label ?? d.category ?? ""));
  const values = data.map((d) => Number(d.value ?? d.amount ?? 0));

  const option = {
    xAxis: {
      type: "category" as const,
      data: names,
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
    },
    yAxis: {
      type: "value" as const,
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
      splitLine: { lineStyle: { color: "#404040" } },
    },
    series: [
      {
        type: "bar" as const,
        data: values,
        itemStyle: { color: "#10b981" },
      },
    ],
    grid: { left: "10%", right: "5%", top: "10%", bottom: "15%" },
  };

  return <BaseChart option={option} />;
}
