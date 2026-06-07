'use client';

import { useEffect, useState } from 'react';
import { Droplets } from 'lucide-react';
import { useMemberKiosk } from '@/features/member/hooks/useMemberKiosk';
import WaterLevelSection from '@/features/water/components/water-level-section';
import TdsCard from '@/features/water/components/tds-card';
import DailyUsageCard from '@/features/water/components/daily-usage-card';
import { useDeviceData } from '@/lib/hooks/useDeviceData';
import { useTransactionData } from '@/lib/hooks/useTransactionData';
import { calculateDailyUsage } from '@/lib/utils/transaction';
import GlassDetectionCard from '@/features/water/components/glass-detection-card';
import ValveControl from '@/features/water/components/valve-control-card';

/* ── Shared glass card style ─────────────────────────────────────────── */
const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(147,197,253,0.45)',
    boxShadow: '0 4px 32px rgba(14,165,233,0.09), 0 1px 0 rgba(255,255,255,0.8) inset',
    borderRadius: '20px',
};

export default function MemberKioskContent() {
    const {
        volumeOptions,
        selectedVolume,
        setSelectedVolume,
        startDispensing,
        canStart,
        isDispensing,
        finishState,
        progressPercent,
        progressText,
        guardReason,
    } = useMemberKiosk();

    const { data: deviceData, loading: deviceLoading } = useDeviceData();
    const { data: transactions, loading: transactionLoading } = useTransactionData();
    const { dailyUsage, totalDispenses } = calculateDailyUsage(transactions || []);
    const tds = deviceData?.sensors?.tds || 0;

    const [modalActive, setModalActive] = useState(false);
    const isGlassDetected = deviceData?.sensors?.glassDetected || false;

    useEffect(() => {
        if (finishState === 'done') {
            setModalActive(false);
            const t = setTimeout(() => setModalActive(true), 20);
            return () => clearTimeout(t);
        }
        setModalActive(false);
    }, [finishState]);

    return (
        <>
            <style>{`
                @keyframes kcFadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .kc-section { animation: kcFadeUp .5s cubic-bezier(.2,.8,.2,1) both; }
                .kc-section:nth-child(1) { animation-delay: .05s; }
                .kc-section:nth-child(2) { animation-delay: .12s; }
                .kc-section:nth-child(3) { animation-delay: .19s; }

                /* volume button hover glow */
                .vol-btn { transition: transform .15s, box-shadow .15s, background .15s, border-color .15s; }
                .vol-btn:not([data-selected]):hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(14,165,233,.15);
                }
                .vol-btn[data-selected] {
                    background: linear-gradient(135deg,rgba(219,234,254,.9),rgba(207,250,254,.9));
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59,130,246,.18), 0 6px 20px rgba(14,165,233,.18);
                    transform: translateY(-2px);
                }

                /* progress bar shimmer */
                @keyframes shimmer {
                    from { background-position: -200% center; }
                    to   { background-position:  200% center; }
                }
                .progress-fill {
                    background: linear-gradient(90deg, #2563eb, #0ea5e9, #38bdf8, #0ea5e9, #2563eb);
                    background-size: 200% 100%;
                    animation: shimmer 2s linear infinite;
                }

                /* start button pulse */
                @keyframes btnPulse {
                    0%,100% { box-shadow: 0 4px 20px rgba(14,165,233,.35); }
                    50%     { box-shadow: 0 4px 30px rgba(14,165,233,.6); }
                }
                .start-btn:not(:disabled) { animation: btnPulse 2.4s ease-in-out infinite; }
                .start-btn:not(:disabled):hover { filter: brightness(1.08); }

                /* modal check animation */
                .sd-check-path { stroke-dasharray: 100; stroke-dashoffset: 100; }
                .sd-modal-active .sd-check-path { animation: sd-draw 600ms cubic-bezier(.2,.8,.2,1) forwards 250ms; }
                @keyframes sd-draw { to { stroke-dashoffset: 0; } }
                .sd-pop { transform-origin: center; }
                .sd-modal-active .sd-pop { animation: sd-pop 350ms cubic-bezier(.2,.8,.2,1) forwards; }
                @keyframes sd-pop { from { transform: scale(.8); opacity:0 } to { transform: scale(1); opacity:1 } }
            `}</style>

            <div className="space-y-5 md:space-y-6">
                {/* ── Status Cards ──
                     Grid (lg):
                     ┌──────────────────┬──────────────────┬───────────────────┐
                     │                  │   Nilai TDS      │ Penggunaan Harian │
                     │   Level Air      ├──────────────────┼───────────────────┤
                     │  (row-span 2)    │  Deteksi Gelas   │   Status Katup    │
                     └──────────────────┴──────────────────┴───────────────────┘
                ── */}
                <section className="kc-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3">
                    {/* Col 1 – Level Air (spans 2 rows on lg) */}
                    <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 h-full">
                        <div className="h-full lg:[&_svg]:h-[220px] lg:[&_svg]:w-[185px]">
                            <WaterLevelSection />
                        </div>
                    </div>

                    {/* Row 1 Col 2 – Nilai TDS */}
                    <TdsCard tds={tds} />

                    {/* Row 1 Col 3 – Penggunaan Harian */}
                    <DailyUsageCard dailyUsage={dailyUsage} totalDispenses={totalDispenses} />

                    {/* Row 2 Col 2 – Deteksi Gelas */}
                    <GlassDetectionCard isGlassDetected={isGlassDetected} />

                    {/* Row 2 Col 3 – Status Katup */}
                    <ValveControl className="" />

                    {(deviceLoading || transactionLoading) && (
                        <p className="col-span-full text-sm px-1" style={{ color: '#64a3c8' }}>
                            Memuat data status…
                        </p>
                    )}
                </section>

                {/* ── Volume Selector ── */}
                <section className="kc-section p-5 md:p-7" style={glassCard}>
                    {/* Section heading */}
                    <div className="flex items-center gap-3 mb-6">
                        <div
                            className="flex-1 h-px"
                            style={{ background: 'linear-gradient(to right, transparent, rgba(147,197,253,.6))' }}
                        />
                        <h2
                            className="text-xl md:text-2xl font-extrabold tracking-tight px-2"
                            style={{ color: '#1e40af', letterSpacing: '-0.02em' }}
                        >
                            Pilih Volume Air
                        </h2>
                        <div
                            className="flex-1 h-px"
                            style={{ background: 'linear-gradient(to left, transparent, rgba(147,197,253,.6))' }}
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {volumeOptions.map((volume) => {
                            const isSelected = selectedVolume === volume;
                            return (
                                <button
                                    key={volume}
                                    type="button"
                                    data-selected={isSelected ? 'true' : undefined}
                                    onClick={() => setSelectedVolume(volume)}
                                    className="vol-btn rounded-2xl border p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 active:scale-[.97] select-none"
                                    style={{
                                        background: isSelected
                                            ? 'linear-gradient(135deg,rgba(219,234,254,.9),rgba(207,250,254,.9))'
                                            : 'rgba(255,255,255,0.55)',
                                        borderColor: isSelected ? '#3b82f6' : 'rgba(147,197,253,0.5)',
                                        boxShadow: isSelected
                                            ? '0 0 0 3px rgba(59,130,246,.18), 0 6px 20px rgba(14,165,233,.18)'
                                            : '0 2px 8px rgba(14,165,233,.06)',
                                    }}
                                >
                                    <div
                                        className="h-14 rounded-xl flex items-center justify-center"
                                        style={{
                                            background: isSelected
                                                ? 'linear-gradient(135deg, #3b82f6, #0ea5e9)'
                                                : 'linear-gradient(135deg, rgba(219,234,254,.8), rgba(207,250,254,.6))',
                                        }}
                                    >
                                        <Droplets size={22} style={{ color: isSelected ? '#fff' : '#3b82f6' }} />
                                    </div>
                                    <div
                                        className="mt-3 flex items-end justify-center gap-1"
                                        style={{ color: isSelected ? '#1e40af' : '#2563eb' }}
                                    >
                                        <span className="text-2xl font-black leading-none">{volume}</span>
                                        <span className="text-xs font-semibold leading-[1.7] opacity-75">ml</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* ── Dispense Control ── */}
                <section className="kc-section p-5 md:p-7" style={glassCard}>
                    <div className="flex items-center gap-3 mb-6">
                        <div
                            className="flex-1 h-px"
                            style={{ background: 'linear-gradient(to right, transparent, rgba(147,197,253,.6))' }}
                        />
                        <h2
                            className="text-xl md:text-2xl font-extrabold tracking-tight px-2"
                            style={{ color: '#1e40af', letterSpacing: '-0.02em' }}
                        >
                            Mulai Pengisian Air
                        </h2>
                        <div
                            className="flex-1 h-px"
                            style={{ background: 'linear-gradient(to left, transparent, rgba(147,197,253,.6))' }}
                        />
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <button
                            type="button"
                            onClick={startDispensing}
                            disabled={!canStart}
                            className="start-btn relative px-12 py-3.5 rounded-2xl text-sm font-extrabold tracking-wider transition-all"
                            style={
                                canStart
                                    ? {
                                          background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
                                          color: '#fff',
                                          letterSpacing: '0.08em',
                                          cursor: 'pointer',
                                      }
                                    : {
                                          background: 'rgba(203,213,225,0.7)',
                                          color: 'rgba(100,116,139,0.9)',
                                          cursor: 'not-allowed',
                                          letterSpacing: '0.08em',
                                      }
                            }
                        >
                            {isDispensing ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                                    </svg>
                                    MENGISI…
                                </span>
                            ) : (
                                'MULAI PENGISIAN'
                            )}
                        </button>

                        {guardReason && !canStart && (
                            <p
                                className="text-sm font-medium px-4 py-2 rounded-xl"
                                style={{
                                    color: '#dc2626',
                                    background: 'rgba(254,226,226,0.7)',
                                    border: '1px solid rgba(252,165,165,0.5)',
                                }}
                            >
                                {guardReason}
                            </p>
                        )}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-7">
                        <div
                            className="relative h-3 w-full rounded-full overflow-hidden"
                            style={{
                                background: 'rgba(219,234,254,0.7)',
                                boxShadow: 'inset 0 1px 3px rgba(59,130,246,.1)',
                            }}
                        >
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${progressPercent > 0 ? 'progress-fill' : ''}`}
                                style={{ width: `${progressPercent}%` }}
                            />
                            {/* Percentage label inside track */}
                            {progressPercent > 0 && progressPercent < 100 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span
                                        className="text-[9px] font-black text-white drop-shadow"
                                        style={{ mixBlendMode: 'overlay' }}
                                    >
                                        {Math.round(progressPercent)}%
                                    </span>
                                </div>
                            )}
                        </div>

                        {(isDispensing || finishState === 'done') && (
                            <p className="mt-3 text-center text-sm font-bold" style={{ color: '#2563eb' }}>
                                {isDispensing ? progressText : finishState === 'done' ? '✓ Selesai!' : ''}
                            </p>
                        )}
                    </div>
                </section>
            </div>

            {/* ── Success Modal ── */}
            {finishState === 'done' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(15,63,110,0.5)' }} />

                    <div
                        className={`relative w-[min(92%,560px)] p-10 flex flex-col items-center gap-6 transform transition-all duration-300 pointer-events-auto ${
                            modalActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
                        }`}
                        style={{
                            background: 'rgba(255,255,255,0.92)',
                            backdropFilter: 'blur(32px)',
                            WebkitBackdropFilter: 'blur(32px)',
                            borderRadius: '28px',
                            border: '1px solid rgba(167,243,208,0.6)',
                            boxShadow: '0 32px 80px rgba(16,185,129,.2), 0 4px 0 rgba(255,255,255,.8) inset',
                        }}
                    >
                        <div
                            className={
                                'sd-pop relative flex items-center justify-center' +
                                (modalActive ? ' sd-modal-active' : '')
                            }
                        >
                            <div
                                className="absolute -inset-4 rounded-full opacity-80"
                                style={{
                                    background:
                                        'radial-gradient(circle, rgba(167,243,208,.7), rgba(110,231,183,.3), transparent 70%)',
                                    filter: 'blur(18px)',
                                }}
                            />
                            <div
                                className="relative rounded-full p-6 flex items-center justify-center"
                                style={{
                                    background: 'rgba(255,255,255,0.9)',
                                    boxShadow: '0 8px 32px rgba(16,185,129,.25)',
                                }}
                            >
                                <svg
                                    className="sd-check-circle"
                                    width="130"
                                    height="130"
                                    viewBox="0 0 120 120"
                                    fill="none"
                                >
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="52"
                                        stroke="#34d399"
                                        strokeWidth="6"
                                        fill="rgba(16,185,129,0.07)"
                                    />
                                    <path
                                        className="sd-check-path"
                                        d="M36 62 L52 78 L84 44"
                                        stroke="#059669"
                                        strokeWidth="8.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="text-center">
                            <h3
                                className="text-3xl md:text-4xl font-extrabold"
                                style={{ color: '#064e3b', letterSpacing: '-0.02em' }}
                            >
                                Berhasil!
                            </h3>
                            <p className="mt-2 text-base text-slate-500 font-medium">
                                Pengisian air telah selesai dilakukan
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
