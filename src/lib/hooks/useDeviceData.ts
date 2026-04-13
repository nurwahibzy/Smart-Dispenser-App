"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase/client";
import type { DeviceData } from "@/types/device";

export const useDeviceData = () => {
  const [data, setData] = useState<DeviceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deviceRef = ref(rtdb, "devices/dispenser-1");

    const unsubscribe = onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val() as DeviceData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { data, loading };
};
