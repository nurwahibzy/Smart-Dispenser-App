'use client';

import UserHelpdeskForm from '@/features/helpdesk/components/HelpdeskForm';
import HelpdeskHistory from '@/features/helpdesk/components/HelpdeskHistory';
import { HeadphonesIcon, Sparkles } from 'lucide-react';

export default function UserHelpdeskPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60">
            {/* Page Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 px-6 py-12">
                {/* Decorative blobs */}
                <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-indigo-300/20 blur-2xl" />
                <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-2xl" />

                <div className="relative max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            <Sparkles className="h-3 w-3" />
                            Smart Dispenser · Polinema
                        </span>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-white/15 shrink-0 mt-0.5">
                            <HeadphonesIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                Pusat Bantuan
                            </h1>
                            <p className="text-blue-100 mt-1.5 text-sm md:text-base max-w-lg">
                                Punya masalah teknis atau saran untuk aplikasi kami? Sampaikan melalui form di bawah
                                ini, kami siap membantu.
                            </p>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        {[
                            { label: 'Respons dalam', value: '1×24 Jam' },
                            { label: 'Kategori tersedia', value: '3 Jenis' },
                            { label: 'Tim siap', value: 'Setiap hari' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20"
                            >
                                <div>
                                    <p className="text-white font-bold text-sm">{stat.value}</p>
                                    <p className="text-blue-200 text-xs">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    <div className="w-full flex flex-col">
                        <UserHelpdeskForm className="flex-1" />
                    </div>
                    <div className="w-full flex flex-col">
                        <HelpdeskHistory className="flex-1" />
                    </div>
                </div>
            </div>
        </main>
    );
}
