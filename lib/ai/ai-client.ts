import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool, type Message } from "ai";
import { z } from "zod";
import {
  createCardStatusPreview,
  createTransferPreview,
  executeCardStatusChange,
  executeTransfer,
  getBalance,
  listRecentTransactions,
  summarizeSpending,
} from "@/lib/mock-tools";

export function getModelConfig() {
  return {
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  };
}

const SYSTEM_MESSAGE = `You are the Cellar Bank AI assistant, a helpful and knowledgeable banking assistant for Cellar Bank.
You can help customers with a wide range of banking tasks, including looking up account information (balances, recent transactions, spending summaries), making transactions (initiating transfers), and managing their cards (freeze or unfreeze).
Always use the available tools when users ask about their account or request actions. For transfers and card status changes, always create a preview first and ask for explicit user confirmation before executing.`;

const bankingTools = {
  get_balance: tool({
    description: "Get the current balance for the signed-in user's main account.",
    parameters: z.object({}),
    execute: async () => getBalance(),
  }),
  list_recent_transactions: tool({
    description: "List the most recent transactions for the signed-in user's main account.",
    parameters: z.object({}),
    execute: async () => listRecentTransactions(),
  }),
  summarize_spending: tool({
    description: "Summarize current month spending from mock transaction data.",
    parameters: z.object({}),
    execute: async () => summarizeSpending(),
  }),
  create_transfer_preview: tool({
    description: "Create a transfer preview without executing the transfer. Always use this first before executing a transfer.",
    parameters: z.object({
      amount: z.number().describe("Amount to transfer"),
      recipientName: z.string().describe("Name of the recipient"),
    }),
    execute: async ({ amount, recipientName }) =>
      createTransferPreview({ amount, recipientName }),
  }),
  execute_transfer: tool({
    description: "Execute a previously previewed transfer after explicit user confirmation. Only call this when the user explicitly confirms a pending transfer.",
    parameters: z.object({
      actionId: z.string().describe("The actionId from the transfer preview"),
    }),
    execute: async ({ actionId }) => executeTransfer({ actionId }),
  }),
  create_card_status_preview: tool({
    description: "Create a card status change preview without executing it. Always use this first before changing card status.",
    parameters: z.object({
      action: z.enum(["freeze", "unfreeze"]).describe("Whether to freeze or unfreeze the card"),
    }),
    execute: async ({ action }) => createCardStatusPreview({ action }),
  }),
  execute_card_status_change: tool({
    description: "Execute a previously previewed card status change after explicit user confirmation. Only call this when the user explicitly confirms a pending card status change.",
    parameters: z.object({
      actionId: z.string().describe("The actionId from the card status preview"),
    }),
    execute: async ({ actionId }) => executeCardStatusChange({ actionId }),
  }),
};

export interface StreamAIResponseOptions {
  messages: Array<Omit<Message, "id">>;
}

export async function streamAIResponse(options: StreamAIResponseOptions) {
  const { model, apiKey, baseURL } = getModelConfig();

  const openai = createOpenAI({
    apiKey,
    baseURL,
    compatibility: "compatible",
  });

  return streamText({
    model: openai(model),
    system: SYSTEM_MESSAGE,
    messages: options.messages,
    tools: bankingTools,
    toolChoice: "auto",
    maxSteps: 5,
  });
}
