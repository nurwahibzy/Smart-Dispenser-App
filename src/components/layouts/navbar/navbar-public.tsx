"use client";

import { Droplets } from "lucide-react";
import Link from "next/link";

export default function NavbarPublic() {
  return (
    <header className="h-16 bg-white border-b border-blue-100 flex items-center justify-between px-6 shadow-sm">
      {/* LEFT (Brand) */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
          <Droplets size={18} className="text-white" />
        </div>
        <h1 className="text-lg font-bold text-blue-600">Smart Dispenser</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-sm text-gray-600 hover:text-blue-600"
        >
          Dashboard
        </Link>

        <Link
          href="/helpdesk"
          className="text-sm text-gray-600 hover:text-blue-600"
        >
          Helpdesk
        </Link>

        <Link
          href="/admin/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-600 transition"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
