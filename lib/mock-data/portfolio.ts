export interface PortfolioHolding {
  ticker: string;
  name: string;
  sector: string;
  assetClass: "stock" | "etf" | "reit" | "bond" | "unit-trust";
  quantity: number;
  avgCost: number;
  currentPrice: number;
  currency: string;
}

export interface PortfolioData {
  holdings: PortfolioHolding[];
  monthlyPortfolioValue: Array<{ month: string; value: number }>;
  monthlyPrices: Record<string, Array<{ month: string; price: number }>>;
  riskMetrics: {
    beta: number;
    volatility: number;
    sharpeRatio: number;
  };
}

const HOLDINGS: PortfolioHolding[] = [
  { ticker: "MAYBANK", name: "Malayan Banking Bhd", sector: "Financials", assetClass: "stock", quantity: 500, avgCost: 9.5, currentPrice: 10.2, currency: "MYR" },
  { ticker: "CIMB", name: "CIMB Group Holdings Bhd", sector: "Financials", assetClass: "stock", quantity: 800, avgCost: 6.8, currentPrice: 7.4, currency: "MYR" },
  { ticker: "TENAGA", name: "Tenaga Nasional Bhd", sector: "Utilities", assetClass: "stock", quantity: 300, avgCost: 14.2, currentPrice: 13.8, currency: "MYR" },
  { ticker: "PCHEM", name: "Petronas Chemicals Group Bhd", sector: "Materials", assetClass: "stock", quantity: 400, avgCost: 8.1, currentPrice: 8.5, currency: "MYR" },
  { ticker: "AXIATA", name: "Axiata Group Bhd", sector: "Telecommunications", assetClass: "stock", quantity: 600, avgCost: 4.5, currentPrice: 4.8, currency: "MYR" },
  { ticker: "MAXIS", name: "Maxis Bhd", sector: "Telecommunications", assetClass: "stock", quantity: 350, avgCost: 5.2, currentPrice: 5.0, currency: "MYR" },
  { ticker: "KLCI-ETF", name: "FTSE Bursa Malaysia KLCI ETF", sector: "Diversified", assetClass: "etf", quantity: 1000, avgCost: 1.85, currentPrice: 1.92, currency: "MYR" },
  { ticker: "PAVREIT", name: "Pavilion REIT", sector: "Real Estate", assetClass: "reit", quantity: 2000, avgCost: 1.6, currentPrice: 1.65, currency: "MYR" },
  { ticker: "PPB", name: "PPB Group Bhd", sector: "Consumer Staples", assetClass: "stock", quantity: 200, avgCost: 18.0, currentPrice: 19.2, currency: "MYR" },
  { ticker: "GAMUDA", name: "Gamuda Bhd", sector: "Construction", assetClass: "stock", quantity: 450, avgCost: 5.8, currentPrice: 6.1, currency: "MYR" },
];

function generateMonthlyValues(): Array<{ month: string; value: number }> {
  const values: Array<{ month: string; value: number }> = [];
  const baseValue = HOLDINGS.reduce((sum, h) => sum + h.quantity * h.avgCost, 0);
  for (let i = 23; i >= 0; i--) {
    const date = new Date(2026, 3 - i, 1);
    const month = date.toISOString().slice(0, 7);
    const growth = 1 + (23 - i) * 0.008 + Math.sin(i) * 0.05;
    values.push({ month, value: Math.round(baseValue * growth * 100) / 100 });
  }
  return values;
}

function generateMonthlyPrices(): Record<string, Array<{ month: string; price: number }>> {
  const prices: Record<string, Array<{ month: string; price: number }>> = {};
  for (const holding of HOLDINGS) {
    const history: Array<{ month: string; price: number }> = [];
    for (let i = 23; i >= 0; i--) {
      const date = new Date(2026, 3 - i, 1);
      const month = date.toISOString().slice(0, 7);
      const drift = 1 + (23 - i) * 0.005 + (Math.random() - 0.5) * 0.15;
      history.push({ month, price: Math.round(holding.currentPrice * drift * 100) / 100 });
    }
    prices[holding.ticker] = history;
  }
  return prices;
}

export const PORTFOLIO_DATA: PortfolioData = {
  holdings: HOLDINGS,
  monthlyPortfolioValue: generateMonthlyValues(),
  monthlyPrices: generateMonthlyPrices(),
  riskMetrics: {
    beta: 1.05,
    volatility: 14.2,
    sharpeRatio: 0.85,
  },
};
