import type { StructuredResult } from "@/lib/types/chat";

export function StructuredResult({ data }: { data: StructuredResult }) {
  if (data.type === "balance") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-xs uppercase tracking-wider text-emerald-600">Balance</p>
        <p className="text-xl font-semibold text-emerald-900">
          {data.currency} {data.balance.toLocaleString()}
        </p>
      </div>
    );
  }

  if (data.type === "transactions") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">Recent Transactions</p>
        <ul className="space-y-2">
          {data.items.map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span className="text-slate-700">{item.merchant}</span>
              <span className={item.direction === "credit" ? "text-emerald-600" : "text-slate-900"}>
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
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-wider text-slate-500">{data.monthLabel} Spending</p>
        <p className="text-xl font-semibold text-slate-900">RM {data.total.toFixed(2)}</p>
        <p className="text-sm text-slate-600">Top: {data.topCategory}</p>
        <p className="text-xs text-slate-400">{data.comparisonText}</p>
      </div>
    );
  }

  if (data.type === "action-preview") {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-medium text-amber-900">{data.summary}</p>
      </div>
    );
  }

  if (data.type === "status") {
    return (
      <div
        className={`rounded-xl border p-4 ${
          data.tone === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-900"
            : data.tone === "error"
              ? "border-rose-200 bg-rose-50 text-rose-900"
              : "border-slate-200 bg-slate-50 text-slate-900"
        }`}
      >
        <p className="text-sm">{data.summary}</p>
      </div>
    );
  }

  return null;
}
