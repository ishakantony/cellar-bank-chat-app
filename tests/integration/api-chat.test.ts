import { describe, expect, it, vi } from "vitest";

const mockStreamAIResponse = vi.fn();

vi.mock("@/lib/ai/ai-client", () => ({
  streamAIResponse: (...args: unknown[]) => mockStreamAIResponse(...args),
}));

import { POST } from "@/app/api/chat/route";

describe("POST /api/chat", () => {
  it("returns a data stream response on success", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('0:"Hello from the model"\n'));
        controller.close();
      },
    });

    mockStreamAIResponse.mockResolvedValue({
      toDataStreamResponse: () =>
        new Response(stream, {
          headers: { "Content-Type": "text/event-stream" },
        }),
    });

    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: "What's my balance?" }],
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/event-stream");

    const reader = response.body?.getReader();
    const result = await reader?.read();
    expect(result?.done).toBe(false);
  });

  it("returns safe fallback messaging when the model fails", async () => {
    mockStreamAIResponse.mockRejectedValue(new Error("upstream unavailable"));

    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: "Help me plan a budget" }],
        }),
      })
    );

    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.error).toMatch(/couldn't complete that safely right now/i);
  });
});
