import { describe, expect, it, vi } from "vitest";

const mockCreate = vi.fn();

vi.mock("@/lib/ai/openai-client", () => ({
  createOpenAIClient: () => ({
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  }),
}));

vi.mock("@/lib/ai/ai-client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/ai/ai-client")>();
  return {
    ...actual,
    getModelConfig: () => ({ model: "test-model", useLLMForAll: true }),
  };
});

import { POST } from "@/app/api/chat/route";

describe("chat LLM mode with tool execution", () => {
  it("executes get_balance tool and returns structured data", async () => {
    mockCreate
      .mockResolvedValueOnce({
        choices: [
          {
            finish_reason: "tool_calls",
            message: {
              content: null,
              tool_calls: [
                {
                  id: "call_1",
                  type: "function",
                  function: {
                    name: "get_balance",
                    arguments: "{}",
                  },
                },
              ],
            },
          },
        ],
      })
      .mockResolvedValueOnce({
        choices: [
          {
            finish_reason: "stop",
            message: { content: "Your balance is RM 8,420.15." },
          },
        ],
      });

    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "What's my balance?" }),
      }),
    );

    const json = await response.json();
    expect(json.reply).toContain("RM 8,420.15");
    expect(json.data.type).toBe("balance");
    expect(json.data.balance).toBe(8420.15);
    expect(mockCreate).toHaveBeenCalledTimes(2);
  });

  it("executes create_transfer_preview tool and returns action preview", async () => {
    mockCreate
      .mockResolvedValueOnce({
        choices: [
          {
            finish_reason: "tool_calls",
            message: {
              content: null,
              tool_calls: [
                {
                  id: "call_2",
                  type: "function",
                  function: {
                    name: "create_transfer_preview",
                    arguments: JSON.stringify({ amount: 100, recipientName: "Ali" }),
                  },
                },
              ],
            },
          },
        ],
      })
      .mockResolvedValueOnce({
        choices: [
          {
            finish_reason: "stop",
            message: { content: "I've prepared a transfer preview for you." },
          },
        ],
      });

    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Send RM 100 to Ali" }),
      }),
    );

    const json = await response.json();
    expect(json.reply).toContain("preview");
    expect(json.data.type).toBe("action-preview");
    expect(json.data.actionType).toBe("transfer");
    expect(json.pendingAction.kind).toBe("transfer");
  });
});
