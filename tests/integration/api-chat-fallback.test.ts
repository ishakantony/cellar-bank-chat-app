import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/ai/openai-client", () => ({
  createOpenAIClient: () => {
    throw new Error("upstream unavailable");
  },
}));

import { POST } from "@/app/api/chat/route";

describe("chat fallback", () => {
  it("returns safe fallback messaging when the model fails", async () => {
    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Help me plan a budget" }),
      }),
    );
    const json = await response.json();

    expect(json.reply).toMatch(/couldn't complete that safely right now/i);
    expect(json.data.tone).toBe("error");
  });
});
