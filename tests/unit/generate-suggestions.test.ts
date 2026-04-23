import { describe, expect, it, vi } from "vitest";

const mockGenerateObject = vi.fn();

vi.mock("ai", async (importOriginal) => {
  const actual = await importOriginal<typeof import("ai")>();
  return {
    ...actual,
    generateObject: (...args: any[]) => mockGenerateObject(...args),
  };
});

vi.mock("@ai-sdk/openai", () => ({
  createOpenAI: () => (model: string) => ({ id: model }),
}));

import { generateSuggestions } from "@/lib/ai/ai-client";

describe("generateSuggestions", () => {
  it("returns suggestions when model returns valid object", async () => {
    mockGenerateObject.mockResolvedValue({
      object: {
        suggestions: [
          "Show me my recent transactions",
          "What did I spend this month?",
          "How is my portfolio doing?",
        ],
      },
    });

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual([
      "Show me my recent transactions",
      "What did I spend this month?",
      "How is my portfolio doing?",
    ]);
  });

  it("limits to 3 suggestions even if model returns more", async () => {
    mockGenerateObject.mockResolvedValue({
      object: {
        suggestions: [
          "Show me my recent transactions",
          "What did I spend this month?",
          "How is my portfolio doing?",
          "Extra suggestion",
        ],
      },
    });

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      "Show me my recent transactions",
      "What did I spend this month?",
      "How is my portfolio doing?",
    ]);
  });

  it("returns empty array when generateObject throws", async () => {
    mockGenerateObject.mockRejectedValue(new Error("model error"));

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual([]);
  });
});
