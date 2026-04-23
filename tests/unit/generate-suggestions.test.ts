import { describe, expect, it } from "vitest";
import { generateSuggestions } from "@/lib/ai/ai-client";

const CANDIDATE_POOL = [
  "Show me my recent transactions",
  "What did I spend this month?",
  "How is my portfolio doing?",
  "What's my balance?",
  "Send money to a contact",
];

describe("generateSuggestions", () => {
  it("returns empty array when candidate pool is empty", () => {
    const result = generateSuggestions(
      [{ role: "user", content: "Hello" }],
      []
    );

    expect(result).toEqual([]);
  });

  it("returns up to 3 suggestions from the candidate pool", () => {
    const result = generateSuggestions(
      [{ role: "user", content: "Hello" }],
      CANDIDATE_POOL
    );

    expect(result.length).toBeLessThanOrEqual(3);
    expect(result.length).toBeGreaterThan(0);
    // Every returned suggestion must exist in the candidate pool
    for (const suggestion of result) {
      expect(CANDIDATE_POOL).toContain(suggestion);
    }
  });

  it("returns all suggestions when pool has fewer than 3 items", () => {
    const smallPool = ["Only one suggestion"];
    const result = generateSuggestions(
      [{ role: "user", content: "Hello" }],
      smallPool
    );

    expect(result).toEqual(["Only one suggestion"]);
  });

  it("returns exactly 3 when pool has 3 or more items", () => {
    const result = generateSuggestions(
      [{ role: "user", content: "Hello" }],
      CANDIDATE_POOL
    );

    expect(result).toHaveLength(3);
  });

  it("returns different suggestions across calls (probabilistic)", () => {
    const results: string[][] = [];
    for (let i = 0; i < 20; i++) {
      results.push(generateSuggestions([{ role: "user", content: "Hello" }], CANDIDATE_POOL));
    }

    // With 5 items and 20 shuffles, we should see variety
    const uniqueFirstItems = new Set(results.map((r) => r[0]));
    expect(uniqueFirstItems.size).toBeGreaterThan(1);
  });
});
