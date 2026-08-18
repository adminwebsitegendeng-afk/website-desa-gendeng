"use client";

import { useState, useEffect } from "react";
import {
  getWargaList,
  createWarga,
  updateWarga,
  deleteWarga,
  getHomepageData,
  updateHomepageData
} from "@/lib/admin/services/adminService";
import { WargaItem, HomepageData } from "@/lib/admin/types";
import AdminModal from "@/components/admin/AdminModal";

export default function AdminWargaKomunitasPage() {
  const [list, setList] = useState<WargaItem[]>([]);
  const [homepage, setHomepage] = useState<HomepageData | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [hpSaving, setHpSaving] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WargaItem | null>(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    category: "pkk" as WargaItem["category"],
    date: new Date().toISOString().split("T")[0],
    location: "Balai Warga Kampung Gendeng",
    organizer: "Pengurus Warga Gendeng",
    shortDesc: "",
    description: "",
    coverImage: "/images/community_event.png",
    gallery: [] as string[],
    status: "published" as "published" | "draft",
  });

  const loadData = async () => {
    const [data, hp] = await Promise.all([getWargaList(), getHomepageData()]);
    setList(data);
    setHomepage(hp as unknown as HomepageData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      title: "",
      category: "pkk",
      date: new Date().toISOString().split("T")[0],
      location: "Balai Warga Kampung Gendeng",
      organizer: "Pengurus Warga Gendeng",
      shortDesc: "",
      description: "",
      coverImage: "/images/community_event.png",
      gallery: [],
      status: "published",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: WargaItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category,
      date: item.date,
      location: item.location,
      organizer: item.organizer,
      shortDesc: item.shortDesc,
      description: item.description,
      coverImage: item.coverImage,
      gallery: item.gallery || (item.coverImage ? [item.coverImage] : []),
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const finalCover = form.gallery.length > 0 ? form.gallery[0] : form.coverImage;
      const payload = {
        ...form,
        coverImage: finalCover,
        slug,
        gallery: form.gallery,
      };
      if (editingItem) {
        await updateWarga(editingItem.id, payload);
      } else {
        await createWarga(payload);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : (typeof err === "object" ? JSON.stringify(err) : String(err));
      alert("Error saat menyimpan: " + msg);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kegiatan komunitas ini?")) {
      await deleteWarga(id);
      loadData();
    }
  };

  const toggleStatus = async (item: WargaItem) => {
    const newStatus = item.status === "published" ? "draft" : "published";
    await updateWarga(item.id, { status: newStatus });
    loadData();
  };

  const filteredList = list.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-dark tracking-tight">Pengelolaan Warga & Komunitas</h2>
          <p className="text-xs text-medium">Kelola kegiatan PKK, Pemuda, Karang Taruna, Posyandu, dan agenda warga.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-primary hover:bg-primary-hover active-press text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-ios transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>+ Tambah Kegiatan Warga</span>
        </button>
      </div>

      {homepage && (
        <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-ios space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider">Gambar Latar Hero (Atas)</h3>
            <button
              onClick={async () => {
                setHpSaving(true);
                await updateHomepageData(homepage);
                setHpSaving(false);
                alert("Gambar hero berhasil disimpan!");
              }}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full font-extrabold text-[10px] uppercase shadow-sm transition-all"
            >
              {hpSaving ? "Menyimpan..." : "Simpan Gambar"}
            </button>
          </div>
          <div>
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
                      setHomepage({ ...homepage, heroImageWarga: url });
                    } catch (err: unknown) {
                      console.error(err);
                      alert("Gagal mengunggah gambar hero");
                    }
                  }
                }}
                className="text-xs text-medium file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-extrabold file:bg-tint file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
              <input
                type="text"
                value={homepage.heroImageWarga || ""}
                onChange={(e) => setHomepage({ ...homepage, heroImageWarga: e.target.value })}
                className="w-full px-4 py-2 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
                placeholder="Atau masukkan URL gambar..."
              />
            </div>
            {homepage.heroImageWarga && (
              <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={homepage.heroImageWarga} alt="Preview Hero" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className="bg-white rounded-3xl border border-gray-200/70 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Cari judul kegiatan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary bg-white"
        >
          <option value="all">Semua Kategori</option>
          <option value="pkk">PKK</option>
          <option value="pemuda">Pemuda</option>
          <option value="rw-rt">RW & RT</option>
          <option value="karang-taruna">Karang Taruna</option>
          <option value="posyandu">Posyandu</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl border border-gray-200/70 shadow-ios overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-medium font-extrabold">Memuat data kegiatan...</div>
        ) : filteredList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-medium uppercase font-extrabold bg-gray-50/80">
                  <th className="py-3 px-4">Nama Kegiatan</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Waktu & Lokasi</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60">
                    <td className="py-3.5 px-4 font-extrabold text-dark max-w-xs truncate">{item.title}</td>
                    <td className="py-3.5 px-4">
                      <span className="uppercase text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-tint text-primary">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-medium">
                      <div>{item.date}</div>
                      <div className="text-[10px] text-gray-400">{item.location}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleStatus(item)}
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all ${
                          item.status === "published"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {item.status === "published" ? "Diterbitkan" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-primary hover:underline font-extrabold px-2 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:underline font-extrabold px-2 py-1"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-medium">Belum ada kegiatan ditemukan.</div>
        )}
      </div>

      {/* Modal Form */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Kegiatan Warga" : "Tambah Kegiatan Warga Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Nama Kegiatan</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
              placeholder="Contoh: Senam Sehat Lansia & Posyandu"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as WargaItem["category"] })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary bg-white"
              >
                <option value="pkk">PKK</option>
                <option value="pemuda">Pemuda</option>
                <option value="rw-rt">RW & RT</option>
                <option value="karang-taruna">Karang Taruna</option>
                <option value="posyandu">Posyandu</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Status Publikasi</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "published" | "draft" })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary bg-white"
              >
                <option value="published">Diterbitkan (Published)</option>
                <option value="draft">Draft (Simpan Sementara)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Waktu Pelaksanaan</label>
              <input
                type="text"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
                placeholder="Contoh: 15 Juni 2026"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Penyelenggara / Komunitas</label>
              <input
                type="text"
                value={form.organizer}
                onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
                placeholder="Contoh: Tim Penggerak PKK RW 05"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Lokasi Kegiatan</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
              placeholder="Contoh: Balai Warga Kampung Gendeng"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Deskripsi Singkat (Ringkasan Kartu)</label>
            <input
              type="text"
              value={form.shortDesc}
              onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
              placeholder="Uraian singkat 1-2 kalimat..."
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Deskripsi Lengkap Kegiatan</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
              placeholder="Ceritakan detail kegiatan selengkap-lengkapnya di sini..."
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Galeri Foto (Maks 4)</label>
            <div className="flex flex-col gap-3">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  if (!files.length) return;
                  try {
                    const { uploadImageFile } = await import("@/lib/upload");
                    const newUrls = await Promise.all(files.slice(0, 4 - form.gallery.length).map(f => uploadImageFile(f)));
                    setForm({ ...form, gallery: [...form.gallery, ...newUrls].slice(0, 4) });
                  } catch (err: unknown) {
                    console.error(err);
                    alert("Gagal mengunggah gambar");
                  }
                }}
                className="text-xs text-medium file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-extrabold file:bg-tint file:text-primary hover:file:bg-primary/20 cursor-pointer"
                disabled={form.gallery.length >= 4}
              />
            </div>
            {form.gallery.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {form.gallery.map((url, idx) => (
                  <div key={idx} className="relative w-24 h-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                    <img src={url} alt={`Preview ${idx+1}`} className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setForm({...form, gallery: form.gallery.filter((_, i) => i !== idx)})}
                      className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-medium hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover active-press text-white px-6 py-2.5 rounded-full text-xs font-extrabold shadow-ios"
            >
              {editingItem ? "Simpan Perubahan" : "Tambah Kegiatan"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
