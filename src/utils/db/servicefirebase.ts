// services/api.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../db/firebase";
import { ref, get, set } from "firebase/database";
import { rtdb } from "../db/firebase";


// GET DATA FIRESTORE (HISTORY)
export const getDispenseHistory = async () => {
  try {
    const snapshot = await getDocs(collection(db, "dispenseHistory"));

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("DATA HISTORY:", data);
    return data;

  } catch (error) {
    console.error("ERROR FIRESTORE:", error);
  }
};


// GET DATA REALTIME DB (DEVICE)
export const getDeviceData = async () => {
  try {
    const snapshot = await get(ref(rtdb, "devices/dispenser-1"));

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("DATA DEVICE:", data);
      return data;
    } else {
      console.log("DATA DEVICE KOSONG");
    }

  } catch (error) {
    console.error("ERROR REALTIME DB:", error);
  }
};


// KIRIM COMMAND (SIMULASI IOT)
export const sendDispenseCommand = async (volume: number) => {
  try {
    await set(ref(rtdb, "devices/dispenser-1/commands/dispense"), {
      volume: volume,
      status: "pending"
    });

    console.log("COMMAND TERKIRIM:", volume);

  } catch (error) {
    console.error("ERROR KIRIM COMMAND:", error);
  }
};