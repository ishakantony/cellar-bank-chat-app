# Design: Investment Portfolio Charts & AI Storytelling

**Date:** 2026-04-23  
**Status:** Approved

---

## 1. Goal

Enable the AI assistant to retrieve a rich Malaysian investment portfolio and generate flexible, multi-chart visualizations inline in the chat to tell compelling investment stories. The system must be open-ended: the AI can choose from a registry of structured chart types or output a raw ECharts configuration for custom visualizations.

---

## 2. Data Layer

### 2.1 File

`lib/mock-data/portfolio.ts`

### 2.2 Contents

A pre-seeded, robust portfolio containing approximately 10 Malaysian holdings:

| Ticker | Name | Sector | Asset Class |
|---|---|---|---|
| MAYBANK | Malayan Banking Bhd | Financials | Stock |
| CIMB | CIMB Group Holdings Bhd | Financials | Stock |
| TENAGA | Tenaga Nasional Bhd | Utilities | Stock |
| PCHEM | Petronas Chemicals Group Bhd | Materials | Stock |
| AXIATA | Axiata Group Bhd | Telecommunications | Stock |
| MAXIS | Maxis Bhd | Telecommunications | Stock |
| KLCI-ETF | FTSE Bursa Malaysia KLCI ETF | Diversified | ETF |
| PAVREIT | Pavilion REIT | Real Estate | REIT |
| PPB | PPB Group Bhd | Consumer Staples | Stock |
| GAMUDA | Gamuda Bhd | Construction | Stock |

### 2.3 Data Schema

Each holding includes:
- `ticker`: string
- `name`: string
- `sector`: string
- `assetClass`: "stock" | "etf" | "reit" | "bond" | "unit-trust"
- `quantity`: number
- `avgCost`: number (MYR)
- `currentPrice`: number (MYR)
- `currency`: "MYR"

Computed aggregates (calculated at runtime or baked into mock data):
- `totalValue`: sum of `quantity * currentPrice`
- `totalCost`: sum of `quantity * avgCost`
- `unrealizedPnl`: `totalValue - totalCost`
- `unrealizedPnlPercent`: `(unrealizedPnl / totalCost) * 100`
- `allocationBySector`: percentage per sector
- `allocationByAssetClass`: percentage per asset class

Time-series data:
- `monthlyPortfolioValue`: array of `{ month: string, value: number }` for the last 24 months
- `monthlyPrices`: map of ticker → array of `{ month: string, price: number }` for the last 24 months

Risk metrics (synthetic but realistic):
- `portfolioBeta`: number
- `portfolioVolatility`: number (annualized %)
- `portfolioSharpeRatio`: number

---

## 3. AI Tools

### 3.1 `get_investment_portfolio`

**Description:** Get the current investment portfolio holdings, performance, and risk metrics for the signed-in user.

**Parameters:** `z.object({})` — no arguments.

**Returns:** The full portfolio object as defined in Section 2.

### 3.2 `render_chart`

**Description:** Render a chart visualization in the chat interface. Use this when you want to present data visually to the user. You may call this tool multiple times in a single response to show different perspectives.

**Parameters:** A Zod discriminated union:

```ts
z.discriminatedUnion("mode", [
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
])
```

**Returns:**
```ts
{ success: true, chartId: string }
```

---

## 4. Frontend Architecture

### 4.1 New Components

All new components live under `components/charts/`:

- **`ChartRenderer`** (`chart-renderer.tsx`)  
  Receives the `render_chart` tool result. Dispatches to `StructuredChart` if `mode === "structured"`, or `CustomChart` if `mode === "custom"`.

- **`StructuredChart`** (`structured-chart.tsx`)  
  Looks up `chartType` in the `chartRegistry` map and renders the matching component. If `chartType` is not found, renders the `ChartFallback` component.

- **`CustomChart`** (`custom-chart.tsx`)  
  Wraps `echarts-for-react` (or equivalent). Passes `echartsOption` directly to ECharts. Catches render errors and shows `ChartFallback`.

- **`BaseChart`** (`base-chart.tsx`)  
  Shared wrapper providing: dark-theme color palette (consistent with the existing chat UI), responsive container (`width: 100%`, `height: 280px`), and loading state.

- **Individual chart components:**
  - `PieChart.tsx`
  - `BarChart.tsx`
  - `LineChart.tsx`
  - `AreaChart.tsx`
  - `DonutChart.tsx`
  - `HeatmapChart.tsx`
  - `TreemapChart.tsx`
  - `WaterfallChart.tsx`
  - `RadarChart.tsx`

