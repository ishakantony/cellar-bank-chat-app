import type { StructuredResult } from "@/lib/types/chat";
import { ChartRenderer } from "@/components/charts/chart-renderer";

export function StructuredResult({ data }: { data: StructuredResult }) {
  if (data.type === "balance") {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
          Balance
        </p>
        <p className="mt-1 text-xl font-semibold text-emerald-300">
          {data.currency} {data.balance.toLocaleString()}
        </p>
      </div>
    );
  }

  if (data.type === "transactions") {
    return (
      <div className="rounded-xl border border-white/5 bg-chat-surface p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
          Recent Transactions
        </p>
        <ul className="space-y-3">
          {data.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-neutral-300">{item.merchant}</span>
              <span
                className={
                  item.direction === "credit"
                    ? "text-emerald-400"
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
      <div className="rounded-xl border border-white/5 bg-chat-surface p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
          {data.monthLabel} Spending
        </p>
        <p className="mt-1 text-xl font-semibold text-white">
          RM {data.total.toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-neutral-300">Top: {data.topCategory}</p>
        <p className="mt-0.5 text-xs text-neutral-500">{data.comparisonText}</p>
      </div>
    );
  }

  if (data.type === "action-preview") {
    return (
      <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 p-4">
        <p className="text-sm font-medium text-amber-200">{data.summary}</p>
      </div>
    );
  }

  if (data.type === "status") {
    if (data.tone === "info") {
      return null;
    }

    const toneClasses =
      data.tone === "success"
        ? "border-emerald-500/20 bg-emerald-950/30 text-emerald-300"
        : "border-rose-500/20 bg-rose-950/30 text-rose-300";

    return (
      <div className={`rounded-xl border p-4 ${toneClasses}`}>
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
      <div className="rounded-xl border border-white/5 bg-chat-surface p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
          Investment Portfolio
        </p>
        <p className="mt-1 text-xl font-semibold text-white">
          {s.currency} {s.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className={`mt-0.5 text-sm font-medium ${pnlPositive ? "text-emerald-400" : "text-rose-400"}`}>
          {pnlPositive ? "+" : ""}
          {s.unrealizedPnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({pnlPositive ? "+" : ""}
          {s.unrealizedPnlPercent}%)
        </p>

        <div className="mt-3 space-y-2">
          {s.topHoldings.map((h) => (
            <div key={h.name} className="flex items-center justify-between text-sm">
              <span className="text-neutral-300">{h.name}</span>
              <span className="text-neutral-400">
                {s.currency} {h.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-3 border-t border-white/5 pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-500">Beta</p>
            <p className="text-sm font-medium text-neutral-200">{s.riskMetrics.beta}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-500">Volatility</p>
            <p className="text-sm font-medium text-neutral-200">{s.riskMetrics.volatility}%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-500">Sharpe</p>
            <p className="text-sm font-medium text-neutral-200">{s.riskMetrics.sharpeRatio}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
