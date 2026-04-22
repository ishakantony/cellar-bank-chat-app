// tests/unit/conversation-controller.test.ts
import { describe, expect, it } from "vitest";
import { EMPTY_CONVERSATION_STATE, SUGGESTED_PROMPTS } from "@/lib/chat/constants";
import { createConversationController } from "@/lib/chat/conversation-controller";

describe("chat constants", () => {
  it("starts without a pending action and with demo prompts", () => {
    expect(EMPTY_CONVERSATION_STATE.pendingAction).toBeNull();
    expect(SUGGESTED_PROMPTS).toContain("What's my balance?");
  });
});

describe("conversation controller", () => {
  it("replaces an older pending action when a new action preview arrives", () => {
    const controller = createConversationController();

    controller.addAssistantPreview({
      id: "old",
      kind: "transfer",
      recipientName: "Ali",
      amount: 100,
      currency: "MYR",
      sourceAccountName: "Everyday Savings",
      previewText: "Transfer RM 100.00 to Ali",
    });

    controller.addAssistantPreview({
      id: "new",
      kind: "freeze-card",
      cardLabel: "Visa ending 4242",
      previewText: "Freeze Visa ending 4242",
    });

    expect(controller.getState().pendingAction?.id).toBe("new");
  });
});
