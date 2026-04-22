import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessageList } from "@/components/chat/chat-message-list";

describe("ChatMessageList with charts", () => {
  it("renders chart cards from render_chart tool invocations", () => {
    const messages = [
      {
        id: "msg-1",
        role: "assistant" as const,
        content: "Here is your portfolio breakdown.",
        toolInvocations: [
          {
            toolName: "render_chart",
            state: "result" as const,
            args: {
              mode: "structured",
              chartType: "pie",
              title: "Sector Allocation",
              data: [{ name: "Financials", value: 35 }],
            },
            result: { success: true, chartId: "c1" },
          },
        ],
      },
    ];

    render(<ChatMessageList messages={messages as any} onSelectPrompt={() => {}} />);
    expect(screen.getByText("Sector Allocation")).toBeInTheDocument();
  });
});
