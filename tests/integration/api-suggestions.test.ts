import { describe, expect, it, vi } from "vitest";

const mockGenerateSuggestions = vi.fn();

vi.mock("@/lib/ai/ai-client", () => ({
  generateSuggestions: (...args: any[]) => mockGenerateSuggestions(...args),
}));

import { POST } from "@/app/api/suggestions/route";

describe("POST /api/suggestions", () => {
  beforeEach(() => {
    mockGenerateSuggestions.mockReset();
  });

  it("returns suggestions when generateSuggestions returns an array", async () => {
    mockGenerateSuggestions.mockResolvedValue([
      "Show me my recent transactions",
      "What did I spend this month?",
      "How is my portfolio doing?",
    ]);

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
    expect(json.suggestions[0]).toBe("Show me my recent transactions");
  });

  it("returns empty array when generateSuggestions returns an empty array", async () => {
    mockGenerateSuggestions.mockResolvedValue([]);

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

  it("returns 400 with empty array when request body is not valid JSON", async () => {
    const response = await POST(
      new Request("http://localhost/api/suggestions", {
        method: "POST",
        body: "not json",
      })
    );

    expect(response.status).toBe(400);
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

  it("returns 400 with empty array when message role is invalid", async () => {
    const response = await POST(
      new Request("http://localhost/api/suggestions", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "invalid-role", content: "Hello" }],
        }),
      })
    );

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.suggestions).toEqual([]);
  });

  it("returns 500 with empty array when generateSuggestions throws", async () => {
    mockGenerateSuggestions.mockRejectedValue(new Error("model unavailable"));

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
