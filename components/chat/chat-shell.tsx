"use client";

import { useState, useCallback } from "react";
import { AccountSummaryCard } from "@/components/chat/account-summary-card";
import { ActionPreviewCard } from "@/components/chat/action-preview-card";
import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";
import { StatusBanner } from "@/components/chat/status-banner";
import { SUGGESTED_PROMPTS } from "@/lib/chat/constants";
import { createConversationController } from "@/lib/chat/conversation-controller";
import { applyConfirmationReply } from "@/lib/chat/confirmation";
import type { ChatMessage, ConversationState, PendingAction } from "@/lib/types/chat";

export function ChatShell() {
  const [controller] = useState(() => createConversationController());
  const [state, setState] = useState<ConversationState>(controller.getState());

  const refreshState = useCallback(() => {
    setState({ ...controller.getState() });
  }, [controller]);

  async function submitMessage(text: string) {
    const currentPending = controller.getState().pendingAction;

    // Handle confirmation replies if there's a pending action
    if (currentPending) {
      const decision = applyConfirmationReply({
        pendingAction: currentPending,
        replyText: text,
      });

      controller.addUserMessage({ id: crypto.randomUUID(), role: "user", text });

      if (decision.shouldClearPendingAction) {
        controller.clearPendingAction();
      }

      if (decision.shouldExecute) {
        controller.setLoading(true);
        refreshState();

        const toolName =
          currentPending.kind === "transfer"
            ? "execute_transfer"
            : currentPending.kind === "freeze-card"
              ? "execute_card_status_change"
              : "execute_card_status_change";

        const response = await fetch("/api/tools", {
          method: "POST",
          body: JSON.stringify({
            toolName,
            input: { actionId: currentPending.id },
          }),
        });

        const payload = await response.json();
        controller.clearPendingAction();
        controller.setLoading(false);
        controller.addAssistantMessage({
          id: crypto.randomUUID(),
          role: "assistant",
          text: payload.result.confirmationText,
          structuredResult: {
            type: "status",
            tone: "success",
            summary: payload.result.confirmationText,
          },
        });
        refreshState();
        return;
      }

      controller.addAssistantMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        text: decision.assistantText,
        structuredResult: {
          type: "status",
          tone: "info",
          summary: decision.assistantText,
        },
      });
      refreshState();
      return;
    }

    controller.addUserMessage({ id: crypto.randomUUID(), role: "user", text });
    controller.setLoading(true);
    refreshState();

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        message: text,
        sessionId: "sess_demo_001",
        messages: controller.getState().messages,
      }),
    });

    const payload = await response.json();

    controller.addAssistantMessage({
      id: crypto.randomUUID(),
      role: "assistant",
      text: payload.reply,
      structuredResult: payload.data,
    });

    if (payload.pendingAction) {
      controller.addAssistantPreview(payload.pendingAction);
    }

    controller.setLoading(false);
    refreshState();
  }

  async function handleConfirm(action: PendingAction) {
    controller.setLoading(true);
    refreshState();

    const toolName =
      action.kind === "transfer"
        ? "execute_transfer"
        : action.kind === "freeze-card"
          ? "execute_card_status_change"
          : "execute_card_status_change";

    const response = await fetch("/api/tools", {
      method: "POST",
      body: JSON.stringify({
        toolName,
        input: { actionId: action.id },
      }),
    });

    const payload = await response.json();
    controller.clearPendingAction();
    controller.setLoading(false);
    controller.addAssistantMessage({
      id: crypto.randomUUID(),
      role: "assistant",
      text: payload.result.confirmationText,
      structuredResult: {
        type: "status",
        tone: "success",
        summary: payload.result.confirmationText,
      },
    });
    refreshState();
  }

  function handleCancel() {
    controller.clearPendingAction();
    controller.addAssistantMessage({
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Canceled. Nothing was executed.",
      structuredResult: {
        type: "status",
        tone: "info",
        summary: "Canceled. Nothing was executed.",
      },
    });
    refreshState();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Single user demo</p>
        <h1 className="text-4xl font-semibold text-slate-950">AI Banking Assistant</h1>
      </header>
      <AccountSummaryCard />
      <SuggestedPrompts prompts={SUGGESTED_PROMPTS} onSelect={submitMessage} />
      <ChatMessageList messages={state.messages} />
      {state.pendingAction && (
        <ActionPreviewCard
          action={state.pendingAction}
          onConfirm={() => handleConfirm(state.pendingAction!)}
          onCancel={handleCancel}
        />
      )}
      <ChatComposer onSend={submitMessage} disabled={state.isLoading} />
    </main>
  );
}
