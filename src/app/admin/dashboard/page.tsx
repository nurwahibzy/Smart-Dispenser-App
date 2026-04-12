"use client";

import WaterLevelSection from "@/features/water/water-level-section";
import TdsCard from "@/components/cards/tds-card";
import DailyUsageCard from "@/components/cards/daily-usage-card";
import ValveControl from "@/components/cards/valve-control-card";

import { useDeviceData } from "@/lib/hooks/useDeviceData";
import { useTransactionData } from "@/lib/hooks/useTransactionData";
import { calculateDailyUsage } from "@/lib/utils/transaction";
import { sendToggleValveCommand } from "@/features/device/infrastructure/device.firebase";

// Simulasi valve
import { toggleValveSimulation } from "@/features/device/application/valve.simulation";

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
  const status = data?.status;

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT */}
        <div className="lg:col-span-1">
          <WaterLevelSection />
        </div>

        {/* MIDDLE */}
        <div className="flex flex-col gap-4 h-full">
          <TdsCard tds={sensors?.tds || 0} />

          {/* Code asli */}
          {/* <ValveControl
            isOpen={status?.valveOpen || false}
            onToggle={sendToggleValveCommand}
            className="flex-1"
          /> */}

          {/* Code Simulasi  */}
          <ValveControl
            isOpen={status?.valveOpen || false}
            onToggle={() =>
              toggleValveSimulation({
                currentState: status?.valveOpen || false,
                tds: sensors?.tds || 0,
              })
            }
            className="flex-1"
          />
        </div>

        {/* RIGHT */}
        <div>
          <DailyUsageCard
            dailyUsage={dailyUsage}
            totalDispenses={totalDispenses}
          />
        </div>
      </div>
    </div>
  );
}
