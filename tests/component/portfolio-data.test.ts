import { describe, it, expect } from "vitest";
import { getInvestmentPortfolio } from "@/lib/mock-tools/portfolio";

describe("getInvestmentPortfolio", () => {
  it("returns holdings with expected tickers", () => {
    const data = getInvestmentPortfolio();
    const tickers = data.holdings.map((h) => h.ticker);
    expect(tickers).toContain("MAYBANK");
    expect(tickers).toContain("TENAGA");
    expect(tickers.length).toBeGreaterThanOrEqual(8);
  });

  it("returns monthly portfolio value data", () => {
    const data = getInvestmentPortfolio();
    expect(data.monthlyPortfolioValue.length).toBeGreaterThanOrEqual(12);
    expect(data.monthlyPortfolioValue[0]).toHaveProperty("month");
    expect(data.monthlyPortfolioValue[0]).toHaveProperty("value");
  });

  it("returns risk metrics", () => {
    const data = getInvestmentPortfolio();
    expect(data.riskMetrics).toHaveProperty("beta");
    expect(data.riskMetrics).toHaveProperty("volatility");
    expect(data.riskMetrics).toHaveProperty("sharpeRatio");
  });
});
