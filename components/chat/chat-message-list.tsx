"use client";

import type { Message } from "ai/react";
import { useEffect, useRef } from "react";
import { DEMO_ACCOUNT } from "@/lib/mock-data/account";
import { SUGGESTED_PROMPTS } from "@/lib/chat/constants";
import { AccountSummaryCard } from "@/components/chat/account-summary-card";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";
import { StructuredResult } from "@/components/chat/structured-result";
import { MarkdownText } from "@/components/chat/markdown-text";
import type { ChartPayload, StructuredResult as StructuredResultType } from "@/lib/types/chat";

function buildPortfolioSummary(result: any): StructuredResultType {
  const holdings = result.holdings || [];
  const totalValue = result.totalValue || holdings.reduce((sum: number, h: any) => sum + (h.value || 0), 0);
  const totalCost = result.totalCost || holdings.reduce((sum: number, h: any) => sum + (h.quantity || 0) * (h.avgCost || 0), 0);
  const unrealizedPnl = result.unrealizedPnl || (totalValue - totalCost);
  const unrealizedPnlPercent = result.unrealizedPnlPercent || (totalCost > 0 ? (unrealizedPnl / totalCost) * 100 : 0);

  const holdingsSorted = [...holdings].sort((a: any, b: any) => (b.value || 0) - (a.value || 0));

  return {
    type: "portfolio",
    summary: {
      totalValue: Math.round(totalValue * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      unrealizedPnl: Math.round(unrealizedPnl * 100) / 100,
      unrealizedPnlPercent: Math.round(unrealizedPnlPercent * 100) / 100,
      currency: result.currency || holdings[0]?.currency || "MYR",
      topHoldings: holdingsSorted.slice(0, 3).map((h: any) => ({
        name: h.name || h.ticker,
        value: Math.round((h.value || 0) * 100) / 100,
        pnlPercent: Math.round((h.pnlPercent || 0) * 100) / 100,
      })),
      riskMetrics: result.riskMetrics || { beta: 0, volatility: 0, sharpeRatio: 0 },
    },
  };
}

function getStructuredResultsFromMessage(message: Message): StructuredResultType[] {
  const toolInvocations = (message as any).toolInvocations as Array<{
    toolName: string;
    state: "call" | "result";
    args?: any;
    result?: any;
  }> | undefined;

  if (!toolInvocations) return [];

  const results: StructuredResultType[] = [];

  for (const invocation of toolInvocations) {
    if (invocation.state !== "result") continue;

    if (invocation.toolName === "render_structured_chart" || invocation.toolName === "render_custom_chart") {
      const args = invocation.args;
      if (!args) continue;
      const payload: ChartPayload = args.mode === "custom"
        ? { mode: "custom", title: args.title, description: args.description, echartsOption: args.echartsOption }
        : { mode: "structured", chartType: args.chartType, title: args.title, description: args.description, data: args.data };
      results.push({ type: "chart", payload });
      continue;
    }

    const result = invocation.result;
    if (!result) continue;

    switch (invocation.toolName) {
      case "get_balance":
        results.push({
          type: "balance",
          balance: result.balance,
          currency: result.currency,
        });
        break;
      case "list_recent_transactions":
        results.push({
          type: "transactions",
          items: result.items,
        });
        break;
      case "summarize_spending":
        results.push({
          type: "spending",
          monthLabel: result.monthLabel,
          total: result.total,
          topCategory: result.topCategory,
          comparisonText: result.comparisonText,
        });
        break;
      case "execute_transfer":
        results.push({
          type: "status",
          tone: "success",
          summary: result.confirmationText,
        });
        break;
      case "execute_card_status_change":
        results.push({
          type: "status",
          tone: "success",
          summary: result.confirmationText,
        });
        break;
      case "get_investment_portfolio": {
        results.push(buildPortfolioSummary(result));
        // Also render pre-computed charts from the backend
        const charts: ChartPayload[] = result.charts || [];
        for (const chart of charts) {
          results.push({ type: "chart", payload: chart });
        }
        break;
      }
    }
  }

  return results;
}

export function ChatMessageList({
  messages,
  isLoading,
  onSelectPrompt,
  suggestions = {},
}: {
  messages: Message[];
  isLoading?: boolean;
  onSelectPrompt: (prompt: string) => void;
  suggestions?: Record<string, string[]>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    const hour = new Date().getHours();
    const greeting =
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    return (
      <div className="flex h-full flex-col items-center justify-center px-6 py-12 animate-fade-in">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-white">
            {greeting}, {DEMO_ACCOUNT.userName}
          </h2>
          <p className="mt-1 text-sm text-white/52">
            How can I help with your banking today?
          </p>
        </div>

        <div className="mb-8 w-full max-w-sm">
          <AccountSummaryCard />
        </div>

        <div className="w-full max-w-sm space-y-3">
          <p className="px-1 text-xs font-semibold uppercase tracking-wider text-white/35">
            Suggestions
          </p>
          <SuggestedPrompts prompts={SUGGESTED_PROMPTS} onSelect={onSelectPrompt} />
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex flex-col justify-end space-y-4 px-4 py-6">
      {messages.map((msg, index) => {
        const structuredResults = msg.role === "assistant" ? getStructuredResultsFromMessage(msg) : [];
        const hasContent = msg.content && msg.content.trim().length > 0;

        const isLastWhileLoading = isLoading && index === messages.length - 1;

        // Skip rendering empty assistant placeholder messages during streaming.
        // Also skip when tool results exist but are suppressed while loading,
        // otherwise an empty chat bubble would appear.
        if (msg.role === "assistant" && !hasContent && (structuredResults.length === 0 || isLastWhileLoading)) {
          return null;
        }

        // Suppress tool results for the last assistant message while streaming
        const isLastAssistantWhileStreaming =
          isLoading &&
          msg.role === "assistant" &&
          index === messages.length - 1;

        const msgSuggestions =
          msg.role === "assistant" && structuredResults.length > 0
            ? suggestions[msg.id]
            : undefined;

        return (
          <div
            key={msg.id}
            className={`flex animate-message-in ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-[85%]">
              <div
                className={`px-4 py-3 text-[15px] leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-[18px] rounded-tr-md bg-chat-accent text-chat-base shadow-[0_10px_28px_rgba(32,203,168,0.18)]"
                    : "rounded-[18px] rounded-tl-md border border-white/10 bg-chat-elevated text-white/90 shadow-[0_12px_34px_rgba(0,0,0,0.22)]"
                }`}
              >
                {hasContent && msg.role === "assistant" ? (
                  <MarkdownText content={msg.content} />
                ) : hasContent ? (
                  <p>{msg.content}</p>
                ) : null}
                {structuredResults.length > 0 && !isLastAssistantWhileStreaming && (
                  <div className="mt-3 space-y-3">
                    {structuredResults.map((result, i) => (
                      <StructuredResult key={i} data={result} />
                    ))}
                  </div>
                )}
              </div>
              {msgSuggestions && msgSuggestions.length > 0 && (
                <div className="mt-2">
                  <SuggestedPrompts
                    prompts={msgSuggestions}
                    onSelect={onSelectPrompt}
                    variant="pill"
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {(() => {
        if (!isLoading) return null;
        const lastMsg = messages[messages.length - 1];
        const isThinking =
          lastMsg?.role === "user" ||
          (lastMsg?.role === "assistant" && !lastMsg.content?.trim());
        if (!isThinking) return null;
        return (
          <div className="flex animate-message-in justify-start">
            <div className="max-w-[85%] rounded-[18px] rounded-tl-md border border-white/10 bg-chat-elevated px-4 py-3 text-[15px] leading-relaxed text-white/90 shadow-[0_12px_34px_rgba(0,0,0,0.22)]">
              <span className="inline-flex items-center gap-1">
                <span className="animate-thinking-pulse">Thinking</span>
                <span className="inline-flex">
                  <span className="animate-thinking-dot text-lg leading-none" style={{ animationDelay: "0ms" }}>.</span>
                  <span className="animate-thinking-dot text-lg leading-none" style={{ animationDelay: "150ms" }}>.</span>
                  <span className="animate-thinking-dot text-lg leading-none" style={{ animationDelay: "300ms" }}>.</span>
                </span>
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
