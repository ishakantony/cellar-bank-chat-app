import type { ChartPayload } from "@/lib/types/chat";
import { StructuredChart } from "./structured-chart";
import { CustomChart } from "./custom-chart";

interface ChartRendererProps {
  data: ChartPayload;
}

export function ChartRenderer({ data }: ChartRendererProps) {
  return (
    <div className="rounded-[14px] border border-white/10 bg-chat-surface/80 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/42">
        {data.title}
      </p>
      {data.description && (
        <p className="mb-3 text-sm text-white/68">{data.description}</p>
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
