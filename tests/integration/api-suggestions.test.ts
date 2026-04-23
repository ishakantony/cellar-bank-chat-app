import { describe, expect, it, vi } from "vitest";

const mockGenerateText = vi.fn();
const mockCreateOpenAI = vi.fn(() => vi.fn(() => ({ id: "mock-model" })));

vi.mock("ai", () => ({
  generateText: (...args: any[]) => mockGenerateText(...args),
}));

vi.mock("@ai-sdk/openai", () => ({
  createOpenAI: (...args: any[]) => mockCreateOpenAI(...args),
}));

import { POST } from "@/app/api/suggestions/route";

describe("POST /api/suggestions", () => {
  it("returns 3 suggestions when model responds with valid JSON", async () => {
    mockGenerateText.mockResolvedValue({
      text: '["What is my balance?", "How do I transfer money?", "Show my recent transactions"]',
    });

    const response = await POST(
      new Request("http://localhost/api/suggestions", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: "Help me with my account" }],
        }),
      })
    );

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.suggestions).toHaveLength(3);
    expect(json.suggestions[0]).toBe("What is my balance?");
    expect(json.suggestions[1]).toBe("How do I transfer money?");
    expect(json.suggestions[2]).toBe("Show my recent transactions");
  });

  it("returns empty array when model responds with invalid JSON", async () => {
    mockGenerateText.mockResolvedValue({
      text: "not valid json",
    });

    const response = await POST(
      new Request("http://localhost/api/suggestions", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: "Hello" }],
        }),
      })
    );

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.suggestions).toEqual([]);
  });

  it("returns 400 with empty array when request validation fails", async () => {
    const response = await POST(
      new Request("http://localhost/api/suggestions", {
        method: "POST",
        body: JSON.stringify({ invalid: "body" }),
      })
    );

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.suggestions).toEqual([]);
  });

  it("returns 500 with empty array when model API throws an error", async () => {
    mockGenerateText.mockRejectedValue(new Error("model unavailable"));

    const response = await POST(
      new Request("http://localhost/api/suggestions", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: "Hello" }],
        }),
      })
    );

    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.suggestions).toEqual([]);
  });
});
