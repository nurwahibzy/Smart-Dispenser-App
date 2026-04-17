"use client";

import Link from "next/link";
import DeviceStatusBar from "@/components/layouts/navbar/device-status-bar";

export default function NavbarMember() {
  return (
    <header className="bg-white border-b border-blue-100 sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
        <div>
          <Link href="/">
            <h1 className="text-base sm:text-lg font-bold text-blue-600">
              Smart Dispenser
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <DeviceStatusBar />
          </div>

          <Link
            href="/"
            className="bg-blue-600 text-white px-3 py-2 rounded-md text-xs sm:text-sm font-semibold hover:bg-blue-700 transition"
          >
            Home
          </Link>
        </div>
      </div>

      <div className="sm:hidden px-4 pb-3">
        <DeviceStatusBar />
      </div>
    </header>
  );
}
