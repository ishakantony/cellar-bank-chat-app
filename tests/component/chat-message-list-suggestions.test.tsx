import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import type { Message } from "ai/react";

function createMessage(overrides: Partial<Message> = {}): Message {
  return {
    id: "msg-1",
    role: "user",
    content: "Hello",
    createdAt: new Date(),
    ...overrides,
  } as Message;
}

describe("ChatMessageList with inline suggestions", () => {
  it("renders pill suggestions below an assistant message with tool invocations", () => {
    const assistantMessage = createMessage({
      id: "assistant-1",
      role: "assistant",
      content: "Your balance is $5,000.",
      toolInvocations: [
        { toolName: "get_balance", state: "result", result: { balance: 5000, currency: "MYR" } },
      ],
    });

    const suggestions = {
      "assistant-1": ["Show my transactions", "Spending summary"],
    };

    render(
      <ChatMessageList
        messages={[assistantMessage]}
        onSelectPrompt={() => {}}
        suggestions={suggestions}
      />
    );

    expect(screen.getByRole("button", { name: "Show my transactions" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Spending summary" })).toBeInTheDocument();
  });

  it("does not render suggestions for user messages", () => {
    const userMessage = createMessage({
      id: "user-1",
      role: "user",
      content: "What's my balance?",
    });

    const suggestions = {
      "user-1": ["Show my transactions"],
    };

    render(
      <ChatMessageList
        messages={[userMessage]}
        onSelectPrompt={() => {}}
        suggestions={suggestions}
      />
    );

    expect(screen.queryByRole("button", { name: "Show my transactions" })).not.toBeInTheDocument();
  });

  it("calls onSelectPrompt when a suggestion is clicked", () => {
    const assistantMessage = createMessage({
      id: "assistant-1",
      role: "assistant",
      content: "Your balance is $5,000.",
      toolInvocations: [
        { toolName: "get_balance", state: "result", result: { balance: 5000, currency: "MYR" } },
      ],
    });

    const handleSelect = vi.fn();
    const suggestions = {
      "assistant-1": ["Show my transactions"],
    };

    render(
      <ChatMessageList
        messages={[assistantMessage]}
        onSelectPrompt={handleSelect}
        suggestions={suggestions}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Show my transactions" }));
    expect(handleSelect).toHaveBeenCalledWith("Show my transactions");
  });

  it("does not render suggestions when assistant has no tool invocations", () => {
    const assistantMessage = createMessage({
      id: "assistant-1",
      role: "assistant",
      content: "Hello! How can I help?",
    });

    const suggestions = {
      "assistant-1": ["Show my transactions"],
    };

    render(
      <ChatMessageList
        messages={[assistantMessage]}
        onSelectPrompt={() => {}}
        suggestions={suggestions}
      />
    );

    expect(screen.queryByRole("button", { name: "Show my transactions" })).not.toBeInTheDocument();
  });
});
