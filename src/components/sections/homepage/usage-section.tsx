import { Box, Play, SlidersHorizontal } from "lucide-react";

const usageSteps = [
  {
    title: "1. Tempatkan Wadah",
    desc: "Letakkan wadah air yang akan digunakan pada posisi yang telah disediakan di bawah dispenser.",
    accent: "from-blue-100 to-blue-50",
    icon: Box,
  },
  {
    title: "2. Pilih Volume Air",
    desc: "Pilih volume air yang sesuai dengan kapasitas wadah yang digunakan.",
    accent: "from-cyan-100 to-blue-50",
    icon: SlidersHorizontal,
  },
  {
    title: "3. Tekan Tombol Mulai",
    desc: "Tekan tombol mulai, maka air akan keluar secara otomatis sesuai dengan volume yang telah dipilih.",
    accent: "from-sky-100 to-indigo-50",
    icon: Play,
  },
];

export default function UsageSection() {
  return (
    <section className="border-t border-blue-100 py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-center text-5xl md:text-6xl font-black text-blue-600 tracking-tight">
          Cara Pakai
        </h2>

        <p className="text-center text-blue-500 mt-5 max-w-2xl mx-auto text-sm md:text-base">
          Alur penggunaan dibuat cepat dan sederhana supaya pengalaman isi air terasa nyaman.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {usageSteps.map((item) => (
            <article
              key={item.title}
              className="bg-white border border-blue-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
            >
              <div
                className={`h-14 w-14 rounded-xl bg-gradient-to-br ${item.accent} shrink-0 border border-blue-100 flex items-center justify-center text-blue-600`}
              >
                <item.icon size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-blue-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}