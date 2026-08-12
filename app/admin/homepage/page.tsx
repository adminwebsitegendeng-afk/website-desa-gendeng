"use client";

import { useState, useEffect } from "react";
import { getHomepageData, updateHomepageData } from "@/lib/admin/services/adminService";
import { HomepageData } from "@/lib/admin/types";

export default function AdminHomepagePage() {
  const [form, setForm] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getHomepageData();
      setForm(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    await updateHomepageData(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading || !form) {
    return <div className="p-8 text-center text-xs font-bold text-medium">Memuat Pengaturan Beranda...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-dark tracking-tight">Pengaturan Beranda Utama (Homepage)</h2>
          <p className="text-xs text-medium">Kelola teks hero utama, tagline, dan gambar latar belakang halaman depan.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold rounded-2xl flex items-center gap-2">
          <span>✅</span>
          <span>Perubahan Beranda Utama berhasil disimpan!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-ios space-y-4">
          <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider">Teks Hero Utama (Halaman Depan)</h3>
          
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Teks Sub-Greeting</label>
            <input
              type="text"
              value={form.heroWelcome}
              onChange={(e) => setForm({ ...form, heroWelcome: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
              placeholder="Selamat Datang di"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Tagline Utama Hero</label>
            <input
              type="text"
              value={form.heroTagline}
              onChange={(e) => setForm({ ...form, heroTagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
              placeholder="Mengenalkan Desa, Memberdayakan Potensi, Mendunia!"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Deskripsi Singkat Hero</label>
            <textarea
              rows={3}
              value={form.heroDesc}
              onChange={(e) => setForm({ ...form, heroDesc: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
              placeholder="Deskripsi singkat mengenai Desa Gendeng..."
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Gambar Latar Hero Background</label>
            <select
              value={form.heroImage}
              onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary bg-white"
            >
              <option value="/images/hero_village.png">Foto Kampung Gendeng (hero_village.png)</option>
              <option value="/images/community_event.png">Kegiatan Warga (community_event.png)</option>
              <option value="/images/potensi_crafts.png">Kerajinan Kreatif (potensi_crafts.png)</option>
              <option value="/images/wisata_waterfall.png">Lanskap Wisata (wisata_waterfall.png)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover active-press text-white px-8 py-3 rounded-full font-extrabold text-xs shadow-ios transition-all"
        >
          Simpan Pengaturan Beranda
        </button>
      </form>
    </div>
  );
}
