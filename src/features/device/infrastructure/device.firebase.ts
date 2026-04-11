import { ref, get, set } from "firebase/database";
import { rtdb } from "@/lib/firebase/client";

// GET DEVICE DATA
export const getDeviceData = async () => {
  try {
    const snapshot = await get(ref(rtdb, "devices/dispenser-1"));

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
    });
  } catch (error) {
    console.error("ERROR KIRIM COMMAND:", error);
  }
};
