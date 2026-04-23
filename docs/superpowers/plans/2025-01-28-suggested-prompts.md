# Contextual Suggested Prompts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Add dynamically-generated contextual suggested prompts as pill buttons below substantive assistant responses in the chat interface.

**Architecture:** After the main chat stream completes, a secondary lightweight API call generates 3 relevant follow-up questions using a configurable LLM model. These are rendered as inline pill buttons below the assistant message bubble. Clicking a pill auto-submits it as a new user message.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Vercel AI SDK v4, Vitest

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| app/api/suggestions/route.ts | Create | POST endpoint that generates suggestions via LLM |
| tests/integration/api-suggestions.test.ts | Create | Integration tests for suggestions API |
| components/chat/suggested-prompts.tsx | Modify | Add variant prop to support both full-width and pill styles |
| components/chat/chat-shell.tsx | Modify | Fetch suggestions on onFinish, store in state, pass to message list |
| components/chat/chat-message-list.tsx | Modify | Render inline SuggestedPrompts below assistant messages with tool invocations |
| tests/component/suggested-prompts.test.tsx | Create | Unit tests for both variants of SuggestedPrompts |
| tests/component/chat-message-list-suggestions.test.tsx | Create | Unit tests for inline suggestion rendering in ChatMessageList |

---

### Task 1: Create /api/suggestions API endpoint

**Files:**
- Create: app/api/suggestions/route.ts
- Test: tests/integration/api-suggestions.test.ts

**Context:** This endpoint receives the conversation history and generates 3 contextual follow-up prompts using a fast/cheap LLM model. Falls back to empty array on any error.

- [ ] **Step 1: Write the API endpoint**

Create app/api/suggestions/route.ts with the code that uses createOpenAI, generateText, and zod validation. The endpoint should POST, validate the request body with a schema containing messages array, use the SUGGESTION_MODEL env var (defaulting to gpt-4o-mini), call generateText with a banking-focused system prompt asking for exactly 3 follow-up questions as a JSON array, parse the JSON response (cleaning markdown code blocks), filter to strings only, limit to 3, and return { suggestions }. On any error, return { suggestions: [] } with appropriate status.

- [ ] **Step 2: Write the integration test**

Create tests/integration/api-suggestions.test.ts that mocks the ai and openai SDKs, then tests four scenarios: valid JSON response returns 3 suggestions, invalid JSON returns empty array, validation failure returns empty array with 400, and model error returns empty array with 500.

- [ ] **Step 3: Run tests**

Run: npx vitest run tests/integration/api-suggestions.test.ts
Expected: All 4 tests PASS

- [ ] **Step 4: Commit**

Add app/api/suggestions/route.ts and tests/integration/api-suggestions.test.ts, then commit with message: feat: add suggestions API endpoint with tests

---

### Task 2: Update SuggestedPrompts component for pill variant

**Files:**
- Modify: components/chat/suggested-prompts.tsx
- Test: tests/component/suggested-prompts.test.tsx

**Context:** The existing SuggestedPrompts component renders full-width card buttons for the empty state. We need to add a variant prop so it can also render inline pill buttons below messages.

- [ ] **Step 1: Write the failing test**

Create tests/component/suggested-prompts.test.tsx with three tests: renders full-width buttons by default, renders pill buttons when variant is pill (checking button count), and calls onSelect with the prompt text when clicked.

Run: npx vitest run tests/component/suggested-prompts.test.tsx
Expected: FAIL - variant prop not recognized

- [ ] **Step 2: Update the component**

Modify components/chat/suggested-prompts.tsx to add an optional variant prop (default or pill). When variant is pill, use flex-wrap gap-2 container and rounded-full border border-white/10 bg-chat-elevated px-3 py-1.5 text-sm text-neutral-300 with hover:brightness-110 hover:scale-[1.02] animate-fade-in and staggered animation delays. Keep the existing default style for the empty state.

- [ ] **Step 3: Run tests**

Run: npx vitest run tests/component/suggested-prompts.test.tsx
Expected: All 3 tests PASS

- [ ] **Step 4: Commit**

Add components/chat/suggested-prompts.tsx and tests/component/suggested-prompts.test.tsx, then commit with message: feat: add pill variant to SuggestedPrompts component

---

### Task 3: Update ChatShell to fetch and manage suggestions

**Files:**
- Modify: components/chat/chat-shell.tsx

**Context:** When a substantive assistant response completes, fetch suggestions from /api/suggestions and store them keyed by message ID. Pass them down to ChatMessageList.

- [ ] **Step 1: Add suggestion state and fetch logic**

Modify components/chat/chat-shell.tsx:

