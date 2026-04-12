"use client";

import { useState, useRef } from "react";

import WaterLevelSection from "@/features/water/water-level-section";
import TdsCard from "@/components/cards/tds-card";
import DailyUsageCard from "@/components/cards/daily-usage-card";
import ValveControl from "@/components/cards/valve-control-card";
import VolumeControl from "@/components/cards/volume-control-card";

import { useDeviceData } from "@/lib/hooks/useDeviceData";
import { useTransactionData } from "@/lib/hooks/useTransactionData";
import { calculateDailyUsage } from "@/lib/utils/transaction";
// import { sendToggleValveCommand } from "@/features/device/application/valve.service";

// Simulasi aplikasi tanpa koneksi IoT asli
import { dispenseWater } from "@/features/device/application/dispense.service";
import { toggleValveSimulation } from "@/features/device/application/valve.simulation";

export default function DashboardPage() {
  const { data, loading } = useDeviceData();
  const { data: transactions, loading: trxLoading } = useTransactionData();

  const [selectedVolume, setSelectedVolume] = useState<
    number | "continuous" | null
  >(null);
  const [customVolume, setCustomVolume] = useState("");
  const [isDispensing, setIsDispensing] = useState(false);
  const [dispensingProgress, setDispensingProgress] = useState(0);

  // 🔥 TAMBAHAN REF (penting)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(0);

  // 🔥 TAMBAHAN: MODE SYSTEM
  const [mode, setMode] = useState<"idle" | "manual" | "auto">("idle");

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

  // 🔥 AUTO + MANUAL MODE
  const handleDispense = () => {
    if (!selectedVolume) return;

    // 🔵 MANUAL MODE
    if (selectedVolume === "continuous") {
      const nextState = mode !== "manual";

      setMode(nextState ? "manual" : "idle");

      toggleValveSimulation({
        currentState: status?.valveOpen || false,
        tds: sensors?.tds || 0,
      });

      return;
    }

    // 🟢 AUTO MODE
    setMode("auto");
    setIsDispensing(true);

    let progress = 0;
    progressRef.current = 0;

    intervalRef.current = setInterval(() => {
      progress += 10;
      progressRef.current = progress;

      setDispensingProgress(progress);

      if (progress >= 100) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;

        setIsDispensing(false);
        setDispensingProgress(0);
        setMode("idle");

        // 🔥 FULL VOLUME
        dispenseWater({
          volume: selectedVolume,
          tds: sensors?.tds || 0,
        });
      }
    }, 200);
  };

  const handleStop = () => {
    // 🔥 STOP INTERVAL
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // 🔴 AUTO MODE STOP → HITUNG REAL VOLUME
    if (mode === "auto" && selectedVolume && selectedVolume !== "continuous") {
      const actualVolume = Math.round(
        (progressRef.current / 100) * selectedVolume,
      );

      console.log("STOP AUTO → actualVolume:", actualVolume);

      // 🔥 kirim hasil real
      dispenseWater({
        volume: actualVolume,
        tds: sensors?.tds || 0,
      });
    }

    // 🔵 MANUAL MODE
    if (mode === "manual") {
      toggleValveSimulation({
        currentState: status?.valveOpen || false,
        tds: sensors?.tds || 0,
      });
    }

    setIsDispensing(false);
    setDispensingProgress(0);
    setMode("idle");
  };

  return (
    <div className="px-6 pt-0 pb-6 space-y-4 -mt-2">
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

          {/* Code Simulasi */}
          <ValveControl
            isOpen={status?.valveOpen || false}
            onToggle={() => {
              if (mode === "auto") return;

              setMode("manual");

              toggleValveSimulation({
                currentState: status?.valveOpen || false,
                tds: sensors?.tds || 0,
              });

              if (status?.valveOpen) {
                setMode("idle");
              }
            }}
            isDispensing={mode === "auto"}
            className="flex-1"
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4 h-full">
          <DailyUsageCard
            dailyUsage={dailyUsage}
            totalDispenses={totalDispenses}
          />

          <VolumeControl
            selectedVolume={selectedVolume}
            onVolumeSelect={setSelectedVolume}
            customVolume={customVolume}
            onCustomVolumeChange={setCustomVolume}
            dispensingProgress={dispensingProgress}
            isDispensing={isDispensing || mode === "manual"}
            onDispense={handleDispense}
            onStop={handleStop}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
