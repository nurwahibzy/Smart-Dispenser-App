"use client";

import { WaterGauge } from "./water-gauge";
import { useWaterData } from "@/lib/hooks/useWaterData";

export default function WaterLevelSection() {
  const { waterLevel, loading } = useWaterData();

  const liters = +(20 * (waterLevel / 100)).toFixed(1);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <p className="text-sm text-gray-400">Loading data...</p>
      </div>
    );
  }

  return <WaterGauge level={waterLevel} liters={liters} capacity={20} />;
}
