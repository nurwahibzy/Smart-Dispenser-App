import { Droplets, Hand, Play } from 'lucide-react';

const usageSteps = [
    {
        number: '01',
        icon: Hand,
        title: 'Tempatkan Wadah',
        desc: 'Letakkan wadah air yang akan digunakan pada posisi yang telah disediakan di bawah dispenser.',
        gradient: 'from-blue-500 to-blue-600',
        glow: 'shadow-blue-200',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        accentBorder: 'border-l-blue-400',
        pill: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    },
    {
        number: '02',
        icon: Droplets,
        title: 'Pilih Volume Air',
        desc: 'Pilih volume air yang sesuai dengan kapasitas wadah yang digunakan.',
        gradient: 'from-cyan-500 to-blue-500',
        glow: 'shadow-cyan-200',
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-500',
        accentBorder: 'border-l-cyan-400',
        pill: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
    },
    {
        number: '03',
        icon: Play,
        title: 'Tekan Tombol Mulai',
        desc: 'Tekan tombol mulai pengisian, air akan keluar otomatis sesuai volume yang dipilih.',
        gradient: 'from-sky-400 to-cyan-500',
        glow: 'shadow-sky-200',
        iconBg: 'bg-sky-50',
        iconColor: 'text-sky-500',
        accentBorder: 'border-l-sky-400',
        pill: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200' },
    },
];

export default function UsageSection() {
    return (
        <section className="relative overflow-hidden border-t border-blue-100 bg-white py-16 md:py-24">
            {/* Background decoration — seragam dengan hero & faq */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-100/40 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            'linear-gradient(#0369a1 1px, transparent 1px), linear-gradient(90deg, #0369a1 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />
            </div>

            <div className="relative max-w-5xl mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-xs font-bold tracking-wide mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Panduan Penggunaan
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-blue-700 tracking-tight">
                        Cara{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                                WebkitBackgroundClip: 'text',
                            }}
                        >
                            Pakai
                        </span>
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                        Alur penggunaan dibuat cepat dan sederhana supaya pengalaman isi air terasa nyaman.
                    </p>
                </div>

                {/* Connector line — desktop only */}
                <div className="hidden md:block relative mb-0">
                    <div className="absolute top-[2.75rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px z-0">
                        <div
                            className="h-full"
                            style={{
                                background: 'linear-gradient(90deg, #bae6fd, #67e8f9, #bae6fd)',
                            }}
                        />
                        {/* Animated dot on the line */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-cyan-400"
                            style={{ animation: 'slideDot 3s linear infinite' }}
                        />
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {usageSteps.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.number}
                                className={`group relative bg-white border border-blue-100 border-l-4 ${item.accentBorder} rounded-2xl p-6 shadow-sm hover:shadow-lg hover:${item.glow} hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {/* Watermark number */}
                                <span className="absolute -right-1 -top-2 text-8xl font-black text-slate-50 select-none pointer-events-none leading-none">
                                    {item.number}
                                </span>

                                {/* Step pill */}
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-bold mb-4 ${item.pill.bg} ${item.pill.border} ${item.pill.text}`}
                                >
                                    Langkah {item.number}
                                </span>

                                {/* Icon badge */}
                                <div
                                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <Icon size={20} className="text-white" />
                                </div>

                                <h3 className="text-lg font-bold text-slate-800 leading-snug mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>

                                {/* Bottom accent line on hover */}
                                <div
                                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                />
                            </article>
                        );
                    })}
                </div>
            </div>

            <style>{`
        @keyframes slideDot {
          0%   { left: 0%; }
          100% { left: 100%; }
        }
      `}</style>
        </section>
    );
}
