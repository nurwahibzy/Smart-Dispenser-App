import Link from "next/link";
import { Activity } from "lucide-react";
import {
  features,
  featureColorMap,
  techStack,
  stats,
} from "@/features/about/data/about";

/* ── Hero Section ── */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-100/60 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-0 -right-24 w-80 h-80 bg-cyan-100/50 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-72 h-72 bg-indigo-100/40 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur text-xs font-semibold text-blue-600 shadow-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Tentang Smart Dispenser
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-slate-800 leading-tight tracking-tight">
          Teknologi Cerdas untuk{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Air Bersih
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-slate-500 text-base md:text-lg leading-relaxed">
          Smart Dispenser adalah platform IoT berbasis web yang memungkinkan
          pemantauan dan pengelolaan dispenser air pintar secara real-time —
          dikembangkan oleh mahasiswa Politeknik Negeri Malang.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/member/dashboard"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-200 hover:-translate-y-0.5"
          >
            Coba Sekarang
          </Link>
          <a
            href="#team"
            className="border border-slate-200 text-slate-600 px-8 py-3 rounded-xl text-sm font-semibold hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            Kenali Tim Kami
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Features Section ── */
export function FeaturesSection() {
  return (
    <section className="px-6 py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
            Platform
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-black text-slate-800">
            Apa itu Smart Dispenser?
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Sistem manajemen dispenser air pintar yang menggabungkan perangkat
            keras IoT dengan antarmuka web modern.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ Icon, title, desc, color }) => {
            const c = featureColorMap[color];
            return (
              <div
                key={title}
                className={`group bg-white border border-slate-100 ${c.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div
                  className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon size={20} className={c.icon} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">
                  {title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Tech Stack Section ── */
export function TechStackSection() {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
          Teknologi
        </span>
        <h2 className="mt-2 text-2xl md:text-3xl font-black text-slate-800 mb-10">
          Dibangun dengan Stack Modern
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map(({ Icon, name, category }) => (
            <div
              key={name}
              className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl px-4 py-3 transition-all duration-200 group"
            >
              <Icon
                size={16}
                className="text-slate-400 group-hover:text-blue-500 transition-colors"
              />
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 group-hover:text-blue-400 uppercase leading-none mb-0.5 transition-colors">
                  {category}
                </p>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                  {name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stats Section ── */
export function StatsSection() {
  return (
    <section
      className="px-6 py-14"
      style={{ background: "linear-gradient(135deg, #1d4ed8, #0891b2)" }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        {stats.map(({ num, label }) => (
          <div key={label} className="space-y-1">
            <div className="text-4xl font-black">{num}</div>
            <div className="text-blue-200 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA Section ── */
export function CtaSection() {
  return (
    <section className="px-6 py-20 bg-gradient-to-b from-slate-50 to-white text-center">
      <div className="max-w-xl mx-auto">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Activity size={26} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-800">
          Siap mencoba Smart Dispenser?
        </h2>
        <p className="text-slate-400 text-sm mt-2 mb-8 leading-relaxed">
          Mulai pantau dispenser air Anda secara real-time sekarang juga.
        </p>
        <Link
          href="/member/dashboard"
          className="inline-block bg-blue-600 text-white px-10 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-200 hover:-translate-y-0.5"
        >
          Gunakan Dispenser
        </Link>
      </div>
    </section>
  );
}
