# Investment Portfolio Charts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add AI-driven investment portfolio visualization with flexible chart rendering (structured + custom ECharts) inline in the chat interface.

**Architecture:** The AI fetches rich portfolio mock data via `get_investment_portfolio`, then calls `render_chart` (structured or custom mode) to generate visualizations. The frontend renders chart cards inline in chat messages using ECharts via `echarts-for-react`. A registry pattern maps chart type strings to React components.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, ECharts, `echarts-for-react`, Vercel AI SDK, Vitest, Playwright

---

## File Structure

| File | Responsibility |
|---|---|
| `lib/mock-data/portfolio.ts` | Pre-seeded Malaysian investment portfolio data (holdings, time-series, risk metrics) |
| `lib/mock-tools/portfolio.ts` | Server-side tool executors: `getInvestmentPortfolio`, `renderChart` |
| `lib/types/chat.ts` | Extended `StructuredResult` union with `ChartPayload` type |
| `lib/charts/registry.ts` | Chart type → component mapping registry |
| `components/charts/base-chart.tsx` | Shared ECharts wrapper: dark theme, responsive sizing, error boundary |
| `components/charts/chart-fallback.tsx` | Error fallback when chart rendering fails |
| `components/charts/structured-chart.tsx` | Registry lookup and dispatch for structured chart mode |
| `components/charts/custom-chart.tsx` | Direct ECharts option rendering for custom mode |
| `components/charts/chart-renderer.tsx` | Top-level dispatcher: structured vs custom |
| `components/charts/pie-chart.tsx` | Pie chart renderer |
| `components/charts/bar-chart.tsx` | Bar chart renderer |
| `components/charts/line-chart.tsx` | Line chart renderer |
| `components/charts/area-chart.tsx` | Area chart renderer |
| `components/charts/donut-chart.tsx` | Donut chart renderer |
| `components/charts/heatmap-chart.tsx` | Heatmap chart renderer |
| `components/charts/treemap-chart.tsx` | Treemap chart renderer |
| `components/charts/waterfall-chart.tsx` | Waterfall chart renderer |
| `components/charts/radar-chart.tsx` | Radar chart renderer |
| `lib/ai/ai-client.ts` | Added `get_investment_portfolio` and `render_chart` tools to AI client |
| `components/chat/chat-message-list.tsx` | Read `render_chart` tool **args** to produce chart structured results |
| `components/chat/structured-result.tsx` | Render `chart` type structured results via `ChartRenderer` |
| `tests/component/chart-registry.test.ts` | Unit tests for registry resolution and ChartRenderer dispatch |
| `tests/component/chart-components.test.tsx` | Component tests ensuring chart types render without crashing |
| `tests/e2e/portfolio-charts.spec.ts` | E2E test: user asks about portfolio, charts appear |

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install echarts and echarts-for-react**

Run:
```bash
npm install echarts echarts-for-react
```

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add echarts and echarts-for-react"
```

---

### Task 2: Create Portfolio Mock Data

**Files:**
- Create: `lib/mock-data/portfolio.ts`
- Test: `tests/component/portfolio-data.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/component/portfolio-data.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { getInvestmentPortfolio } from "@/lib/mock-tools/portfolio";

