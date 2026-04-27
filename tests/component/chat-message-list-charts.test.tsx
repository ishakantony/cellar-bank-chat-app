import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Message } from "ai/react";
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

    render(<ChatMessageList messages={messages as unknown as Message[]} onSelectPrompt={() => {}} />);
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

    render(<ChatMessageList messages={messages as unknown as Message[]} onSelectPrompt={() => {}} />);
    expect(screen.getByText("Investment Portfolio")).toBeInTheDocument();
    expect(screen.getByText(/Malayan Banking Bhd/i)).toBeInTheDocument();
  });

  it("suppresses tool results for the last assistant message while streaming", () => {
    const messages = [
      {
        id: "msg-1",
        role: "assistant" as const,
        content: "Your balance is",
        toolInvocations: [
          {
            toolName: "get_balance",
            state: "result" as const,
            args: {},
            result: { balance: 12500.5, currency: "MYR" },
          },
        ],
      },
    ];

    render(<ChatMessageList messages={messages as unknown as Message[]} isLoading onSelectPrompt={() => {}} />);
    // Text should be visible
    expect(screen.getByText("Your balance is")).toBeInTheDocument();
    // But balance card should NOT appear yet
    expect(screen.queryByText("Balance")).not.toBeInTheDocument();
  });

  it("shows tool results after streaming finishes", () => {
    const messages = [
      {
        id: "msg-1",
        role: "assistant" as const,
        content: "Your balance is",
        toolInvocations: [
          {
            toolName: "get_balance",
            state: "result" as const,
            args: {},
            result: { balance: 12500.5, currency: "MYR" },
          },
        ],
      },
    ];

    render(<ChatMessageList messages={messages as unknown as Message[]} isLoading={false} onSelectPrompt={() => {}} />);
    expect(screen.getByText("Your balance is")).toBeInTheDocument();
    expect(screen.getByText("Balance")).toBeInTheDocument();
  });

  it("shows Thinking indicator while loading even when tool results have arrived", () => {
    const messages = [
      {
        id: "msg-1",
        role: "assistant" as const,
        content: "",
        toolInvocations: [
          {
            toolName: "get_balance",
            state: "result" as const,
            args: {},
            result: { balance: 12500.5, currency: "MYR" },
          },
        ],
      },
    ];

    render(<ChatMessageList messages={messages as unknown as Message[]} isLoading onSelectPrompt={() => {}} />);
    // Thinking indicator should be visible
    expect(screen.getByText("Thinking")).toBeInTheDocument();
    // Balance card should NOT appear yet (no content yet)
    expect(screen.queryByText("Balance")).not.toBeInTheDocument();
    // Empty chat bubble should NOT appear either
    expect(screen.queryByText("MYR 12,500.50")).not.toBeInTheDocument();
  });
});
