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

import { POST as toolsPost } from "@/app/api/tools/route";

describe("POST /api/tools", () => {
  it("returns a transfer preview without executing it", async () => {
    const request = new Request("http://localhost/api/tools", {
      method: "POST",
      body: JSON.stringify({
        toolName: "create_transfer_preview",
        input: { amount: 100, recipientName: "Ali" },
      }),
    });

    const response = await toolsPost(request);
    const json = await response.json();

    expect(json.result.status).toBe("preview");
    expect(json.result.executed).toBe(false);
  });
});
