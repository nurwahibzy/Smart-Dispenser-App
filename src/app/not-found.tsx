"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, Droplets } from "lucide-react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 50%, #ecfdf5 100%)",
      }}
    >
      {/* Background decorative blobs */}
      <div
        className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #93c5fd, transparent 70%)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #6ee7b7, transparent 70%)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute top-1/2 right-16 w-24 h-24 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #818cf8, transparent 70%)",
          animation: "float 5s ease-in-out infinite 1s",
        }}
      />

      {/* Floating water drops */}
      {mounted &&
        [0, 1, 2, 3, 4].map((i) => (
          <Droplets
            key={i}
            size={14 + i * 4}
            className="absolute text-blue-200 pointer-events-none"
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `float ${4 + i}s ease-in-out infinite ${i * 0.5}s`,
              opacity: 0.4,
            }}
          />
        ))}

      {/* Card */}
      <div
        className="relative z-10 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/80 px-8 py-10 max-w-md w-full text-center flex flex-col items-center gap-6"
        style={{
          boxShadow:
            "0 20px 60px -10px rgba(59,130,246,0.15), 0 4px 20px rgba(0,0,0,0.06)",
          animation: mounted ? "slideUp 0.6s cubic-bezier(.22,1,.36,1) both" : "none",
        }}
      >
        {/* Image */}
        <div
          style={{ animation: "floatSlow 4s ease-in-out infinite" }}
        >
          <Image
            src="/images/404.png"
            alt="404 Not Found"
            width={220}
            height={220}
            priority
            className="drop-shadow-xl"
          />
        </div>

        {/* 404 badge */}
        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 tracking-widest">
          ERROR 404
        </span>

        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Halaman yang kamu cari tidak tersedia atau mungkin sudah dipindahkan.
            Coba kembali ke halaman utama.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-2xl transition-all duration-200 shadow-md hover:shadow-blue-300 hover:-translate-y-0.5"
          >
            <Home size={15} />
            Beranda
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 hover:border-blue-200 bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 text-sm font-semibold rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft size={15} />
            Kembali
          </button>
        </div>
      </div>

      {/* Keyframe styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(32px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}