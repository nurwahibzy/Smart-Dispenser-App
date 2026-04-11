"use client";

import { useEffect } from "react";
import { getDeviceData } from "@/features/device/infrastructure/device.firebase";

export default function TestPage() {
  useEffect(() => {
    console.log("TES KONEK FIREBASE");

    const fetchData = async () => {
      const device = await getDeviceData();

      console.log("DEVICE:", device);
      console.log("HISTORY:", history);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-600">Test Firebase</h1>
      <p className="text-gray-500">Buka console (F12)</p>
    </div>
  );
}
