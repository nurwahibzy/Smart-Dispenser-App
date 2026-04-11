"use client";

import { useState } from "react";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";

type DeviceStatusBarProps = {
  online: boolean;
  lastUpdate: Date;
  onRefresh: () => void;
};

export default function DeviceStatusBar({
  online,
  lastUpdate,
  onRefresh,
}: DeviceStatusBarProps) {
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = () => {
    setSpinning(true);
    onRefresh();

    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  };

  return (
    <div className="flex items-center gap-3 bg-white/80 backdrop-blur rounded-xl px-4 py-2 border border-slate-100 shadow-sm text-sm">
      {/* Status */}
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

      {/* Divider */}
      <span className="text-slate-200">|</span>

      {/* Last Update */}
      <span className="text-slate-400 text-xs">
        Updated{" "}
        {lastUpdate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </span>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="text-slate-400 hover:text-blue-600 transition-colors"
      >
        <RefreshCw size={13} className={spinning ? "animate-spin" : ""} />
      </button>
    </div>
  );
}
