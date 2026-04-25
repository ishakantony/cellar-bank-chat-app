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
      className="border-t border-white/10 bg-chat-surface/90 p-4 shadow-[0_-18px_42px_rgba(0,0,0,0.28)] backdrop-blur-md"
    >
      <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-white/[0.065] px-4 py-3 shadow-inner shadow-white/[0.03] transition-colors focus-within:border-chat-accent/50 focus-within:bg-white/[0.085]">
        <input
          type="text"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about your money..."
          disabled={disabled}
          className="min-h-[24px] flex-1 bg-transparent text-[16px] text-white placeholder:text-white/30 focus:outline-none disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          aria-label="Send"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-chat-accent text-chat-base shadow-[0_0_20px_rgba(32,203,168,0.26)] transition-all hover:bg-[#35d8b8] active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-chat-accent"
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
