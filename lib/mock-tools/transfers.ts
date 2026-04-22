import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function createTransferPreview({
  amount,
  recipientName,
}: {
  amount: number;
  recipientName: string;
}) {
  return {
    status: "preview" as const,
    executed: false,
    actionId: "transfer_preview_001",
    summary: `Transfer RM ${amount.toFixed(2)} from ${DEMO_ACCOUNT.accountName} to ${recipientName}.`,
    amount,
    recipientName,
    currency: DEMO_ACCOUNT.currency,
    sourceAccountName: DEMO_ACCOUNT.accountName,
  };
}

export function executeTransfer({ actionId }: { actionId: string }) {
  return {
    status: "completed" as const,
    actionId,
    executed: true,
    confirmationText: "Transfer completed successfully.",
  };
}
