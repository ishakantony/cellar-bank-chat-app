import { NextResponse } from "next/server";
import {
  createCardStatusPreview,
  createTransferPreview,
  executeCardStatusChange,
  executeTransfer,
  getBalance,
  listRecentTransactions,
  summarizeSpending,
} from "@/lib/mock-tools";

export async function POST(request: Request) {
  const { toolName, input } = await request.json();

  const result =
    toolName === "get_balance"
      ? getBalance()
      : toolName === "list_recent_transactions"
        ? listRecentTransactions()
        : toolName === "summarize_spending"
          ? summarizeSpending()
          : toolName === "create_transfer_preview"
            ? createTransferPreview(input)
            : toolName === "execute_transfer"
              ? executeTransfer(input)
              : toolName === "create_card_status_preview"
                ? createCardStatusPreview(input)
                : toolName === "execute_card_status_change"
                  ? executeCardStatusChange(input)
                  : null;

  if (!result) {
    return NextResponse.json(
      { error: `Unsupported tool: ${toolName}` },
      { status: 400 },
    );
  }

  return NextResponse.json({ result });
}
