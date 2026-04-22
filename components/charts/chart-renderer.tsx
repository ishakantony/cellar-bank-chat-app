import type { ChartPayload } from "@/lib/types/chat";
import { StructuredChart } from "./structured-chart";
import { CustomChart } from "./custom-chart";

interface ChartRendererProps {
  data: ChartPayload;
}

export function ChartRenderer({ data }: ChartRendererProps) {
  return (
    <div className="rounded-xl border border-white/5 bg-chat-surface p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
        {data.title}
      </p>
      {data.description && (
        <p className="mb-3 text-sm text-neutral-300">{data.description}</p>
      )}
      {data.mode === "structured" ? (
        <StructuredChart
          chartType={data.chartType}
          title={data.title}
          data={data.data}
        />
      ) : (
        <CustomChart title={data.title} echartsOption={data.echartsOption} />
      )}
    </div>
  );
}
