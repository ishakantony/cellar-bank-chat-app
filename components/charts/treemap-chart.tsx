"use client";

import { BaseChart } from "./base-chart";

export function TreemapChart({ data }: { data: any[] }) {
  const option = {
    series: [
      {
        type: "treemap",
        data: data.map((d) => ({
          name: d.name || d.label,
          value: d.value || d.amount || 0,
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
