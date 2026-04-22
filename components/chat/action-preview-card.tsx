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
