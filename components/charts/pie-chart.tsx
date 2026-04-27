"use client";

import { BaseChart } from "./base-chart";
import type { ChartDataPoint } from "@/lib/types/chat";

export function PieChart({ data }: { data: ChartDataPoint[] }) {
  const option = {
    series: [
      {
        type: "pie" as const,
        radius: "60%",
        data,
        label: { color: "#e5e5e5" },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <BaseChart option={option} />;
}
