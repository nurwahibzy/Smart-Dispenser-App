import Link from "next/link";
import { CircleHelp, Clock3, Droplets } from "lucide-react";

const faqItems = [
  {
    icon: CircleHelp,
    iconClassName: "text-red-500",
    question: "Bagaimana cara menggunakan dispenser?",
    answer: "Ikuti langkah-langkah cara pakai di atas.",
  },
  {
    icon: Clock3,
    iconClassName: "text-blue-500",
    question: "Kapan dispenser tersedia?",
    answer: "Dispenser tersedia 24 jam.",
  },
  {
    icon: Droplets,
    iconClassName: "text-sky-500",
    question: "Apakah air yang digunakan aman?",
    answer: "Ya, kami memastikan air yang digunakan bersih dan aman.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 items-start">
        <div>
          <h2 className="text-5xl md:text-6xl font-black text-blue-600 tracking-tight">
            FAQ
          </h2>
          <p className="mt-4 text-sm text-blue-600">
            Pertanyaan tidak ditemukan?
          </p>
          <Link
            href="/helpdesk"
            className="inline-flex mt-6 bg-blue-600 text-white text-sm px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Kirim Laporan
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-blue-100 divide-y divide-blue-100 shadow-sm overflow-hidden">
          {faqItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.question}
                className="px-5 md:px-6 py-5 grid grid-cols-[52px_1fr] md:grid-cols-[52px_1fr_220px] items-start md:items-center gap-4 hover:bg-blue-50/40 transition"
              >
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon size={20} className={item.iconClassName} />
                </div>
                <p className="text-sm text-blue-600">{item.question}</p>
                <p className="text-sm md:text-right font-semibold text-blue-600 col-span-2 md:col-span-1">
                  {item.answer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}