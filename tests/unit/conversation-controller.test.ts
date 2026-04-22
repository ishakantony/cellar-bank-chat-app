// tests/unit/conversation-controller.test.ts
import { describe, expect, it } from "vitest";
import { EMPTY_CONVERSATION_STATE, SUGGESTED_PROMPTS } from "@/lib/chat/constants";

describe("chat constants", () => {
  it("starts without a pending action and with demo prompts", () => {
    expect(EMPTY_CONVERSATION_STATE.pendingAction).toBeNull();
    expect(SUGGESTED_PROMPTS).toContain("What's my balance?");
  });
});
