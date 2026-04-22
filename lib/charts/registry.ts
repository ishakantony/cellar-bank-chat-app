import { PieChart } from "@/components/charts/pie-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { AreaChart } from "@/components/charts/area-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { HeatmapChart } from "@/components/charts/heatmap-chart";
import { TreemapChart } from "@/components/charts/treemap-chart";
import { WaterfallChart } from "@/components/charts/waterfall-chart";
import { RadarChart } from "@/components/charts/radar-chart";

export const chartRegistry = {
  pie: PieChart,
  bar: BarChart,
  line: LineChart,
  area: AreaChart,
  donut: DonutChart,
  heatmap: HeatmapChart,
  treemap: TreemapChart,
  waterfall: WaterfallChart,
  radar: RadarChart,
} as const;

export type ChartType = keyof typeof chartRegistry;
