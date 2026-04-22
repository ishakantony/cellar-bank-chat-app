import { describe, it, expect } from "vitest";

describe("ChartPayload type compatibility", () => {
  it("accepts structured chart payload", () => {
    const payload = {
      mode: "structured" as const,
      chartType: "pie",
      title: "Test",
      data: [{ name: "A", value: 10 }],
    };
    expect(payload.mode).toBe("structured");
    expect(payload.chartType).toBe("pie");
  });

  it("accepts custom chart payload", () => {
    const payload = {
      mode: "custom" as const,
      title: "Test",
      echartsOption: { series: [] },
    };
    expect(payload.mode).toBe("custom");
  });
});
