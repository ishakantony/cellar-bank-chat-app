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
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-medium text-amber-900">{action.previewText}</p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={onConfirm}
          className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
