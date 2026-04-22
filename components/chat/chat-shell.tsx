"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ActionPreviewCard } from "@/components/chat/action-preview-card";
import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import { createConversationController } from "@/lib/chat/conversation-controller";
import { applyConfirmationReply } from "@/lib/chat/confirmation";
import type { ChatMessage, ConversationState, PendingAction } from "@/lib/types/chat";

export function ChatShell() {
  const [controller] = useState(() => createConversationController());
  const [state, setState] = useState<ConversationState>(controller.getState());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.messages, state.pendingAction]);

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
    <div className="flex h-screen flex-col bg-chat-base text-white">
      {/* App Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/5 px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chat-accent text-sm font-bold text-chat-base">
            K
          </div>
          <span className="text-base font-semibold tracking-tight">KimiBank</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-chat-elevated" aria-hidden="true" />
      </header>

      {/* Scrollable Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain scrollbar-hide"
      >
        <ChatMessageList
          messages={state.messages}
          isLoading={state.isLoading}
          onSelectPrompt={submitMessage}
        />
      </div>

      {/* Pending Action Preview */}
      {state.pendingAction && (
        <div className="shrink-0 px-4 pt-3">
          <ActionPreviewCard
            action={state.pendingAction}
            onConfirm={() => handleConfirm(state.pendingAction!)}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Composer */}
      <div className="shrink-0">
        <ChatComposer onSend={submitMessage} disabled={state.isLoading} />
      </div>
    </div>
  );
}
