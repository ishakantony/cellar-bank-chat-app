"use client";

import { BaseChart } from "./base-chart";
import type { ChartDataPoint } from "@/lib/types/chat";

export function RadarChart({ data }: { data: ChartDataPoint[] }) {
  const values = data.map((d) => Number(d.value ?? d.amount ?? 0));
  const maxValue = Math.max(...values, 1) * 1.2;

  const indicators = data.map((d) => ({
    name: String(d.name ?? d.label ?? ""),
    max: maxValue,
  }));

  const option = {
    radar: {
      indicator: indicators,
      axisName: { color: "#a3a3a3" },
      splitArea: { areaStyle: { color: ["#262626", "#1a1a1a"] } },
      axisLine: { lineStyle: { color: "#525252" } },
      splitLine: { lineStyle: { color: "#404040" } },
    },
    series: [
      {
        type: "radar" as const,
        data: [
          {
            value: values,
            name: "Portfolio",
            areaStyle: { color: "rgba(59, 130, 246, 0.3)" },
            lineStyle: { color: "#3b82f6" },
            itemStyle: { color: "#3b82f6" },
          },
        ],
      },
    ],
  };

  return <BaseChart option={option} />;
}
