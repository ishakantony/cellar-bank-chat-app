import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function AccountSummaryCard() {
  return (
    <div className="w-full rounded-[12px] border border-white/10 bg-white/[0.045] px-4 py-3 shadow-inner shadow-white/[0.025]">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/35">
            Primary Account
          </p>
          <h2 className="mt-0.5 truncate text-sm font-medium text-white/78">
            {DEMO_ACCOUNT.accountName}
          </h2>
        </div>
        <p className="shrink-0 text-right text-lg font-semibold tabular-nums tracking-tight text-white">
          {DEMO_ACCOUNT.currency}{" "}
          {DEMO_ACCOUNT.balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
      <p className="mt-2 text-xs text-white/34">
        {DEMO_ACCOUNT.cardLabel}
      </p>
    </div>
  );
}
