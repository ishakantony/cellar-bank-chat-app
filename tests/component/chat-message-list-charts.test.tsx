import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessageList } from "@/components/chat/chat-message-list";

describe("ChatMessageList with charts", () => {
  it("renders chart cards from render_structured_chart tool invocations", () => {
    const messages = [
      {
        id: "msg-1",
        role: "assistant" as const,
        content: "Here is your portfolio breakdown.",
        toolInvocations: [
          {
            toolName: "render_structured_chart",
            state: "result" as const,
            args: {
              mode: "structured",
              chartType: "pie",
              title: "Sector Allocation",
              data: [{ name: "Financials", value: 35 }],
            },
            result: { success: true, chartId: "c1" },
          },
        ],
      },
    ];

    render(<ChatMessageList messages={messages as any} onSelectPrompt={() => {}} />);
    expect(screen.getByText("Sector Allocation")).toBeInTheDocument();
  });

  it("renders portfolio summary from get_investment_portfolio", () => {
    const messages = [
      {
        id: "msg-1",
        role: "assistant" as const,
        content: "",
        toolInvocations: [
          {
            toolName: "get_investment_portfolio",
            state: "result" as const,
            args: {},
            result: {
              holdings: [
                { ticker: "MAYBANK", name: "Malayan Banking Bhd", quantity: 500, avgCost: 9.5, currentPrice: 10.2, currency: "MYR" },
                { ticker: "CIMB", name: "CIMB Group Holdings Bhd", quantity: 800, avgCost: 6.8, currentPrice: 7.4, currency: "MYR" },
              ],
              riskMetrics: { beta: 1.05, volatility: 14.2, sharpeRatio: 0.85 },
            },
          },
        ],
      },
    ];

    render(<ChatMessageList messages={messages as any} onSelectPrompt={() => {}} />);
    expect(screen.getByText("Investment Portfolio")).toBeInTheDocument();
    expect(screen.getByText(/Malayan Banking Bhd/i)).toBeInTheDocument();
  });
});
