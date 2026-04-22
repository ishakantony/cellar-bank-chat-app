export const BANKING_TOOLS = [
  {
    type: "function",
    function: {
      name: "get_balance",
      description: "Get the current balance for the signed-in user's main account.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "list_recent_transactions",
      description: "List the most recent transactions for the signed-in user's main account.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "summarize_spending",
      description: "Summarize current month spending from mock transaction data.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "create_transfer_preview",
      description: "Create a transfer preview without executing the transfer.",
      parameters: {
        type: "object",
        properties: {
          amount: { type: "number" },
          recipientName: { type: "string" },
        },
        required: ["amount", "recipientName"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "execute_transfer",
      description: "Execute a previously previewed transfer after explicit user confirmation.",
      parameters: {
        type: "object",
        properties: {
          actionId: { type: "string" },
        },
        required: ["actionId"],
        additionalProperties: false,
      },
    },
  },
];
