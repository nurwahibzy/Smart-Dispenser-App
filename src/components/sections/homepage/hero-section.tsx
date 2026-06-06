import Link from 'next/link';
import { Droplets, ArrowRight, Wifi, Shield, Clock3 } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#f3f8ff] px-6 py-28 md:py-36 text-center">
            {/* ── Background decorations ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Orb kiri atas — biru muda */}
                <div
                    className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full opacity-50"
                    style={{
                        background: 'radial-gradient(circle, #bae6fd 0%, transparent 70%)',
                        animation: 'orbFloat 8s ease-in-out infinite',
                    }}
                />
                {/* Orb kanan bawah — cyan muda */}
                <div
                    className="absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full opacity-40"
                    style={{
                        background: 'radial-gradient(circle, #a5f3fc 0%, transparent 70%)',
                        animation: 'orbFloat 10s ease-in-out infinite reverse',
                    }}
                />
                {/* Centre glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[560px] w-[560px] rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, #7dd3fc 0%, transparent 65%)',
                        animation: 'heroPulse 6s ease-in-out infinite',
                    }}
                />

                {/* Floating water drops */}
                {[
                    { size: 6, x: '12%', y: '18%', dur: '5s', delay: '0s' },
                    { size: 4, x: '82%', y: '14%', dur: '6s', delay: '1.2s' },
                    { size: 8, x: '74%', y: '68%', dur: '7s', delay: '0.4s' },
                    { size: 5, x: '22%', y: '74%', dur: '5.5s', delay: '2s' },
                    { size: 3, x: '54%', y: '8%', dur: '4.5s', delay: '1.6s' },
                    { size: 6, x: '88%', y: '44%', dur: '8s', delay: '0.8s' },
                    { size: 4, x: '6%', y: '54%', dur: '6.5s', delay: '3s' },
                ].map((d, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-blue-300/30 border border-blue-300/50"
                        style={{
                            width: d.size * 4,
                            height: d.size * 4,
                            left: d.x,
                            top: d.y,
                            animation: `floatDrop ${d.dur} ease-in-out infinite`,
                            animationDelay: d.delay,
                        }}
                    />
                ))}

                {/* Scan line */}
                <div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                    style={{ animation: 'scanLine 5s ease-in-out infinite' }}
                />

                {/* Grid lines */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            'linear-gradient(#0369a1 1px, transparent 1px), linear-gradient(90deg, #0369a1 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* ── Main content ── */}
            <div className="relative max-w-4xl mx-auto">
                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white text-xs font-bold text-blue-600 mb-8 shadow-sm"
                    style={{ animation: 'fadeSlideDown 0.6s ease both' }}
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                    </span>
                    Smart Water Station · Polinema
                </div>

                {/* Heading */}
                <h1
                    className="text-5xl md:text-[5.5rem] font-black leading-[1.0] tracking-tight mb-6"
                    style={{ animation: 'fadeSlideDown 0.7s 0.1s ease both' }}
                >
                    <span className="text-blue-800">Air Bersih,</span>
                    <br />
                    <span
                        className="text-transparent bg-clip-text"
                        style={{
                            backgroundImage: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #22d3ee 100%)',
                            WebkitBackgroundClip: 'text',
                        }}
                    >
                        Kapan Saja,
                    </span>
                    <br />
                    <span className="text-blue-700">Sesuai Takaranmu</span>
                </h1>

                {/* Subtext */}
                <p
                    className="text-slate-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-10"
                    style={{ animation: 'fadeSlideDown 0.7s 0.2s ease both' }}
                >
                    Sistem dispenser pintar dengan monitoring kualitas air, level air, dan kontrol pengisian secara{' '}
                    <span className="text-cyan-600 font-semibold">real-time</span>.
                </p>

                {/* CTA Buttons */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
                    style={{ animation: 'fadeSlideDown 0.7s 0.3s ease both' }}
                >
                    <Link
                        href="/member/dashboard"
                        className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-200"
                        style={{ background: 'linear-gradient(135deg, #0284c7, #06b6d4)' }}
                    >
                        {/* Shimmer */}
                        <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background:
                                    'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
                                animation: 'shimmer 1.5s ease infinite',
                            }}
                        />
                        <Droplets size={16} className="relative z-10" />
                        <span className="relative z-10">Gunakan Dispenser</span>
                        <ArrowRight
                            size={15}
                            className="relative z-10 transition-transform group-hover:translate-x-1"
                        />
                    </Link>

                    <Link
                        href="/helpdesk"
                        className="inline-flex items-center gap-2 border border-blue-200 hover:border-blue-400 bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 shadow-sm"
                    >
                        Pusat Bantuan
                    </Link>
                </div>

                {/* Divider */}
                <div
                    className="flex items-center gap-4 max-w-sm mx-auto mb-8 opacity-50"
                    style={{ animation: 'fadeSlideDown 0.7s 0.4s ease both' }}
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-300" />
                    <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
                        Fitur Unggulan
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-300" />
                </div>

                {/* Feature pills */}
                <div
                    className="flex flex-wrap justify-center gap-3"
                    style={{ animation: 'fadeSlideDown 0.7s 0.5s ease both' }}
                >
                    {[
                        {
                            icon: Wifi,
                            label: 'Monitoring Realtime',
                            bg: 'bg-blue-50',
                            border: 'border-blue-200',
                            text: 'text-blue-600',
                        },
                        {
                            icon: Clock3,
                            label: 'Operasional 24 Jam',
                            bg: 'bg-cyan-50',
                            border: 'border-cyan-200',
                            text: 'text-cyan-600',
                        },
                        {
                            icon: Shield,
                            label: 'Air Bersih & Aman',
                            bg: 'bg-teal-50',
                            border: 'border-teal-200',
                            text: 'text-teal-600',
                        },
                    ].map(({ icon: Icon, label, bg, border, text }) => (
                        <div
                            key={label}
                            className={`flex items-center gap-2 ${bg} border ${border} rounded-full px-5 py-2.5 hover:scale-105 transition-transform cursor-default shadow-sm`}
                        >
                            <Icon size={13} className={text} />
                            <span className={`text-sm font-semibold ${text}`}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Water ripple decoration */}
                <div
                    className="mt-16 flex items-center justify-center"
                    style={{ animation: 'fadeSlideDown 0.7s 0.6s ease both' }}
                >
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="absolute rounded-full border border-blue-300/50"
                            style={{
                                width: 80 + i * 60,
                                height: 80 + i * 60,
                                animation: 'ripple 3s ease-out infinite',
                                animationDelay: `${(i - 1) * 1}s`,
                            }}
                        />
                    ))}
                    <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200 shadow-md">
                        <Droplets
                            size={32}
                            className="text-cyan-500"
                            style={{ filter: 'drop-shadow(0 0 6px #22d3ee)' }}
                        />
                    </div>
                </div>
            </div>

            {/* ── Keyframes ── */}
            <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 30px) scale(0.95); }
        }
        @keyframes floatDrop {
          0%, 100% { transform: translateY(0px) scale(1);      opacity: 0.5; }
          50%       { transform: translateY(-16px) scale(1.12); opacity: 1;   }
        }
        @keyframes scanLine {
          0%   { top: -2px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes ripple {
          0%   { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.28; }
        }
      `}</style>
        </section>
    );
}
