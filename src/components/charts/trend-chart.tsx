"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type ChartData = {
  day: string;
  liters: number;
};

type TrendChartProps = {
  data: ChartData[];
};

function TrendChartInner({ data }: TrendChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();

      if (rect.width > 0 && rect.height > 0) {
        setSize({
          width: rect.width,
          height: rect.height,
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { totalWeek, avgPerDay } = useMemo(() => {
    const total = data.reduce((sum, d) => sum + d.liters, 0);
    return {
      totalWeek: total,
      avgPerDay: data.length ? total / data.length : 0,
    };
  }, [data]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-slate-800 font-semibold text-lg">
          Consumption Trend
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Avg {avgPerDay.toFixed(1)}L/day · {totalWeek.toFixed(1)}L this week
        </p>
      </div>

      {/* Chart */}
      <div ref={containerRef} className="h-[260px] w-full min-w-0">
        {size.width > 0 && size.height > 0 ? (
          <AreaChart
            width={size.width}
            height={size.height}
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

            <Tooltip />
            <Legend />

            <Area
              type="monotone"
              dataKey="liters"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorLiters)"
              dot={{ r: 4, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              isAnimationActive
              animationDuration={300}
              animationEasing="ease-out"
            />
          </AreaChart>
        ) : (
          <div className="h-full w-full bg-slate-50 rounded-xl animate-pulse" />
        )}
      </div>
    </div>
  );
}

export const TrendChart = dynamic(() => Promise.resolve(TrendChartInner), {
  ssr: false,
});
