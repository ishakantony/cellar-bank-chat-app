"use client";

import { BaseChart } from "./base-chart";

export function PieChart({ data }: { data: any[] }) {
  const option = {
    series: [
      {
        type: "pie",
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
