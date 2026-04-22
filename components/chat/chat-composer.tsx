"use client";

import { useState } from "react";

export function ChatComposer({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled: boolean;
}) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about your money"
        disabled={disabled}
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-slate-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