1. Import useState and useEffect from react (these are already imported via useRef etc., but ensure useState is available)
2. Add state: messageSuggestions: Record<string, string[]> initialized to {}
3. Add an effect that runs when messages change and isLoading becomes false:
   - Find the last assistant message
   - Skip if no assistant message or if it has no toolInvocations (length === 0)
   - Skip if we already have suggestions for this message ID
   - POST to /api/suggestions with all messages up to and including this assistant
   - Store returned suggestions in messageSuggestions state keyed by message ID
   - Filter out suggestions that exactly match any previous user message content
   - Handle errors silently (just do not store suggestions)
4. Pass messageSuggestions to ChatMessageList as a new prop

- [ ] **Step 2: Run the app to verify no TypeScript errors**

Run: npx tsc --noEmit
Expected: No errors

- [ ] **Step 3: Commit**

Add components/chat/chat-shell.tsx, then commit with message: feat: fetch and store contextual suggestions in ChatShell

---

### Task 4: Update ChatMessageList to render inline suggestions

**Files:**
- Modify: components/chat/chat-message-list.tsx

**Context:** Render pill-style SuggestedPrompts below assistant messages that have tool invocations and have suggestions available.

- [ ] **Step 1: Add suggestions prop and render logic**

Modify components/chat/chat-message-list.tsx:

1. Add a new prop: suggestions?: Record<string, string[]>
2. Inside the message mapping, after rendering the assistant message content and structured results, conditionally render:
   - If msg.role === assistant and suggestions[msg.id] exists and suggestions[msg.id].length > 0
   - Render a div with mt-3 containing SuggestedPrompts with variant="pill", prompts={suggestions[msg.id]}, onSelect={onSelectPrompt}
3. Make sure the suggestions are rendered outside the main message bubble div but inside the flex container for that message, so they appear below the bubble

- [ ] **Step 2: Write unit test for inline suggestions**

Create tests/component/chat-message-list-suggestions.test.tsx that:
- Renders ChatMessageList with messages containing an assistant message with toolInvocations and suggestions
- Verifies that the suggestion pills are rendered
- Verifies that clicking a suggestion calls onSelectPrompt

- [ ] **Step 3: Run tests**

Run: npx vitest run tests/component/chat-message-list-suggestions.test.tsx
Expected: Tests PASS

- [ ] **Step 4: Commit**

Add components/chat/chat-message-list.tsx and tests/component/chat-message-list-suggestions.test.tsx, then commit with message: feat: render inline suggested prompts below assistant messages

---

### Task 5: Update existing ChatShell test

**Files:**
- Modify: tests/component/chat-shell.test.tsx

**Context:** The existing test mocks useChat. We need to ensure the new suggestion-fetching logic does not break the existing tests.

- [ ] **Step 1: Update the mock to include onFinish**

Modify tests/component/chat-shell.test.tsx to add onFinish: () => {} to the mocked useChat return value, so the destructuring in ChatShell does not fail.

- [ ] **Step 2: Run all component tests**

Run: npx vitest run tests/component/
Expected: All tests PASS (including the new ones and existing ones)

- [ ] **Step 3: Commit**

Add tests/component/chat-shell.test.tsx, then commit with message: test: update ChatShell mock to include onFinish

---

### Task 6: Final verification and cleanup

- [ ] **Step 1: Run full test suite**

Run: npm test
Expected: All tests PASS

- [ ] **Step 2: Verify TypeScript compilation**

Run: npx tsc --noEmit
Expected: No errors

- [ ] **Step 3: Run the dev server and manually test**

Run: npm run dev
Manually verify:
1. Ask What is my balance?
2. After response completes, see 3 pill suggestions appear below
3. Click a suggestion, it auto-sends
4. Ask a simple question like Hello
5. No suggestions appear (no tool invocations)

- [ ] **Step 4: Final commit**

Add all changed files, then commit with message: feat: add contextual suggested prompts to chat responses

---

## Spec Coverage Checklist

| Spec Requirement | Implementation Task |
|------------------|---------------------|
| Post-stream suggestion API | Task 1 |
| SUGGESTION_MODEL env var | Task 1 (Step 1) |
| Up to 3 suggestions | Task 1 (filter/slice logic) |
| Only after substantive responses (tool invocations) | Task 3 (check toolInvocations.length) |
| Pill/chip buttons | Task 2 (variant=pill styling) |
| Auto-send on click | Task 4 (onSelectPrompt calls append via ChatShell) |
| Silent failure on API error | Task 1 (catch blocks return empty) |
| Filter duplicates from previous user messages | Task 3 (client-side filtering) |
| Staggered fade-in animation | Task 2 (animationDelay per pill) |
| Tests for all components | Tasks 1, 2, 4, 5 |
