import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool, type Message } from "ai";
import { z } from "zod";
import {
  createCardStatusPreview,
  createTransferPreview,
  executeCardStatusChange,
  executeTransfer,
  getBalance,
  getInvestmentPortfolio,
  listRecentTransactions,
  renderChart,
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
You can help customers with a wide range of banking tasks, including looking up account information (balances, recent transactions, spending summaries), making transactions (initiating transfers), managing their cards (freeze or unfreeze), and reviewing investment portfolios.
When users ask about their investments or portfolio, call get_investment_portfolio to retrieve the data, then use render_chart to visualize the most relevant insights. You may render multiple charts in a single response to tell a complete story.
When calling render_chart, always provide: mode (either "structured" or "custom"), title, and the appropriate fields for that mode. For structured mode, provide chartType and data. For custom mode, provide echartsOption.
Always use the available tools when users ask about their account or request actions. For transfers and card status changes, always create a preview first and ask for explicit user confirmation before executing.
Format your responses using basic markdown only: bold (**text**), italic (*text*), paragraphs, and bullet lists. Do not use headings, tables, code blocks, or other advanced formatting.`;

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
  get_investment_portfolio: tool({
    description: "Get the current investment portfolio holdings, performance, and risk metrics for the signed-in user.",
    parameters: z.object({}),
    execute: async () => getInvestmentPortfolio(),
  }),
  render_chart: tool({
    description: "Render a chart visualization in the chat interface. Use this when you want to present data visually to the user. You may call this tool multiple times in a single response to show different perspectives. For structured charts, set mode to 'structured' and provide chartType and data. For custom ECharts configs, set mode to 'custom' and provide echartsOption.",
    parameters: z.object({
      mode: z.enum(["structured", "custom"]).describe("Whether to use a pre-defined chart type or a custom ECharts config"),
      chartType: z.enum(["pie", "bar", "line", "area", "donut", "heatmap", "treemap", "waterfall", "radar"]).optional().describe("Chart type for structured mode (required when mode is 'structured')"),
      title: z.string().describe("Chart title"),
      description: z.string().optional().describe("Optional narrative caption"),
      data: z.array(z.record(z.any())).optional().describe("Chart data for structured mode (required when mode is 'structured')"),
      echartsOption: z.record(z.any()).optional().describe("Raw ECharts option object for custom mode (required when mode is 'custom')"),
    }),
    execute: async () => renderChart(),
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
