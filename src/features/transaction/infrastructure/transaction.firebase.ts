import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Transaction } from "@/types/transaction";

// ─── COLLECTION NAME ─────────────────────────────────────
const COLLECTION_NAME = "dispenseHistory";

// ─── SUBSCRIBE (REALTIME) ────────────────────────────────
export const subscribeDispenseHistory = (
  callback: (data: Transaction[]) => void,
) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("timestamp", "desc"),
    limit(50),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data: Transaction[] = snapshot.docs.map((doc) => {
      const d = doc.data();

      return {
        id: doc.id,
        actualVolume: d.actualVolume ?? 0,
        requestedVolume: d.requestedVolume ?? 0,
        deviceId: d.deviceId ?? "",
        status: d.status ?? false,
        tds: d.tds ?? 0,
        type: d.type ?? "auto",

        // 🔥 convert ke Date
        timestamp:
          d.timestamp instanceof Timestamp ? d.timestamp.toDate() : null,
      };
    });

    callback(data);
  });

  return unsubscribe;
};

// ─── ADD TRANSACTION ─────────────────────────────────────
export const addTransaction = async ({
  actualVolume,
  requestedVolume,
  type,
  tds,
}: {
  actualVolume: number;
  requestedVolume: number;
  type: "auto" | "manual";
  tds: number;
}) => {
  try {
    await addDoc(collection(db, COLLECTION_NAME), {
      actualVolume,
      requestedVolume,
      type,
      tds,
      deviceId: "dispenser-1",
      status: true,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("ERROR ADD TRANSACTION:", error);
  }
};
