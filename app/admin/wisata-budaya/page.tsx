"use client";

import { useState, useEffect } from "react";
import {
  getWisataList,
  createWisata,
  updateWisata,
  deleteWisata,
} from "@/lib/admin/services/adminService";
import { WisataItem } from "@/lib/admin/types";
import AdminModal from "@/components/admin/AdminModal";

export default function AdminWisataBudayaPage() {
  const [list, setList] = useState<WisataItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WisataItem | null>(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    category: "Ekowisata",
    location: "Gendeng, Gondokusuman",
    description: "",
    coverImage: "/images/hero_village.png",
    gallery: [] as string[],
    status: "published" as "published" | "draft",
  });

  const loadData = async () => {
    const data = await getWisataList();
    setList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      title: "",
      category: "Ekowisata",
      location: "Gendeng, Gondokusuman",
      description: "",
      coverImage: "/images/hero_village.png",
      gallery: [],
      status: "published",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: WisataItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category,
      location: item.location,
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
        await updateWisata(editingItem.id, payload);
      } else {
        await createWisata(payload);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : (typeof err === "object" ? JSON.stringify(err) : String(err));
      alert("Error: " + msg);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus destinasi wisata ini?")) {
      await deleteWisata(id);
      loadData();
    }
  };

  const toggleStatus = async (item: WisataItem) => {
    const newStatus = item.status === "published" ? "draft" : "published";
    await updateWisata(item.id, { status: newStatus });
    loadData();
  };

  const filteredList = list.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-dark tracking-tight">Pengelolaan Wisata & Budaya</h2>
          <p className="text-xs text-medium">Kelola destinasi wisata lokal, atraksi seni, dan tradisi kebudayaan desa.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-primary hover:bg-primary-hover active-press text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-ios transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>+ Tambah Wisata Baru</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/70 p-4 shadow-sm">
        <input
          type="text"
          placeholder="Cari destinasi wisata..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/70 shadow-ios overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-medium font-extrabold">Memuat data wisata...</div>
        ) : filteredList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-medium uppercase font-extrabold bg-gray-50/80">
                  <th className="py-3 px-4">Destinasi / Tradisi</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Lokasi</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60">
                    <td className="py-3.5 px-4 font-extrabold text-dark max-w-xs truncate">{item.title}</td>
                    <td className="py-3.5 px-4 text-medium">{item.category}</td>
                    <td className="py-3.5 px-4 text-medium">{item.location}</td>
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
          <div className="p-8 text-center text-xs text-medium">Belum ada wisata ditemukan.</div>
        )}
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Wisata / Budaya" : "Tambah Wisata / Budaya Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Nama Destinasi / Tradisi</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
              placeholder="Contoh: Lorong Mural & Taman Gendeng"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary bg-white"
              >
                <option value="Ekowisata">Ekowisata</option>
                <option value="Seni Budaya">Seni Budaya</option>
                <option value="Fasilitas Umum">Fasilitas Umum</option>
                <option value="Kulinari">Kulinari Tradisional</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Lokasi</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
                placeholder="Gendeng, Gondokusuman"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Deskripsi Uraian</label>
            <textarea
              rows={4}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
              placeholder="Jelaskan daya tarik destinasi ini..."
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
              {editingItem ? "Simpan Perubahan" : "Tambah Wisata"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
