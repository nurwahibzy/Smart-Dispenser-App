"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-blue-100 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* TOP */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* BRAND */}
          <div>
            <h2 className="text-xl font-bold text-blue-600">Smart Dispenser</h2>
            <p className="text-gray-500 text-sm mt-2">
              Sistem dispenser pintar dengan monitoring kualitas air dan kontrol
              pengisian secara real-time.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Navigation
            </h3>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
              <Link
                href="/member/dashboard"
                className="hover:text-blue-600 transition"
              >
                Gunakan Dispenser
              </Link>
              <Link href="/helpdesk" className="hover:text-blue-600 transition">
                Helpdesk
              </Link>
            </div>
          </div>

          {/* INFO */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              System Info
            </h3>
            <div className="text-sm text-gray-500 space-y-2">
              <p>Version: 1.0.0</p>
              <p>
                Status:{" "}
                <span className="text-green-600 font-medium">Online</span>
              </p>
              <p>Last Update: Just now</p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-blue-100 my-6"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Smart Dispenser. All rights reserved.
          </p>

          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-blue-600 transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-blue-600 transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
