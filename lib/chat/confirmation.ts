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
      assistantText: "I do not have a pending action to confirm. What would you like to confirm?",
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
