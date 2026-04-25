export function SuggestedPrompts({
  prompts,
  onSelect,
  variant = "default",
}: {
  prompts: string[];
  onSelect: (prompt: string) => void;
  variant?: "default" | "pill";
}) {
  const isPill = variant === "pill";

  return (
    <div className={isPill ? "flex flex-wrap gap-2" : "flex flex-col gap-2"}>
      {prompts.map((prompt, index) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className={
            isPill
              ? "animate-fade-in rounded-full border border-white/10 bg-chat-elevated/90 px-3 py-1.5 text-sm text-white/72 shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.02] hover:border-chat-accent/35 hover:bg-chat-accentSoft/65 hover:text-white active:scale-[0.98]"
              : "w-full rounded-[14px] border border-white/10 bg-chat-surface/72 px-4 py-3 text-left text-sm text-white/72 shadow-[0_10px_26px_rgba(0,0,0,0.16)] transition-all hover:border-chat-accent/35 hover:bg-chat-elevated active:scale-[0.99]"
          }
          style={isPill ? { animationDelay: `${index * 50}ms` } : undefined}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
