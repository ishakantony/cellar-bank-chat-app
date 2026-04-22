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
