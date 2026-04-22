import {
  createCardStatusPreview,
  createTransferPreview,
  executeCardStatusChange,
  executeTransfer,
  getBalance,
  listRecentTransactions,
  summarizeSpending,
} from "@/lib/mock-tools";

export const TOOL_MAP: Record<string, (input?: any) => any> = {
  get_balance: getBalance,
  list_recent_transactions: listRecentTransactions,
  summarize_spending: summarizeSpending,
  create_transfer_preview: createTransferPreview,
  execute_transfer: executeTransfer,
  create_card_status_preview: createCardStatusPreview,
  execute_card_status_change: executeCardStatusChange,
};

export function executeTool(toolName: string, input?: any) {
  const tool = TOOL_MAP[toolName];
  if (!tool) {
    throw new Error(`Unsupported tool: ${toolName}`);
  }
  return tool(input);
}
