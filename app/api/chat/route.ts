import { NextResponse } from "next/server";
import { createOpenAIClient } from "@/lib/ai/openai-client";
import { BANKING_TOOLS } from "@/lib/ai/tool-schema";
import {
  createCardStatusPreview,
  createTransferPreview,
  getBalance,
  listRecentTransactions,
  summarizeSpending,
} from "@/lib/mock-tools";

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

  const transferMatch = message.match(/send\s+rm?\s*(\d+(?:\.\d+)?)\s+to\s+(.+)/i);
  if (transferMatch) {
    const amount = parseFloat(transferMatch[1]);
    const recipientName = transferMatch[2].trim();
    const preview = createTransferPreview({ amount, recipientName });
    return NextResponse.json({
      reply: preview.summary,
      data: {
        type: "action-preview",
        actionId: preview.actionId,
        actionType: "transfer",
        summary: preview.summary,
        confirmLabel: "Confirm",
        cancelLabel: "Cancel",
      },
      pendingAction: {
        id: preview.actionId,
        kind: "transfer",
        recipientName,
        amount,
        currency: preview.currency,
        sourceAccountName: preview.sourceAccountName,
        previewText: preview.summary,
      },
    });
  }

  if (/freeze/i.test(message)) {
    const preview = createCardStatusPreview({ action: "freeze" });
    return NextResponse.json({
      reply: preview.summary,
      data: {
        type: "action-preview",
        actionId: preview.actionId,
        actionType: "freeze-card",
        summary: preview.summary,
        confirmLabel: "Confirm",
        cancelLabel: "Cancel",
      },
      pendingAction: {
        id: preview.actionId,
        kind: "freeze-card",
        cardLabel: preview.cardLabel,
        previewText: preview.summary,
      },
    });
  }

  if (/unfreeze/i.test(message)) {
    const preview = createCardStatusPreview({ action: "unfreeze" });
    return NextResponse.json({
      reply: preview.summary,
      data: {
        type: "action-preview",
        actionId: preview.actionId,
        actionType: "unfreeze-card",
        summary: preview.summary,
        confirmLabel: "Confirm",
        cancelLabel: "Cancel",
      },
      pendingAction: {
        id: preview.actionId,
        kind: "unfreeze-card",
        cardLabel: preview.cardLabel,
        previewText: preview.summary,
      },
    });
  }

  try {
    const client = createOpenAIClient();
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      input: message,
      tools: BANKING_TOOLS,
    });

    const firstOutput = response.output?.[0] as { content?: Array<{ text?: string }> } | undefined;
    const text = firstOutput?.content?.[0]?.text ?? "I could not complete that request.";

    return NextResponse.json({
      reply: text,
      data: {
        type: "status",
        tone: "info",
        summary: text,
      },
    });
  } catch {
    return NextResponse.json({
      reply: "I couldn't complete that safely right now. Please try again.",
      data: {
        type: "status",
        tone: "error",
        summary: "I couldn't complete that safely right now. Please try again.",
      },
    });
  }
}
