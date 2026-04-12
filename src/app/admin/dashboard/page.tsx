"use client";

import WaterLevelSection from "@/features/water/water-level-section";
import TdsCard from "@/components/cards/tds-card";
import { useDeviceData } from "@/lib/hooks/useDeviceData";

export default function DashboardPage() {
  const { data, loading } = useDeviceData();

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const sensors = data?.sensors;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400">
          Monitor your smart water dispenser in real-time
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Water Level */}
        <WaterLevelSection />

        {/* TDS (Realtime) */}
        <TdsCard tds={sensors?.tds || 0} />
      </div>
    </div>
  );
}
