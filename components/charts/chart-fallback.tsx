"use client";

import { useState } from "react";

interface ChartFallbackProps {
  title?: string;
  rawData?: any;
}

export function ChartFallback({ title, rawData }: ChartFallbackProps) {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4">
      <p className="text-sm text-rose-300">
        The assistant tried to show a chart &ldquo;{title || "untitled"}&rdquo;, but the data
        format isn&apos;t supported.
      </p>
      <button
        onClick={() => setShowRaw((s) => !s)}
        className="mt-2 text-xs text-rose-400 underline hover:text-rose-300"
      >
        {showRaw ? "Hide raw data" : "Show raw data"}
      </button>
      {showRaw && (
        <pre className="mt-2 max-h-40 overflow-auto rounded bg-black/30 p-2 text-xs text-neutral-400">
          {JSON.stringify(rawData, null, 2)}
        </pre>
      )}
    </div>
  );
}
