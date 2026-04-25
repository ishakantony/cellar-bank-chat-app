"use client";

import { useChat, type Message } from "ai/react";
import { useEffect, useRef, useCallback, useMemo, useState } from "react";
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

function hasToolInvocations(message: Message | undefined): boolean {
  if (!message || message.role !== "assistant") return false;
  const toolInvocations = (message as any).toolInvocations as Array<any> | undefined;
  return !!toolInvocations && toolInvocations.length > 0;
}

export function ChatShell() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append, setInput } = useChat({
    api: "/api/chat",
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [messageSuggestions, setMessageSuggestions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Fetch suggestions when a substantive assistant response completes
  useEffect(() => {
    if (isLoading) return;

    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
    if (!lastAssistant || !hasToolInvocations(lastAssistant)) return;
    if (messageSuggestions[lastAssistant.id]) return;

    async function fetchSuggestions() {
      try {
        const response = await fetch("/api/suggestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages }),
        });

        if (!response.ok) return;

        const data = await response.json();
        if (!Array.isArray(data.suggestions)) return;

        // Filter out suggestions that exactly match any previous user message
        const userMessages = messages
          .filter((m) => m.role === "user")
          .map((m) => m.content.trim().toLowerCase());

        const filtered = data.suggestions.filter(
          (s: string) => !userMessages.includes(s.trim().toLowerCase())
        );

        setMessageSuggestions((prev) => ({
          ...prev,
          [lastAssistant!.id]: filtered.slice(0, 3),
        }));
      } catch {
        // Silently ignore suggestion fetch failures
      }
    }

    fetchSuggestions();
  }, [messages, isLoading, messageSuggestions]);

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
    <main className="relative z-10 mx-auto flex h-screen w-full max-w-[500px] flex-col overflow-hidden bg-chat-base/95 text-white shadow-[0_24px_90px_rgba(0,0,0,0.38)]">
      {/* App Header */}
      <header className="flex h-14 shrink-0 items-center border-b border-white/10 bg-chat-surface/92 px-4 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.svg"
            alt=""
            aria-hidden="true"
            className="h-8 w-8 rounded-[8px] border border-white/10 shadow-[0_8px_22px_rgba(0,0,0,0.24)]"
          />
          <span className="text-base font-semibold tracking-tight text-white">Cellar Bank</span>
        </div>
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
          suggestions={messageSuggestions}
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
    </main>
  );
}
