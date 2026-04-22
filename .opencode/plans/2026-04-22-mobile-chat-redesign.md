# Mobile Chat Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the desktop-style AI banking interface into a responsive, dark-themed, mobile-native chat app experience (similar to ChatGPT/Claude/Gemini mobile apps) with welcome bubbles, bottom-fixed composer, and sleek message bubbles.

**Architecture:** A single-page Next.js app restructured as a full-viewport flex column. The chat shell becomes the app scaffold with a sticky header, scrollable message viewport, and bottom-fixed composer. All sub-components are re-themed for a cohesive "Midnight Graphite" dark palette with teal accents. The welcome state (account summary + suggested prompts) is moved inside the message list to appear only when the conversation is empty.

**Tech Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Google Fonts (Plus Jakarta Sans). No new runtime dependencies.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `tailwind.config.ts` | Custom color tokens (`chat-*`), font family, keyframes |
| `app/globals.css` | CSS variables, scrollbar-hide utility, base body styles |
| `app/layout.tsx` | Google Font loader (`Plus_Jakarta_Sans`) |
| `components/chat/chat-shell.tsx` | App scaffold: header, scrollable viewport, composer slot, auto-scroll logic |
| `components/chat/chat-message-list.tsx` | Render welcome screen (greeting + account + prompts) OR message bubbles |
| `components/chat/chat-composer.tsx` | Bottom-fixed pill-shaped input with circular send icon |
| `components/chat/account-summary-card.tsx` | Dark-themed balance card for welcome screen |
| `components/chat/suggested-prompts.tsx` | Dark-themed full-width prompt pills |
| `components/chat/structured-result.tsx` | Dark-themed result cards (balance, transactions, spending, status) |
| `components/chat/action-preview-card.tsx` | Dark-themed confirmation card |
| `components/chat/status-banner.tsx` | Dark-themed status alerts |
| `lib/mock-data/account.ts` | Add `userName` field for personalized greeting |
| `tests/component/chat-shell.test.tsx` | Update heading assertion for new app header |
| `tests/e2e/banking-chat.spec.ts` | Update selectors for new composer placeholder and send button |

---

### Task 1: Extend Tailwind Theme

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add custom colors, font, and animations**

Replace the entire contents of `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chat: {
          base: "#0a0a0a",
          surface: "#171717",
          elevated: "#262626",
          accent: "#14b8a6",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "message-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "message-in": "message-in 0.25s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "chore: extend tailwind with chat theme tokens and animations"
```

---

