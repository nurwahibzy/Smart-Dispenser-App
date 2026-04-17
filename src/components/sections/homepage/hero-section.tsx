import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-28 text-center">
      <div className="absolute -top-20 -left-20 h-60 w-60 bg-blue-100/70 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-cyan-100/70 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-200 bg-white text-xs md:text-sm font-semibold text-blue-600 shadow-sm">
          Smart Water Station
        </div>

        <h1 className="mt-6 text-5xl md:text-7xl font-black text-blue-600 leading-tight tracking-tight">
          Air Bersih, Kapan Saja,
          <br />
          Sesuai Takaranmu
        </h1>

        <p className="text-blue-600 mt-6 max-w-2xl mx-auto text-sm md:text-base">
          Nikmati kemudahan mendapatkan air bersih sesuai kebutuhan Anda
        </p>

        <div className="mt-7 flex justify-center">
          <Link
            href="/member/dashboard"
            className="bg-blue-600 text-white px-10 py-3 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
          >
            Gunakan Dispenser
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
          <div className="bg-white border border-blue-100 rounded-xl p-3 shadow-sm text-blue-600 text-sm font-semibold">
            Monitoring Realtime
          </div>
          <div className="bg-white border border-blue-100 rounded-xl p-3 shadow-sm text-blue-600 text-sm font-semibold">
            Operasional 24 Jam
          </div>
          <div className="bg-white border border-blue-100 rounded-xl p-3 shadow-sm text-blue-600 text-sm font-semibold">
            Air Bersih & Aman
          </div>
        </div>
      </div>
    </section>
  );
}
