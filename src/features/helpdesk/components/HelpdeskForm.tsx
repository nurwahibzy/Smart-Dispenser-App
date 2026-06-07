'use client';

import { useState } from 'react';
import { useSubmitTicket } from '../hooks/useSubmitHelpdesk';
import { HelpdeskPayload } from '@/types/helpdesk';
import { Select } from '@/components/ui/select';
import { User, Mail, FileText, Tag, AlignLeft, Send, CheckCircle2, XCircle } from 'lucide-react';

export default function UserHelpdeskForm({ className }: { className?: string }) {
    const { submitTicket, isLoading, error, successMessage } = useSubmitTicket();

    const [formData, setFormData] = useState<HelpdeskPayload>({
        name: '',
        contact: '',
        title: '',
        category: 'bug',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isSuccess = await submitTicket(formData);

        if (isSuccess) {
            setFormData({
                name: '',
                contact: '',
                title: '',
                category: 'bug',
                description: '',
            });
            window.location.reload();
        }
    };

    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full${className ? ` ${className}` : ""}`}>
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
                <h2 className="text-white font-bold text-lg">Buat Laporan Baru</h2>
                <p className="text-blue-100 text-xs mt-0.5">Isi semua field di bawah ini dengan lengkap</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Error alert */}
                {error && (
                    <div className="flex items-start gap-3 p-3.5 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm">
                        <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Success alert */}
                {successMessage && (
                    <div className="flex items-start gap-3 p-3.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 text-sm">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Nama */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Nama Lengkap
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Masukkan nama Anda"
                            className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                            placeholder="example@email.com"
                            className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Judul */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Judul Laporan
                    </label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Contoh: Tombol simpan tidak berfungsi"
                            className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Kategori */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Kategori
                    </label>
                    <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10 pointer-events-none" />
                        <div className="pl-9">
                            <Select
                                value={formData.category}
                                onChange={(val) =>
                                    setFormData({ ...formData, category: val as HelpdeskPayload['category'] })
                                }
                                options={[
                                    { label: 'Laporan Bug / Error', value: 'bug' },
                                    { label: 'Saran Fitur Baru', value: 'feedback' },
                                    { label: 'Lainnya', value: 'other' },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Deskripsi */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Deskripsi Detail
                    </label>
                    <div className="relative">
                        <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Ceritakan detail masalah yang Anda alami..."
                            className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none transition-all resize-none"
                        />
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white transition-all
                        ${
                            isLoading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 active:scale-[0.98]'
                        }`}
                >
                    <Send className="h-4 w-4" />
                    {isLoading ? 'Mengirim Laporan...' : 'Kirim Laporan'}
                </button>
            </form>
        </div>
    );
}