### Task 2: Add Global Styles and CSS Variables

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with dark-theme utilities**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-base: #0a0a0a;
    --bg-surface: #171717;
    --bg-elevated: #262626;
    --accent: #14b8a6;
  }

  body {
    @apply bg-chat-base text-white;
    -webkit-tap-highlight-color: transparent;
  }
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "chore: add dark theme css variables and scrollbar utility"
```

---

### Task 3: Load Plus Jakarta Sans Font

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import and apply Google Font**

Replace the entire contents of `app/layout.tsx` with:

```tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: load Plus Jakarta Sans font"
```

---

### Task 4: Scaffold Chat Shell Layout

**Files:**
- Modify: `components/chat/chat-shell.tsx`

- [ ] **Step 1: Replace ChatShell with mobile app scaffold**

Add `useRef` and `useEffect` to the React imports at the top:
```tsx
import { useState, useCallback, useRef, useEffect } from "react";
```

Add inside the component body (after state hooks):
```tsx
const scrollRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
}, [state.messages, state.pendingAction]);
```

Replace the `return` block with:

```tsx
  return (
    <div className="flex h-screen flex-col bg-chat-base text-white">
      {/* App Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/5 px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chat-accent text-sm font-bold text-chat-base">
            K
          </div>
          <span className="text-base font-semibold tracking-tight">KimiBank</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-chat-elevated" aria-hidden="true" />
      </header>

      {/* Scrollable Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain scrollbar-hide"
      >
        <ChatMessageList
          messages={state.messages}
          onSelectPrompt={submitMessage}
        />
      </div>

      {/* Pending Action Preview */}
      {state.pendingAction && (
        <div className="shrink-0 px-4 pt-3">
          <ActionPreviewCard
            action={state.pendingAction}
            onConfirm={() => handleConfirm(state.pendingAction!)}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Composer */}
      <div className="shrink-0">
        <ChatComposer onSend={submitMessage} disabled={state.isLoading} />
      </div>
    </div>
  );
```

- [ ] **Step 2: Commit**

```bash
git add components/chat/chat-shell.tsx
git commit -m "feat: restructure chat shell as mobile app scaffold"
```

---

### Task 5: Build Welcome Screen & Message Bubbles

**Files:**
- Modify: `components/chat/chat-message-list.tsx`
- Modify: `lib/mock-data/account.ts`

- [ ] **Step 1: Add userName to mock data**

In `lib/mock-data/account.ts`, add `userName: "Alex",` right after `userId`:

```ts
export const DEMO_ACCOUNT = {
  userId: "user_demo_001",
  userName: "Alex",
  accountId: "acct_primary_001",
  // ... rest unchanged
```

- [ ] **Step 2: Replace ChatMessageList with welcome state and dark bubbles**

Replace the entire contents of `components/chat/chat-message-list.tsx` with:

```tsx
import { DEMO_ACCOUNT } from "@/lib/mock-data/account";
import { SUGGESTED_PROMPTS } from "@/lib/chat/constants";
import { AccountSummaryCard } from "@/components/chat/account-summary-card";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";
import { StructuredResult } from "@/components/chat/structured-result";
import type { ChatMessage } from "@/lib/types/chat";

export function ChatMessageList({
  messages,
  onSelectPrompt,
}: {
  messages: ChatMessage[];
  onSelectPrompt: (prompt: string) => void;
}) {
  if (messages.length === 0) {
    const hour = new Date().getHours();
    const greeting =
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    return (
      <div className="flex h-full flex-col items-center justify-center px-6 py-12 animate-fade-in">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-white">
            {greeting}, {DEMO_ACCOUNT.userName}
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            How can I help with your banking today?
          </p>
        </div>

        <div className="mb-8 w-full max-w-sm">
          <AccountSummaryCard />
        </div>

        <div className="w-full max-w-sm space-y-3">
          <p className="px-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
            Suggestions
          </p>
          <SuggestedPrompts prompts={SUGGESTED_PROMPTS} onSelect={onSelectPrompt} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-end space-y-4 px-4 py-6">
      {messages.map((msg) => (
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
            <p>{msg.text}</p>
            {msg.structuredResult && (
              <div className="mt-3">
                <StructuredResult data={msg.structuredResult} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/chat/chat-message-list.tsx lib/mock-data/account.ts
git commit -m "feat: add welcome screen and dark message bubbles"
```

---

### Task 6: Build Bottom-Fixed Composer

**Files:**
- Modify: `components/chat/chat-composer.tsx`

- [ ] **Step 1: Replace composer with pill input and icon button**

Replace the entire contents of `components/chat/chat-composer.tsx` with:

```tsx
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
    <form
      onSubmit={handleSubmit}
      className="border-t border-white/5 bg-chat-base/80 p-4 backdrop-blur-md"
    >
      <div className="flex items-end gap-2 rounded-3xl border border-white/10 bg-chat-surface px-4 py-3 transition-colors focus-within:border-teal-500/40">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask about your money..."
          disabled={disabled}
          className="min-h-[24px] flex-1 bg-transparent text-[16px] text-white placeholder:text-neutral-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          aria-label="Send"
          className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white transition-colors hover:bg-teal-500 disabled:opacity-30 disabled:hover:bg-teal-600"
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
```

- [ ] **Step 2: Commit**

```bash
git add components/chat/chat-composer.tsx
git commit -m "feat: redesign composer as bottom-fixed pill with icon button"
```

---

### Task 7: Dark-Theme Account Summary Card

**Files:**
- Modify: `components/chat/account-summary-card.tsx`

- [ ] **Step 1: Apply dark styles**

Replace the entire contents with:

```tsx
import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function AccountSummaryCard() {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-900 p-5 shadow-lg">
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
        Primary Account
      </p>
      <h2 className="mt-1 text-lg font-semibold text-white">
        {DEMO_ACCOUNT.accountName}
      </h2>
      <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-white">
        {DEMO_ACCOUNT.currency}{" "}
        {DEMO_ACCOUNT.balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </p>
      <p className="mt-1 text-xs text-neutral-500">
        {DEMO_ACCOUNT.cardLabel}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/chat/account-summary-card.tsx
git commit -m "feat: dark-theme account summary card"
```

---

### Task 8: Dark-Theme Suggested Prompts

**Files:**
- Modify: `components/chat/suggested-prompts.tsx`

- [ ] **Step 1: Apply dark styles as full-width pills**

Replace the entire contents with:

```tsx
export function SuggestedPrompts({
  prompts,
  onSelect,
}: {
  prompts: string[];
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="w-full rounded-xl border border-white/5 bg-neutral-800/50 px-4 py-3 text-left text-sm text-neutral-300 transition-colors hover:bg-neutral-800 active:bg-neutral-700"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/chat/suggested-prompts.tsx
git commit -m "feat: dark-theme suggested prompts as full-width pills"
```

---

### Task 9: Dark-Theme Structured Result Cards

**Files:**
- Modify: `components/chat/structured-result.tsx`

- [ ] **Step 1: Replace with dark-themed variants**

Replace the entire contents with:

```tsx
import type { StructuredResult } from "@/lib/types/chat";

export function StructuredResult({ data }: { data: StructuredResult }) {
  if (data.type === "balance") {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
          Balance
        </p>
        <p className="mt-1 text-xl font-semibold text-emerald-300">
          {data.currency} {data.balance.toLocaleString()}
        </p>
      </div>
    );
  }

  if (data.type === "transactions") {
    return (
      <div className="rounded-xl border border-white/5 bg-chat-surface p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
          Recent Transactions
        </p>
        <ul className="space-y-3">
          {data.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-neutral-300">{item.merchant}</span>
              <span
                className={
                  item.direction === "credit"
                    ? "text-emerald-400"
                    : "text-white"
                }
              >
                {item.direction === "credit" ? "+" : "-"}
                {item.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (data.type === "spending") {
    return (
      <div className="rounded-xl border border-white/5 bg-chat-surface p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
          {data.monthLabel} Spending
        </p>
        <p className="mt-1 text-xl font-semibold text-white">
          RM {data.total.toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-neutral-300">Top: {data.topCategory}</p>
        <p className="mt-0.5 text-xs text-neutral-500">{data.comparisonText}</p>
      </div>
    );
  }

  if (data.type === "action-preview") {
    return (
      <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 p-4">
        <p className="text-sm font-medium text-amber-200">{data.summary}</p>
      </div>
    );
  }

  if (data.type === "status") {
    const toneClasses =
      data.tone === "success"
        ? "border-emerald-500/20 bg-emerald-950/30 text-emerald-300"
        : data.tone === "error"
          ? "border-rose-500/20 bg-rose-950/30 text-rose-300"
          : "border-sky-500/20 bg-sky-950/30 text-sky-300";

    return (
      <div className={`rounded-xl border p-4 ${toneClasses}`}>
        <p className="text-sm">{data.summary}</p>
      </div>
    );
  }

  return null;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/chat/structured-result.tsx
git commit -m "feat: dark-theme all structured result cards"
```

---

### Task 10: Dark-Theme Action Preview Card

**Files:**
- Modify: `components/chat/action-preview-card.tsx`

- [ ] **Step 1: Apply dark styles**

Replace the entire contents with:

```tsx
import type { PendingAction } from "@/lib/types/chat";

export function ActionPreviewCard({
  action,
  onConfirm,
  onCancel,
}: {
  action: PendingAction;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 p-4">
      <p className="text-sm font-medium text-amber-200">
        {action.previewText}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={onConfirm}
          className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-amber-500"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg border border-amber-500/30 bg-transparent px-4 py-2 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-950/50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/chat/action-preview-card.tsx
git commit -m "feat: dark-theme action preview card"
```

---

### Task 11: Dark-Theme Status Banner

**Files:**
- Modify: `components/chat/status-banner.tsx`

- [ ] **Step 1: Apply dark styles**

Replace the entire contents with:

```tsx
export function StatusBanner({
  tone,
  summary,
}: {
  tone: "success" | "error" | "info";
  summary: string;
}) {
  const toneClasses =
    tone === "success"
      ? "border-emerald-500/20 bg-emerald-950/30 text-emerald-300"
      : tone === "error"
        ? "border-rose-500/20 bg-rose-950/30 text-rose-300"
        : "border-sky-500/20 bg-sky-950/30 text-sky-300";

  return (
    <div className={`rounded-xl border p-3 text-sm ${toneClasses}`}>
      {summary}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/chat/status-banner.tsx
git commit -m "feat: dark-theme status banner"
```

---

### Task 12: Update Component Test

**Files:**
- Modify: `tests/component/chat-shell.test.tsx`

- [ ] **Step 1: Update assertions for new header and welcome screen**

Replace the entire contents with:

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the KimiBank app header", () => {
    render(<HomePage />);
    expect(screen.getByText("KimiBank")).toBeInTheDocument();
  });

  it("shows suggested prompts and the account summary card", () => {
    render(<HomePage />);
    expect(screen.getByText(/everyday savings/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /what's my balance/i }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Commit**

```bash
git add tests/component/chat-shell.test.tsx
git commit -m "test: update component test for new mobile header"
```

---

### Task 13: Update E2E Test

**Files:**
- Modify: `tests/e2e/banking-chat.spec.ts`

- [ ] **Step 1: Update placeholder and send button selectors**

Replace the entire contents with:

```ts
import { expect, test } from "@playwright/test";

test("transfer requires preview before completion", async ({ page }) => {
  await page.goto("/");
  await page
    .getByPlaceholder("Ask about your money...")
    .fill("Send RM 100 to Ali");
  await page.getByRole("button", { name: "Send" }).click();

  await expect(page.getByRole("button", { name: /confirm/i })).toBeVisible();
  await expect(page.getByText(/completed successfully/i)).toHaveCount(0);

  await page.getByRole("button", { name: /confirm/i }).click();
  await expect(page.getByText(/completed successfully/i).first()).toBeVisible();
});
```

- [ ] **Step 2: Commit**

```bash
git add tests/e2e/banking-chat.spec.ts
git commit -m "test: update e2e selectors for redesigned composer"
```

---

### Task 14: Run Test Suite

**Files:**
- N/A (verification only)

- [ ] **Step 1: Run unit and component tests**

```bash
npm test
```

Expected: All tests pass. If any fail due to markup changes, fix the corresponding component or test file.

- [ ] **Step 2: Start dev server for visual QA**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
1. Dark background fills the entire viewport.
2. Welcome screen shows greeting, account card, and 5 stacked prompt pills.
3. Tapping a prompt sends it and reveals the message list.
4. User messages appear on the right in teal bubbles; assistant on the left in dark gray.
5. Composer is fixed at the bottom with a rounded pill input and circular send icon.
6. Action preview cards appear above the composer with Confirm/Cancel buttons.
7. No horizontal scroll; vertical scroll is smooth and scrollbar is hidden.

- [ ] **Step 3: Commit any final fixes**

```bash
git add -A
git commit -m "fix: address visual qa feedback"
```

---

## Self-Review

**1. Spec coverage check:**
- ✅ Responsive layout, no phone frame — `chat-shell.tsx` uses `h-screen flex flex-col` edge-to-edge.
- ✅ Dark theme — Custom `chat-base`, `chat-surface`, `chat-elevated` colors applied globally.
- ✅ Welcome bubble with account summary — Implemented in `chat-message-list.tsx` empty state.
- ✅ Suggested prompts on welcome — `SuggestedPrompts` rendered inside empty state.
- ✅ Mobile chat app feel — Bottom-fixed composer, message bubbles, app header, hidden scrollbar.

**2. Placeholder scan:**
- No "TBD", "TODO", or vague instructions found. Every step contains exact file paths and code blocks.

**3. Type consistency:**
- `ChatMessageList` receives new prop `onSelectPrompt` in `chat-shell.tsx` and is defined in `chat-message-list.tsx`.
- `DEMO_ACCOUNT.userName` is added and consumed in the greeting.
- `aria-label="Send"` is added to the composer button so the E2E test's `getByRole("button", { name: "Send" })` continues to work.
- All Tailwind custom classes (`chat-*`, `animate-*`) are defined in `tailwind.config.ts` before being used in components.
