"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f3f3f3] border-t border-gray-200 mt-8">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-blue-600">
          <Link href="#" className="hover:text-blue-700 transition">Hubungi Kami</Link>
          <Link href="#" className="hover:text-blue-700 transition">Tentang Kami</Link>
          <Link href="#" className="hover:text-blue-700 transition">Syarat & Ketentuan</Link>
          <Link href="#" className="hover:text-blue-700 transition">Kebijakan Privasi</Link>
          <Link href="/helpdesk" className="hover:text-blue-700 transition">Helpdesk</Link>
        </div>
      </div>
    </footer>
  );
}
