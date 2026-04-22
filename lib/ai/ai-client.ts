import { createOpenAIClient } from "./openai-client";
import { executeTool } from "./tool-executor";

export function getModelConfig() {
  return {
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    useLLMForAll: process.env.USE_LLM_FOR_ALL === "true",
  };
}

const BANKING_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "get_balance",
      description: "Get the current balance for the signed-in user's main account.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "list_recent_transactions",
      description: "List the most recent transactions for the signed-in user's main account.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "summarize_spending",
      description: "Summarize current month spending from mock transaction data.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "create_transfer_preview",
      description: "Create a transfer preview without executing the transfer. Always use this first before executing a transfer.",
      parameters: {
        type: "object",
        properties: {
          amount: { type: "number", description: "Amount to transfer" },
          recipientName: { type: "string", description: "Name of the recipient" },
        },
        required: ["amount", "recipientName"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "execute_transfer",
      description: "Execute a previously previewed transfer after explicit user confirmation. Only call this when the user explicitly confirms a pending transfer.",
      parameters: {
        type: "object",
        properties: {
          actionId: { type: "string", description: "The actionId from the transfer preview" },
        },
        required: ["actionId"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "create_card_status_preview",
      description: "Create a card status change preview without executing it. Always use this first before changing card status.",
      parameters: {
        type: "object",
        properties: {
          action: { type: "string", enum: ["freeze", "unfreeze"], description: "Whether to freeze or unfreeze the card" },
        },
        required: ["action"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "execute_card_status_change",
      description: "Execute a previously previewed card status change after explicit user confirmation. Only call this when the user explicitly confirms a pending card status change.",
      parameters: {
        type: "object",
        properties: {
          actionId: { type: "string", description: "The actionId from the card status preview" },
        },
        required: ["actionId"],
        additionalProperties: false,
      },
    },
  },
];

const SYSTEM_MESSAGE = `You are a helpful banking assistant for a Malaysian bank. 
Help users with their banking needs including checking balances, viewing transactions, summarizing spending, and initiating transfers or card status changes.
Always use the available tools when users ask about their account. For transfers and card status changes, always create a preview first and ask for user confirmation before executing.`;

export interface ToolResult {
  name: string;
  result: any;
}

export interface GenerateAIResponseResult {
  text: string;
  toolResults: ToolResult[];
}

export async function generateAIResponse(
  message: string,
  options?: {
    history?: Array<{ role: string; content: string }>;
  }
): Promise<GenerateAIResponseResult> {
  const client = createOpenAIClient();
  const { model } = getModelConfig();

  const messages: any[] = [
    { role: "system", content: SYSTEM_MESSAGE },
  ];

  if (options?.history) {
    messages.push(...options.history);
  }

  messages.push({ role: "user", content: message });

  const MAX_TOOL_ITERATIONS = 5;
  const toolResults: ToolResult[] = [];

  for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
    const response = await client.chat.completions.create({
      model,
      messages,
      tools: BANKING_TOOLS,
      tool_choice: "auto",
    });

    const choice = response.choices[0];

    if (choice.finish_reason !== "tool_calls" || !choice.message.tool_calls) {
      return {
        text: choice.message.content ?? "I could not complete that request.",
        toolResults,
      };
    }

    // Add assistant message with tool calls
    messages.push(choice.message);

    for (const toolCall of choice.message.tool_calls) {
      if (toolCall.type !== "function") continue;
      const toolName = toolCall.function.name;
      const toolArgs = JSON.parse(toolCall.function.arguments);
      const result = executeTool(toolName, toolArgs);

      toolResults.push({ name: toolName, result });

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
  }

  return {
    text: "I couldn't complete that request. Please try again.",
    toolResults,
  };
}
