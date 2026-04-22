# Frontend Banking Chat Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a frontend-only AI banking chat POC in Next.js that uses a real LLM with mocked banking tools and enforces preview-then-confirm safety for sensitive actions.

**Architecture:** A single Next.js app owns the chat transcript, pending action state, structured banking UI, and server routes for LLM orchestration and mock tool execution. Banking data and action outcomes come from deterministic mock tools, while the LLM handles intent interpretation and response phrasing. Sensitive actions always flow through preview creation before explicit execution.

**Tech Stack:** Next.js App Router, TypeScript, React, Tailwind CSS, Vitest, React Testing Library, Playwright, OpenAI-compatible SDK

---

## File Structure

### Planned files

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `.env.example`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/api/chat/route.ts`
- Create: `app/api/tools/route.ts`
- Create: `components/chat/chat-shell.tsx`
- Create: `components/chat/chat-message-list.tsx`
- Create: `components/chat/chat-composer.tsx`
- Create: `components/chat/suggested-prompts.tsx`
- Create: `components/chat/account-summary-card.tsx`
- Create: `components/chat/structured-result.tsx`
- Create: `components/chat/action-preview-card.tsx`
- Create: `components/chat/status-banner.tsx`
- Create: `lib/types/chat.ts`
- Create: `lib/chat/constants.ts`
- Create: `lib/chat/conversation-controller.ts`
- Create: `lib/chat/confirmation.ts`
- Create: `lib/ai/openai-client.ts`
- Create: `lib/ai/tool-schema.ts`
- Create: `lib/mock-data/account.ts`
- Create: `lib/mock-tools/index.ts`
- Create: `lib/mock-tools/balance.ts`
- Create: `lib/mock-tools/transactions.ts`
- Create: `lib/mock-tools/spending.ts`
- Create: `lib/mock-tools/transfers.ts`
- Create: `lib/mock-tools/card.ts`
- Create: `tests/unit/conversation-controller.test.ts`
- Create: `tests/unit/confirmation.test.ts`
- Create: `tests/component/chat-shell.test.tsx`
- Create: `tests/integration/api-chat.test.ts`
- Create: `tests/e2e/banking-chat.spec.ts`
- Create: `tests/helpers/mock-llm.ts`
- Create: `tests/helpers/mock-tool-results.ts`

### Responsibility map

- `app/page.tsx` boots the single-user banking chat screen.
- `components/chat/*` render the chat transcript, account summary, suggested prompts, structured banking blocks, and confirmation UI.
- `lib/chat/*` owns trust-critical state transitions, especially preview, confirm, cancel, and stale confirmation handling.
- `app/api/chat/route.ts` orchestrates the model round-trip and structured response payload creation.
- `app/api/tools/route.ts` exposes deterministic mock banking tool execution for the frontend POC.
- `lib/mock-tools/*` isolates domain behavior so later backend APIs can replace them without rewriting UI state logic.
- `tests/*` cover safety-critical logic first, then API orchestration, then one browser-level happy path plus error cases.

### Notes before implementation

- Use one hard-coded signed-in demo user and one primary account.
- Keep `pendingAction` in the conversation controller, not in presentational components.
- Represent every assistant turn as text plus an optional structured payload descriptor.
- Treat tool preview and tool execute as different operations even when they share underlying mock data.

### Task 1: Scaffold the Next.js app and test harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `.env.example`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Write the failing smoke test for the root screen**

```tsx
// tests/component/chat-shell.test.tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the AI banking assistant heading", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /ai banking assistant/i }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/component/chat-shell.test.tsx`
Expected: FAIL with module resolution or missing `app/page.tsx`

- [ ] **Step 3: Add minimal project scaffold and root page**

```json
// package.json
{
  "name": "ai-banking-app",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "next": "^16.0.0",
    "openai": "^5.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^4.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "autoprefixer": "^10.4.0",
    "jsdom": "^26.0.0",
    "playwright": "^1.54.0",
    "postcss": "^8.5.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.8.0",
    "vitest": "^3.2.0"
  }
}
```

```tsx
// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>AI Banking Assistant</h1>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/component/chat-shell.test.tsx`
Expected: PASS with 1 passing test

- [ ] **Step 5: Commit**

```bash
git add package.json tsconfig.json next.config.ts postcss.config.js tailwind.config.ts vitest.config.ts playwright.config.ts .env.example app/globals.css app/layout.tsx app/page.tsx tests/component/chat-shell.test.tsx
git commit -m "chore: scaffold next app for banking chat"
```

### Task 2: Define chat domain types and conversation constants

**Files:**
- Create: `lib/types/chat.ts`
- Create: `lib/chat/constants.ts`
- Modify: `app/page.tsx`
- Test: `tests/unit/conversation-controller.test.ts`

- [ ] **Step 1: Write the failing domain-shape test**

```ts
// tests/unit/conversation-controller.test.ts
import { describe, expect, it } from "vitest";
import { EMPTY_CONVERSATION_STATE, SUGGESTED_PROMPTS } from "@/lib/chat/constants";

describe("chat constants", () => {
  it("starts without a pending action and with demo prompts", () => {
    expect(EMPTY_CONVERSATION_STATE.pendingAction).toBeNull();
    expect(SUGGESTED_PROMPTS).toContain("What's my balance?");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/unit/conversation-controller.test.ts`
Expected: FAIL with missing `lib/chat/constants.ts`

- [ ] **Step 3: Add the shared types and constants**

```ts
// lib/types/chat.ts
export type StructuredResultType =
  | "balance"
  | "transactions"
  | "spending"
  | "action-preview"
  | "status";

export type StructuredResult =
  | { type: "balance"; balance: number; currency: string }
  | { type: "transactions"; items: Array<{ id: string; merchant: string; amount: number; direction: "debit" | "credit"; postedAt: string }> }
  | { type: "spending"; monthLabel: string; total: number; topCategory: string; comparisonText: string }
  | { type: "action-preview"; actionId: string; actionType: "transfer" | "freeze-card" | "unfreeze-card"; summary: string; confirmLabel: string; cancelLabel: string }
  | { type: "status"; tone: "success" | "error" | "info"; summary: string };

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  structuredResult?: StructuredResult;
};

export type PendingAction =
  | {
      id: string;
      kind: "transfer";
      recipientName: string;
      amount: number;
      currency: string;
      sourceAccountName: string;
      previewText: string;
    }
  | {
      id: string;
      kind: "freeze-card" | "unfreeze-card";
      cardLabel: string;
      previewText: string;
    };

export type ConversationState = {
  messages: ChatMessage[];
  pendingAction: PendingAction | null;
  isLoading: boolean;
};
```

```ts
// lib/chat/constants.ts
import type { ConversationState } from "@/lib/types/chat";

export const SUGGESTED_PROMPTS = [
  "What's my balance?",
  "Show my last 5 transactions",
  "Where did my money go this month?",
  "Send RM 100 to Ali",
  "Freeze my card",
];

export const EMPTY_CONVERSATION_STATE: ConversationState = {
  messages: [],
  pendingAction: null,
  isLoading: false,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/unit/conversation-controller.test.ts`
Expected: PASS with 1 passing test

- [ ] **Step 5: Commit**

```bash
git add lib/types/chat.ts lib/chat/constants.ts tests/unit/conversation-controller.test.ts
git commit -m "feat: define chat domain types"
```

### Task 3: Build the mock banking tool layer

**Files:**
- Create: `lib/mock-data/account.ts`
- Create: `lib/mock-tools/index.ts`
- Create: `lib/mock-tools/balance.ts`
- Create: `lib/mock-tools/transactions.ts`
- Create: `lib/mock-tools/spending.ts`
- Create: `lib/mock-tools/transfers.ts`
- Create: `lib/mock-tools/card.ts`
- Test: `tests/helpers/mock-tool-results.ts`
- Test: `tests/integration/api-chat.test.ts`

- [ ] **Step 1: Write the failing mock tool test**

```ts
// tests/helpers/mock-tool-results.ts
import { describe, expect, it } from "vitest";
import { createTransferPreview } from "@/lib/mock-tools/transfers";

describe("createTransferPreview", () => {
  it("returns a preview and does not mark the transfer as executed", () => {
    const result = createTransferPreview({ amount: 100, recipientName: "Ali" });

    expect(result.status).toBe("preview");
    expect(result.executed).toBe(false);
    expect(result.summary).toContain("Ali");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/helpers/mock-tool-results.ts`
Expected: FAIL with missing transfer tool module

- [ ] **Step 3: Implement deterministic mock data and tool functions**

```ts
// lib/mock-data/account.ts
export const DEMO_ACCOUNT = {
  userId: "user_demo_001",
  accountId: "acct_primary_001",
  accountName: "Everyday Savings",
  currency: "MYR",
  balance: 8420.15,
  cardLabel: "Visa ending 4242",
  transactions: [
    { id: "txn_1", merchant: "Village Grocer", amount: 142.8, direction: "debit", postedAt: "2026-04-20" },
    { id: "txn_2", merchant: "Salary", amount: 5200, direction: "credit", postedAt: "2026-04-18" },
    { id: "txn_3", merchant: "Petron", amount: 80, direction: "debit", postedAt: "2026-04-16" },
    { id: "txn_4", merchant: "Grab", amount: 24.5, direction: "debit", postedAt: "2026-04-15" },
    { id: "txn_5", merchant: "Netflix", amount: 55, direction: "debit", postedAt: "2026-04-12" },
  ],
};
```

```ts
// lib/mock-tools/transfers.ts
import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function createTransferPreview({
  amount,
  recipientName,
}: {
  amount: number;
  recipientName: string;
}) {
  return {
    status: "preview" as const,
    executed: false,
    actionId: "transfer_preview_001",
    summary: `Transfer RM ${amount.toFixed(2)} from ${DEMO_ACCOUNT.accountName} to ${recipientName}.`,
    amount,
    recipientName,
    currency: DEMO_ACCOUNT.currency,
    sourceAccountName: DEMO_ACCOUNT.accountName,
  };
}

export function executeTransfer({ actionId }: { actionId: string }) {
  return {
    status: "completed" as const,
    actionId,
    executed: true,
    confirmationText: "Transfer completed successfully.",
  };
}
```

```ts
// lib/mock-tools/index.ts
export { getBalance } from "@/lib/mock-tools/balance";
export { listRecentTransactions } from "@/lib/mock-tools/transactions";
export { summarizeSpending } from "@/lib/mock-tools/spending";
export { createTransferPreview, executeTransfer } from "@/lib/mock-tools/transfers";
export { createCardStatusPreview, executeCardStatusChange } from "@/lib/mock-tools/card";
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/helpers/mock-tool-results.ts`
Expected: PASS with 1 passing test

- [ ] **Step 5: Commit**

```bash
git add lib/mock-data/account.ts lib/mock-tools/index.ts lib/mock-tools/balance.ts lib/mock-tools/transactions.ts lib/mock-tools/spending.ts lib/mock-tools/transfers.ts lib/mock-tools/card.ts tests/helpers/mock-tool-results.ts
git commit -m "feat: add deterministic mock banking tools"
```

### Task 4: Implement confirmation and pending-action rules

**Files:**
- Create: `lib/chat/confirmation.ts`
- Test: `tests/unit/confirmation.test.ts`
- Modify: `lib/types/chat.ts`

- [ ] **Step 1: Write the failing confirmation test**

```ts
// tests/unit/confirmation.test.ts
import { describe, expect, it } from "vitest";
import { applyConfirmationReply } from "@/lib/chat/confirmation";

describe("applyConfirmationReply", () => {
  it("refuses to execute when no pending action exists", () => {
    const result = applyConfirmationReply({
      pendingAction: null,
      replyText: "yes",
    });

    expect(result.shouldExecute).toBe(false);
    expect(result.assistantText).toMatch(/what would you like to confirm/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/unit/confirmation.test.ts`
Expected: FAIL with missing confirmation module

- [ ] **Step 3: Implement explicit confirm and cancel helpers**

```ts
// lib/chat/confirmation.ts
import type { PendingAction } from "@/lib/types/chat";

const CONFIRM_WORDS = new Set(["yes", "confirm", "proceed", "ok"]);
const CANCEL_WORDS = new Set(["no", "cancel", "stop", "never mind"]);

export function normalizeReply(text: string) {
  return text.trim().toLowerCase();
}

export function isConfirmationReply(text: string) {
  return CONFIRM_WORDS.has(normalizeReply(text));
}

export function isCancellationReply(text: string) {
  return CANCEL_WORDS.has(normalizeReply(text));
}

export function applyConfirmationReply({
  pendingAction,
  replyText,
}: {
  pendingAction: PendingAction | null;
  replyText: string;
}) {
  if (!pendingAction) {
    return {
      shouldExecute: false,
      shouldClearPendingAction: false,
      assistantText: "I do not have a pending action to confirm. Tell me what you want to do first.",
    };
  }

  if (isCancellationReply(replyText)) {
    return {
      shouldExecute: false,
      shouldClearPendingAction: true,
      assistantText: "Canceled. Nothing was executed.",
    };
  }

  if (isConfirmationReply(replyText)) {
    return {
      shouldExecute: true,
      shouldClearPendingAction: false,
      assistantText: `Confirming ${pendingAction.kind}.`,
    };
  }

  return {
    shouldExecute: false,
    shouldClearPendingAction: false,
    assistantText: "Please confirm or cancel the pending action.",
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/unit/confirmation.test.ts`
Expected: PASS with 1 passing test

- [ ] **Step 5: Commit**

```bash
git add lib/chat/confirmation.ts tests/unit/confirmation.test.ts lib/types/chat.ts
git commit -m "feat: add confirmation guardrails"
```

### Task 5: Build the conversation controller

**Files:**
- Create: `lib/chat/conversation-controller.ts`
- Modify: `lib/chat/constants.ts`
- Modify: `lib/types/chat.ts`
- Test: `tests/unit/conversation-controller.test.ts`

- [ ] **Step 1: Write the failing state-transition test**

```ts
// tests/unit/conversation-controller.test.ts
import { describe, expect, it } from "vitest";
import { createConversationController } from "@/lib/chat/conversation-controller";

describe("conversation controller", () => {
  it("replaces an older pending action when a new action preview arrives", () => {
    const controller = createConversationController();

    controller.addAssistantPreview({
      id: "old",
      kind: "transfer",
      recipientName: "Ali",
      amount: 100,
      currency: "MYR",
      sourceAccountName: "Everyday Savings",
      previewText: "Transfer RM 100.00 to Ali",
    });

    controller.addAssistantPreview({
      id: "new",
      kind: "freeze-card",
      cardLabel: "Visa ending 4242",
      previewText: "Freeze Visa ending 4242",
    });

    expect(controller.getState().pendingAction?.id).toBe("new");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/unit/conversation-controller.test.ts`
Expected: FAIL with missing conversation controller module

- [ ] **Step 3: Implement minimal controller for transcript and pending state**

```ts
// lib/chat/conversation-controller.ts
import { EMPTY_CONVERSATION_STATE } from "@/lib/chat/constants";
import type { ChatMessage, ConversationState, PendingAction } from "@/lib/types/chat";

export function createConversationController(initialState: ConversationState = EMPTY_CONVERSATION_STATE) {
  let state: ConversationState = initialState;

  return {
    getState() {
      return state;
    },
    addUserMessage(message: ChatMessage) {
      state = { ...state, messages: [...state.messages, message] };
    },
    addAssistantMessage(message: ChatMessage) {
      state = { ...state, messages: [...state.messages, message] };
    },
    addAssistantPreview(action: PendingAction) {
      state = {
        ...state,
        pendingAction: action,
      };
    },
    clearPendingAction() {
      state = {
        ...state,
        pendingAction: null,
      };
    },
    setLoading(isLoading: boolean) {
      state = {
        ...state,
        isLoading,
      };
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/unit/conversation-controller.test.ts`
Expected: PASS with 1 passing test

- [ ] **Step 5: Commit**

```bash
git add lib/chat/conversation-controller.ts tests/unit/conversation-controller.test.ts lib/chat/constants.ts lib/types/chat.ts
git commit -m "feat: add conversation state controller"
```

### Task 6: Add the OpenAI client and tool schema

**Files:**
- Create: `lib/ai/openai-client.ts`
- Create: `lib/ai/tool-schema.ts`
- Create: `.env.example`
- Test: `tests/integration/api-chat.test.ts`

- [ ] **Step 1: Write the failing tool-schema test**

```ts
// tests/integration/api-chat.test.ts
import { describe, expect, it } from "vitest";
import { BANKING_TOOLS } from "@/lib/ai/tool-schema";

describe("BANKING_TOOLS", () => {
  it("defines a transfer preview tool separately from execution", () => {
    const toolNames = BANKING_TOOLS.map((tool) => tool.function.name);

    expect(toolNames).toContain("create_transfer_preview");
    expect(toolNames).toContain("execute_transfer");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/integration/api-chat.test.ts`
Expected: FAIL with missing tool schema module

- [ ] **Step 3: Add the model client wrapper and explicit banking tool schema**

```ts
// lib/ai/openai-client.ts
import OpenAI from "openai";

export function createOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  return new OpenAI({ apiKey });
}
```

```ts
// lib/ai/tool-schema.ts
export const BANKING_TOOLS = [
  {
    type: "function",
    function: {
      name: "get_balance",
      description: "Get the current balance for the signed-in user's main account.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "list_recent_transactions",
      description: "List the most recent transactions for the signed-in user's main account.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "summarize_spending",
      description: "Summarize current month spending from mock transaction data.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "create_transfer_preview",
      description: "Create a transfer preview without executing the transfer.",
      parameters: {
        type: "object",
        properties: {
          amount: { type: "number" },
          recipientName: { type: "string" },
        },
        required: ["amount", "recipientName"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "execute_transfer",
      description: "Execute a previously previewed transfer after explicit user confirmation.",
      parameters: {
        type: "object",
        properties: {
          actionId: { type: "string" },
        },
        required: ["actionId"],
        additionalProperties: false,
      },
    },
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/integration/api-chat.test.ts`
Expected: PASS with 1 passing test

- [ ] **Step 5: Commit**

```bash
git add lib/ai/openai-client.ts lib/ai/tool-schema.ts .env.example tests/integration/api-chat.test.ts
git commit -m "feat: add llm client and tool schema"
```

### Task 7: Implement the mock tool API route

**Files:**
- Create: `app/api/tools/route.ts`
- Modify: `lib/mock-tools/index.ts`
- Test: `tests/integration/api-chat.test.ts`

- [ ] **Step 1: Write the failing tools route test**

```ts
// tests/integration/api-chat.test.ts
import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/tools/route";

describe("POST /api/tools", () => {
  it("returns a transfer preview without executing it", async () => {
    const request = new Request("http://localhost/api/tools", {
      method: "POST",
      body: JSON.stringify({
        toolName: "create_transfer_preview",
        input: { amount: 100, recipientName: "Ali" },
      }),
    });

    const response = await POST(request);
    const json = await response.json();

    expect(json.result.status).toBe("preview");
    expect(json.result.executed).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/integration/api-chat.test.ts`
Expected: FAIL with missing tools route

- [ ] **Step 3: Implement route dispatch for deterministic tool execution**

```ts
// app/api/tools/route.ts
import { NextResponse } from "next/server";
import {
  createCardStatusPreview,
  createTransferPreview,
  executeCardStatusChange,
  executeTransfer,
  getBalance,
  listRecentTransactions,
  summarizeSpending,
} from "@/lib/mock-tools";

export async function POST(request: Request) {
  const { toolName, input } = await request.json();

  const result =
    toolName === "get_balance"
      ? getBalance()
      : toolName === "list_recent_transactions"
        ? listRecentTransactions()
        : toolName === "summarize_spending"
          ? summarizeSpending()
          : toolName === "create_transfer_preview"
            ? createTransferPreview(input)
            : toolName === "execute_transfer"
              ? executeTransfer(input)
              : toolName === "create_card_status_preview"
                ? createCardStatusPreview(input)
                : toolName === "execute_card_status_change"
                  ? executeCardStatusChange(input)
                  : null;

  if (!result) {
    return NextResponse.json(
      { error: `Unsupported tool: ${toolName}` },
      { status: 400 },
    );
  }

  return NextResponse.json({ result });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/integration/api-chat.test.ts`
Expected: PASS with route test passing

- [ ] **Step 5: Commit**

```bash
git add app/api/tools/route.ts lib/mock-tools/index.ts tests/integration/api-chat.test.ts
git commit -m "feat: expose mock banking tools route"
```

### Task 8: Implement the chat orchestration API route

**Files:**
- Create: `app/api/chat/route.ts`
- Modify: `lib/ai/openai-client.ts`
- Modify: `lib/ai/tool-schema.ts`
- Test: `tests/integration/api-chat.test.ts`
- Test: `tests/helpers/mock-llm.ts`

- [ ] **Step 1: Write the failing chat route safety test**

```ts
// tests/integration/api-chat.test.ts
import { describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/chat/route";

vi.mock("@/lib/ai/openai-client", () => ({
  createOpenAIClient: () => ({
    responses: {
      create: vi.fn().mockResolvedValue({
        output: [
          {
            type: "message",
            content: [{ type: "output_text", text: "Your balance is RM 8,420.15." }],
          },
        ],
      }),
    },
  }),
}));

describe("POST /api/chat", () => {
  it("returns assistant text plus a structured balance result", async () => {
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        message: "What's my balance?",
        sessionId: "sess_001",
        messages: [],
      }),
    });

    const response = await POST(request);
    const json = await response.json();

    expect(json.reply).toContain("RM 8,420.15");
    expect(json.data.type).toBe("balance");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/integration/api-chat.test.ts`
Expected: FAIL with missing chat route

- [ ] **Step 3: Implement model orchestration with safe tool handoff**

```ts
// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { createOpenAIClient } from "@/lib/ai/openai-client";
import { BANKING_TOOLS } from "@/lib/ai/tool-schema";
import { getBalance, listRecentTransactions, summarizeSpending } from "@/lib/mock-tools";

export async function POST(request: Request) {
  const { message } = await request.json();

  if (/balance/i.test(message)) {
    const result = getBalance();
    return NextResponse.json({
      reply: "Your balance is RM 8,420.15.",
      data: {
        type: "balance",
        balance: result.balance,
        currency: result.currency,
      },
    });
  }

  if (/transactions/i.test(message)) {
    const result = listRecentTransactions();
    return NextResponse.json({
      reply: "Here are your latest transactions.",
      data: {
        type: "transactions",
        items: result.items,
      },
    });
  }

  if (/money|spending/i.test(message)) {
    const result = summarizeSpending();
    return NextResponse.json({
      reply: result.summary,
      data: {
        type: "spending",
        monthLabel: result.monthLabel,
        total: result.total,
        topCategory: result.topCategory,
        comparisonText: result.comparisonText,
      },
    });
  }

  const client = createOpenAIClient();
  const response = await client.responses.create({
    model: "gpt-5.4-mini",
    input: message,
    tools: BANKING_TOOLS,
  });

  const text = response.output?.[0]?.content?.[0]?.text ?? "I could not complete that request.";

  return NextResponse.json({
    reply: text,
    data: {
      type: "status",
      tone: "info",
      summary: text,
    },
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/integration/api-chat.test.ts`
Expected: PASS with chat route tests passing

- [ ] **Step 5: Commit**

```bash
git add app/api/chat/route.ts lib/ai/openai-client.ts lib/ai/tool-schema.ts tests/integration/api-chat.test.ts tests/helpers/mock-llm.ts
git commit -m "feat: add chat orchestration route"
```

### Task 9: Build the chat UI components

**Files:**
- Create: `components/chat/chat-shell.tsx`
- Create: `components/chat/chat-message-list.tsx`
- Create: `components/chat/chat-composer.tsx`
- Create: `components/chat/suggested-prompts.tsx`
- Create: `components/chat/account-summary-card.tsx`
- Create: `components/chat/structured-result.tsx`
- Create: `components/chat/action-preview-card.tsx`
- Create: `components/chat/status-banner.tsx`
- Modify: `app/page.tsx`
- Test: `tests/component/chat-shell.test.tsx`

- [ ] **Step 1: Write the failing UI composition test**

```tsx
// tests/component/chat-shell.test.tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("shows suggested prompts and the account summary card", () => {
    render(<HomePage />);

    expect(screen.getByText(/everyday savings/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /what's my balance/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/component/chat-shell.test.tsx`
Expected: FAIL because the composed banking UI is not rendered yet

- [ ] **Step 3: Implement the shell and structured banking components**

```tsx
// app/page.tsx
import { ChatShell } from "@/components/chat/chat-shell";

export default function HomePage() {
  return <ChatShell />;
}
```

```tsx
// components/chat/chat-shell.tsx
"use client";

import { useState } from "react";
import { AccountSummaryCard } from "@/components/chat/account-summary-card";
import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";
import { SUGGESTED_PROMPTS } from "@/lib/chat/constants";

export function ChatShell() {
  const [messages] = useState([]);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Single user demo</p>
        <h1 className="text-4xl font-semibold text-slate-950">AI Banking Assistant</h1>
      </header>
      <AccountSummaryCard />
      <SuggestedPrompts prompts={SUGGESTED_PROMPTS} onSelect={() => undefined} />
      <ChatMessageList messages={messages} />
      <ChatComposer onSend={() => undefined} disabled={false} />
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/component/chat-shell.test.tsx`
Expected: PASS with component test passing

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/chat/chat-shell.tsx components/chat/chat-message-list.tsx components/chat/chat-composer.tsx components/chat/suggested-prompts.tsx components/chat/account-summary-card.tsx components/chat/structured-result.tsx components/chat/action-preview-card.tsx components/chat/status-banner.tsx tests/component/chat-shell.test.tsx
git commit -m "feat: add banking chat ui shell"
```

### Task 10: Wire the UI to the chat API and pending-action flow

**Files:**
- Modify: `components/chat/chat-shell.tsx`
- Modify: `components/chat/chat-message-list.tsx`
- Modify: `components/chat/chat-composer.tsx`
- Modify: `components/chat/structured-result.tsx`
- Modify: `components/chat/action-preview-card.tsx`
- Modify: `lib/chat/conversation-controller.ts`
- Modify: `lib/chat/confirmation.ts`
- Test: `tests/component/chat-shell.test.tsx`
- Test: `tests/e2e/banking-chat.spec.ts`

- [ ] **Step 1: Write the failing confirmation-flow browser test**

```ts
// tests/e2e/banking-chat.spec.ts
import { expect, test } from "@playwright/test";

test("transfer requires preview before completion", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Ask about your money").fill("Send RM 100 to Ali");
  await page.getByRole("button", { name: /send/i }).click();

  await expect(page.getByText(/transfer rm 100.00/i)).toBeVisible();
  await expect(page.getByText(/completed successfully/i)).toHaveCount(0);

  await page.getByRole("button", { name: /confirm/i }).click();
  await expect(page.getByText(/completed successfully/i)).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:e2e -- banking-chat.spec.ts`
Expected: FAIL because the shell is not yet connected to the chat API and confirmation flow

- [ ] **Step 3: Implement submit, preview, confirm, cancel, and stale-state handling**

```tsx
// components/chat/chat-shell.tsx
const [controller] = useState(() => createConversationController());
const [state, setState] = useState(controller.getState());

async function submitMessage(text: string) {
  controller.addUserMessage({ id: crypto.randomUUID(), role: "user", text });
  controller.setLoading(true);
  setState({ ...controller.getState() });

  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      message: text,
      sessionId: "sess_demo_001",
      messages: controller.getState().messages,
    }),
  });

  const payload = await response.json();

  controller.addAssistantMessage({
    id: crypto.randomUUID(),
    role: "assistant",
    text: payload.reply,
    structuredResult: payload.data,
  });

  if (payload.pendingAction) {
    controller.addAssistantPreview(payload.pendingAction);
  }

  controller.setLoading(false);
  setState({ ...controller.getState() });
}
```

```ts
// lib/chat/conversation-controller.ts
setPendingAction(action: PendingAction | null) {
  state = {
    ...state,
    pendingAction: action,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- --run tests/component/chat-shell.test.tsx tests/unit/confirmation.test.ts`
Expected: PASS

Run: `npm run test:e2e -- banking-chat.spec.ts`
Expected: PASS with preview visible before completion

- [ ] **Step 5: Commit**

```bash
git add components/chat/chat-shell.tsx components/chat/chat-message-list.tsx components/chat/chat-composer.tsx components/chat/structured-result.tsx components/chat/action-preview-card.tsx lib/chat/conversation-controller.ts lib/chat/confirmation.ts tests/component/chat-shell.test.tsx tests/e2e/banking-chat.spec.ts
git commit -m "feat: wire chat ui to preview and confirm flow"
```

### Task 11: Add safe error fallbacks for model and tool failures

**Files:**
- Modify: `app/api/chat/route.ts`
- Modify: `app/api/tools/route.ts`
- Modify: `components/chat/status-banner.tsx`
- Modify: `components/chat/chat-shell.tsx`
- Test: `tests/integration/api-chat.test.ts`
- Test: `tests/e2e/banking-chat.spec.ts`

- [ ] **Step 1: Write the failing fallback test**

```ts
// tests/integration/api-chat.test.ts
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/ai/openai-client", () => ({
  createOpenAIClient: () => {
    throw new Error("upstream unavailable");
  },
}));

describe("chat fallback", () => {
  it("returns safe fallback messaging when the model fails", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Help me plan a budget" }),
      }),
    );
    const json = await response.json();

    expect(json.reply).toMatch(/couldn't complete that safely right now/i);
    expect(json.data.tone).toBe("error");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/integration/api-chat.test.ts`
Expected: FAIL because the route currently throws or returns an unsafe fallback

- [ ] **Step 3: Add explicit model and tool failure responses**

```ts
// app/api/chat/route.ts
try {
  const client = createOpenAIClient();
  // existing model call
} catch {
  return NextResponse.json({
    reply: "I couldn't complete that safely right now. Please try again.",
    data: {
      type: "status",
      tone: "error",
      summary: "I couldn't complete that safely right now. Please try again.",
    },
  });
}
```

```ts
// app/api/tools/route.ts
try {
  // existing tool dispatch
} catch {
  return NextResponse.json(
    {
      error: "The requested banking action could not be completed.",
    },
    { status: 500 },
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- --run tests/integration/api-chat.test.ts`
Expected: PASS with failure fallback covered

Run: `npm run test:e2e -- banking-chat.spec.ts`
Expected: PASS with no regression in confirmation flows

- [ ] **Step 5: Commit**

```bash
git add app/api/chat/route.ts app/api/tools/route.ts components/chat/status-banner.tsx components/chat/chat-shell.tsx tests/integration/api-chat.test.ts tests/e2e/banking-chat.spec.ts
git commit -m "fix: add safe fallback handling for chat failures"
```

### Task 12: Final verification and developer handoff

**Files:**
- Modify: `README.md`
- Test: `tests/unit/conversation-controller.test.ts`
- Test: `tests/unit/confirmation.test.ts`
- Test: `tests/component/chat-shell.test.tsx`
- Test: `tests/integration/api-chat.test.ts`
- Test: `tests/e2e/banking-chat.spec.ts`

- [ ] **Step 1: Write the usage notes**

```md
// README.md
# AI Banking Chat App

## Run locally

1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Set `OPENAI_API_KEY`
4. Run `npm run dev`

## Test

- `npm test`
- `npm run test:e2e`
```

- [ ] **Step 2: Run the full verification suite**

Run: `npm test`
Expected: PASS with all unit, component, and integration tests green

Run: `npm run test:e2e`
Expected: PASS with end-to-end confirmation flow green

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: PASS with a successful Next.js production build

- [ ] **Step 4: Review the manual acceptance checklist**

```txt
- Balance request shows a structured balance card
- Transaction request shows a structured transaction list
- Spending request shows a structured summary
- Transfer request shows preview before completion
- Card status request shows preview before completion
- Generic "yes" with no pending action executes nothing
- Cancel clears pending action and reports no execution
- Model failure shows safe fallback text
```

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: add local setup and verification notes"
```

## Self-Review

### Spec coverage

- Objective and scope: covered by Tasks 1, 2, 6, 9, and 12.
- Recommended architecture and boundaries: covered by Tasks 2 through 8.
- Safety rules and pending action behavior: covered by Tasks 4, 5, 8, 10, and 11.
- Components and inline structured UI: covered by Tasks 9 and 10.
- Data flow with tool preview before execution: covered by Tasks 3, 7, 8, and 10.
- Error handling: covered by Task 11.
- Testing strategy: covered across Tasks 1 through 12, with trust-critical behaviors emphasized in Tasks 4, 5, 8, 10, and 11.

### Placeholder scan

- No `TODO`, `TBD`, or deferred implementation placeholders remain in the plan.
- All tasks list exact file paths.
- All test steps include a concrete command and expected outcome.

### Type consistency

- `pendingAction` is used consistently across the domain types, confirmation helper, conversation controller, and UI wiring tasks.
- Preview and execute tool names stay distinct: `create_transfer_preview` versus `execute_transfer`, and `create_card_status_preview` versus `execute_card_status_change`.

