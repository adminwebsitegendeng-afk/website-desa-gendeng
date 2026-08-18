"use client";

import { useState, useEffect } from "react";
import { getHomepageData, updateHomepageData, getWargaList, getWisataList, getPotensiList } from "@/lib/admin/services/adminService";
import { HomepageData, HighlightReference, WargaItem, WisataItem, PotensiItem } from "@/lib/admin/types";

export default function AdminHomepagePage() {
  const [form, setForm] = useState<HomepageData | null>(null);
  const [warga, setWarga] = useState<WargaItem[]>([]);
  const [wisata, setWisata] = useState<WisataItem[]>([]);
  const [potensi, setPotensi] = useState<PotensiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadData() {
      const [data, wg, ws, pt] = await Promise.all([
        getHomepageData(),
        getWargaList(),
        getWisataList(),
        getPotensiList(),
      ]);
      setForm(data as unknown as HomepageData);
      setWarga(wg.filter(i => i.status === "published"));
      setWisata(ws.filter(i => i.status === "published"));
      setPotensi(pt.filter(i => i.status === "published"));
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setErrorMsg("");
    setSaved(false);
    
    try {
      await updateHomepageData(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error: unknown) {
      const err = error as Error;
      if (err.message?.includes("column \"highlights\"")) {
        setErrorMsg("Gagal menyimpan: Kolom 'highlights' belum ada di database Supabase Anda. Mohon jalankan SQL: ALTER TABLE homepage_settings ADD COLUMN highlights JSONB DEFAULT '[]'; di SQL Editor Supabase Anda.");
      } else {
        setErrorMsg("Gagal menyimpan: " + (err.message || "Terjadi kesalahan jaringan"));
      }
    }
  };

  if (loading || !form) {
    return <div className="p-8 text-center text-xs font-bold text-medium">Memuat Pengaturan Beranda...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-dark tracking-tight">Pengaturan Beranda Utama (Homepage)</h2>
          <p className="text-xs text-medium">Kelola teks hero utama, tagline, gambar latar, dan highlight.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-extrabold rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span>❌</span>
            <span>{errorMsg.replace(/'/g, "&apos;")}</span>
          </div>
          {errorMsg.includes("ALTER TABLE") && (
            <div className="bg-white/80 p-3 rounded-lg text-[10px] font-mono break-all border border-red-100 select-all">
              ALTER TABLE homepage_settings ADD COLUMN highlights JSONB DEFAULT &apos;[]&apos;;
            </div>
          )}
        </div>
      )}

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
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Semboyan Desa / Tagline Hero</label>
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
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const { uploadImageFile } = await import("@/lib/upload");
                      const url = await uploadImageFile(file);
                      setForm({ ...form, heroImage: url });
                    } catch (err: unknown) {
                      console.error(err);
                      alert("Gagal mengunggah gambar");
                    }
                  }
                }}
                className="text-xs text-medium file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-extrabold file:bg-tint file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
              <input
                type="text"
                value={form.heroImage}
                onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                className="w-full px-4 py-2 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
                placeholder="Atau masukkan URL gambar..."
              />
            </div>
            {form.heroImage && (
              <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={form.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>



        <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-ios space-y-4">
          <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider">Pengaturan 4 Highlight</h3>
          <p className="text-xs text-medium">Pilih data dari sistem yang ingin ditampilkan sebagai kotak Highlight di halaman utama.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.highlights?.map((hl, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-2xl space-y-3 bg-gray-50/50">
                <h4 className="text-xs font-extrabold text-dark">Highlight #{idx + 1}</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-dark mb-1 uppercase">Tipe Data</label>
                    <select 
                      value={hl.type}
                      onChange={(e) => {
                        const newHl = [...form.highlights!];
                        newHl[idx].type = e.target.value as HighlightReference["type"];
                        newHl[idx].id = ""; // reset id
                        setForm({...form, highlights: newHl});
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-primary bg-white"
                    >
                      <option value="custom">Custom (Bawaan)</option>
                      <option value="warga">Kegiatan Warga</option>
                      <option value="wisata">Wisata Budaya</option>
                      <option value="potensi">Potensi Ekonomi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-dark mb-1 uppercase">Ikon Emoji</label>
                    <input
                      type="text"
                      value={hl.icon}
                      onChange={(e) => {
                        const newHl = [...form.highlights!];
                        newHl[idx].icon = e.target.value;
                        setForm({...form, highlights: newHl});
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-primary"
                      placeholder="Contoh: 🌾"
                    />
                  </div>
                </div>
                
                {hl.type !== "custom" && (
                  <div>
                    <label className="block text-[10px] font-bold text-dark mb-1 uppercase">Pilih Data</label>
                    <select
                      value={hl.id}
                      onChange={(e) => {
                        const newHl = [...form.highlights!];
                        newHl[idx].id = e.target.value;
                        setForm({...form, highlights: newHl});
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-primary bg-white"
                    >
                      <option value="">-- Pilih --</option>
                      {hl.type === "warga" && warga.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
                      {hl.type === "wisata" && wisata.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
                      {hl.type === "potensi" && potensi.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
                    </select>
                  </div>
                )}
              </div>
            ))}
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
