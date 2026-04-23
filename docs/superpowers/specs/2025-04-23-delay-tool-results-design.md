# Design: Delay Tool Results Until Text Finishes Streaming

## Problem
In the chat UI, tool call results (balance cards, charts, transaction lists) render immediately as soon as they arrive. Meanwhile, the LLM's natural language text streams in token-by-token. Because the text block is empty at first and only grows downward, the tool results appear first and then get pushed down as text accumulates above them. This creates a jarring visual effect where structured cards appear and then text appears "on top" of them little by little.

## Goal
Ensure that for any assistant message, the natural language text finishes streaming **before** structured tool results are displayed. This eliminates layout shift and makes the reading experience feel top-to-bottom and predictable.

## Approach
Suppress structured results for the **last assistant message** while the assistant is still streaming (`isLoading === true`). Once streaming completes, render both the text and the structured results together.

### Implementation Detail
In `ChatMessageList`, when mapping over messages:
1. For each assistant message, check if it is the last message in the array.
2. If it is the last message **and** `isLoading` is true, render only the text content (`MarkdownText`). Skip the `structuredResults` block.
3. For all other messages (user messages, previous assistant messages, or when streaming is done), render everything as before.

### Edge Cases
- **No text content**: If the assistant produces tool results with no text at all, the results will still be delayed until streaming ends. After streaming ends, the results appear. This is acceptable because the user still sees the thinking indicator while the LLM works.
- **Multiple assistant messages**: Only the last assistant message is affected. Earlier messages in history render fully.
- **User messages during loading**: If the user sends a new message while loading, the previous assistant message is no longer "last" and its results will render immediately.

## Files to Modify
- `components/chat/chat-message-list.tsx` — add conditional suppression of structured results for the last assistant message during streaming.

## Testing
- Verify that tool results do not appear until streaming ends.
- Verify that previous messages still show tool results.
- Verify that messages with no tool results behave identically.
