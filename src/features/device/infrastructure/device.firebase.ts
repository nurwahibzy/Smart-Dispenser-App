import { ref, get, set, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase/client";
import type { DeviceData } from "@/types/device";

export type KioskProgress = {
  isDispensing: boolean;
  targetVolume: number;
  filledVolume: number;
  status: "idle" | "filling" | "completed";
  updatedAt: number;
};

// ─── GET DEVICE DATA ─────────────────────────────────────
export const getDeviceData = async (): Promise<DeviceData | null> => {
  try {
    const snapshot = await get(ref(rtdb, "devices/dispenser-1"));

    if (!snapshot.exists()) {
      console.warn("DATA DEVICE KOSONG");
      return null;
    }

    return snapshot.val() as DeviceData; // type safe
  } catch (error) {
    console.error("ERROR GET DEVICE:", error);
    return null;
  }
};

// ─── SUBSCRIBE REALTIME───────────────────────
export const subscribeDeviceStatus = (
  callback: (data: DeviceData | null) => void,
) => {
  const deviceRef = ref(rtdb, "devices/dispenser-1");

  const unsubscribe = onValue(deviceRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }

    callback(snapshot.val() as DeviceData);
  });

  return () => unsubscribe();
};

// ─── DISPENSE COMMAND ─────────────────────
export const sendDispenseCommand = async (volume: number) => {
  try {
    await set(ref(rtdb, "devices/dispenser-1/commands/dispense"), {
      volume,
      status: "pending",
      timestamp: Date.now(),
    });

    console.log("DISPENSE SENT:", volume, "ml");
  } catch (error) {
    console.error("ERROR DISPENSE:", error);
  }
};

// ─── TOGGLE VALVE ─────────────────────────
export const sendToggleValveCommand = async () => {
  try {
    await set(ref(rtdb, "devices/dispenser-1/commands/toggleValve"), {
      action: "toggle",
      timestamp: Date.now(),
    });

    console.log("VALVE TOGGLE SENT");
  } catch (error) {
    console.error("ERROR TOGGLE VALVE:", error);
  }
};

// ─── MEMBER DASHBOARD ─────────────────────────
export const setKioskProgress = async (payload: KioskProgress) => {
  try {
    await set(ref(rtdb, "devices/dispenser-1/kiosk"), payload);
  } catch (error) {
    console.error("ERROR SET KIOSK PROGRESS:", error);
  }
};

export const resetKioskProgress = async () => {
  await setKioskProgress({
    isDispensing: false,
    targetVolume: 0,
    filledVolume: 0,
    status: "idle",
    updatedAt: Date.now(),
  });
};

export const subscribeKioskProgress = (
  callback: (data: KioskProgress | null) => void,
) => {
  const kioskRef = ref(rtdb, "devices/dispenser-1/kiosk");

  const unsubscribe = onValue(kioskRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }

    callback(snapshot.val() as KioskProgress);
  });

  return () => unsubscribe();
};
