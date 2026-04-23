# Design Spec: Contextual Suggested Prompts

**Date:** 2025-01-28
**Status:** Approved

---

## 1. Overview

Add a contextual suggested prompts feature to the AI banking chat. After each substantive assistant response (those containing tool invocations like balances, transactions, charts, etc.), up to 3 pill-shaped suggestion buttons appear below the message. Clicking a suggestion immediately sends it as a new user message.

---

## 2. Goals

- Reduce user friction by surfacing logical next questions
- Keep suggestions contextually relevant to the last response
- Maintain the existing chat UX without clutter
- Allow users to ignore suggestions seamlessly

---

## 3. Non-Goals

- Suggestions after non-substantive responses (simple confirmations, greetings)
- More than 3 suggestions per response
- Manual user input/editing of suggestions before sending
- Offline/static suggestion generation (we're using LLM-based dynamic generation)

---

## 4. Architecture

```
User sends message
    ↓
/api/chat streams response
    ↓
Stream completes → onFinish callback fires
    ↓
Check: Did assistant message contain tool invocations?
    ├── No → Skip suggestions
    └── Yes → POST to /api/suggestions
                ↓
        LLM (SUGGESTION_MODEL) generates 3 follow-ups
                ↓
        Frontend renders SuggestedPrompts component
                ↓
        User clicks pill → auto-submitted as new message
```

---

## 5. API Design

### New Endpoint: `POST /api/suggestions`

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "What's my balance?" },
    { "role": "assistant", "content": "Your checking account balance is $5,230.", "toolInvocations": [...] }
  ]
}
```

**Response:**
```json
{
  "suggestions": [
    "Show me my recent transactions",
    "What's my spending this month?",
    "Can I see my portfolio performance?"
  ]
}
```

**Error Response:**
```json
{
  "suggestions": []
}
```
(Suggestions are best-effort; failures are silent.)

---

## 6. Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SUGGESTION_MODEL` | `gpt-4o-mini` | Model used for generating suggestions |

---

## 7. Frontend Components

### `SuggestedPrompts` (`/components/chat/suggested-prompts.tsx`)

**Props:**
```typescript
interface SuggestedPromptsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}
```

**Visual Design:**
- Horizontal flex row, `gap-2`, wrapping if needed
- Each pill: `rounded-full`, `bg-chat-elevated`, `border border-white/10`
- Text: `text-sm`, `text-chat-text-secondary`
- Hover: `brightness-110`, `scale-[1.02]`
- Animation: `animate-fade-in` with 50ms stagger per pill

**Placement:**
Rendered conditionally inside `ChatMessageList`, below assistant messages that have `suggestions` data attached.

---

## 8. Backend Implementation

### `/api/suggestions/route.ts`

1. Validate request body (Zod schema)
2. Construct a specialized system prompt:
   - "You are a helpful banking assistant. Given the conversation, suggest exactly 3 natural follow-up questions the user might ask next."
   - "Suggestions must be relevant to banking and the conversation context."
   - "Return only a JSON array of strings. No markdown, no explanation."
3. Call `generateObject()` or `generateText()` with `SUGGESTION_MODEL`
4. Parse and return suggestions array
5. On any error, return empty array

### Filtering Logic (Client-Side):
- Remove suggestions that exactly match any previous user message in the conversation
- Remove duplicates within the generated set

---

## 9. Data Flow

1. `useChat` in `ChatShell` receives the completed assistant message
2. `onFinish` callback checks `message.toolInvocations?.length > 0`
3. If substantive, calls `fetchSuggestions(messages)` utility
4. Fetched suggestions are stored in component state, keyed by message ID
5. `ChatMessageList` reads this state and renders `SuggestedPrompts` below the relevant message
6. `SuggestedPrompts` `onSuggestionClick` calls `handleSubmit({ input: suggestion })`

---

## 10. Error Handling & Edge Cases

| Scenario | Behavior |
|----------|----------|
| API fails | Silently skip, no suggestions shown |
| LLM returns < 3 suggestions | Show whatever was returned (0–3 pills) |
| Suggestions match recent user messages | Filtered out on client |
| User sends new message before suggestions load | Abort in-flight request, show new message |
| Streaming in progress | Suggestions only fetch after stream completes |

---

## 11. Security & Cost

- **Rate Limiting:** Reuse existing `/api/chat` rate limit or add lightweight shared limit
- **Cost:** GPT-4o-mini for ~50–100 tokens = ~$0.0001 per request (negligible)
- **Data Privacy:** Same conversation data already exposed to main chat endpoint

---

## 12. Testing Strategy

- **Unit:** `SuggestedPrompts` renders correct number of pills, calls callback on click
- **Integration:** `/api/suggestions` returns valid JSON array for sample conversations
- **E2E:** Click a suggestion, verify new message appears and LLM responds
