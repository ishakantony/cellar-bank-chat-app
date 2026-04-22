"use client";

import { type ChangeEvent, type FormEvent } from "react";

export function ChatComposer({
  input,
  handleInputChange,
  handleSubmit,
  disabled,
}: {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-white/5 bg-chat-base/80 p-4 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-chat-surface px-4 py-3 transition-colors focus-within:border-teal-500/40">
        <input
          type="text"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about your money..."
          disabled={disabled}
          className="min-h-[24px] flex-1 bg-transparent text-[16px] text-white placeholder:text-neutral-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          aria-label="Send"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white transition-colors hover:bg-teal-500 disabled:opacity-30 disabled:hover:bg-teal-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
