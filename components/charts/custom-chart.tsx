"use client";

import { Component, type ReactNode } from "react";
import type { EChartsOption } from "echarts";
import { BaseChart } from "./base-chart";
import { ChartFallback } from "./chart-fallback";

interface CustomChartProps {
  title: string;
  echartsOption: Record<string, unknown>;
}

interface ChartErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

class ChartErrorBoundary extends Component<
  ChartErrorBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function CustomChart({ title, echartsOption }: CustomChartProps) {
  return (
    <ChartErrorBoundary
      fallback={<ChartFallback title={title} rawData={echartsOption} />}
    >
      <BaseChart option={echartsOption as EChartsOption} />
    </ChartErrorBoundary>
  );
}
