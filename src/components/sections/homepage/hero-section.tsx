import Link from "next/link";
import { Droplets, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32 text-center">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 bg-blue-100/80 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 bg-cyan-100/80 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-sky-50/60 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white text-xs font-semibold text-blue-600 shadow-sm mb-6">
          <Droplets size={13} className="text-cyan-500" />
          Smart Water Station · Polinema
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-blue-700 leading-[1.05] tracking-tight">
          Air Bersih,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
            Kapan Saja,
          </span>
          <br />
          Sesuai Takaranmu
        </h1>

        <p className="text-slate-500 mt-6 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Sistem dispenser pintar dengan monitoring kualitas air, level air, dan
          kontrol pengisian secara{" "}
          <span className="text-blue-600 font-semibold">real-time</span>.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/member/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-7 py-3 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-blue-200"
          >
            Gunakan Dispenser
            {/* <ArrowRight size={16} /> */}
          </Link>
          {/* <Link
            href="/helpdesk"
            className="inline-flex items-center gap-2 border border-blue-200 bg-white text-blue-600 hover:border-blue-300 hover:bg-blue-50 px-7 py-3 rounded-xl text-sm font-semibold transition-colors"
          >
            Bantuan
          </Link> */}
        </div>

        {/* Feature pills — diperbesar dari xs ke sm, padding lebih lega */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            "🔵 Monitoring Realtime",
            "⏰ Operasional 24 Jam",
            "💧 Air Bersih & Aman",
          ].map((feat) => (
            <span
              key={feat}
              className="bg-white border border-blue-100 rounded-full px-5 py-2 text-sm font-semibold text-blue-700 shadow-sm"
            >
              {feat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}