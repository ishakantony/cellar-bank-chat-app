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
