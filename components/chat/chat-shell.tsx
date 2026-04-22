"use client";

import { useState } from "react";
import { AccountSummaryCard } from "@/components/chat/account-summary-card";
import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";
import { SUGGESTED_PROMPTS } from "@/lib/chat/constants";

export function ChatShell() {
  const [messages] = useState([]);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Single user demo</p>
        <h1 className="text-4xl font-semibold text-slate-950">AI Banking Assistant</h1>
      </header>
      <AccountSummaryCard />
      <SuggestedPrompts prompts={SUGGESTED_PROMPTS} onSelect={() => undefined} />
      <ChatMessageList messages={messages} />
      <ChatComposer onSend={() => undefined} disabled={false} />
    </main>
  );
}
