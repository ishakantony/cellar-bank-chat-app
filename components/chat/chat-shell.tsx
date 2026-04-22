"use client";

import { useChat, type Message } from "ai/react";
import { useEffect, useRef, useCallback, useMemo } from "react";
import { ActionPreviewCard } from "@/components/chat/action-preview-card";
import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import type { PendingAction } from "@/lib/types/chat";

function getPendingActionFromToolInvocations(message: Message | undefined): PendingAction | null {
  if (!message || message.role !== "assistant") return null;
  const toolInvocations = (message as any).toolInvocations as Array<{
    toolName: string;
    state: "call" | "result";
    result?: any;
  }> | undefined;

  if (!toolInvocations) return null;

  for (const invocation of toolInvocations) {
    if (invocation.state !== "result") continue;

    const result = invocation.result;
    if (!result) continue;

    if (invocation.toolName === "create_transfer_preview") {
      return {
        id: result.actionId,
        kind: "transfer" as const,
        recipientName: result.recipientName,
        amount: result.amount,
        currency: result.currency,
        sourceAccountName: result.sourceAccountName,
        previewText: result.summary,
      };
    }

    if (invocation.toolName === "create_card_status_preview") {
      const kind = result.action === "freeze" ? "freeze-card" : "unfreeze-card";
      return {
        id: result.actionId,
        kind,
        cardLabel: result.cardLabel,
        previewText: result.summary,
      };
    }
  }

  return null;
}

export function ChatShell() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append, setInput } = useChat({
    api: "/api/chat",
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const pendingAction = useMemo(() => {
    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
    return getPendingActionFromToolInvocations(lastAssistant);
  }, [messages]);

  const hasPendingAction = pendingAction !== null;

  const handleConfirm = useCallback(() => {
    append({ role: "user", content: "Yes, confirm it." });
  }, [append]);

  const handleCancel = useCallback(() => {
    append({ role: "user", content: "Cancel." });
  }, [append]);

  const onSelectPrompt = useCallback(
    (prompt: string) => {
      append({ role: "user", content: prompt });
    },
    [append]
  );

  return (
    <div className="flex h-screen flex-col bg-chat-base text-white">
      {/* App Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/5 px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chat-accent text-sm font-bold text-chat-base">
            C
          </div>
          <span className="text-base font-semibold tracking-tight">Cellar Bank</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-chat-elevated" aria-hidden="true" />
      </header>

      {/* Scrollable Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain scrollbar-hide"
      >
        <ChatMessageList
          messages={messages}
          isLoading={isLoading}
          onSelectPrompt={onSelectPrompt}
        />
      </div>

      {/* Pending Action Preview */}
      {pendingAction && (
        <div className="shrink-0 px-4 pt-3">
          <ActionPreviewCard
            action={pendingAction}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Composer */}
      <div className="shrink-0">
        <ChatComposer
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          disabled={isLoading || hasPendingAction}
        />
      </div>
    </div>
  );
}
