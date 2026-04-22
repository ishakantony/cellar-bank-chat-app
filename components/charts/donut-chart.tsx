"use client";

import { BaseChart } from "./base-chart";

export function DonutChart({ data }: { data: any[] }) {
  const option = {
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
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
