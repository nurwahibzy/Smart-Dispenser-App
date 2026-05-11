"use client";

import { Droplets, PlayCircle } from "lucide-react";
import { useMemberKiosk } from "@/features/member/hooks/useMemberKiosk";

function CircularProgress({ progress }: { progress: number }) {
  const r = 13;
  const circ = 2 * Math.PI * r;

  return (
    <div className="relative w-8 h-8 flex-shrink-0">
      <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r={r}
          stroke="#dbeafe"
          strokeWidth="2.5"
          fill="none"
        />
        <circle
          cx="16"
          cy="16"
          r={r}
          stroke="#3b82f6"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - progress / 100)}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-blue-700 text-[8px] font-bold">
        {Math.round(progress)}%
      </span>
    </div>
  );
}

type VolumeControlProps = {
  className?: string;
};

export default function VolumeControl({ className }: VolumeControlProps) {
  const {
    volumeOptions,
    selectedVolume,
    setSelectedVolume,
    startDispensing,
    isDispensing,
    progressPercent,
  } = useMemberKiosk();

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
          <Droplets size={18} className="text-blue-600" />
        </div>
        {isDispensing && <CircularProgress progress={progressPercent} />}
      </div>

      {/* Value */}
      <div>
        <p className="text-slate-400 text-xs uppercase mb-1">Jumlah Volume</p>

        <div className="flex items-end gap-1">
          <span className="text-slate-800 text-2xl font-bold">
            {selectedVolume ? selectedVolume : "—"}
          </span>

          {selectedVolume && <span className="text-slate-400 text-sm">ml</span>}
        </div>

        <p className="text-slate-400 text-xs mt-1">
          {isDispensing
            ? "Pengisian sedang berlangsung..."
            : "Pilih jumlah volume air"}
        </p>
      </div>

      {/* Tombol */}
      <div className="grid grid-cols-2 gap-2">
        {/* Presets */}
        {volumeOptions.map((volume) => (
          <button
            key={volume}
            onClick={() => {
              setSelectedVolume(volume);
            }}
            disabled={isDispensing}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              selectedVolume === volume
                ? "bg-blue-500 text-white shadow-sm"
                : "border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
            } ${isDispensing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {volume}ml
          </button>
        ))}
      </div>

      {/* Action */}
      <button
        onClick={startDispensing}
        disabled={isDispensing || !selectedVolume}
        className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 ${
          isDispensing
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : selectedVolume
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        <PlayCircle size={16} /> Mulai
      </button>
    </div>
  );
}
