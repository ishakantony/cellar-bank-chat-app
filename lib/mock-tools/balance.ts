import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function getBalance() {
  return {
    balance: DEMO_ACCOUNT.balance,
    currency: DEMO_ACCOUNT.currency,
    accountName: DEMO_ACCOUNT.accountName,
  };
}
