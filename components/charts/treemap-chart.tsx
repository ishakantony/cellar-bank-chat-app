"use client";

import { BaseChart } from "./base-chart";
import type { ChartDataPoint } from "@/lib/types/chat";

export function TreemapChart({ data }: { data: ChartDataPoint[] }) {
  const option = {
    series: [
      {
        type: "treemap" as const,
        data: data.map((d) => ({
          name: String(d.name ?? d.label ?? ""),
          value: Number(d.value ?? d.amount ?? 0),
        })),
        label: { show: true, color: "#ffffff" },
        itemStyle: {
          borderColor: "#262626",
          borderWidth: 2,
        },
        breadcrumb: {
          itemStyle: { color: "#404040", borderColor: "#525252", textStyle: { color: "#e5e5e5" } },
        },
      },
    ],
  };

  return <BaseChart option={option} />;
}
