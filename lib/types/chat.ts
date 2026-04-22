export type StructuredResultType =
  | "balance"
  | "transactions"
  | "spending"
  | "action-preview"
  | "status"
  | "chart"
  | "portfolio";

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

export type PortfolioSummary = {
  totalValue: number;
  totalCost: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  currency: string;
  topHoldings: Array<{ name: string; value: number; pnlPercent: number }>;
  riskMetrics: { beta: number; volatility: number; sharpeRatio: number };
};

export type StructuredResult =
  | { type: "balance"; balance: number; currency: string }
  | { type: "transactions"; items: Array<{ id: string; merchant: string; amount: number; direction: "debit" | "credit"; postedAt: string }> }
  | { type: "spending"; monthLabel: string; total: number; topCategory: string; comparisonText: string }
  | { type: "action-preview"; actionId: string; actionType: "transfer" | "freeze-card" | "unfreeze-card"; summary: string; confirmLabel: string; cancelLabel: string }
  | { type: "status"; tone: "success" | "error" | "info"; summary: string }
  | { type: "chart"; payload: ChartPayload }
  | { type: "portfolio"; summary: PortfolioSummary };

export type PendingAction =
  | {
      id: string;
      kind: "transfer";
      recipientName: string;
      amount: number;
      currency: string;
      sourceAccountName: string;
      previewText: string;
    }
  | {
      id: string;
      kind: "freeze-card" | "unfreeze-card";
      cardLabel: string;
      previewText: string;
    };
