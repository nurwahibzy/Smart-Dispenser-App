import { ref, get, set } from "firebase/database";
import { rtdb } from "@/lib/firebase/client";

// ─── GET DEVICE DATA ─────────────────────────────────────
// GET DEVICE DATA
export const getDeviceData = async () => {
  try {
    const snapshot = await get(ref(rtdb, "devices/dispenser-1"));

    if (!snapshot.exists()) {
      console.warn("DATA DEVICE KOSONG");
      return null;
    }

    return snapshot.val();
  } catch (error) {
    console.error("ERROR GET DEVICE:", error);
    return null;
  }
};

// ─── DISPENSE COMMAND ────────────────────────────────────
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("DATA DEVICE KOSONG");
    }
  } catch (error) {
    console.error("ERROR REALTIME DB:", error);
  }
};

// SEND COMMAND
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

// ─── TOGGLE VALVE ───────────────────────────────────────
export const sendToggleValveCommand = async () => {
  try {
    await set(ref(rtdb, "devices/dispenser-1/commands/toggleValve"), {
      action: "toggle",
      timestamp: Date.now(),
    });

    console.log("VALVE TOGGLE SENT");
  } catch (error) {
    console.error("ERROR TOGGLE VALVE:", error);
    });
  } catch (error) {
    console.error("ERROR KIRIM COMMAND:", error);
  }
};
