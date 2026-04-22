export function SuggestedPrompts({
  prompts,
  onSelect,
}: {
  prompts: string[];
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="w-full rounded-xl border border-white/5 bg-neutral-800/50 px-4 py-3 text-left text-sm text-neutral-300 transition-colors hover:bg-neutral-800 active:bg-neutral-700"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
