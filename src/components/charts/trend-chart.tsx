"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

type ChartData = {
  day: string;
  liters: number;
};

type TrendChartProps = {
  data: ChartData[];
};

export function TrendChart({ data }: TrendChartProps) {
  const { totalWeek, avgPerDay } = useMemo(() => {
    const total = data.reduce((sum, d) => sum + d.liters, 0);
    return {
      totalWeek: total,
      avgPerDay: data.length ? total / data.length : 0,
    };
  }, [data]);

  const chartConfig = useMemo(
    () => ({
      liters: {
        label: "Water Usage",
        color: "#2563eb",
      },
    }),
    [],
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="mb-5">
        <h2 className="text-slate-800 font-semibold text-lg">
          Consumption Trend
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Avg {avgPerDay.toFixed(1)}L/day · {totalWeek.toFixed(1)}L this week
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-[260px] w-full">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorLiters" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.5} />
              <stop offset="70%" stopColor="#60a5fa" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#e2e8f0"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#cbd5f5", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          {/* 🔥 DISABLE ANIMATION */}
          <Area
            type="monotone"
            dataKey="liters"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#colorLiters)"
            dot={{ r: 4, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={300}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
