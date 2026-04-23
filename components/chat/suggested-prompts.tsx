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
              ? "rounded-full border border-white/10 bg-chat-elevated px-3 py-1.5 text-sm text-neutral-300 transition-all hover:brightness-110 hover:scale-[1.02] animate-fade-in"
              : "w-full rounded-xl border border-white/5 bg-neutral-800/50 px-4 py-3 text-left text-sm text-neutral-300 transition-colors hover:bg-neutral-800 active:bg-neutral-700"
          }
          style={isPill ? { animationDelay: `${index * 50}ms` } : undefined}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
