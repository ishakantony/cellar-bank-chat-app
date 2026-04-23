import { createOpenAI } from "@ai-sdk/openai";
import { generateText, streamText, tool, type Message } from "ai";
import { z } from "zod";
import {
  createCardStatusPreview,
  createTransferPreview,
  executeCardStatusChange,
  executeTransfer,
  getBalance,
  getInvestmentPortfolio,
  listRecentTransactions,
  renderCustomChart,
  renderStructuredChart,
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

PORTFOLIO QUESTIONS:
When a user asks about their investment portfolio or stocks, call get_investment_portfolio ONE time. This tool returns the portfolio data along with pre-computed charts that are automatically displayed to the user. After calling the tool, provide a brief narrative summary of the insights in your text response.

For follow-up questions about specific aspects (e.g., "show me a heatmap" or "compare two stocks"), you can use render_structured_chart or render_custom_chart to create additional visualizations.

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
    description: "Get the current investment portfolio including holdings, performance, risk metrics, and pre-computed chart visualizations. Call this once when the user asks about investments. Charts are rendered automatically.",
    parameters: z.object({}),
    execute: async () => getInvestmentPortfolio(),
  }),
  render_structured_chart: tool({
    description: "Render a pre-defined chart (pie, bar, line, area, donut, heatmap, treemap, waterfall, radar) for follow-up visualization requests. Not needed for the initial portfolio overview.",
    parameters: z.object({
      chartType: z.enum(["pie", "bar", "line", "area", "donut", "heatmap", "treemap", "waterfall", "radar"]).describe("The type of chart to render"),
      title: z.string().describe("Chart title displayed above the chart"),
      description: z.string().optional().describe("Optional short caption explaining the chart"),
      data: z.array(z.record(z.any())).describe("Chart data as an array of objects. Each object should have keys matching what the chartType expects (e.g., 'name' and 'value' for pie charts)."),
    }),
    execute: async () => renderStructuredChart(),
  }),
  render_custom_chart: tool({
    description: "Render a custom chart using a raw ECharts configuration object. Use this for advanced or unique visualizations not covered by render_structured_chart.",
    parameters: z.object({
      title: z.string().describe("Chart title displayed above the chart"),
      description: z.string().optional().describe("Optional short caption explaining the chart"),
      echartsOption: z.record(z.any()).describe("A complete ECharts option object (series, xAxis, yAxis, etc.)"),
    }),
    execute: async () => renderCustomChart(),
  }),
};

export interface StreamAIResponseOptions {
  messages: Array<Omit<Message, "id">>;
}

export function generateSuggestions(
  _messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
  candidatePool: string[]
): string[] {
  if (candidatePool.length === 0) {
    return [];
  }

  // Shuffle the candidate pool using Fisher-Yates and return up to 3
  const shuffled = [...candidatePool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 3);
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
