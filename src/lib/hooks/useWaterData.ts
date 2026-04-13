"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase/client";

export function useWaterData() {
  const [waterLevel, setWaterLevel] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deviceRef = ref(rtdb, "devices/dispenser-1");

    const unsubscribe = onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // ambil dari sensors
        setWaterLevel(Number(data.sensors?.waterLevel) || 0);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { waterLevel, loading };
}
