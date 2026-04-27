"use client";

import { BaseChart } from "./base-chart";
import type { ChartDataPoint } from "@/lib/types/chat";

export function AreaChart({ data }: { data: ChartDataPoint[] }) {
  const names = data.map((d) => String(d.name ?? d.month ?? d.date ?? ""));
  const values = data.map((d) => Number(d.value ?? d.price ?? 0));

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
        type: "line" as const,
        data: values,
        smooth: true,
        itemStyle: { color: "#8b5cf6" },
        areaStyle: {
          color: {
            type: "linear" as const,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(139, 92, 246, 0.4)" },
              { offset: 1, color: "rgba(139, 92, 246, 0.05)" },
            ],
          },
        },
      },
    ],
    grid: { left: "10%", right: "5%", top: "10%", bottom: "15%" },
  };

  return <BaseChart option={option} />;
}
