import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function summarizeSpending() {
  const debitTransactions = DEMO_ACCOUNT.transactions.filter((t) => t.direction === "debit");
  const total = debitTransactions.reduce((sum, t) => sum + t.amount, 0);

  const categoryMap = new Map<string, number>();
  for (const t of debitTransactions) {
    categoryMap.set(t.merchant, (categoryMap.get(t.merchant) ?? 0) + t.amount);
  }
  const topCategory = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Unknown";

  return {
    monthLabel: "April 2026",
    total,
    topCategory,
    comparisonText: "You spent 12% less than last month.",
    summary: `You spent RM ${total.toFixed(2)} this month. Top merchant: ${topCategory}.`,
  };
}
