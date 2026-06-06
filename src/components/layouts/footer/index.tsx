"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 mt-8">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-cyan-300/20 blur-2xl" />

      <div className="relative max-w-5xl mx-auto px-6 py-10">
        {/* Nav links — gap diperbesar, tanpa brand row */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm">
          {[
            { label: "Beranda", href: "/" },
            { label: "Hubungi Kami", href: "/contact" },
            { label: "Tentang Kami", href: "/about" },
            { label: "Syarat & Ketentuan", href: "/terms" },
            { label: "Kebijakan Privasi", href: "#" },
            { label: "Helpdesk", href: "/helpdesk" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white/80 hover:text-white font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-white/40 text-xs mt-8">
          © {new Date().getFullYear()} Smart Dispenser · Politeknik Negeri Malang
        </p>
      </div>
    </footer>
  );
}