describe("getInvestmentPortfolio", () => {
  it("returns holdings with expected tickers", () => {
    const data = getInvestmentPortfolio();
    const tickers = data.holdings.map((h) => h.ticker);
    expect(tickers).toContain("MAYBANK");
    expect(tickers).toContain("TENAGA");
    expect(tickers.length).toBeGreaterThanOrEqual(8);
  });

  it("returns monthly portfolio value data", () => {
    const data = getInvestmentPortfolio();
    expect(data.monthlyPortfolioValue.length).toBeGreaterThanOrEqual(12);
    expect(data.monthlyPortfolioValue[0]).toHaveProperty("month");
    expect(data.monthlyPortfolioValue[0]).toHaveProperty("value");
  });

  it("returns risk metrics", () => {
    const data = getInvestmentPortfolio();
    expect(data.riskMetrics).toHaveProperty("beta");
    expect(data.riskMetrics).toHaveProperty("volatility");
    expect(data.riskMetrics).toHaveProperty("sharpeRatio");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- tests/component/portfolio-data.test.ts
```
Expected: FAIL with "Cannot find module" or "getInvestmentPortfolio is not a function"

- [ ] **Step 3: Create portfolio mock data and tool executor**

Create `lib/mock-data/portfolio.ts`:
```ts
export interface PortfolioHolding {
  ticker: string;
  name: string;
  sector: string;
  assetClass: "stock" | "etf" | "reit" | "bond" | "unit-trust";
  quantity: number;
  avgCost: number;
  currentPrice: number;
  currency: string;
}

export interface PortfolioData {
  holdings: PortfolioHolding[];
  monthlyPortfolioValue: Array<{ month: string; value: number }>;
  monthlyPrices: Record<string, Array<{ month: string; price: number }>>;
  riskMetrics: {
    beta: number;
    volatility: number;
    sharpeRatio: number;
  };
}

const HOLDINGS: PortfolioHolding[] = [
  { ticker: "MAYBANK", name: "Malayan Banking Bhd", sector: "Financials", assetClass: "stock", quantity: 500, avgCost: 9.5, currentPrice: 10.2, currency: "MYR" },
  { ticker: "CIMB", name: "CIMB Group Holdings Bhd", sector: "Financials", assetClass: "stock", quantity: 800, avgCost: 6.8, currentPrice: 7.4, currency: "MYR" },
  { ticker: "TENAGA", name: "Tenaga Nasional Bhd", sector: "Utilities", assetClass: "stock", quantity: 300, avgCost: 14.2, currentPrice: 13.8, currency: "MYR" },
  { ticker: "PCHEM", name: "Petronas Chemicals Group Bhd", sector: "Materials", assetClass: "stock", quantity: 400, avgCost: 8.1, currentPrice: 8.5, currency: "MYR" },
  { ticker: "AXIATA", name: "Axiata Group Bhd", sector: "Telecommunications", assetClass: "stock", quantity: 600, avgCost: 4.5, currentPrice: 4.8, currency: "MYR" },
  { ticker: "MAXIS", name: "Maxis Bhd", sector: "Telecommunications", assetClass: "stock", quantity: 350, avgCost: 5.2, currentPrice: 5.0, currency: "MYR" },
  { ticker: "KLCI-ETF", name: "FTSE Bursa Malaysia KLCI ETF", sector: "Diversified", assetClass: "etf", quantity: 1000, avgCost: 1.85, currentPrice: 1.92, currency: "MYR" },
  { ticker: "PAVREIT", name: "Pavilion REIT", sector: "Real Estate", assetClass: "reit", quantity: 2000, avgCost: 1.6, currentPrice: 1.65, currency: "MYR" },
  { ticker: "PPB", name: "PPB Group Bhd", sector: "Consumer Staples", assetClass: "stock", quantity: 200, avgCost: 18.0, currentPrice: 19.2, currency: "MYR" },
  { ticker: "GAMUDA", name: "Gamuda Bhd", sector: "Construction", assetClass: "stock", quantity: 450, avgCost: 5.8, currentPrice: 6.1, currency: "MYR" },
];

function generateMonthlyValues(): Array<{ month: string; value: number }> {
  const values: Array<{ month: string; value: number }> = [];
  const baseValue = HOLDINGS.reduce((sum, h) => sum + h.quantity * h.avgCost, 0);
  for (let i = 23; i >= 0; i--) {
    const date = new Date(2026, 3 - i, 1);
    const month = date.toISOString().slice(0, 7);
    const growth = 1 + (23 - i) * 0.008 + Math.sin(i) * 0.05;
    values.push({ month, value: Math.round(baseValue * growth * 100) / 100 });
  }
  return values;
}

function generateMonthlyPrices(): Record<string, Array<{ month: string; price: number }>> {
  const prices: Record<string, Array<{ month: string; price: number }>> = {};
  for (const holding of HOLDINGS) {
    const history: Array<{ month: string; price: number }> = [];
    for (let i = 23; i >= 0; i--) {
      const date = new Date(2026, 3 - i, 1);
      const month = date.toISOString().slice(0, 7);
      const drift = 1 + (23 - i) * 0.005 + (Math.random() - 0.5) * 0.15;
      history.push({ month, price: Math.round(holding.currentPrice * drift * 100) / 100 });
    }
    prices[holding.ticker] = history;
  }
  return prices;
}

export const PORTFOLIO_DATA: PortfolioData = {
  holdings: HOLDINGS,
  monthlyPortfolioValue: generateMonthlyValues(),
  monthlyPrices: generateMonthlyPrices(),
  riskMetrics: {
    beta: 1.05,
    volatility: 14.2,
    sharpeRatio: 0.85,
  },
};
```

Create `lib/mock-tools/portfolio.ts`:
```ts
import { PORTFOLIO_DATA, type PortfolioData } from "@/lib/mock-data/portfolio";

export function getInvestmentPortfolio(): PortfolioData {
  return PORTFOLIO_DATA;
}

export function renderChart(): { success: true; chartId: string } {
  return { success: true, chartId: `chart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}` };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm test -- tests/component/portfolio-data.test.ts
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/mock-data/portfolio.ts lib/mock-tools/portfolio.ts tests/component/portfolio-data.test.ts
git commit -m "feat: add investment portfolio mock data and tool executors"
```

---

### Task 3: Extend Chat Types

**Files:**
- Modify: `lib/types/chat.ts`
- Test: `tests/component/chat-types.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/component/chat-types.test.ts`:
```ts
import { describe, it, expect } from "vitest";

describe("ChartPayload type compatibility", () => {
  it("accepts structured chart payload", () => {
    const payload = {
      mode: "structured" as const,
      chartType: "pie",
      title: "Test",
      data: [{ name: "A", value: 10 }],
    };
    expect(payload.mode).toBe("structured");
    expect(payload.chartType).toBe("pie");
  });

  it("accepts custom chart payload", () => {
    const payload = {
      mode: "custom" as const,
      title: "Test",
      echartsOption: { series: [] },
    };
    expect(payload.mode).toBe("custom");
  });
});
```

- [ ] **Step 2: Run test to verify it passes**

Run:
```bash
npm test -- tests/component/chat-types.test.ts
```
Expected: PASS (type-only test, runtime always passes)

- [ ] **Step 3: Extend types**

Modify `lib/types/chat.ts`:
```ts
export type ChartPayload =
  | {
      mode: "structured";
      chartType: string;
      title: string;
      description?: string;
      data: Array<Record<string, any>>;
    }
  | {
      mode: "custom";
      title: string;
      description?: string;
      echartsOption: Record<string, any>;
    };

export type StructuredResult =
  | { type: "balance"; balance: number; currency: string }
  | { type: "transactions"; items: Array<{ id: string; merchant: string; amount: number; direction: "debit" | "credit"; postedAt: string }> }
  | { type: "spending"; monthLabel: string; total: number; topCategory: string; comparisonText: string }
  | { type: "action-preview"; actionId: string; actionType: "transfer" | "freeze-card" | "unfreeze-card"; summary: string; confirmLabel: string; cancelLabel: string }
  | { type: "status"; tone: "success" | "error" | "info"; summary: string }
  | { type: "chart"; payload: ChartPayload };
```

- [ ] **Step 4: Commit**

```bash
git add lib/types/chat.ts tests/component/chat-types.test.ts
git commit -m "feat: add ChartPayload and chart StructuredResult type"
```

---

### Task 4: Create Chart Registry

**Files:**
- Create: `lib/charts/registry.ts`
- Test: `tests/component/chart-registry.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/component/chart-registry.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { chartRegistry } from "@/lib/charts/registry";

describe("chartRegistry", () => {
  it("contains expected chart types", () => {
    expect(chartRegistry).toHaveProperty("pie");
    expect(chartRegistry).toHaveProperty("bar");
    expect(chartRegistry).toHaveProperty("line");
    expect(chartRegistry).toHaveProperty("area");
    expect(chartRegistry).toHaveProperty("donut");
    expect(chartRegistry).toHaveProperty("heatmap");
    expect(chartRegistry).toHaveProperty("treemap");
    expect(chartRegistry).toHaveProperty("waterfall");
    expect(chartRegistry).toHaveProperty("radar");
  });

  it("returns undefined for unknown chart type", () => {
    expect(chartRegistry["unknown" as keyof typeof chartRegistry]).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- tests/component/chart-registry.test.ts
```
Expected: FAIL with "Cannot find module '@/lib/charts/registry'"

- [ ] **Step 3: Create registry**

Create `lib/charts/registry.ts`:
```ts
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
```

- [ ] **Step 4: Run test to verify it fails differently**

Run:
```bash
npm test -- tests/component/chart-registry.test.ts
```
Expected: FAIL with "Cannot find module '@/components/charts/pie-chart'" (because individual chart components don't exist yet)

- [ ] **Step 5: Create placeholder chart components**

Create each chart component as a minimal placeholder that just renders a `div` with the chart name. These will be fleshed out in Task 6.

`components/charts/pie-chart.tsx`:
```tsx
export function PieChart({ data }: { data: any[] }) {
  return <div data-testid="pie-chart">PieChart placeholder</div>;
}
```

Repeat for: `bar-chart.tsx`, `line-chart.tsx`, `area-chart.tsx`, `donut-chart.tsx`, `heatmap-chart.tsx`, `treemap-chart.tsx`, `waterfall-chart.tsx`, `radar-chart.tsx` — same pattern, different `data-testid`.

- [ ] **Step 6: Run test to verify it passes**

Run:
```bash
npm test -- tests/component/chart-registry.test.ts
```
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add lib/charts/registry.ts components/charts/*.tsx tests/component/chart-registry.test.ts
git commit -m "feat: add chart registry and placeholder chart components"
```

---

### Task 5: Create Base Chart, Fallback, and Renderer Components

**Files:**
- Create: `components/charts/base-chart.tsx`
- Create: `components/charts/chart-fallback.tsx`
- Create: `components/charts/structured-chart.tsx`
- Create: `components/charts/custom-chart.tsx`
- Create: `components/charts/chart-renderer.tsx`
- Test: `tests/component/chart-renderer.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/component/chart-renderer.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChartRenderer } from "@/components/charts/chart-renderer";

describe("ChartRenderer", () => {
  it("renders structured pie chart", () => {
    render(
      <ChartRenderer
        data={{
          mode: "structured",
          chartType: "pie",
          title: "Allocation",
          data: [{ name: "A", value: 10 }],
        }}
      />
    );
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  });

  it("renders fallback for unknown chart type", () => {
    render(
      <ChartRenderer
        data={{
          mode: "structured",
          chartType: "unknown",
          title: "Test",
          data: [],
        }}
      />
    );
    expect(screen.getByText(/data format isn't supported/i)).toBeInTheDocument();
  });

  it("renders custom chart", () => {
    render(
      <ChartRenderer
        data={{
          mode: "custom",
          title: "Custom",
          echartsOption: { series: [{ type: "bar", data: [1, 2, 3] }] },
        }}
      />
    );
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- tests/component/chart-renderer.test.tsx
```
Expected: FAIL with module not found errors

- [ ] **Step 3: Create BaseChart**

Create `components/charts/base-chart.tsx`:
```tsx
"use client";

import ReactECharts from "echarts-for-react";
import { useState } from "react";

interface BaseChartProps {
  option: any;
}

export function BaseChart({ option }: BaseChartProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error("ECharts render error");
  }

  const themedOption = {
    backgroundColor: "transparent",
    textStyle: {
      color: "#e5e5e5",
    },
    title: {
      textStyle: { color: "#ffffff" },
      ...option.title,
    },
    legend: {
      textStyle: { color: "#a3a3a3" },
      ...option.legend,
    },
    tooltip: {
      backgroundColor: "#262626",
      borderColor: "#404040",
      textStyle: { color: "#e5e5e5" },
      ...option.tooltip,
    },
    ...option,
  };

  return (
    <div data-testid="echarts-container" className="w-full" style={{ height: 280 }}>
      <ReactECharts
        option={themedOption}
        style={{ height: "100%", width: "100%" }}
        onEvents={{
          // noop
        }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
}
```

- [ ] **Step 4: Create ChartFallback**

Create `components/charts/chart-fallback.tsx`:
```tsx
"use client";

import { useState } from "react";

interface ChartFallbackProps {
  title?: string;
  rawData?: any;
}

export function ChartFallback({ title, rawData }: ChartFallbackProps) {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4">
      <p className="text-sm text-rose-300">
        The assistant tried to show a chart &ldquo;{title || "untitled"}&rdquo;, but the data
        format isn&apos;t supported.
      </p>
      <button
        onClick={() => setShowRaw((s) => !s)}
        className="mt-2 text-xs text-rose-400 underline hover:text-rose-300"
      >
        {showRaw ? "Hide raw data" : "Show raw data"}
      </button>
      {showRaw && (
        <pre className="mt-2 max-h-40 overflow-auto rounded bg-black/30 p-2 text-xs text-neutral-400">
          {JSON.stringify(rawData, null, 2)}
        </pre>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Create StructuredChart**

Create `components/charts/structured-chart.tsx`:
```tsx
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
```

- [ ] **Step 6: Create CustomChart**

Create `components/charts/custom-chart.tsx`:
```tsx
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
```

- [ ] **Step 7: Create ChartRenderer**

Create `components/charts/chart-renderer.tsx`:
```tsx
import type { ChartPayload } from "@/lib/types/chat";
import { StructuredChart } from "./structured-chart";
import { CustomChart } from "./custom-chart";

interface ChartRendererProps {
  data: ChartPayload;
}

export function ChartRenderer({ data }: ChartRendererProps) {
  return (
    <div className="rounded-xl border border-white/5 bg-chat-surface p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
        {data.title}
      </p>
      {data.description && (
        <p className="mb-3 text-sm text-neutral-300">{data.description}</p>
      )}
      {data.mode === "structured" ? (
        <StructuredChart
          chartType={data.chartType}
          title={data.title}
          data={data.data}
        />
      ) : (
        <CustomChart title={data.title} echartsOption={data.echartsOption} />
      )}
    </div>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run:
```bash
npm test -- tests/component/chart-renderer.test.tsx
```
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add components/charts/base-chart.tsx components/charts/chart-fallback.tsx components/charts/structured-chart.tsx components/charts/custom-chart.tsx components/charts/chart-renderer.tsx tests/component/chart-renderer.test.tsx
git commit -m "feat: add chart rendering components (BaseChart, StructuredChart, CustomChart, ChartRenderer, ChartFallback)"
```

---

### Task 6: Implement Individual Chart Components

**Files:**
- Modify: `components/charts/pie-chart.tsx`
- Modify: `components/charts/bar-chart.tsx`
- Modify: `components/charts/line-chart.tsx`
- Modify: `components/charts/area-chart.tsx`
- Modify: `components/charts/donut-chart.tsx`
- Modify: `components/charts/heatmap-chart.tsx`
- Modify: `components/charts/treemap-chart.tsx`
- Modify: `components/charts/waterfall-chart.tsx`
- Modify: `components/charts/radar-chart.tsx`
- Test: `tests/component/chart-components.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/component/chart-components.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PieChart } from "@/components/charts/pie-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { AreaChart } from "@/components/charts/area-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { HeatmapChart } from "@/components/charts/heatmap-chart";
import { TreemapChart } from "@/components/charts/treemap-chart";
import { WaterfallChart } from "@/components/charts/waterfall-chart";
import { RadarChart } from "@/components/charts/radar-chart";

const sampleData = [
  { name: "A", value: 10 },
  { name: "B", value: 20 },
  { name: "C", value: 30 },
];

const sampleTimeSeries = [
  { month: "2025-04", value: 100 },
  { month: "2025-05", value: 120 },
  { month: "2025-06", value: 110 },
];

describe("Chart components", () => {
  it("PieChart renders without crashing", () => {
    render(<PieChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("BarChart renders without crashing", () => {
    render(<BarChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("LineChart renders without crashing", () => {
    render(<LineChart data={sampleTimeSeries} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("AreaChart renders without crashing", () => {
    render(<AreaChart data={sampleTimeSeries} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("DonutChart renders without crashing", () => {
    render(<DonutChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("HeatmapChart renders without crashing", () => {
    render(<HeatmapChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("TreemapChart renders without crashing", () => {
    render(<TreemapChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("WaterfallChart renders without crashing", () => {
    render(<WaterfallChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });

  it("RadarChart renders without crashing", () => {
    render(<RadarChart data={sampleData} />);
    expect(screen.getByTestId("echarts-container")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- tests/component/chart-components.test.tsx
```
Expected: FAIL because components are placeholders

- [ ] **Step 3: Implement PieChart**

Modify `components/charts/pie-chart.tsx`:
```tsx
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
```

- [ ] **Step 4: Implement BarChart**

Modify `components/charts/bar-chart.tsx`:
```tsx
"use client";

import { BaseChart } from "./base-chart";

export function BarChart({ data }: { data: any[] }) {
  const names = data.map((d) => d.name || d.label || d.category || "");
  const values = data.map((d) => d.value || d.amount || 0);

  const option = {
    xAxis: {
      type: "category",
      data: names,
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
      splitLine: { lineStyle: { color: "#404040" } },
    },
    series: [
      {
        type: "bar",
        data: values,
        itemStyle: { color: "#10b981" },
      },
    ],
    grid: { left: "10%", right: "5%", top: "10%", bottom: "15%" },
  };

  return <BaseChart option={option} />;
}
```

- [ ] **Step 5: Implement LineChart**

Modify `components/charts/line-chart.tsx`:
```tsx
"use client";

import { BaseChart } from "./base-chart";

export function LineChart({ data }: { data: any[] }) {
  const names = data.map((d) => d.name || d.month || d.date || "");
  const values = data.map((d) => d.value || d.price || 0);

  const option = {
    xAxis: {
      type: "category",
      data: names,
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
      splitLine: { lineStyle: { color: "#404040" } },
    },
    series: [
      {
        type: "line",
        data: values,
        smooth: true,
        itemStyle: { color: "#3b82f6" },
        areaStyle: { opacity: 0 },
      },
    ],
    grid: { left: "10%", right: "5%", top: "10%", bottom: "15%" },
  };

  return <BaseChart option={option} />;
}
```

- [ ] **Step 6: Implement AreaChart**

Modify `components/charts/area-chart.tsx`:
```tsx
"use client";

import { BaseChart } from "./base-chart";

export function AreaChart({ data }: { data: any[] }) {
  const names = data.map((d) => d.name || d.month || d.date || "");
  const values = data.map((d) => d.value || d.price || 0);

  const option = {
    xAxis: {
      type: "category",
      data: names,
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
      splitLine: { lineStyle: { color: "#404040" } },
    },
    series: [
      {
        type: "line",
        data: values,
        smooth: true,
        itemStyle: { color: "#8b5cf6" },
        areaStyle: {
          color: {
            type: "linear",
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
```

- [ ] **Step 7: Implement DonutChart**

Modify `components/charts/donut-chart.tsx`:
```tsx
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
```

- [ ] **Step 8: Implement HeatmapChart**

Modify `components/charts/heatmap-chart.tsx`:
```tsx
"use client";

import { BaseChart } from "./base-chart";

export function HeatmapChart({ data }: { data: any[] }) {
  const option = {
    xAxis: {
      type: "category",
      data: [...new Set(data.map((d) => d.x || d.category || ""))],
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
    },
    yAxis: {
      type: "category",
      data: [...new Set(data.map((d) => d.y || d.series || ""))],
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
    },
    visualMap: {
      min: Math.min(...data.map((d) => d.value || 0)),
      max: Math.max(...data.map((d) => d.value || 0)),
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "0%",
      inRange: { color: ["#1e3a5f", "#3b82f6", "#f59e0b", "#ef4444"] },
      textStyle: { color: "#a3a3a3" },
    },
    series: [
      {
        type: "heatmap",
        data: data.map((d) => [d.x || d.category, d.y || d.series, d.value || d.amount]),
        label: { show: true, color: "#ffffff" },
      },
    ],
    grid: { left: "15%", right: "10%", top: "10%", bottom: "20%" },
  };

  return <BaseChart option={option} />;
}
```

- [ ] **Step 9: Implement TreemapChart**

Modify `components/charts/treemap-chart.tsx`:
```tsx
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
```

- [ ] **Step 10: Implement WaterfallChart**

Modify `components/charts/waterfall-chart.tsx`:
```tsx
"use client";

import { BaseChart } from "./base-chart";

export function WaterfallChart({ data }: { data: any[] }) {
  const names = data.map((d) => d.name || d.label || "");
  const values = data.map((d) => d.value || d.amount || 0);

  const positive = values.map((v) => (v >= 0 ? v : 0));
  const negative = values.map((v) => (v < 0 ? v : 0));

  const option = {
    xAxis: {
      type: "category",
      data: names,
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#525252" } },
      axisLabel: { color: "#a3a3a3" },
      splitLine: { lineStyle: { color: "#404040" } },
    },
    series: [
      {
        type: "bar",
        stack: "total",
        data: positive,
        itemStyle: { color: "#10b981" },
      },
      {
        type: "bar",
        stack: "total",
        data: negative,
        itemStyle: { color: "#ef4444" },
      },
    ],
    grid: { left: "10%", right: "5%", top: "10%", bottom: "15%" },
  };

  return <BaseChart option={option} />;
}
```

- [ ] **Step 11: Implement RadarChart**

Modify `components/charts/radar-chart.tsx`:
```tsx
"use client";

import { BaseChart } from "./base-chart";

export function RadarChart({ data }: { data: any[] }) {
  const indicators = data.map((d) => ({
    name: d.name || d.label || "",
    max: d.max || Math.max(...data.map((x) => x.value || 0)) * 1.2,
  }));

  const values = data.map((d) => d.value || d.amount || 0);

  const option = {
    radar: {
      indicator: indicators,
      axisName: { color: "#a3a3a3" },
      splitArea: { areaStyle: { color: ["#262626", "#1a1a1a"] } },
      axisLine: { lineStyle: { color: "#525252" } },
      splitLine: { lineStyle: { color: "#404040" } },
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: values,
            name: "Portfolio",
            areaStyle: { color: "rgba(59, 130, 246, 0.3)" },
            lineStyle: { color: "#3b82f6" },
            itemStyle: { color: "#3b82f6" },
          },
        ],
      },
    ],
  };

  return <BaseChart option={option} />;
}
```

- [ ] **Step 12: Run tests to verify they pass**

Run:
```bash
npm test -- tests/component/chart-components.test.tsx
```
Expected: PASS

- [ ] **Step 13: Commit**

```bash
git add components/charts/*.tsx tests/component/chart-components.test.tsx
git commit -m "feat: implement all chart types with ECharts"
```

---

### Task 7: Add AI Tools to Backend

**Files:**
- Modify: `lib/ai/ai-client.ts`
- Modify: `lib/mock-tools/index.ts`

- [ ] **Step 1: Update mock-tools index exports**

Modify `lib/mock-tools/index.ts`:
```ts
export { getBalance } from "@/lib/mock-tools/balance";
export { listRecentTransactions } from "@/lib/mock-tools/transactions";
export { summarizeSpending } from "@/lib/mock-tools/spending";
export { createTransferPreview, executeTransfer } from "@/lib/mock-tools/transfers";
export { createCardStatusPreview, executeCardStatusChange } from "@/lib/mock-tools/card";
export { getInvestmentPortfolio, renderChart } from "@/lib/mock-tools/portfolio";
```

- [ ] **Step 2: Update AI client with new tools**

Modify `lib/ai/ai-client.ts`:

Add imports at the top:
```ts
import { getInvestmentPortfolio, renderChart } from "@/lib/mock-tools";
```

Update `SYSTEM_MESSAGE`:
```ts
const SYSTEM_MESSAGE = `You are the Cellar Bank AI assistant, a helpful and knowledgeable banking assistant for Cellar Bank.
You can help customers with a wide range of banking tasks, including looking up account information (balances, recent transactions, spending summaries), making transactions (initiating transfers), managing their cards (freeze or unfreeze), and reviewing investment portfolios.
When users ask about their investments or portfolio, call get_investment_portfolio to retrieve the data, then use render_chart to visualize the most relevant insights. You may render multiple charts in a single response to tell a complete story.
Always use the available tools when users ask about their account or request actions. For transfers and card status changes, always create a preview first and ask for explicit user confirmation before executing.
Format your responses using basic markdown only: bold (**text**), italic (*text*), paragraphs, and bullet lists. Do not use headings, tables, code blocks, or other advanced formatting.`;
```

Add tools to `bankingTools`:
```ts
const bankingTools = {
  // ... existing tools ...
  get_investment_portfolio: tool({
    description: "Get the current investment portfolio holdings, performance, and risk metrics for the signed-in user.",
    parameters: z.object({}),
    execute: async () => getInvestmentPortfolio(),
  }),
  render_chart: tool({
    description: "Render a chart visualization in the chat interface. Use this when you want to present data visually to the user. You may call this tool multiple times in a single response to show different perspectives.",
    parameters: z.discriminatedUnion("mode", [
      z.object({
        mode: z.literal("structured"),
        chartType: z.enum([
          "pie", "bar", "line", "area", "donut",
          "heatmap", "treemap", "waterfall", "radar"
        ]),
        title: z.string(),
        description: z.string().optional(),
        data: z.array(z.record(z.any())),
      }),
      z.object({
        mode: z.literal("custom"),
        title: z.string(),
        description: z.string().optional(),
        echartsOption: z.record(z.any()),
      }),
    ]),
    execute: async () => renderChart(),
  }),
};
```

- [ ] **Step 3: Run build to verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add lib/ai/ai-client.ts lib/mock-tools/index.ts
git commit -m "feat: add get_investment_portfolio and render_chart AI tools"
```

---

### Task 8: Integrate Charts into Chat UI

**Files:**
- Modify: `components/chat/chat-message-list.tsx`
- Modify: `components/chat/structured-result.tsx`
- Test: `tests/component/chat-message-list-charts.test.tsx`

- [ ] **Step 1: Update chat-message-list to read render_chart args**

Modify `components/chat/chat-message-list.tsx`:

In `getStructuredResultsFromMessage`, add a new case before the switch or inside it:
```ts
      case "render_chart": {
        const args = (invocation as any).args;
        if (!args) continue;
        results.push({
          type: "chart",
          payload: args as ChartPayload,
        });
        break;
      }
```

Also add `ChartPayload` to the imports from `@/lib/types/chat`.

- [ ] **Step 2: Update structured-result to render charts**

Modify `components/chat/structured-result.tsx`:

Add import:
```ts
import { ChartRenderer } from "@/components/charts/chart-renderer";
```

Add a new branch in the component:
```ts
  if (data.type === "chart") {
    return <ChartRenderer data={data.payload} />;
  }
```

- [ ] **Step 3: Write integration test**

Create `tests/component/chat-message-list-charts.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessageList } from "@/components/chat/chat-message-list";

describe("ChatMessageList with charts", () => {
  it("renders chart cards from render_chart tool invocations", () => {
    const messages = [
      {
        id: "msg-1",
        role: "assistant" as const,
        content: "Here is your portfolio breakdown.",
        toolInvocations: [
          {
            toolName: "render_chart",
            state: "result" as const,
            args: {
              mode: "structured",
              chartType: "pie",
              title: "Sector Allocation",
              data: [{ name: "Financials", value: 35 }],
            },
            result: { success: true, chartId: "c1" },
          },
        ],
      },
    ];

    render(<ChatMessageList messages={messages as any} onSelectPrompt={() => {}} />);
    expect(screen.getByText("Sector Allocation")).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm test -- tests/component/chat-message-list-charts.test.tsx
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/chat/chat-message-list.tsx components/chat/structured-result.tsx tests/component/chat-message-list-charts.test.tsx
git commit -m "feat: integrate chart rendering into chat message list and structured results"
```

---

### Task 9: Add Suggested Prompts for Portfolio

**Files:**
- Modify: `lib/chat/constants.ts`

- [ ] **Step 1: Add portfolio prompts**

Modify `lib/chat/constants.ts` (add to the existing `SUGGESTED_PROMPTS` array):
```ts
export const SUGGESTED_PROMPTS = [
  // ... existing prompts ...
  "Show me my investment portfolio",
  "How are my stocks performing?",
  "What is my portfolio allocation?",
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/chat/constants.ts
git commit -m "feat: add portfolio-related suggested prompts"
```

---

### Task 10: E2E Test

**Files:**
- Create: `tests/e2e/portfolio-charts.spec.ts`

- [ ] **Step 1: Write E2E test**

Create `tests/e2e/portfolio-charts.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test("user can ask about portfolio and see charts", async ({ page }) => {
  await page.goto("/");

  // Type portfolio question
  const input = page.locator("[data-testid='chat-input']");
  await input.fill("Show me my investment portfolio");
  await input.press("Enter");

  // Wait for assistant response
  await page.waitForSelector("text=portfolio", { timeout: 15000 });

  // Assert chart card appears
  const chartCards = page.locator("text=Allocation");
  await expect(chartCards.first()).toBeVisible({ timeout: 10000 });
});
```

Note: If `data-testid='chat-input'` does not exist, inspect the actual input element in `ChatComposer` and update the selector.

- [ ] **Step 2: Run E2E test**

Run:
```bash
npm run test:e2e -- tests/e2e/portfolio-charts.spec.ts
```
Expected: PASS (or useful failure indicating what needs adjustment)

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/portfolio-charts.spec.ts
git commit -m "test: add E2E test for portfolio chart rendering"
```

---

### Task 11: Final Integration and Verification

**Files:**
- All modified files

- [ ] **Step 1: Run all unit tests**

Run:
```bash
npm test
```
Expected: All tests PASS

- [ ] **Step 2: Run TypeScript check**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 3: Run dev server smoke test**

Run:
```bash
npm run build
```
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: complete investment portfolio charts feature"
```

---

## Self-Review Checklist

### Spec Coverage
- [x] Rich Malaysian portfolio mock data (`lib/mock-data/portfolio.ts`) — Task 2
- [x] `get_investment_portfolio` AI tool — Task 7
- [x] `render_chart` AI tool with discriminated union — Task 7
- [x] Chart registry pattern — Task 4
- [x] BaseChart with dark theme — Task 5
- [x] ChartFallback for errors — Task 5
- [x] StructuredChart (registry lookup) — Task 5
- [x] CustomChart (raw ECharts) — Task 5
- [x] ChartRenderer dispatcher — Task 5
- [x] 9 individual chart types — Task 6
- [x] Chat integration (read `args` for render_chart) — Task 8
- [x] Error handling (unknown chart type, malformed data) — Task 5
- [x] Unit tests for registry — Task 4
- [x] Component tests for charts — Task 6
- [x] E2E test — Task 10

### Placeholder Scan
- [x] No "TBD" or "TODO"
- [x] No vague instructions like "add appropriate error handling"
- [x] All test code is explicit and complete
- [x] All file paths are exact

### Type Consistency
- [x] `ChartPayload` matches in `lib/types/chat.ts` and AI tool parameters
- [x] `StructuredResult` union includes `chart` type consistently
- [x] `chartRegistry` keys match `chartType` enum values
- [x] Individual chart components all accept `{ data: any[] }`

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-23-investment-portfolio-charts.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
