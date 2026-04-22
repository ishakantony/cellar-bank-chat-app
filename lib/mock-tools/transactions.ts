import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function listRecentTransactions() {
  return {
    items: DEMO_ACCOUNT.transactions,
  };
}
