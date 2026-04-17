"use client";

import { useDispenserStatus } from "@/lib/hooks/useDispenserStatus";
import { Droplet, Zap, AlertCircle } from "lucide-react";

export default function DispenserStatusCard() {
  const { status, loading, error } = useDispenserStatus();

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">
              Status Tidak Tersedia
            </h3>
            <p className="text-red-700 text-sm">
              {error || "Gagal memuat status dispenser"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Status Dispenser</h3>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            status.isOnline
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full mr-2 ${
              status.isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          {status.isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Water Level */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplet size={16} className="text-blue-600" />
            <span className="text-xs text-gray-600 font-medium">
              Ketinggian Air
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{status.waterLevel}%</p>
          <div className="w-full h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${status.waterLevel}%` }}
            ></div>
          </div>
        </div>

        {/* TDS Level */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-cyan-600" />
            <span className="text-xs text-gray-600 font-medium">TDS</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{status.tds}</p>
          <p className="text-xs text-gray-600 mt-2">mg/L</p>
        </div>

        {/* Total Dispensed Today */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplet size={16} className="text-teal-600" />
            <span className="text-xs text-gray-600 font-medium">Hari Ini</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {status.totalDispensedToday}
          </p>
          <p className="text-xs text-gray-600 mt-2">Liter</p>
        </div>

        {/* Uptime */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-amber-600" />
            <span className="text-xs text-gray-600 font-medium">Uptime 24h</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{status.uptime24h}%</p>
          <p className="text-xs text-gray-600 mt-2">Waktu Aktif</p>
        </div>
      </div>

      {/* Last Update */}
      <p className="text-xs text-gray-600 text-right mt-4">
        Update terakhir: {status.lastUpdate}
      </p>
    </div>
  );
}