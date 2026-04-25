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
    <div className="rounded-[14px] border border-amber-400/25 bg-amber-950/25 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.2)]">
      <p className="text-sm font-medium text-amber-100">
        {action.previewText}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={onConfirm}
          className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-chat-base transition-all hover:bg-amber-400 active:scale-[0.98]"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg border border-amber-400/30 bg-amber-950/20 px-4 py-2 text-xs font-semibold text-amber-200 transition-all hover:bg-amber-900/35 active:scale-[0.98]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
