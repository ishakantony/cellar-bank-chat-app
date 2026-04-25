import type { StructuredResult } from "@/lib/types/chat";
import { ChartRenderer } from "@/components/charts/chart-renderer";

export function StructuredResult({ data }: { data: StructuredResult }) {
  if (data.type === "balance") {
    return (
      <div className="rounded-[14px] border border-chat-accent/25 bg-chat-accentSoft/55 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.2)]">
        <p className="text-xs font-semibold uppercase tracking-wider text-chat-accent">
          Balance
        </p>
        <p className="mt-1 text-xl font-semibold tabular-nums text-white">
          {data.currency} {data.balance.toLocaleString()}
        </p>
      </div>
    );
  }

  if (data.type === "transactions") {
    return (
      <div className="rounded-[14px] border border-white/10 bg-chat-surface/80 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.2)]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/42">
          Recent Transactions
        </p>
        <ul className="space-y-3">
          {data.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-white/72">{item.merchant}</span>
              <span
                className={
                  item.direction === "credit"
                    ? "text-chat-accent"
                    : "text-white"
                }
              >
                {item.direction === "credit" ? "+" : "-"}
                {item.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (data.type === "spending") {
    return (
      <div className="rounded-[14px] border border-white/10 bg-chat-surface/80 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.2)]">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/42">
          {data.monthLabel} Spending
        </p>
        <p className="mt-1 text-xl font-semibold tabular-nums text-white">
          RM {data.total.toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-white/68">Top: {data.topCategory}</p>
        <p className="mt-0.5 text-xs text-white/35">{data.comparisonText}</p>
      </div>
    );
  }

  if (data.type === "action-preview") {
    return (
      <div className="rounded-[14px] border border-amber-400/25 bg-amber-950/25 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.2)]">
        <p className="text-sm font-medium text-amber-100">{data.summary}</p>
      </div>
    );
  }

  if (data.type === "status") {
    if (data.tone === "info") {
      return null;
    }

    const toneClasses =
      data.tone === "success"
        ? "border-chat-accent/25 bg-chat-accentSoft/55 text-white"
        : "border-rose-400/25 bg-rose-950/25 text-rose-200";

    return (
      <div className={`rounded-[14px] border p-4 shadow-[0_14px_34px_rgba(0,0,0,0.2)] ${toneClasses}`}>
        <p className="text-sm">{data.summary}</p>
      </div>
    );
  }

  if (data.type === "chart") {
    return <ChartRenderer data={data.payload} />;
  }

  if (data.type === "portfolio") {
    const s = data.summary;
    const pnlPositive = s.unrealizedPnl >= 0;
    return (
      <div className="rounded-[14px] border border-white/10 bg-chat-surface/80 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.2)]">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/42">
          Investment Portfolio
        </p>
        <p className="mt-1 text-xl font-semibold tabular-nums text-white">
          {s.currency} {s.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className={`mt-0.5 text-sm font-medium tabular-nums ${pnlPositive ? "text-chat-accent" : "text-rose-300"}`}>
          {pnlPositive ? "+" : ""}
          {s.unrealizedPnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({pnlPositive ? "+" : ""}
          {s.unrealizedPnlPercent}%)
        </p>

        <div className="mt-3 space-y-2">
          {s.topHoldings.map((h) => (
            <div key={h.name} className="flex items-center justify-between text-sm">
              <span className="text-white/72">{h.name}</span>
              <span className="tabular-nums text-white/52">
                {s.currency} {h.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-3 border-t border-white/10 pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/35">Beta</p>
            <p className="text-sm font-medium tabular-nums text-white/78">{s.riskMetrics.beta}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/35">Volatility</p>
            <p className="text-sm font-medium tabular-nums text-white/78">{s.riskMetrics.volatility}%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/35">Sharpe</p>
            <p className="text-sm font-medium tabular-nums text-white/78">{s.riskMetrics.sharpeRatio}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
