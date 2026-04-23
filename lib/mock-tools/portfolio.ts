import { PORTFOLIO_DATA } from "@/lib/mock-data/portfolio";
import type { ChartPayload } from "@/lib/types/chat";

export interface PortfolioResult {
  holdings: Array<{
    ticker: string;
    name: string;
    sector: string;
    assetClass: string;
    quantity: number;
    avgCost: number;
    currentPrice: number;
    value: number;
    pnl: number;
    pnlPercent: number;
    currency: string;
  }>;
  totalValue: number;
  totalCost: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  currency: string;
  riskMetrics: { beta: number; volatility: number; sharpeRatio: number };
  monthlyPortfolioValue: Array<{ month: string; value: number }>;
  charts: ChartPayload[];
}

function computeAllocationBySector(): Array<{ name: string; value: number }> {
  const sectorMap = new Map<string, number>();
  for (const h of PORTFOLIO_DATA.holdings) {
    const value = h.quantity * h.currentPrice;
    sectorMap.set(h.sector, (sectorMap.get(h.sector) || 0) + value);
  }
  return Array.from(sectorMap.entries())
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);
}

function computeAllocationByAssetClass(): Array<{ name: string; value: number }> {
  const classMap = new Map<string, number>();
  for (const h of PORTFOLIO_DATA.holdings) {
    const value = h.quantity * h.currentPrice;
    classMap.set(h.assetClass, (classMap.get(h.assetClass) || 0) + value);
  }
  return Array.from(classMap.entries())
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);
}

function computeTopHoldings(): Array<{ name: string; value: number }> {
  return PORTFOLIO_DATA.holdings
    .map((h) => ({
      name: h.name,
      value: Math.round(h.quantity * h.currentPrice * 100) / 100,
    }))
    .sort((a, b) => b.value - a.value);
}

function computePerformanceData(): Array<{ month: string; value: number }> {
  return PORTFOLIO_DATA.monthlyPortfolioValue.map((d) => ({
    month: d.month,
    value: Math.round(d.value * 100) / 100,
  }));
}

function computeRiskRadarData(): Array<{ name: string; value: number; max?: number }> {
  const metrics = PORTFOLIO_DATA.riskMetrics;
  return [
    { name: "Beta", value: metrics.beta, max: 2 },
    { name: "Volatility", value: metrics.volatility, max: 30 },
    { name: "Sharpe Ratio", value: metrics.sharpeRatio, max: 2 },
    { name: "Diversification", value: 7, max: 10 },
    { name: "Liquidity", value: 8, max: 10 },
  ];
}

function buildCharts(): ChartPayload[] {
  return [
    {
      mode: "structured",
      chartType: "pie",
      title: "Portfolio Allocation by Sector",
      description: "How your investments are distributed across sectors",
      data: computeAllocationBySector(),
    },
    {
      mode: "structured",
      chartType: "area",
      title: "Portfolio Performance (24 Months)",
      description: "Total portfolio value over the past 2 years",
      data: computePerformanceData(),
    },
    {
      mode: "structured",
      chartType: "bar",
      title: "Top Holdings by Value",
      description: "Your largest positions by market value",
      data: computeTopHoldings(),
    },
    {
      mode: "structured",
      chartType: "donut",
      title: "Asset Class Mix",
      description: "Breakdown by asset type (stocks, ETFs, REITs)",
      data: computeAllocationByAssetClass(),
    },
    {
      mode: "structured",
      chartType: "radar",
      title: "Risk Profile",
      description: "Key risk and performance metrics",
      data: computeRiskRadarData(),
    },
  ];
}

export function getInvestmentPortfolio(): PortfolioResult {
  const holdings = PORTFOLIO_DATA.holdings.map((h) => {
    const value = h.quantity * h.currentPrice;
    const cost = h.quantity * h.avgCost;
    return {
      ticker: h.ticker,
      name: h.name,
      sector: h.sector,
      assetClass: h.assetClass,
      quantity: h.quantity,
      avgCost: h.avgCost,
      currentPrice: h.currentPrice,
      value: Math.round(value * 100) / 100,
      pnl: Math.round((value - cost) * 100) / 100,
      pnlPercent: Math.round(((value - cost) / cost) * 10000) / 100,
      currency: h.currency,
    };
  });

  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.quantity * h.avgCost, 0);

  return {
    holdings,
    totalValue: Math.round(totalValue * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    unrealizedPnl: Math.round((totalValue - totalCost) * 100) / 100,
    unrealizedPnlPercent: Math.round(((totalValue - totalCost) / totalCost) * 10000) / 100,
    currency: holdings[0]?.currency || "MYR",
    riskMetrics: PORTFOLIO_DATA.riskMetrics,
    monthlyPortfolioValue: PORTFOLIO_DATA.monthlyPortfolioValue,
    charts: buildCharts(),
  };
}

export function renderStructuredChart(): { success: true; chartId: string } {
  return { success: true, chartId: `chart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}` };
}

export function renderCustomChart(): { success: true; chartId: string } {
  return { success: true, chartId: `chart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}` };
}
