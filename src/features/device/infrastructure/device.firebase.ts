import { ref, get, set } from "firebase/database";
import { rtdb } from "@/lib/firebase/client";

// ─── GET DEVICE DATA ─────────────────────────────────────
export const getDeviceData = async () => {
  try {
    const snapshot = await get(ref(rtdb, "devices/dispenser-1"));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("DATA DEVICE KOSONG");
      return null;
    }
  } catch (error) {
    console.error("ERROR REALTIME DB:", error);
    return null;
  }
};

// ─── SEND DISPENSE COMMAND ───────────────────────────────
export const sendDispenseCommand = async (volume: number) => {
  try {
    await set(ref(rtdb, "devices/dispenser-1/commands/dispense"), {
      volume,
      status: "pending",
      timestamp: Date.now(), // penting biar dianggap update baru
    });
  } catch (error) {
    console.error("ERROR KIRIM COMMAND DISPENSE:", error);
  }
};

// ─── TOGGLE VALVE COMMAND ───────────────────────────────
export const sendToggleValveCommand = async () => {
  try {
    await set(ref(rtdb, "devices/dispenser-1/commands/toggleValve"), {
      action: "toggle",
      timestamp: Date.now(), // ini trigger utama IoT
    });
  } catch (error) {
    console.error("ERROR TOGGLE VALVE:", error);
  }
};
