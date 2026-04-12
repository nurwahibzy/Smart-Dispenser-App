"use client";

import { Bell, Search, User } from "lucide-react";

export default function NavbarAdmin() {
  return (
    <header className="h-16 bg-white border-b border-blue-100 flex items-center justify-between px-6 shadow-sm">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
      </div>

      {/* SEARCH */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-2 w-80">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 text-sm w-full"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 rounded-xl hover:bg-blue-50 transition">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-xl transition">
          <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
            <User size={16} />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-700">Admin</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
