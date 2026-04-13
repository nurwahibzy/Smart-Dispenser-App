"use client";

import { memo } from "react";
import { TrendChart } from "@/components/charts/trend-chart";

type ChartData = {
  day: string;
  liters: number;
};

interface ConsumptionTrendProps {
  data: ChartData[];
}

function ConsumptionTrendComponent({ data }: ConsumptionTrendProps) {
  return <TrendChart data={data} />;
}

export const ConsumptionTrend = memo(ConsumptionTrendComponent);
