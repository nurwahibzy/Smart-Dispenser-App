"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState(3);
  const [open, setOpen] = useState(false);

  const dummyNotifications = [
    { id: 1, text: "Water level is low", time: "2 min ago" },
    { id: 2, text: "TDS slightly high", time: "10 min ago" },
    { id: 3, text: "Device connected", time: "1 hour ago" },
  ];

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative w-9 h-9 bg-gray-50 border border-blue-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
      >
        <Bell size={16} />

        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
            {notifications}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95">
          {/* HEADER */}
          <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">
              Notifications
            </span>

            <button
              onClick={() => setNotifications(0)}
              className="text-xs text-blue-600 hover:underline"
            >
              Clear all
            </button>
          </div>

          {/* LIST */}
          <div className="max-h-64 overflow-y-auto">
            {dummyNotifications.length === 0 ? (
              <div className="p-4 text-sm text-slate-400 text-center">
                No notifications
              </div>
            ) : (
              dummyNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition"
                >
                  <p className="text-sm text-slate-700">{notif.text}</p>
                  <span className="text-xs text-slate-400">{notif.time}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
