"use client";

import { BaseChart } from "./base-chart";
import { ChartFallback } from "./chart-fallback";
import { useState } from "react";

interface CustomChartProps {
  title: string;
  echartsOption: any;
}

export function CustomChart({ title, echartsOption }: CustomChartProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <ChartFallback title={title} rawData={echartsOption} />;
  }

  try {
    return <BaseChart option={echartsOption} />;
  } catch {
    setHasError(true);
    return <ChartFallback title={title} rawData={echartsOption} />;
  }
}
