"use client";

import { useState } from "react";

interface ChartFallbackProps {
  title?: string;
  rawData?: unknown;
}

export function ChartFallback({ title, rawData }: ChartFallbackProps) {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="rounded-[14px] border border-rose-400/25 bg-rose-950/25 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.2)]">
      <p className="text-sm text-rose-200">
        The assistant tried to show a chart &ldquo;{title || "untitled"}&rdquo;, but the data
        format isn&apos;t supported.
      </p>
      <button
        onClick={() => setShowRaw((s) => !s)}
        className="mt-2 text-xs font-medium text-rose-200 underline decoration-rose-200/40 underline-offset-4 transition-colors hover:text-white"
      >
        {showRaw ? "Hide raw data" : "Show raw data"}
      </button>
      {showRaw && (
        <pre className="mt-2 max-h-40 overflow-auto rounded-lg bg-chat-base/60 p-2 text-xs text-white/52">
          {JSON.stringify(rawData, null, 2)}
        </pre>
      )}
    </div>
  );
}
