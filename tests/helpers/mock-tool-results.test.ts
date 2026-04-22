// tests/helpers/mock-tool-results.ts
import { describe, expect, it } from "vitest";
import { createTransferPreview } from "@/lib/mock-tools/transfers";

describe("createTransferPreview", () => {
  it("returns a preview and does not mark the transfer as executed", () => {
    const result = createTransferPreview({ amount: 100, recipientName: "Ali" });

    expect(result.status).toBe("preview");
    expect(result.executed).toBe(false);
    expect(result.summary).toContain("Ali");
  });
});
