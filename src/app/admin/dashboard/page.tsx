"use client";

import { useState, useMemo, useEffect } from "react";

import WaterLevelSection from "@/features/water/components/water-level-section";
import TdsCard from "@/features/water/components/tds-card";
import DailyUsageCard from "@/features/water/components/daily-usage-card";
import ValveControl from "@/features/water/components/valve-control-card";
import VolumeControl from "@/features/water/components/volume-control-card";
import { ConsumptionTrend } from "@/features/transaction/components/consumption-trends-chart";
import { HistoryTable } from "@/features/transaction/components/history-table";

import { groupTransactionsByDay } from "@/lib/utils/chart";
import { useDeviceData } from "@/lib/hooks/useDeviceData";
import { useTransactionData } from "@/lib/hooks/useTransactionData";
import { calculateDailyUsage } from "@/lib/utils/transaction";


export default function DashboardPage() {
  const { data, loading } = useDeviceData();
  const { data: transactions, loading: trxLoading } = useTransactionData();

  const chartData = useMemo(() => {
    return groupTransactionsByDay(transactions || []);
  }, [transactions]);

  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowChart(true), 0);
    return () => clearTimeout(t);
  }, []);

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
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        <div className="lg:col-span-1 flex">
          <div className="flex-1">
            <WaterLevelSection />
          </div>
        </div>

        <div className="flex flex-col gap-4 h-full">
          <TdsCard tds={sensors?.tds || 0} />

          {/* FIX UTAMA DI SINI */}
          <ValveControl className="flex-1" />
        </div>

        <div className="flex flex-col gap-4 h-full">
          <DailyUsageCard
            dailyUsage={dailyUsage}
            totalDispenses={totalDispenses}
          />

          <VolumeControl />
        </div>
      </div>

      <div className="w-full">
        {showChart && <ConsumptionTrend data={chartData} />}
      </div>

      <div className="w-full">
        <HistoryTable />
      </div>
    </div>
  );
}
