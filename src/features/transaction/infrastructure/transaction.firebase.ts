import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Transaction } from "@/types/transaction";

export const getDispenseHistory = async (): Promise<Transaction[]> => {
  try {
    const snapshot = await getDocs(collection(db, "dispenseHistory"));

    return snapshot.docs.map((doc) => {
      const d = doc.data();

      return {
        id: doc.id,
        actualVolume: d.actualVolume ?? 0,
        requestedVolume: d.requestedVolume ?? 0,
        deviceId: d.deviceId ?? "",
        status: d.status ?? false,
        tds: d.tds ?? 0,
        timestamp: d.timestamp,
      };
    });
  } catch (error) {
    console.error("ERROR GET HISTORY:", error);
    return [];
  }
};
