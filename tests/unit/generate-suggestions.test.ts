import { describe, expect, it, vi } from "vitest";

const mockGenerateText = vi.fn();

vi.mock("ai", async (importOriginal) => {
  const actual = await importOriginal<typeof import("ai")>();
  return {
    ...actual,
    generateText: (...args: any[]) => mockGenerateText(...args),
  };
});

vi.mock("@ai-sdk/openai", () => ({
  createOpenAI: () => (model: string) => ({ id: model }),
}));

import { generateSuggestions } from "@/lib/ai/ai-client";

describe("generateSuggestions", () => {
  it("returns parsed suggestions when model returns valid JSON array", async () => {
    mockGenerateText.mockResolvedValue({
      text: '["What is my balance?", "Show my transactions", "Spending summary"]',
    });

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual([
      "What is my balance?",
      "Show my transactions",
      "Spending summary",
    ]);
  });

  it("returns empty array when model returns invalid JSON", async () => {
    mockGenerateText.mockResolvedValue({ text: "not valid json" });

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual([]);
  });

  it("returns empty array when model returns a JSON object instead of array", async () => {
    mockGenerateText.mockResolvedValue({
      text: '{"suggestions": ["What is my balance?"]}',
    });

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual([]);
  });

  it("filters non-string items and limits to 3", async () => {
    mockGenerateText.mockResolvedValue({
      text: '["Valid", 123, null, "Also valid", "Extra", "Another extra"]',
    });

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual(["Valid", "Also valid", "Extra"]);
  });

  it("cleans markdown code blocks from response", async () => {
    mockGenerateText.mockResolvedValue({
      text: '```json\n["What is my balance?", "Show my transactions"]\n```',
    });

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual(["What is my balance?", "Show my transactions"]);
  });

  it("returns empty array when generateText throws", async () => {
    mockGenerateText.mockRejectedValue(new Error("model error"));

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual([]);
  });
});
