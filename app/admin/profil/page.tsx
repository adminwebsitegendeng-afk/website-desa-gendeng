"use client";

import { useState, useEffect } from "react";
import { getProfilData, updateProfilData } from "@/lib/admin/services/adminService";
import { ProfilData } from "@/lib/admin/types";

export default function AdminProfilPage() {
  const [form, setForm] = useState<ProfilData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getProfilData();
      setForm(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    await updateProfilData(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading || !form) {
    return <div className="p-8 text-center text-xs font-bold text-medium">Memuat Data Profil Desa...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-dark tracking-tight">Pengelolaan Profil Desa</h2>
          <p className="text-xs text-medium">Kelola sambutan pimpinan, sejarah, visi misi, dan informasi kontak desa.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold rounded-2xl flex items-center gap-2">
          <span>✅</span>
          <span>Perubahan Profil Desa berhasil disimpan!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sambutan Section */}
        <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-ios space-y-4">
          <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider">1. Sambutan Ketua RW / Lurah</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Judul Sambutan</label>
              <input
                type="text"
                value={form.greetingTitle}
                onChange={(e) => setForm({ ...form, greetingTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Nama Tokoh / Pimpinan</label>
              <input
                type="text"
                value={form.greetingName}
                onChange={(e) => setForm({ ...form, greetingName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Jabatan / Role</label>
            <input
              type="text"
              value={form.greetingRole}
              onChange={(e) => setForm({ ...form, greetingRole: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Pesan Sambutan</label>
            <textarea
              rows={4}
              value={form.greetingMessage}
              onChange={(e) => setForm({ ...form, greetingMessage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Sejarah & Visi Misi Section */}
        <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-ios space-y-4">
          <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider">2. Sejarah, Visi & Misi</h3>
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Sejarah Singkat Desa</label>
            <textarea
              rows={3}
              value={form.historyText}
              onChange={(e) => setForm({ ...form, historyText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Visi Desa</label>
            <textarea
              rows={2}
              value={form.visionText}
              onChange={(e) => setForm({ ...form, visionText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Informas Kontak */}
        <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-ios space-y-4">
          <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider">3. Alamat & Kontak Resmi</h3>
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Alamat Balai Desa</label>
            <input
              type="text"
              value={form.contactAddress}
              onChange={(e) => setForm({ ...form, contactAddress: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Nomor Telepon</label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Email Resmi</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover active-press text-white px-8 py-3 rounded-full font-extrabold text-xs shadow-ios transition-all"
        >
          Simpan Perubahan Profil
        </button>
      </form>
    </div>
  );
}
