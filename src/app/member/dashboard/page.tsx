import NavbarMember from '@/components/layouts/navbar/navbar-public';
import MemberKioskContent from '@/features/member/components/MemberKioskContent';
import Footer from '@/components/layouts/footer';

export default function MemberDashboardPage() {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
            {/* ── Ambient background layers ── */}
            <div className="pointer-events-none select-none" aria-hidden>
                {/* Deep gradient base */}
                <div
                    className="fixed inset-0 -z-20"
                    style={{
                        background: 'linear-gradient(160deg, #e8f4fd 0%, #dbeeff 30%, #f0faff 60%, #e4f5fb 100%)',
                    }}
                />

                {/* Animated mesh blobs */}
                <div
                    className="fixed -z-10 top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-40"
                    style={{
                        background: 'radial-gradient(circle, #93c5fd 0%, #bfdbfe 40%, transparent 70%)',
                        animation: 'floatA 18s ease-in-out infinite',
                        filter: 'blur(60px)',
                    }}
                />
                <div
                    className="fixed -z-10 top-[10%] right-[-15%] w-[50vw] h-[50vw] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, #38bdf8 0%, #7dd3fc 50%, transparent 70%)',
                        animation: 'floatB 22s ease-in-out infinite',
                        filter: 'blur(70px)',
                    }}
                />
                <div
                    className="fixed -z-10 bottom-[-10%] left-[20%] w-[55vw] h-[45vw] rounded-full opacity-25"
                    style={{
                        background: 'radial-gradient(circle, #0ea5e9 0%, #38bdf8 50%, transparent 70%)',
                        animation: 'floatC 26s ease-in-out infinite',
                        filter: 'blur(80px)',
                    }}
                />

                {/* Subtle water-ripple rings */}
                <div
                    className="fixed -z-10 right-[5%] top-[30%]"
                    style={{ animation: 'rippleFade 8s ease-out infinite' }}
                >
                    <div className="w-40 h-40 rounded-full border border-blue-300/30" />
                </div>
                <div
                    className="fixed -z-10 right-[5%] top-[30%]"
                    style={{ animation: 'rippleFade 8s ease-out infinite 2.5s' }}
                >
                    <div className="w-40 h-40 rounded-full border border-blue-300/20" />
                </div>
                <div
                    className="fixed -z-10 left-[3%] bottom-[25%]"
                    style={{ animation: 'rippleFade 10s ease-out infinite 1s' }}
                >
                    <div className="w-32 h-32 rounded-full border border-cyan-300/25" />
                </div>

                {/* Dot grid texture */}
                <div
                    className="fixed inset-0 -z-10 opacity-[0.06]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #1d4ed8 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
            </div>

            {/* ── Keyframe styles ── */}
            <style>{`
                @keyframes floatA {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33%       { transform: translate(4%, 6%) scale(1.06); }
                    66%       { transform: translate(-3%, 3%) scale(0.96); }
                }
                @keyframes floatB {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    40%       { transform: translate(-5%, 4%) scale(1.08); }
                    70%       { transform: translate(3%, -3%) scale(0.94); }
                }
                @keyframes floatC {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    35%       { transform: translate(3%, -5%) scale(1.05); }
                    65%       { transform: translate(-4%, 3%) scale(0.97); }
                }
                @keyframes rippleFade {
                    0%   { transform: scale(1);   opacity: 0.6; }
                    100% { transform: scale(3.5); opacity: 0; }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* ── Sticky Navbar with glass effect ── */}
            <div
                className="sticky top-0 z-30 backdrop-blur-md"
                style={{
                    background: 'rgba(255,255,255,0.72)',
                    borderBottom: '1px solid rgba(147,197,253,0.35)',
                    boxShadow: '0 2px 16px rgba(14,165,233,0.08)',
                }}
            >
                <NavbarMember />
            </div>

            {/* ── Main content ── */}
            <main
                className="flex-1 px-4 sm:px-6 py-8 md:py-10"
                style={{ animation: 'fadeSlideUp 0.55s cubic-bezier(.2,.8,.2,1) both' }}
            >
                {/* Page header */}
                <div className="max-w-6xl mx-auto mb-7">
                    <div className="flex items-center gap-3">
                        <div
                            className="flex items-center justify-center w-10 h-10 rounded-xl"
                            style={{
                                background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
                                boxShadow: '0 4px 14px rgba(14,165,233,0.35)',
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2C6 9 4 13.5 4 16a8 8 0 0016 0c0-2.5-2-7-8-14z" />
                            </svg>
                        </div>
                        <div>
                            <h1
                                className="text-xl font-extrabold leading-tight"
                                style={{ color: '#0f3f6e', letterSpacing: '-0.02em' }}
                            >
                                Member Kiosk
                            </h1>
                            <p className="text-xs font-medium" style={{ color: '#64a3c8' }}>
                                Stasiun Pengisian Air Minum
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto">
                    <MemberKioskContent />
                </div>
            </main>

            {/* ── Footer with glass effect ── */}
            <div
                style={{
                    background: 'rgba(255,255,255,0.6)',
                    borderTop: '1px solid rgba(147,197,253,0.3)',
                    backdropFilter: 'blur(12px)',
                }}
            >
                <Footer />
            </div>
        </div>
    );
}
