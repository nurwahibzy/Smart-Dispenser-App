"use client";

import * as React from "react";
import * as Recharts from "recharts";

import { cn } from "@/lib/utils/utils";

// ==================
// EXPORT WRAPPER (🔥 WAJIB ADA)
// ==================
export const ChartTooltip = Recharts.Tooltip;
export const ChartLegend = Recharts.Legend;

// ==================
// TYPES
// ==================
export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    color?: string;
  }
>;

type ChartContextType = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextType | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("Chart must be inside ChartContainer");
  return ctx;
}

// ==================
// CONTAINER
// ==================
export function ChartContainer({
  children,
  config,
  className,
}: {
  children: React.ReactNode;
  config: ChartConfig;
  className?: string;
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn(
          "w-full h-[240px] text-xs flex items-center justify-center",
          className,
        )}
      >
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

// ==================
// TOOLTIP
// ==================
type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color?: string;
  }>;
  label?: string;
};

export function ChartTooltipContent({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  const { config } = useChart();

  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow text-xs">
      <p className="text-slate-600 font-medium mb-2">{label}</p>

      {payload.map((item) => {
        const key = item.dataKey;
        const itemConfig = config[key];

        return (
          <div key={key} className="flex justify-between items-center gap-2">
            <span className="text-slate-500">{itemConfig?.label || key}</span>

            <span className="font-semibold text-blue-600">
              {Number(item.value).toFixed(2)}L
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ==================
// LEGEND
// ==================
type CustomLegendProps = {
  payload?: Array<{
    dataKey: string;
    color?: string;
  }>;
};

export function ChartLegendContent({ payload }: CustomLegendProps) {
  const { config } = useChart();

  if (!payload || payload.length === 0) return null;

  return (
    <div className="flex gap-4 justify-center mt-2 text-xs">
      {payload.map((item) => {
        const key = item.dataKey;
        const itemConfig = config[key];

        return (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-500">{itemConfig?.label || key}</span>
          </div>
        );
      })}
    </div>
  );
}
