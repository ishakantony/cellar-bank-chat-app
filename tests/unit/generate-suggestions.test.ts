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
  beforeEach(() => {
    mockGenerateText.mockReset();
  });

  it("returns parsed suggestions when model returns valid JSON array", async () => {
    mockGenerateText.mockResolvedValue({
      text: '["Show me my recent transactions", "What did I spend this month?", "How is my portfolio doing?"]',
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

  it("returns empty array when model returns invalid JSON", async () => {
    mockGenerateText.mockResolvedValue({ text: "not valid json at all" });

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual([]);
  });

  it("returns suggestions from markdown code block", async () => {
    mockGenerateText.mockResolvedValue({
      text: '```json\n["Show me my recent transactions", "What did I spend this month?"]\n```',
    });

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual([
      "Show me my recent transactions",
      "What did I spend this month?",
    ]);
  });

  it("extracts JSON array from surrounding text", async () => {
    mockGenerateText.mockResolvedValue({
      text: 'Here are your suggestions:\n\n["Show me my recent transactions", "What did I spend this month?", "How is my portfolio doing?"]\n\nHope that helps!',
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

  it("extracts suggestions from JSON object", async () => {
    mockGenerateText.mockResolvedValue({
      text: '{"suggestions": ["Show me my recent transactions", "What did I spend this month?"]}',
    });

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual([
      "Show me my recent transactions",
      "What did I spend this month?",
    ]);
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

  it("returns empty array when generateText throws", async () => {
    mockGenerateText.mockRejectedValue(new Error("model error"));

    const result = await generateSuggestions([
      { role: "user", content: "Hello" },
    ]);

    expect(result).toEqual([]);
  });
});
