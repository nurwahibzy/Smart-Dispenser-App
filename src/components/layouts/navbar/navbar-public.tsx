"use client";

import Link from "next/link";

export default function NavbarPublic() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8">
      {/* LEFT (Brand) */}
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
        <h1 className="text-xs md:text-sm font-bold text-blue-600">Smart Dispenser</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-4">
        <Link
          href="/admin/dashboard"
          className="text-[11px] md:text-xs text-blue-600 hover:text-blue-700"
        >
          Dashboard
        </Link>

        <Link
          href="/helpdesk"
          className="text-[11px] md:text-xs text-blue-600 hover:text-blue-700"
        >
          Helpdesk
        </Link>

        <Link
          href="/admin/login"
          className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-[11px] md:text-xs font-semibold hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
