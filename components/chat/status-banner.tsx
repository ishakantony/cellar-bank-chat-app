export function StatusBanner({
  tone,
  summary,
}: {
  tone: "success" | "error" | "info";
  summary: string;
}) {
  return (
    <div
      className={`rounded-xl border p-3 text-sm ${
        tone === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
          : tone === "error"
            ? "border-rose-200 bg-rose-50 text-rose-900"
            : "border-slate-200 bg-slate-50 text-slate-900"
      }`}
    >
      {summary}
    </div>
  );
}
