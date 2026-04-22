// tests/integration/api-chat.test.ts
import { describe, expect, it, vi } from "vitest";
import { BANKING_TOOLS } from "@/lib/ai/tool-schema";

describe("BANKING_TOOLS", () => {
  it("defines a transfer preview tool separately from execution", () => {
    const toolNames = BANKING_TOOLS.map((tool) => tool.name);

    expect(toolNames).toContain("create_transfer_preview");
    expect(toolNames).toContain("execute_transfer");
  });
});

import { POST as toolsPost } from "@/app/api/tools/route";

describe("POST /api/tools", () => {
  it("returns a transfer preview without executing it", async () => {
    const request = new Request("http://localhost/api/tools", {
      method: "POST",
      body: JSON.stringify({
        toolName: "create_transfer_preview",
        input: { amount: 100, recipientName: "Ali" },
      }),
    });

    const response = await toolsPost(request);
    const json = await response.json();

    expect(json.result.status).toBe("preview");
    expect(json.result.executed).toBe(false);
  });
});

vi.mock("@/lib/ai/openai-client", () => ({
  createOpenAIClient: () => ({
    responses: {
      create: vi.fn().mockResolvedValue({
        output: [
          {
            type: "message",
            content: [{ type: "output_text", text: "Your balance is RM 8,420.15." }],
          },
        ],
      }),
    },
  }),
}));

import { POST as chatPost } from "@/app/api/chat/route";

describe("POST /api/chat", () => {
  it("returns assistant text plus a structured balance result", async () => {
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        message: "What's my balance?",
        sessionId: "sess_001",
        messages: [],
      }),
    });

    const response = await chatPost(request);
    const json = await response.json();

    expect(json.reply).toContain("RM 8,420.15");
    expect(json.data.type).toBe("balance");
  });
});
