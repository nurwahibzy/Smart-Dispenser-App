"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";

import {
  subscribeDeviceStatus,
  getDeviceData,
} from "@/features/device/infrastructure/device.firebase";

import type { DeviceData } from "@/types/device";

export default function DeviceStatusBar() {
  const [online, setOnline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("--:--:--");
  const [spinning, setSpinning] = useState(false);

  const applyData = (data: DeviceData | null) => {
    if (!data?.status) return;

    setOnline(data.status.online);

    if (data.status.lastUpdated) {
      const date = new Date(data.status.lastUpdated * 1000);

      const formatted = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setLastUpdate(formatted);
    }
  };

  useEffect(() => {
    // INITIAL LOAD
    getDeviceData().then((data) => {
      applyData(data);
    });

    // REALTIME
    const unsubscribe = subscribeDeviceStatus((data) => {
      applyData(data);
    });

    return () => unsubscribe();
  }, []);

  const handleRefresh = async () => {
    setSpinning(true);

    const data = await getDeviceData();
    applyData(data);

    setTimeout(() => {
      setSpinning(false);
    }, 800);
  };

  return (
    <div className="flex items-center gap-3 bg-white/80 backdrop-blur rounded-xl px-4 py-2 border border-slate-100 shadow-sm text-sm">
      {/* STATUS */}
      <div
        className={`flex items-center gap-1.5 ${
          online ? "text-emerald-500" : "text-slate-400"
        }`}
      >
        {online ? <Wifi size={14} /> : <WifiOff size={14} />}

        <span className="text-xs">{online ? "Online" : "Offline"}</span>

        {online && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        )}
      </div>

      <span className="text-slate-200">|</span>

      {/* LAST UPDATE */}
      <span className="text-slate-400 text-xs">Updated {lastUpdate}</span>

      {/* REFRESH */}
      <button
        onClick={handleRefresh}
        className="text-slate-400 hover:text-blue-600 transition-colors"
      >
        <RefreshCw size={13} className={spinning ? "animate-spin" : ""} />
      </button>
    </div>
  );
}