- **`ChartFallback`** (`chart-fallback.tsx`)  
  Shown when a chart fails to render. Displays: "The assistant tried to show a chart, but the data format isn't supported." with a collapsible raw JSON view of the input data.

### 4.2 Chart Registry

```ts
// lib/charts/registry.ts
import { PieChart } from "@/components/charts/PieChart";
import { BarChart } from "@/components/charts/BarChart";
// ... etc

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

### 4.3 Chat Integration

Chart cards render **inline in chat messages**, below the AI's markdown text. They use the same card styling as existing `StructuredResult` cards (rounded-xl, border, dark background).

**Important distinction:** For data-fetching tools (e.g., `get_balance`), the frontend reads the tool **result** to get the data. For `render_chart`, the frontend reads the tool **arguments** (`args`) because that is where the chart configuration (`title`, `data`, `echartsOption`, etc.) lives. The tool result is only an acknowledgment (`{ success: true, chartId: string }`).

In `components/chat/chat-message-list.tsx`, extend `getStructuredResultsFromMessage` to handle `render_chart` tool invocations:
- Read `invocation.args` (not `invocation.result`) when `toolName === "render_chart"`.
- Produce a new `StructuredResult` type: `{ type: "chart", payload: ChartPayload }`.

In `components/chat/structured-result.tsx`, add a new branch:
```ts
if (data.type === "chart") {
  return <ChartRenderer data={data.payload} />;
}
```

### 4.4 Type Extensions

Update `lib/types/chat.ts`:

```ts
export type ChartPayload =
  | { mode: "structured"; chartType: string; title: string; description?: string; data: Array<Record<string, any>> }
  | { mode: "custom"; title: string; description?: string; echartsOption: Record<string, any> };

export type StructuredResult =
  | { type: "balance"; balance: number; currency: string }
  | { type: "transactions"; items: Array<{ id: string; merchant: string; amount: number; direction: "debit" | "credit"; postedAt: string }> }
  | { type: "spending"; monthLabel: string; total: number; topCategory: string; comparisonText: string }
  | { type: "action-preview"; actionId: string; actionType: "transfer" | "freeze-card" | "unfreeze-card"; summary: string; confirmLabel: string; cancelLabel: string }
  | { type: "status"; tone: "success" | "error" | "info"; summary: string }
  | { type: "chart"; payload: ChartPayload };
```

---

## 5. Data Flow

1. User asks a question about investments (e.g., *"How is my portfolio doing?"*).
2. AI decides to call `get_investment_portfolio` to fetch the full dataset.
3. AI analyzes the data and decides which chart(s) best tell the story.
4. AI calls `render_chart` one or more times with the appropriate schema.
5. Frontend receives the tool invocation results and renders chart card(s) inline in the assistant's chat message.
6. AI's natural language text streams above/below the charts, narrating the insights.

---

## 6. Error Handling

| Scenario | Behavior |
|---|---|
| Unknown `chartType` in structured mode | `StructuredChart` renders `ChartFallback` with friendly message + collapsible raw JSON. |
| Malformed `data` shape | Same fallback as above. |
| Invalid `echartsOption` in custom mode | `CustomChart` catches ECharts initialization/render error and renders `ChartFallback`. |
| AI does not call `render_chart` | Chat behaves exactly as it does today — no visual change. |

---

## 7. Dependencies

Add to `package.json`:
- `echarts` — Apache ECharts core library.
- `echarts-for-react` — React wrapper for ECharts.

No other new dependencies required.

---

## 8. Testing Strategy

### 8.1 Unit Tests
- Test `ChartRenderer` dispatch logic (structured vs custom).
- Test `chartRegistry` resolution (valid and unknown chart types).
- Test `ChartFallback` renders when registry lookup fails.

### 8.2 Component Tests
- For each chart type in the registry, test that the component renders without crashing when given valid sample data.
- Test dark-theme color application via `BaseChart`.

### 8.3 Integration / E2E Test
- Playwright test: user sends *"Show me my portfolio"*.
- Assert that chart cards appear in the DOM.
- Assert that at least one chart card has a title matching the expected AI-generated title.

---

## 9. Open Questions / Future Work

- **Real data source:** This design uses mock data. If a real portfolio API is added later, only `lib/mock-data/portfolio.ts` and the `get_investment_portfolio` tool executor need to change.
- **Chart interactivity:** ECharts supports drill-down, zoom, and tooltip customization. These can be enabled later in `BaseChart` or individual chart components without changing the architecture.
- **Export / download:** ECharts supports image export. A download button could be added to `BaseChart` in a future iteration.
