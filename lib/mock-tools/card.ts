import { DEMO_ACCOUNT } from "@/lib/mock-data/account";

export function createCardStatusPreview({
  action,
}: {
  action: "freeze" | "unfreeze";
}) {
  return {
    status: "preview" as const,
    executed: false,
    actionId: `card_${action}_preview_001`,
    summary: `${action === "freeze" ? "Freeze" : "Unfreeze"} ${DEMO_ACCOUNT.cardLabel}.`,
    action,
    cardLabel: DEMO_ACCOUNT.cardLabel,
  };
}

export function executeCardStatusChange({ actionId }: { actionId: string }) {
  return {
    status: "completed" as const,
    actionId,
    executed: true,
    confirmationText: "Card status updated successfully.",
  };
}
