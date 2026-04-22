import { PORTFOLIO_DATA, type PortfolioData } from "@/lib/mock-data/portfolio";

export function getInvestmentPortfolio(): PortfolioData {
  return PORTFOLIO_DATA;
}

export function renderChart(): { success: true; chartId: string } {
  return { success: true, chartId: `chart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}` };
}
