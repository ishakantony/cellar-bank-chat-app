export const DEMO_ACCOUNT = {
  userId: "user_demo_001",
  userName: "Ishak",
  accountId: "acct_primary_001",
  accountName: "Everyday Savings",
  currency: "MYR",
  balance: 8420.15,
  cardLabel: "Visa ending 4242",
  transactions: [
    { id: "txn_1", merchant: "Village Grocer", amount: 142.8, direction: "debit", postedAt: "2026-04-20" },
    { id: "txn_2", merchant: "Salary", amount: 5200, direction: "credit", postedAt: "2026-04-18" },
    { id: "txn_3", merchant: "Petron", amount: 80, direction: "debit", postedAt: "2026-04-16" },
    { id: "txn_4", merchant: "Grab", amount: 24.5, direction: "debit", postedAt: "2026-04-15" },
    { id: "txn_5", merchant: "Netflix", amount: 55, direction: "debit", postedAt: "2026-04-12" },
  ],
};
