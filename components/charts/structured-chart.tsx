import { chartRegistry } from "@/lib/charts/registry";
import { ChartFallback } from "./chart-fallback";

interface StructuredChartProps {
  chartType: string;
  title: string;
  data: any[];
}

export function StructuredChart({ chartType, title, data }: StructuredChartProps) {
  const Component = chartRegistry[chartType as keyof typeof chartRegistry];

  if (!Component) {
    return <ChartFallback title={title} rawData={{ chartType, data }} />;
  }

  return <Component data={data} />;
}
