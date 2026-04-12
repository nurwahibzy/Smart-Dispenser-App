import { ref, set } from "firebase/database";
import { rtdb } from "@/lib/firebase/client";
import { addTransaction } from "@/features/transaction/infrastructure/transaction.firebase";

export const dispenseWater = async ({
  volume,
  tds,
}: {
  volume: number;
  tds: number;
}) => {
  try {
    // ✅ 1. kirim command ke IoT
    await set(ref(rtdb, "devices/dispenser-1/commands/dispense"), {
      volume,
      status: "pending",
      timestamp: Date.now(),
    });

    // ⏳ 2. simulasi delay (anggap IoT bekerja)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // ✅ 3. simpan ke history (Firestore)
    await addTransaction({
      actualVolume: volume,
      requestedVolume: volume,
      type: "auto",
      tds,
    });
  } catch (error) {
    console.error("ERROR DISPENSE:", error);
  }
};
