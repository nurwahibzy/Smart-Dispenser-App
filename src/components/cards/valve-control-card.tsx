"use client";

import { Zap, Loader2 } from "lucide-react";

type ValveControlProps = {
  isOpen: boolean;
  onToggle: () => void;
  isDispensing?: boolean;
  className?: string;
};

export default function ValveControl({
  isOpen,
  onToggle,
  isDispensing,
  className,
}: ValveControlProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            isOpen ? "bg-blue-100" : "bg-slate-100"
          }`}
        >
          <Zap
            size={18}
            className={isOpen ? "text-blue-600" : "text-slate-400"}
          />
        </div>

        {/* Toggle */}
        <button
          onClick={onToggle}
          disabled={isDispensing}
          className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
            isOpen ? "bg-blue-600" : "bg-slate-300"
          } ${isDispensing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${
              isOpen ? "left-6" : "left-0.5"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div>
        <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
          Valve Status
        </p>

        <div className="flex items-end gap-2">
          <span
            className="text-slate-800"
            style={{ fontSize: "1.75rem", fontWeight: 700 }}
          >
            {isOpen ? "Open" : "Closed"}
          </span>

          {isDispensing && (
            <Loader2 size={18} className="text-blue-600 animate-spin mb-1" />
          )}
        </div>

        <p className="text-slate-400 text-xs mt-1">
          {isDispensing
            ? "Dispensing in progress..."
            : isOpen
              ? "Water flow active"
              : "Tap to open valve"}
        </p>
      </div>

      {/* Flow indicator */}
      <div className="flex items-center gap-2 mt-1">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-700"
            style={{ width: isOpen ? "100%" : "0%" }}
          />
        </div>

        <span
          className={`text-xs ${isOpen ? "text-blue-500" : "text-slate-400"}`}
        >
          {isOpen ? "Flowing" : "Idle"}
        </span>
      </div>
    </div>
  );
}
