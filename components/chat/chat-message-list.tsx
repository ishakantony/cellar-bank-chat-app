import { DEMO_ACCOUNT } from "@/lib/mock-data/account";
import { SUGGESTED_PROMPTS } from "@/lib/chat/constants";
import { AccountSummaryCard } from "@/components/chat/account-summary-card";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";
import { StructuredResult } from "@/components/chat/structured-result";
import type { ChatMessage } from "@/lib/types/chat";

export function ChatMessageList({
  messages,
  isLoading,
  onSelectPrompt,
}: {
  messages: ChatMessage[];
  isLoading?: boolean;
  onSelectPrompt: (prompt: string) => void;
}) {
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
          <p className="mt-1 text-sm text-neutral-400">
            How can I help with your banking today?
          </p>
        </div>

        <div className="mb-8 w-full max-w-sm">
          <AccountSummaryCard />
        </div>

        <div className="w-full max-w-sm space-y-3">
          <p className="px-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
            Suggestions
          </p>
          <SuggestedPrompts prompts={SUGGESTED_PROMPTS} onSelect={onSelectPrompt} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-end space-y-4 px-4 py-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex animate-message-in ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[85%] px-4 py-3 text-[15px] leading-relaxed ${
              msg.role === "user"
                ? "rounded-2xl rounded-tr-sm bg-teal-600 text-white"
                : "rounded-2xl rounded-tl-sm border border-white/5 bg-chat-elevated text-neutral-100"
            }`}
          >
            {(() => {
              const result = msg.structuredResult;
              const hasSummary =
                result &&
                (result.type === "status" || result.type === "action-preview");
              const isDuplicate =
                hasSummary && "summary" in result && msg.text === result.summary;
              return !isDuplicate ? <p>{msg.text}</p> : null;
            })()}
            {msg.structuredResult && (
              <div className="mt-3">
                <StructuredResult data={msg.structuredResult} />
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex animate-message-in justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/5 bg-chat-elevated px-4 py-3 text-[15px] leading-relaxed text-neutral-100">
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
      )}
    </div>
  );
}
