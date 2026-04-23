import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/suggestions/route";

describe("POST /api/suggestions", () => {
  it("returns suggestions when tool invocations are present", async () => {
    const response = await POST(
      new Request("http://localhost/api/suggestions", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            { role: "user", content: "Help me with my account" },
            {
              role: "assistant",
              content: "Your balance is RM 5,000.",
              toolInvocations: [
                { toolName: "get_balance", state: "result" },
              ],
            },
          ],
        }),
      })
    );

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(Array.isArray(json.suggestions)).toBe(true);
    expect(json.suggestions.length).toBeGreaterThan(0);
    expect(json.suggestions.length).toBeLessThanOrEqual(3);
    // All returned suggestions should be from the get_balance pool or universal pool
    const validSuggestions = [
      "What's my savings account balance?",
      "Show me my total net worth",
      "How much did I spend this month?",
      "Show me my account breakdown",
      "Show my account summary",
      "What can you help me with?",
    ];
    for (const suggestion of json.suggestions) {
      expect(validSuggestions).toContain(suggestion);
    }
  });

  it("returns universal suggestions when no tool invocations are present", async () => {
    const response = await POST(
      new Request("http://localhost/api/suggestions", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            { role: "user", content: "Hello" },
            { role: "assistant", content: "Hello! How can I help?" },
          ],
        }),
      })
    );

    expect(response.status).toBe(200);
    const json = await response.json();
    // Universal suggestions are always included even without tool invocations
    expect(json.suggestions.length).toBeGreaterThan(0);
    expect(json.suggestions).toContain("Show my account summary");
    expect(json.suggestions).toContain("What can you help me with?");
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
});
