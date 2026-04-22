import type { ChatMessage } from "@/lib/types/chat";
import { StructuredResult } from "@/components/chat/structured-result";

export function ChatMessageList({ messages }: { messages: ChatMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
        No messages yet. Ask about your money above.
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-md rounded-xl px-4 py-3 ${
              msg.role === "user"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-800"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            {msg.structuredResult && (
              <div className="mt-2">
                <StructuredResult data={msg.structuredResult} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
