import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function AccountSummaryCard() {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-900 p-5 shadow-lg">
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
        Primary Account
      </p>
      <h2 className="mt-1 text-lg font-semibold text-white">
        {DEMO_ACCOUNT.accountName}
      </h2>
      <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-white">
        {DEMO_ACCOUNT.currency}{" "}
        {DEMO_ACCOUNT.balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </p>
      <p className="mt-1 text-xs text-neutral-500">
        {DEMO_ACCOUNT.cardLabel}
      </p>
    </div>
  );
}
