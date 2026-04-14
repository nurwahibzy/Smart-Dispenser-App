"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  resetKioskProgress,
  sendDispenseCommand,
  setKioskProgress,
  subscribeDeviceStatus,
  subscribeKioskProgress,
  type KioskProgress,
} from "@/features/device/infrastructure/device.firebase";
import type { DeviceData } from "@/types/device";

const VOLUME_OPTIONS = [100, 250, 500, 1000] as const;

type FinishState = "idle" | "done";

const getWaterQuality = (tds: number) => {
  if (tds <= 150) return "Baik";
  if (tds <= 300) return "Sedang";
  return "Kurang Baik";
};

export const useMemberKiosk = () => {
  const [device, setDevice] = useState<DeviceData | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
  const [kiosk, setKiosk] = useState<KioskProgress | null>(null);
  const [finishState, setFinishState] = useState<FinishState>("idle");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const finishRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const unsubDevice = subscribeDeviceStatus((data) => setDevice(data));
    const unsubKiosk = subscribeKioskProgress((data) => setKiosk(data));

    return () => {
      unsubDevice();
      unsubKiosk();

      if (intervalRef.current) clearInterval(intervalRef.current);
      if (finishRef.current) clearTimeout(finishRef.current);
    };
  }, []);

  const isOnline = !!device?.status?.online;
  const waterLevel = Number(device?.sensors?.waterLevel || 0);
  const tds = Number(device?.sensors?.tds || 0);
  const glassDetected = !!device?.sensors?.glassDetected;
  const waterQuality = getWaterQuality(tds);

  const isDispensing = kiosk?.isDispensing || false;
  const targetVolume = selectedVolume || 0;
  const filledVolume = selectedVolume ? kiosk?.filledVolume || 0 : 0;

  const canStart = useMemo(() => {
    if (!selectedVolume) return false;
    if (!isOnline) return false;
    if (!glassDetected) return false;
    if (waterLevel <= 0) return false;
    if (isDispensing) return false;
    return true;
  }, [selectedVolume, isOnline, glassDetected, waterLevel, isDispensing]);

  const resetToInitial = async () => {
    await resetKioskProgress();
    setSelectedVolume(null);
    setKiosk(null);
    setFinishState("idle");
  };

  const startDispensing = async () => {
    if (!selectedVolume || !canStart) return;

    setFinishState("idle");

    await sendDispenseCommand(selectedVolume);
    await setKioskProgress({
      isDispensing: true,
      targetVolume: selectedVolume,
      filledVolume: 0,
      status: "filling",
      updatedAt: Date.now(),
    });

    if (intervalRef.current) clearInterval(intervalRef.current);
    let localFilled = 0;

    intervalRef.current = setInterval(async () => {
      localFilled = Math.min(localFilled + 25, selectedVolume);

      const isCompleted = localFilled >= selectedVolume;

      await setKioskProgress({
        isDispensing: !isCompleted,
        targetVolume: selectedVolume,
        filledVolume: localFilled,
        status: isCompleted ? "completed" : "filling",
        updatedAt: Date.now(),
      });

      if (isCompleted) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        setFinishState("done");

        if (finishRef.current) clearTimeout(finishRef.current);
        finishRef.current = setTimeout(() => {
          resetToInitial();
        }, 3000);
      }
    }, 300);
  };

  const progressPercent = targetVolume
    ? Math.min(100, Math.round((filledVolume / targetVolume) * 100))
    : 0;

  const progressText = selectedVolume
    ? `Mengisi... ${filledVolume}ml / ${targetVolume}ml`
    : "Siap mengisi";

  return {
    volumeOptions: VOLUME_OPTIONS,
    selectedVolume,
    setSelectedVolume,
    startDispensing,
    canStart,
    isDispensing,
    finishState,
    progressPercent,
    progressText,
    statusCard: {
      online: isOnline,
      waterLevel,
      waterQuality,
    },
    guardReason: !isOnline
      ? "Dispenser offline"
      : waterLevel <= 0
      ? "Air habis"
      : !glassDetected
      ? "Gelas tidak terdeteksi"
      : !selectedVolume
      ? "Pilih volume dulu"
      : "",
  };
};
