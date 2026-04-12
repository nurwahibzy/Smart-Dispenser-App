"use client";

import { WaterGauge } from "./water-gauge";
import { useWaterData } from "@/lib/hooks/useWaterData";
import { calculateWaterLiters } from "@/lib/utils/water";

export default function WaterLevelSection() {
  const { waterLevel, loading } = useWaterData();

  const capacity = 20;
  const liters = calculateWaterLiters(waterLevel, capacity);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <p className="text-sm text-gray-400">Loading data...</p>
      </div>
    );
  }

  return <WaterGauge level={waterLevel} liters={liters} capacity={capacity} />;
}
