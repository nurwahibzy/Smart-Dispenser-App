import { set, ref } from "firebase/database";
import { rtdb } from "@/lib/firebase/client";
import { addTransaction } from "@/features/transaction/infrastructure/transaction.firebase";

let startTime: number | null = null;

export const toggleValveSimulation = async ({
  currentState,
  tds,
}: {
  currentState: boolean;
  tds: number;
}) => {
  const nextState = !currentState;

  // update RTDB (simulasi device response)
  await set(ref(rtdb, "devices/dispenser-1/status/valveOpen"), nextState);

  // 🟢 ON
  if (nextState) {
    startTime = Date.now();
  }

  // 🔴 OFF
  else {
    if (startTime) {
      const duration = (Date.now() - startTime) / 1000;

      const flowRate = 50;
      const volume = Math.round(duration * flowRate);

      await addTransaction({
        actualVolume: volume,
        requestedVolume: 0,
        type: "manual",
        tds,
      });

      startTime = null;
    }
  }
};
