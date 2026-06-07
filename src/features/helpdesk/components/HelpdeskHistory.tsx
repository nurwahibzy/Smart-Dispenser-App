'use client';

import { useState, useEffect } from 'react';
import { useFetchTicket } from '../hooks/useGetHelpdesk';
import { HelpdeskTicket } from '@/types/helpdesk';
import { ClipboardList, Bug, Lightbulb, HelpCircle, Clock, Loader2 } from 'lucide-react';

export default function HelpdeskHistory({ className }: { className?: string }) {
    const { FetchTicket, isLoading, error } = useFetchTicket();
    const [tickets, setTickets] = useState<HelpdeskTicket[]>([]);

    useEffect(() => {
        const loadTickets = async () => {
            const data = await FetchTicket();
            if (data) setTickets(data);
        };
        loadTickets();
    }, []);

    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full${className ? ` ${className}` : ""}`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5">
                <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-white" />
                    <h2 className="text-white font-bold text-lg">Riwayat Laporan</h2>
                </div>
                <p className="text-indigo-100 text-xs mt-0.5">Pantau status laporan yang pernah Anda kirimkan</p>
            </div>

            <div className="p-6">
                {/* Loading state */}
                {isLoading && (
                    <div className="flex items-center justify-center gap-2 py-12 text-gray-400">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm">Memuat riwayat laporan...</span>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm">{error}</div>
                )}

                {/* Empty state */}
                {!isLoading && tickets.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-indigo-50 mb-4">
                            <ClipboardList className="h-7 w-7 text-indigo-400" />
                        </div>
                        <p className="font-semibold text-gray-700 text-sm">Belum ada laporan</p>
                        <p className="text-gray-400 text-xs mt-1">Laporan yang Anda kirim akan muncul di sini</p>
                    </div>
                )}

                {/* Ticket list */}
                <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1 pb-1">
                    {tickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ───────────────────────────────────────────
// Ticket Card
// ───────────────────────────────────────────
const categoryConfig: Record<string, { icon: React.ElementType; bg: string; color: string; label: string }> = {
    bug: {
        icon: Bug,
        bg: 'bg-red-50',
        color: 'text-red-500',
        label: 'Bug / Error',
    },
    feedback: {
        icon: Lightbulb,
        bg: 'bg-amber-50',
        color: 'text-amber-500',
        label: 'Saran Fitur',
    },
    other: {
        icon: HelpCircle,
        bg: 'bg-gray-100',
        color: 'text-gray-500',
        label: 'Lainnya',
    },
};

function TicketCard({ ticket }: { ticket: HelpdeskTicket }) {
    const cat = categoryConfig[ticket.category] ?? categoryConfig.other;
    const Icon = cat.icon;

    return (
        <div className="group bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 overflow-hidden">
            {/* Left accent stripe */}
            <div className="flex">
                <div className={`w-1 shrink-0 rounded-l-xl ${getAccentColor(ticket.status)}`} />
                <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        {/* Title + category */}
                        <div className="flex items-start gap-3 min-w-0">
                            <div
                                className={`flex items-center justify-center h-8 w-8 rounded-lg ${cat.bg} shrink-0 mt-0.5`}
                            >
                                <Icon className={`h-4 w-4 ${cat.color}`} />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate">
                                    {ticket.title}
                                </h3>
                                <span className={`inline-block text-xs mt-0.5 font-medium ${cat.color}`}>
                                    {cat.label}
                                </span>
                            </div>
                        </div>

                        {/* Status badge */}
                        <StatusBadge status={ticket.status} />
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 bg-white rounded-lg border border-gray-100 px-3 py-2 leading-relaxed line-clamp-2">
                        {ticket.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

function getAccentColor(status: string) {
    const map: Record<string, string> = {
        pending: 'bg-amber-400',
        in_progress: 'bg-blue-500',
        resolved: 'bg-emerald-500',
    };
    return map[status] ?? 'bg-gray-300';
}

// ───────────────────────────────────────────
// Status Badge
// ───────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, { cls: string; dot: string; label: string }> = {
        pending: {
            cls: 'bg-amber-50 text-amber-700 border-amber-200',
            dot: 'bg-amber-400',
            label: 'Sedang Ditinjau',
        },
        in_progress: {
            cls: 'bg-blue-50 text-blue-700 border-blue-200',
            dot: 'bg-blue-500',
            label: 'Sedang Ditangani',
        },
        resolved: {
            cls: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            dot: 'bg-emerald-500',
            label: 'Telah Diselesaikan',
        },
    };

    const s = styles[status] ?? { cls: 'bg-gray-50 text-gray-600 border-gray-200', dot: 'bg-gray-400', label: status };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap shrink-0 ${s.cls}`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
            {s.label}
        </span>
    );
};
