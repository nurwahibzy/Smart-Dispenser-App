"use client";

import { useDispenserStatus } from "@/lib/hooks/useDispenserStatus";
import { Droplet, Zap, AlertCircle, Gauge, Timer } from "lucide-react";

export default function DispenserStatusCard() {
  const { status, loading, error } = useDispenserStatus();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-blue-100 p-6 animate-pulse shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="h-5 bg-slate-100 rounded-lg w-36" />
          <div className="h-6 bg-slate-100 rounded-full w-20" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4 space-y-2">
              <div className="h-3 bg-slate-100 rounded w-2/3" />
              <div className="h-7 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-800 mb-1">Status Tidak Tersedia</h3>
            <p className="text-red-600 text-sm">{error || "Gagal memuat status dispenser"}</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Ketinggian Air",
      value: `${status.waterLevel}%`,
      icon: Droplet,
      iconClass: "text-blue-500",
      iconBg: "bg-blue-50",
      bar: status.waterLevel,
      barColor: "bg-blue-500",
      unit: null,
    },
    {
      label: "TDS",
      value: String(status.tds),
      icon: Gauge,
      iconClass: "text-cyan-600",
      iconBg: "bg-cyan-50",
      bar: null,
      barColor: null,
      unit: "mg/L",
    },
    {
      label: "Dikeluarkan Hari Ini",
      value: String(status.totalDispensedToday),
      icon: Droplet,
      iconClass: "text-teal-600",
      iconBg: "bg-teal-50",
      bar: null,
      barColor: null,
      unit: "Liter",
    },
    {
      label: "Uptime 24h",
      value: `${status.uptime24h}%`,
      icon: Timer,
      iconClass: "text-amber-500",
      iconBg: "bg-amber-50",
      bar: status.uptime24h,
      barColor: "bg-amber-400",
      unit: null,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
      {/* Header strip */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex items-center justify-between">
        <h3 className="text-white font-bold text-base">Status Dispenser</h3>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            status.isOnline
              ? "bg-green-400/20 text-green-100 border border-green-400/30"
              : "bg-red-400/20 text-red-100 border border-red-400/30"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              status.isOnline ? "bg-green-300 animate-pulse" : "bg-red-400"
            }`}
          />
          {status.isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Stats grid */}
      <div className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-slate-50/80 border border-slate-100 rounded-xl p-4 hover:bg-blue-50/40 hover:border-blue-100 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-7 w-7 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                    <Icon size={14} className={stat.iconClass} />
                  </div>
                  <span className="text-xs text-slate-400 font-medium leading-tight">{stat.label}</span>
                </div>
                <p className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</p>
                {stat.unit && <p className="text-xs text-slate-400 mt-0.5">{stat.unit}</p>}
                {stat.bar !== null && stat.barColor && (
                  <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2.5 overflow-hidden">
                    <div
                      className={`h-full ${stat.barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${stat.bar}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 text-right mt-4">
          Update terakhir: {status.lastUpdate}
        </p>
      </div>
    </div>
  );
}