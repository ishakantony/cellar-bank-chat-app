import { describe, it, expect } from "vitest";
import { chartRegistry } from "@/lib/charts/registry";

describe("chartRegistry", () => {
  it("contains expected chart types", () => {
    expect(chartRegistry).toHaveProperty("pie");
    expect(chartRegistry).toHaveProperty("bar");
    expect(chartRegistry).toHaveProperty("line");
    expect(chartRegistry).toHaveProperty("area");
    expect(chartRegistry).toHaveProperty("donut");
    expect(chartRegistry).toHaveProperty("heatmap");
    expect(chartRegistry).toHaveProperty("treemap");
    expect(chartRegistry).toHaveProperty("waterfall");
    expect(chartRegistry).toHaveProperty("radar");
  });

  it("returns undefined for unknown chart type", () => {
    expect(chartRegistry["unknown" as keyof typeof chartRegistry]).toBeUndefined();
  });
});
