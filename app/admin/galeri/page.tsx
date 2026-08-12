"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  getGaleriList,
  createGaleriItem,
  deleteGaleriItem,
} from "@/lib/admin/services/adminService";
import { GaleriItem } from "@/lib/admin/types";
import AdminModal from "@/components/admin/AdminModal";

export default function AdminGaleriPage() {
  const [list, setList] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Kegiatan",
    imageUrl: "/images/community_event.png",
    date: new Date().toISOString().split("T")[0],
    status: "published" as "published" | "draft",
  });

  const loadData = async () => {
    const data = await getGaleriList();
    setList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGaleriItem(form);
    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus foto ini dari galeri?")) {
      await deleteGaleriItem(id);
      loadData();
    }
  };

  const filteredList = categoryFilter === "all"
    ? list
    : list.filter((item) => item.category.toLowerCase() === categoryFilter.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-dark tracking-tight">Pengelolaan Galeri Media</h2>
          <p className="text-xs text-medium">Kelola pustaka dokumentasi foto kegiatan, lanskap desa, dan aset visual.</p>
        </div>
        <button
          onClick={() => {
            setForm({
              title: "",
              category: "Kegiatan",
              imageUrl: "/images/community_event.png",
              date: new Date().toISOString().split("T")[0],
              status: "published",
            });
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-primary-hover active-press text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-ios transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>+ Unggah Foto Baru</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["all", "Kegiatan", "Budaya", "Lingkungan", "UMKM"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all whitespace-nowrap ${
              categoryFilter === cat
                ? "bg-primary text-white shadow-ios"
                : "bg-white text-medium hover:bg-tint hover:text-primary border border-gray-200"
            }`}
          >
            {cat === "all" ? "Semua Foto" : cat}
          </button>
        ))}
      </div>

      {/* Image Gallery Grid */}
      {loading ? (
        <div className="p-8 text-center text-xs text-medium font-extrabold">Memuat galeri foto...</div>
      ) : filteredList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-ios flex flex-col group"
            >
              <div className="relative h-48 w-full bg-primary/5">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  {item.category}
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-dark text-xs truncate max-w-[180px]">{item.title}</h4>
                  <span className="text-[10px] text-medium block">{item.date}</span>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-extrabold p-2"
                  title="Hapus foto"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-xs text-medium bg-white rounded-3xl border border-gray-200">
          Belum ada foto dalam kategori ini.
        </div>
      )}

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Unggah Foto Media Baru"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Judul / Keterangan Foto</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
              placeholder="Contoh: Suasana Gotong Royong Warga"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Kategori Foto</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary bg-white"
            >
              <option value="Kegiatan">Kegiatan</option>
              <option value="Budaya">Budaya</option>
              <option value="Lingkungan">Lingkungan</option>
              <option value="UMKM">UMKM</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Unggah Berkas Foto</label>
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
                      setForm({ ...form, imageUrl: url });
                    } catch (err: unknown) {
                      const msg = err instanceof Error ? err.message : "Gagal mengunggah foto";
                      alert(msg);
                    }
                  }
                }}
                className="text-xs text-medium file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-extrabold file:bg-tint file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
              <input
                type="text"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full px-4 py-2 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
                placeholder="Atau masukan URL foto..."
              />
            </div>
            {form.imageUrl && (
              <div className="mt-2 relative w-32 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
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
              Simpan Foto
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
