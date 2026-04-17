"use client";

import { useState } from "react";
import { useSubmitTicket } from "../hooks/useSubmitHelpdesk";
import { HelpdeskPayload } from "@/types/helpdesk";

export default function UserHelpdeskForm() {
  const { submitTicket, isLoading, error, successMessage } = useSubmitTicket();

  // State untuk menyimpan data form
  const [formData, setFormData] = useState<HelpdeskPayload>({
    name: "",
    contact: "",
    title: "",
    category: "bug",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSuccess = await submitTicket(formData);
    
    // Reset form jika submit berhasil
    if (isSuccess) {
      setFormData({
        name: "",
        contact: "",
        title: "",
        category: "bug",
        description: "",
      });
      // refresh halaman
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-xl"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm">
          {successMessage}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Masukkan nama Anda"
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email (Email)
        </label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          placeholder="example@email.com"
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Judul Laporan
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Contoh: Tombol simpan tidak berfungsi"
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kategori
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="bug">Laporan Bug / Error</option>
          <option value="feedback">Saran Fitur Baru</option>
          <option value="other">Lainnya</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deskripsi Detail
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Ceritakan detail masalah yang Anda alami..."
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-colors
          ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
        `}
      >
        {isLoading ? "Mengirim Laporan..." : "Kirim Laporan"}
      </button>
    </form>
  );
}