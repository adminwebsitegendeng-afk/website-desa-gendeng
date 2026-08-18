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
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Foto Pimpinan</label>
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
                      setForm({ ...form, greetingImage: url });
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
                value={form.greetingImage}
                onChange={(e) => setForm({ ...form, greetingImage: e.target.value })}
                className="w-full px-4 py-2 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
                placeholder="Atau masukkan URL / path gambar..."
              />
            </div>
            {form.greetingImage && (
              <div className="mt-2 relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={form.greetingImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
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
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Misi Desa</label>
            <textarea
              rows={4}
              value={form.missionText}
              onChange={(e) => setForm({ ...form, missionText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-primary"
              placeholder="Masukkan misi, pisahkan dengan baris baru (enter)..."
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

        {/* Aparatur Pemerintahan Section */}
        <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-ios space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider">4. Aparatur Pemerintahan Desa</h3>
            <button
              type="button"
              onClick={() => {
                const newOfficial = { name: "Nama Baru", role: "Jabatan", image: "/images/kades_portrait.png" };
                setForm({ ...form, officials: [...(form.officials || []), newOfficial] });
              }}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              + Tambah Pengurus
            </button>
          </div>
          <div className="space-y-4">
            {form.officials?.map((official, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-2xl bg-gray-50/50 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const newOfficials = form.officials.filter((_, i) => i !== idx);
                    setForm({ ...form, officials: newOfficials });
                  }}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-bold"
                >
                  Hapus
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mr-8">
                  <div>
                    <label className="block text-[10px] font-bold text-dark mb-1 uppercase">Nama</label>
                    <input
                      type="text"
                      value={official.name}
                      onChange={(e) => {
                        const newOffs = [...form.officials];
                        newOffs[idx].name = e.target.value;
                        setForm({ ...form, officials: newOffs });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-dark mb-1 uppercase">Jabatan</label>
                    <input
                      type="text"
                      value={official.role}
                      onChange={(e) => {
                        const newOffs = [...form.officials];
                        newOffs[idx].role = e.target.value;
                        setForm({ ...form, officials: newOffs });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-dark mb-1 uppercase">Foto Profil</label>
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
                            const newOffs = [...form.officials];
                            newOffs[idx].image = url;
                            setForm({ ...form, officials: newOffs });
                          } catch (err: unknown) {
                            console.error(err);
                            alert("Gagal mengunggah foto pengurus");
                          }
                        }
                      }}
                      className="text-[10px] text-medium file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-extrabold file:bg-tint file:text-primary cursor-pointer w-full sm:w-auto"
                    />
                    <input
                      type="text"
                      value={official.image}
                      onChange={(e) => {
                        const newOffs = [...form.officials];
                        newOffs[idx].image = e.target.value;
                        setForm({ ...form, officials: newOffs });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium focus:border-primary focus:outline-none"
                    />
                  </div>
                  {official.image && (
                    <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-white">
                      <img src={official.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {(!form.officials || form.officials.length === 0) && (
              <p className="text-xs text-medium italic text-center py-4">Belum ada data pengurus. Klik tombol Tambah Pengurus di atas.</p>
            )}
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
