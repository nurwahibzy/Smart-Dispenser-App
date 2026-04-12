"use client";

import { useRef, useState } from "react";

import WaterLevelSection from "@/features/water/water-level-section";
import TdsCard from "@/components/cards/tds-card";
import DailyUsageCard from "@/components/cards/daily-usage-card";
import ValveControl from "@/components/cards/valve-control-card";
import VolumeControl from "@/components/cards/volume-controle-card";

import { useDeviceData } from "@/lib/hooks/useDeviceData";
import { useTransactionData } from "@/lib/hooks/useTransactionData";
import { calculateDailyUsage } from "@/lib/utils/transaction";
import { sendToggleValveCommand } from "@/features/device/infrastructure/device.firebase";

// Simulasi valve
import { toggleValveSimulation } from "@/features/device/application/valve.simulation";

import {
  startAutoDispense,
  stopAutoDispense,
} from "@/features/device/application/dispense.controller";

export default function DashboardPage() {
  const { data, loading } = useDeviceData();
  const { data: transactions, loading: trxLoading } = useTransactionData();

  const [selectedVolume, setSelectedVolume] = useState<
    number | "continuous" | null
  >(null);

  const [customVolume, setCustomVolume] = useState("");
  const [isDispensing, setIsDispensing] = useState(false);
  const [dispensingProgress, setDispensingProgress] = useState(0);
  const [mode, setMode] = useState<"idle" | "manual" | "auto">("idle");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(0);

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

  const handleDispense = () => {
    if (!selectedVolume) return;

    if (selectedVolume === "continuous") {
      const nextState = mode !== "manual";

      setMode(nextState ? "manual" : "idle");

      toggleValveSimulation({
        currentState: status?.valveOpen || false,
        tds: sensors?.tds || 0,
      });

      return;
    }

    startAutoDispense({
      selectedVolume,
      tds: sensors?.tds || 0,
      setMode,
      setIsDispensing,
      setProgress: setDispensingProgress,
      intervalRef,
      progressRef,
    });
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (mode === "auto" && typeof selectedVolume === "number") {
      stopAutoDispense({
        selectedVolume,
        tds: sensors?.tds || 0,
        progressRef,
        setMode,
        setIsDispensing,
        setProgress: setDispensingProgress,
      });
    }

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
    <div className="p-6 space-y-6">
      {/* CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {/* LEFT */}
        <div className="lg:col-span-1 flex">
          <div className="flex-1">
            <WaterLevelSection />
          </div>
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
            onToggle={() => {
              if (mode === "auto") return;

              toggleValveSimulation({
                currentState: status?.valveOpen || false,
                tds: sensors?.tds || 0,
              });

              setMode(status?.valveOpen ? "idle" : "manual");
            }}
            isDispensing={mode !== "idle"}
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
            isDispensing={mode !== "idle"}
            onDispense={handleDispense}
            onStop={handleStop}
          />
        </div>
      </div>
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </div>
  );
}
