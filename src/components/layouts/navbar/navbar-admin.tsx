"use client";

import type { NavbarAdminProps } from "@/types/navbar";
import { Droplets, Bell, User } from "lucide-react";

export default function NavbarAdmin({
  online,
  lastUpdate,
  fluctuate,
  notifications,
  setNotifications,
  DeviceStatusBar,
}: NavbarAdminProps) {
  return (
    <header className="bg-white border-b border-blue-100 sticky top-0 z-30 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <Droplets size={18} className="text-white" />
          </div>
          {/* <div>
            <h1 className="text-sm font-bold text-blue-600">Smart Dispenser</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div> */}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Device Status */}
          <DeviceStatusBar
            online={online}
            lastUpdate={lastUpdate}
            onRefresh={fluctuate}
          />

          {/* Notification */}
          <button
            onClick={() => setNotifications(0)}
            className="relative w-9 h-9 bg-gray-50 border border-blue-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
          >
            <Bell size={16} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                {notifications}
              </span>
            )}
          </button>

          {/* 👤 PROFILE */}
          <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-xl transition">
            {/* Avatar */}
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
              <User size={16} />
            </div>

            {/* Text */}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700">Admin</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
