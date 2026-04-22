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
