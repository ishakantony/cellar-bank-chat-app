// tests/unit/confirmation.test.ts
import { describe, expect, it } from "vitest";
import { applyConfirmationReply } from "@/lib/chat/confirmation";

describe("applyConfirmationReply", () => {
  it("refuses to execute when no pending action exists", () => {
    const result = applyConfirmationReply({
      pendingAction: null,
      replyText: "yes",
    });

    expect(result.shouldExecute).toBe(false);
    expect(result.assistantText).toMatch(/what would you like to confirm/i);
  });
});
