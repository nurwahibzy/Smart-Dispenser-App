'use client';

import Link from 'next/link';
import { CircleHelp, Clock3, Droplets, ChevronDown, MessageSquarePlus } from 'lucide-react';
import { useRef, useState } from 'react';

const faqItems = [
    {
        icon: CircleHelp,
        iconBg: 'bg-red-50',
        iconColor: 'text-red-500',
        accentColor: 'border-l-red-400',
        question: 'Bagaimana cara menggunakan dispenser?',
        answer: 'Ikuti langkah-langkah penggunaan dispenser yang tersedia pada bagian atas halaman. Tempatkan wadah, pilih volume air, lalu tekan tombol mulai pengisian.',
    },
    {
        icon: Clock3,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        accentColor: 'border-l-blue-400',
        question: 'Kapan dispenser tersedia?',
        answer: 'Dispenser tersedia selama 24 jam. Namun, dispenser akan ditutup sementara apabila kapasitas air berada di bawah 30% untuk proses pengisian ulang, atau ketika nilai TDS air melebihi batas aman sehingga perlu dilakukan pengecekan kualitas air kembali.',
    },
    {
        icon: Droplets,
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-500',
        accentColor: 'border-l-cyan-400',
        question: 'Apakah air yang digunakan aman?',
        answer: 'Ya, kami memastikan air yang digunakan bersih dan aman. Sistem menggunakan sensor TDS untuk memantau kualitas air sehingga pengguna tidak perlu khawatir terhadap kebersihan dan keamanan air yang digunakan.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toggle = (idx: number) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <section className="relative overflow-hidden border-t border-blue-100 bg-[#f3f8ff] py-16 md:py-24">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-cyan-100/50 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            'linear-gradient(#0369a1 1px, transparent 1px), linear-gradient(90deg, #0369a1 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />
            </div>

            <div className="relative max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 items-start">
                {/* ── Left column ── */}
                <div className="md:sticky md:top-8">
                    {/* Label pill */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-xs font-bold tracking-wide mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        FAQ
                    </span>

                    <h2 className="text-4xl md:text-5xl font-black text-blue-700 tracking-tight leading-tight">
                        Pertanyaan
                        <br />
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                                WebkitBackgroundClip: 'text',
                            }}
                        >
                            Umum
                        </span>
                    </h2>

                    <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                        Tidak menemukan jawaban yang dicari? Hubungi tim kami langsung.
                    </p>

                    <Link
                        href="/helpdesk"
                        className="group mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:scale-105 active:scale-95"
                    >
                        <MessageSquarePlus size={15} />
                        Kirim Laporan
                    </Link>

                    {/* Decorative water ripple */}
                    <div className="mt-10 hidden md:flex items-center justify-start pl-2">
                        <div className="relative flex items-center justify-center h-16 w-16">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full border border-cyan-400/30"
                                    style={{
                                        width: 20 + i * 16,
                                        height: 20 + i * 16,
                                        animation: 'faqRipple 2.4s ease-out infinite',
                                        animationDelay: `${(i - 1) * 0.8}s`,
                                    }}
                                />
                            ))}
                            <div className="relative z-10 flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200 shadow-sm">
                                <Droplets size={18} className="text-cyan-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Accordion ── */}
                <div className="space-y-3">
                    {faqItems.map((item, idx) => {
                        const Icon = item.icon;
                        const isOpen = openIndex === idx;

                        return (
                            <div
                                key={item.question}
                                className={`
                  rounded-2xl border overflow-hidden transition-all duration-200
                  ${
                      isOpen
                          ? 'bg-white border-blue-200 shadow-md shadow-blue-100'
                          : 'bg-white/70 border-blue-100/80 hover:border-blue-200 hover:bg-white hover:shadow-sm'
                  }
                  border-l-4 ${item.accentColor}
                `}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggle(idx)}
                                    className="w-full px-5 py-4 flex items-center gap-4 text-left"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-content-${idx}`}
                                >
                                    <div
                                        className={`h-9 w-9 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'scale-110' : ''}`}
                                    >
                                        <Icon size={17} className={item.iconColor} />
                                    </div>
                                    <span className="flex-1 text-sm md:text-base text-slate-700 font-semibold leading-snug">
                                        {item.question}
                                    </span>
                                    <div
                                        className={`flex items-center justify-center h-7 w-7 rounded-full transition-all duration-300 flex-shrink-0
                      ${isOpen ? 'bg-blue-600 rotate-180' : 'bg-blue-50 rotate-0'}
                    `}
                                    >
                                        <ChevronDown size={15} className={isOpen ? 'text-white' : 'text-blue-400'} />
                                    </div>
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
                                                : '0px',
                                    }}
                                    className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                                >
                                    <div className="px-5 pb-5 pl-[3.25rem]">
                                        <div className="h-px bg-gradient-to-r from-blue-100 to-transparent mb-3" />
                                        <p className="text-sm text-slate-500 leading-relaxed">{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
        @keyframes faqRipple {
          0%   { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        footer {
          margin-top: 0 !important;
        }
      `}</style>
        </section>
    );
}
