import { NextResponse } from "next/server";
import { getModelConfig, generateAIResponse } from "@/lib/ai/ai-client";
import {
  createCardStatusPreview,
  createTransferPreview,
  getBalance,
  listRecentTransactions,
  summarizeSpending,
} from "@/lib/mock-tools";

function getRegexMatchResponse(message: string) {
  if (/balance/i.test(message)) {
    const result = getBalance();
    return {
      reply: "Your balance is RM 8,420.15.",
      data: {
        type: "balance" as const,
        balance: result.balance,
        currency: result.currency,
      },
    };
  }

  if (/transactions/i.test(message)) {
    const result = listRecentTransactions();
    return {
      reply: "Here are your latest transactions.",
      data: {
        type: "transactions" as const,
        items: result.items,
      },
    };
  }

  if (/money|spending/i.test(message)) {
    const result = summarizeSpending();
    return {
      reply: result.summary,
      data: {
        type: "spending" as const,
        monthLabel: result.monthLabel,
        total: result.total,
        topCategory: result.topCategory,
        comparisonText: result.comparisonText,
      },
    };
  }

  const transferMatch = message.match(/send\s+rm?\s*(\d+(?:\.\d+)?)\s+to\s+(.+)/i);
  if (transferMatch) {
    const amount = parseFloat(transferMatch[1]);
    const recipientName = transferMatch[2].trim();
    const preview = createTransferPreview({ amount, recipientName });
    return {
      reply: preview.summary,
      data: {
        type: "action-preview" as const,
        actionId: preview.actionId,
        actionType: "transfer" as const,
        summary: preview.summary,
        confirmLabel: "Confirm",
        cancelLabel: "Cancel",
      },
      pendingAction: {
        id: preview.actionId,
        kind: "transfer" as const,
        recipientName,
        amount,
        currency: preview.currency,
        sourceAccountName: preview.sourceAccountName,
        previewText: preview.summary,
      },
    };
  }

  if (/freeze/i.test(message)) {
    const preview = createCardStatusPreview({ action: "freeze" });
    return {
      reply: preview.summary,
      data: {
        type: "action-preview" as const,
        actionId: preview.actionId,
        actionType: "freeze-card" as const,
        summary: preview.summary,
        confirmLabel: "Confirm",
        cancelLabel: "Cancel",
      },
      pendingAction: {
        id: preview.actionId,
        kind: "freeze-card" as const,
        cardLabel: preview.cardLabel,
        previewText: preview.summary,
      },
    };
  }

  if (/unfreeze/i.test(message)) {
    const preview = createCardStatusPreview({ action: "unfreeze" });
    return {
      reply: preview.summary,
      data: {
        type: "action-preview" as const,
        actionId: preview.actionId,
        actionType: "unfreeze-card" as const,
        summary: preview.summary,
        confirmLabel: "Confirm",
        cancelLabel: "Cancel",
      },
      pendingAction: {
        id: preview.actionId,
        kind: "unfreeze-card" as const,
        cardLabel: preview.cardLabel,
        previewText: preview.summary,
      },
    };
  }

  return null;
}

function buildResponseFromLLM(text: string, toolResults: Array<{ name: string; result: any }>) {
  // If a tool was called, build structured response from the first tool result
  const firstTool = toolResults[0];
  if (firstTool) {
    const { name, result } = firstTool;

    switch (name) {
      case "get_balance":
        return {
          reply: text,
          data: {
            type: "balance" as const,
            balance: result.balance,
            currency: result.currency,
          },
        };
      case "list_recent_transactions":
        return {
          reply: text,
          data: {
            type: "transactions" as const,
            items: result.items,
          },
        };
      case "summarize_spending":
        return {
          reply: text,
          data: {
            type: "spending" as const,
            monthLabel: result.monthLabel,
            total: result.total,
            topCategory: result.topCategory,
            comparisonText: result.comparisonText,
          },
        };
      case "create_transfer_preview":
        return {
          reply: text,
          data: {
            type: "action-preview" as const,
            actionId: result.actionId,
            actionType: "transfer" as const,
            summary: result.summary,
            confirmLabel: "Confirm",
            cancelLabel: "Cancel",
          },
          pendingAction: {
            id: result.actionId,
            kind: "transfer" as const,
            recipientName: result.recipientName,
            amount: result.amount,
            currency: result.currency,
            sourceAccountName: result.sourceAccountName,
            previewText: result.summary,
          },
        };
      case "execute_transfer":
        return {
          reply: text,
          data: {
            type: "status" as const,
            tone: "success" as const,
            summary: result.confirmationText,
          },
        };
      case "create_card_status_preview": {
        const actionType = result.action === "freeze" ? "freeze-card" : "unfreeze-card";
        const kind = result.action === "freeze" ? "freeze-card" : "unfreeze-card";
        return {
          reply: text,
          data: {
            type: "action-preview" as const,
            actionId: result.actionId,
            actionType,
            summary: result.summary,
            confirmLabel: "Confirm",
            cancelLabel: "Cancel",
          },
          pendingAction: {
            id: result.actionId,
            kind,
            cardLabel: result.cardLabel,
            previewText: result.summary,
          },
        };
      }
      case "execute_card_status_change":
        return {
          reply: text,
          data: {
            type: "status" as const,
            tone: "success" as const,
            summary: result.confirmationText,
          },
        };
    }
  }

  return {
    reply: text,
    data: {
      type: "status" as const,
      tone: "info" as const,
      summary: text,
    },
  };
}

export async function POST(request: Request) {
  const { message } = await request.json();

  // Demo mode: use regex shortcuts for instant responses
  if (!getModelConfig().useLLMForAll) {
    const regexResponse = getRegexMatchResponse(message);
    if (regexResponse) {
      return NextResponse.json(regexResponse);
    }
  }

  // LLM mode: route everything through the model with tool execution
  try {
    const { text, toolResults } = await generateAIResponse(message);
    const response = buildResponseFromLLM(text, toolResults);
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({
      reply: "I couldn't complete that safely right now. Please try again.",
      data: {
        type: "status" as const,
        tone: "error" as const,
        summary: "I couldn't complete that safely right now. Please try again.",
      },
    });
  }
}
