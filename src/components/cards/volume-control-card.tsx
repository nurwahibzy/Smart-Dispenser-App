"use client";

import { useState } from "react";
import { Droplets, StopCircle, PlayCircle } from "lucide-react";

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
  selectedVolume: number | "continuous" | null;
  onVolumeSelect: (volume: number | "continuous") => void;
  customVolume: string;
  onCustomVolumeChange: (value: string) => void;
  dispensingProgress: number;
  isDispensing: boolean;
  onDispense: () => void;
  onStop: () => void;
  className?: string;
};

export default function VolumeControl({
  selectedVolume,
  onVolumeSelect,
  customVolume,
  onCustomVolumeChange,
  dispensingProgress,
  isDispensing,
  onDispense,
  onStop,
  className,
}: VolumeControlProps) {
  const presets = [100, 250, 500, 1000];
  const [showCustom, setShowCustom] = useState(false);

  const isCustomActive =
    selectedVolume !== null &&
    selectedVolume !== "continuous" &&
    !presets.includes(selectedVolume);

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
          <Droplets size={18} className="text-blue-600" />
        </div>
        {isDispensing && <CircularProgress progress={dispensingProgress} />}
      </div>

      {/* Value */}
      <div>
        <p className="text-slate-400 text-xs uppercase mb-1">Dispense Volume</p>

        <div className="flex items-end gap-1">
          <span className="text-slate-800 text-2xl font-bold">
            {selectedVolume === "continuous"
              ? "Manual"
              : selectedVolume
                ? selectedVolume
                : "—"}
          </span>

          {selectedVolume !== "continuous" && selectedVolume && (
            <span className="text-slate-400 text-sm">ml</span>
          )}
        </div>

        <p className="text-slate-400 text-xs mt-1">
          {isDispensing ? "Dispensing..." : "Choose preset or custom"}
        </p>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {/* Presets */}
        {presets.map((volume) => (
          <button
            key={volume}
            onClick={() => {
              onVolumeSelect(volume);
              setShowCustom(false);
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

        {/* Manual */}
        <button
          onClick={() => {
            onVolumeSelect("continuous");
            setShowCustom(false);
          }}
          disabled={isDispensing}
          className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            selectedVolume === "continuous"
              ? "bg-blue-500 text-white shadow-sm"
              : "border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
          } ${isDispensing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Manual
        </button>

        {/* Custom */}
        <button
          onClick={() => setShowCustom(!showCustom)}
          disabled={isDispensing}
          className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            isCustomActive
              ? "bg-blue-500 text-white shadow-sm"
              : "border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
          } ${isDispensing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Custom
        </button>
      </div>

      {/* Custom Input */}
      {showCustom && (
        <div className="flex gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <input
            type="number"
            min="1" // 🔥 cegah minus dari UI
            value={customVolume}
            onChange={(e) => {
              const value = e.target.value;

              // 🔥 hanya izinkan angka >= 0
              if (Number(value) >= 0) {
                onCustomVolumeChange(value);
              }
            }}
            placeholder="ml"
            disabled={isDispensing}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />

          <button
            onClick={() => {
              const val = parseInt(customVolume);

              // 🔥 validasi final (anti minus & nol)
              if (val > 0) {
                onVolumeSelect(val);
                setShowCustom(false);
              }
            }}
            disabled={
              isDispensing || !customVolume || parseInt(customVolume) <= 0 
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            Set
          </button>
        </div>
      )}

      {/* Action */}
      <button
        onClick={isDispensing ? onStop : onDispense}
        disabled={!isDispensing && !selectedVolume}
        className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 ${
          isDispensing
            ? "bg-red-500 hover:bg-red-600 text-white"
            : selectedVolume
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        {isDispensing ? (
          <>
            <StopCircle size={16} /> Stop
          </>
        ) : (
          <>
            <PlayCircle size={16} /> Start
          </>
        )}
      </button>
    </div>
  );
}
