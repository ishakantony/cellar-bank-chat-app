// tests/integration/api-chat.test.ts
import { describe, expect, it } from "vitest";
import { BANKING_TOOLS } from "@/lib/ai/tool-schema";

describe("BANKING_TOOLS", () => {
  it("defines a transfer preview tool separately from execution", () => {
    const toolNames = BANKING_TOOLS.map((tool) => tool.function.name);

    expect(toolNames).toContain("create_transfer_preview");
    expect(toolNames).toContain("execute_transfer");
  });
});
