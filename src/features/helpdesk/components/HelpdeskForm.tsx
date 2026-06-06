'use client';

import { useState } from 'react';
import { useSubmitTicket } from '../hooks/useSubmitHelpdesk';
import { HelpdeskPayload } from '@/types/helpdesk';
import { Select } from '@/components/ui/select';

export default function UserHelpdeskForm() {
    const { submitTicket, isLoading, error, successMessage } = useSubmitTicket();

    // State untuk menyimpan data form
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

        // Reset form jika submit berhasil
        if (isSuccess) {
            setFormData({
                name: '',
                contact: '',
                title: '',
                category: 'bug',
                description: '',
            });
            // refresh halaman
            window.location.reload();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-xl">
            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">{error}</div>
            )}

            {successMessage && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm">
                    {successMessage}
                </div>
            )}

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama Anda"
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Email)</label>
                <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Laporan</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Tombol simpan tidak berfungsi"
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <Select
                    value={formData.category}
                    onChange={(val) => setFormData({ ...formData, category: val as HelpdeskPayload['category'] })}
                    options={[
                        { label: 'Laporan Bug / Error', value: 'bug' },
                        { label: 'Saran Fitur Baru', value: 'feedback' },
                        { label: 'Lainnya', value: 'other' },
                    ]}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Detail</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Ceritakan detail masalah yang Anda alami..."
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-colors
          ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
        `}
            >
                {isLoading ? 'Mengirim Laporan...' : 'Kirim Laporan'}
            </button>
        </form>
    );
}
