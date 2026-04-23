# Delay Tool Results Until Text Finishes Streaming

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent structured tool results from rendering until the assistant's natural language text finishes streaming, eliminating layout shift in the chat UI.

**Architecture:** Add a conditional check in `ChatMessageList` that suppresses `structuredResults` for the last assistant message while `isLoading` is true. Once streaming completes, both text and tool results render together.

**Tech Stack:** React, TypeScript, Vitest, React Testing Library

---

## File Structure

| File | Change | Responsibility |
|------|--------|----------------|
| `components/chat/chat-message-list.tsx` | Modify | Add conditional suppression of structured results during streaming |
| `tests/component/chat-message-list-charts.test.tsx` | Modify | Add test verifying tool results are hidden during streaming |

---

### Task 1: Write Failing Test

**Files:**
- Modify: `tests/component/chat-message-list-charts.test.tsx`

- [ ] **Step 1: Add test that tool results are suppressed while streaming**

Add the following test to the existing test file:

```tsx
  it("suppresses tool results for the last assistant message while streaming", () => {
    const messages = [
      {
        id: "msg-1",
        role: "assistant" as const,
        content: "Your balance is",
        toolInvocations: [
          {
            toolName: "get_balance",
            state: "result" as const,
            args: {},
            result: { balance: 12500.5, currency: "MYR" },
          },
        ],
      },
    ];

    render(<ChatMessageList messages={messages as any} isLoading onSelectPrompt={() => {}} />);
    // Text should be visible
    expect(screen.getByText("Your balance is")).toBeInTheDocument();
    // But balance card should NOT appear yet
    expect(screen.queryByText("MYR 12,500.50")).not.toBeInTheDocument();
  });

  it("shows tool results after streaming finishes", () => {
    const messages = [
      {
        id: "msg-1",
        role: "assistant" as const,
        content: "Your balance is",
        toolInvocations: [
          {
            toolName: "get_balance",
            state: "result" as const,
            args: {},
            result: { balance: 12500.5, currency: "MYR" },
          },
        ],
      },
    ];

    render(<ChatMessageList messages={messages as any} isLoading={false} onSelectPrompt={() => {}} />);
    expect(screen.getByText("Your balance is")).toBeInTheDocument();
    expect(screen.getByText("MYR 12,500.50")).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/component/chat-message-list-charts.test.tsx --reporter=verbose`
Expected: FAIL — `MYR 12,500.50` is found in the document when it shouldn't be during streaming.

---

### Task 2: Implement the Fix

**Files:**
- Modify: `components/chat/chat-message-list.tsx`

- [ ] **Step 3: Add conditional suppression logic**

In the `messages.map` callback, determine whether the current assistant message is the last one AND streaming is active. If so, skip rendering structured results.

Change:
```tsx
      {messages.map((msg) => {
        const structuredResults = msg.role === "assistant" ? getStructuredResultsFromMessage(msg) : [];
        const hasContent = msg.content && msg.content.trim().length > 0;

        // Skip rendering empty assistant placeholder messages during streaming
        if (msg.role === "assistant" && !hasContent && structuredResults.length === 0) {
          return null;
        }

        return (
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
              {hasContent && msg.role === "assistant" ? (
                <MarkdownText content={msg.content} />
              ) : hasContent ? (
                <p>{msg.content}</p>
              ) : null}
              {structuredResults.length > 0 && (
                <div className="mt-3 space-y-3">
                  {structuredResults.map((result, i) => (
                    <StructuredResult key={i} data={result} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
```

To:
```tsx
      {messages.map((msg, index) => {
        const structuredResults = msg.role === "assistant" ? getStructuredResultsFromMessage(msg) : [];
        const hasContent = msg.content && msg.content.trim().length > 0;

        // Skip rendering empty assistant placeholder messages during streaming
        if (msg.role === "assistant" && !hasContent && structuredResults.length === 0) {
          return null;
        }

        // Suppress tool results for the last assistant message while streaming
        const isLastAssistantWhileStreaming =
          isLoading &&
          msg.role === "assistant" &&
          index === messages.length - 1;

        return (
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
              {hasContent && msg.role === "assistant" ? (
                <MarkdownText content={msg.content} />
              ) : hasContent ? (
                <p>{msg.content}</p>
              ) : null}
              {structuredResults.length > 0 && !isLastAssistantWhileStreaming && (
                <div className="mt-3 space-y-3">
                  {structuredResults.map((result, i) => (
                    <StructuredResult key={i} data={result} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/component/chat-message-list-charts.test.tsx --reporter=verbose`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/chat/chat-message-list.tsx tests/component/chat-message-list-charts.test.tsx
git commit -m "fix(chat): delay tool results until text finishes streaming"
```

---

## Self-Review Checklist

- [x] Spec coverage: All requirements from the spec are covered — suppress structured results for last assistant during streaming, show them after.
- [x] Placeholder scan: No TBD, TODO, or vague instructions. All code is concrete.
- [x] Type consistency: Uses existing `isLoading` prop and message types, no new types introduced.
