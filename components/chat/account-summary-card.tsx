import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function AccountSummaryCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-slate-500">Primary Account</p>
      <h2 className="text-lg font-medium text-slate-900">{DEMO_ACCOUNT.accountName}</h2>
      <p className="mt-1 text-2xl font-semibold text-slate-950">
        {DEMO_ACCOUNT.currency} {DEMO_ACCOUNT.balance.toLocaleString()}
      </p>
      <p className="text-xs text-slate-400">{DEMO_ACCOUNT.cardLabel}</p>
    </div>
  );
}
