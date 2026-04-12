"use client";

import WaterLevelSection from "@/features/water/water-level-section";
import TdsCard from "@/components/cards/tds-card";
import DailyUsageCard from "@/components/cards/daily-usage-card";
import { useDeviceData } from "@/lib/hooks/useDeviceData";
import { useTransactionData } from "@/lib/hooks/useTransactionData";
import { calculateDailyUsage } from "@/lib/utils/transaction";

export default function DashboardPage() {
  const { data, loading } = useDeviceData();
  const { data: transactions, loading: trxLoading } = useTransactionData();

  if (loading || trxLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const sensors = data?.sensors;

  const { dailyUsage, totalDispenses } = calculateDailyUsage(transactions);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {/* Water Level */}
        <WaterLevelSection />

        {/* TDS */}
        <TdsCard tds={sensors?.tds || 0} />

        {/* Daily Usage REAL */}
        <DailyUsageCard
          dailyUsage={dailyUsage}
          totalDispenses={totalDispenses}
        />
      </div>
    </div>
  );
}
