import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function AccountSummaryCard() {
  return (
    <div className="w-full rounded-[16px] border border-white/10 bg-[linear-gradient(145deg,rgba(21,32,53,0.96),rgba(11,24,41,0.96))] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.04)]">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/42">
        Primary Account
      </p>
      <h2 className="mt-1 text-lg font-semibold text-white">
        {DEMO_ACCOUNT.accountName}
      </h2>
      <p className="mt-2 text-3xl font-extrabold tabular-nums tracking-tight text-white">
        {DEMO_ACCOUNT.currency}{" "}
        {DEMO_ACCOUNT.balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </p>
      <p className="mt-1 text-xs text-white/35">
        {DEMO_ACCOUNT.cardLabel}
      </p>
    </div>
  );
}
