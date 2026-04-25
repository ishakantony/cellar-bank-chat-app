export function StatusBanner({
  tone,
  summary,
}: {
  tone: "success" | "error" | "info";
  summary: string;
}) {
  const toneClasses =
    tone === "success"
      ? "border-chat-accent/25 bg-chat-accentSoft/55 text-white"
      : tone === "error"
        ? "border-rose-400/25 bg-rose-950/25 text-rose-200"
        : "border-white/10 bg-chat-surface/80 text-white/72";

  return (
    <div className={`rounded-[14px] border p-3 text-sm shadow-[0_12px_30px_rgba(0,0,0,0.18)] ${toneClasses}`}>
      {summary}
    </div>
  );
}
