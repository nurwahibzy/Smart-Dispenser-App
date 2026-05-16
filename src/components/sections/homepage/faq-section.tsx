"use client";

import Link from "next/link";
import { CircleHelp, Clock3, Droplets, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

const faqItems = [
  {
    icon: CircleHelp,
    iconClassName: "text-red-500",
    question: "Bagaimana cara menggunakan dispenser?",
    answer:
      "Ikuti langkah-langkah penggunaan dispenser yang tersedia pada bagian atas halaman. Tempatkan wadah, pilih volume air, lalu tekan tombol mulai pengisian.",
  },
  {
    icon: Clock3,
    iconClassName: "text-blue-500",
    question: "Kapan dispenser tersedia?",
    answer:
      "Dispenser tersedia selama 24 jam. Namun, dispenser akan ditutup sementara apabila kapasitas air berada di bawah 30% untuk proses pengisian ulang, atau ketika nilai TDS air melebihi batas aman sehingga perlu dilakukan pengecekan kualitas air kembali.",
  },
  {
    icon: Droplets,
    iconClassName: "text-sky-500",
    question: "Apakah air yang digunakan aman?",
    answer:
      "Ya, kami memastikan air yang digunakan bersih dan aman. Sistem menggunakan sensor TDS untuk memantau kualitas air sehingga pengguna tidak perlu khawatir terhadap kebersihan dan keamanan air yang digunakan.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="border-t border-blue-100/80 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 items-start">
        {/* Left col — hapus label "FAQ", langsung judul */}
        <div className="md:sticky md:top-8">
          <h2 className="text-4xl md:text-5xl font-black text-blue-700 tracking-tight leading-tight">
            Pertanyaan
            <br />
            Umum
          </h2>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Tidak menemukan jawaban yang dicari?
          </p>

          {/* Tombol tanpa icon */}
          <Link
            href="/helpdesk"
            className="mt-5 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm shadow-blue-200"
          >
            Kirim Laporan
          </Link>
        </div>

        {/* Accordion */}
        <div className="bg-white rounded-2xl border border-blue-100 divide-y divide-blue-100 shadow-sm overflow-hidden">
          {faqItems.map((item, idx) => {
            const Icon = item.icon;
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.question}
                className={`transition-colors ${isOpen ? "bg-blue-50/40" : "hover:bg-slate-50/60"}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 flex items-center gap-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${idx}`}
                >
                  <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className={item.iconClassName} />
                  </div>
                  <span className="flex-1 text-sm md:text-base text-slate-700 font-semibold leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  id={`faq-content-${idx}`}
                  ref={(el) => {
                    contentRefs.current[idx] = el;
                  }}
                  style={{
                    maxHeight:
                      isOpen && contentRefs.current[idx]
                        ? `${contentRefs.current[idx]!.scrollHeight}px`
                        : "0px",
                  }}
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                >
                  <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed pl-[3.25rem]">
                    {item.answer}
                  </p>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}