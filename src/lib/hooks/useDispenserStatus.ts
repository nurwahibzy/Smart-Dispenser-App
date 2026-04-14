"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase/client";

type DispenserStatus = {
  waterLevel: number;
  tds: number;
  isOnline: boolean;
  lastUpdate: string;
  totalDispensedToday: number;
  uptime24h: number;
};

const DEVICE_ID = process.env.NEXT_PUBLIC_DEVICE_ID || "dispenser-001";

export function useDispenserStatus() {
  const [status, setStatus] = useState<DispenserStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Baca device status dari Firebase
      const deviceRef = ref(rtdb, `devices/${DEVICE_ID}`);
      
      const unsubscribe = onValue(
        deviceRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setStatus({
              waterLevel: data.sensors?.waterLevel || 0,
              tds: data.sensors?.tds || 0,
              isOnline: data.isOnline || false,
              lastUpdate: new Date(data.lastUpdate || Date.now()).toLocaleString("id-ID"),
              totalDispensedToday: data.stats?.totalDispensedToday || 0,
              uptime24h: data.stats?.uptime24h || 0,
            });
            setError(null);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching dispenser status:", error);
          setError("Gagal memuat status dispenser");
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error("Error setting up listener:", err);
      setError("Error initializing dispenser status");
      setLoading(false);
    }
  }, []);

  return { status, loading, error };
}