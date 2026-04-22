import { NextResponse } from "next/server";
import { createOpenAIClient } from "@/lib/ai/openai-client";
import { BANKING_TOOLS } from "@/lib/ai/tool-schema";
import { getBalance, listRecentTransactions, summarizeSpending } from "@/lib/mock-tools";

export async function POST(request: Request) {
  const { message } = await request.json();

  if (/balance/i.test(message)) {
    const result = getBalance();
    return NextResponse.json({
      reply: "Your balance is RM 8,420.15.",
      data: {
        type: "balance",
        balance: result.balance,
        currency: result.currency,
      },
    });
  }

  if (/transactions/i.test(message)) {
    const result = listRecentTransactions();
    return NextResponse.json({
      reply: "Here are your latest transactions.",
      data: {
        type: "transactions",
        items: result.items,
      },
    });
  }

  if (/money|spending/i.test(message)) {
    const result = summarizeSpending();
    return NextResponse.json({
      reply: result.summary,
      data: {
        type: "spending",
        monthLabel: result.monthLabel,
        total: result.total,
        topCategory: result.topCategory,
        comparisonText: result.comparisonText,
      },
    });
  }

  const client = createOpenAIClient();
  const response = await client.responses.create({
    model: "gpt-5.4-mini",
    input: message,
    tools: BANKING_TOOLS,
  });

  const text = response.output?.[0]?.content?.[0]?.text ?? "I could not complete that request.";

  return NextResponse.json({
    reply: text,
    data: {
      type: "status",
      tone: "info",
      summary: text,
    },
  });
}
