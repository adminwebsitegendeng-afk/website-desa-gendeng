"use client";

import { useState, useEffect } from "react";
import {
  getPotensiList,
  createPotensi,
  updatePotensi,
  deletePotensi,
} from "@/lib/admin/services/adminService";
import { PotensiItem } from "@/lib/admin/types";
import AdminModal from "@/components/admin/AdminModal";

export default function AdminPotensiEkonomiPage() {
  const [list, setList] = useState<PotensiItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PotensiItem | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "UMKM Unggulan",
    ownerOrLoc: "Gendeng, Yogyakarta",
    description: "",
    coverImage: "/images/potensi_crafts.png",
    status: "published" as "published" | "draft",
  });

  const loadData = async () => {
    const data = await getPotensiList();
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
      category: "UMKM Unggulan",
      ownerOrLoc: "Gendeng, Yogyakarta",
      description: "",
      coverImage: "/images/potensi_crafts.png",
      status: "published",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: PotensiItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category,
      ownerOrLoc: item.ownerOrLoc,
      description: item.description,
      coverImage: item.coverImage,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (editingItem) {
      await updatePotensi(editingItem.id, { ...form, slug });
    } else {
      await createPotensi({ ...form, slug });
    }
    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus potensi UMKM ini?")) {
      await deletePotensi(id);
      loadData();
    }
  };

  const toggleStatus = async (item: PotensiItem) => {
    const newStatus = item.status === "published" ? "draft" : "published";
    await updatePotensi(item.id, { status: newStatus });
    loadData();
  };

  const filteredList = list.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-dark tracking-tight">Pengelolaan Potensi & Ekonomi</h2>
          <p className="text-xs text-medium">Kelola usaha UMKM, produk lokal unggulan, kerajinan, dan jasa warga.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-primary hover:bg-primary-hover active-press text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-ios transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>+ Tambah UMKM / Produk</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/70 p-4 shadow-sm">
        <input
          type="text"
          placeholder="Cari nama produk UMKM atau usaha..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/70 shadow-ios overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-medium font-extrabold">Memuat data potensi ekonomi...</div>
        ) : filteredList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-medium uppercase font-extrabold bg-gray-50/80">
                  <th className="py-3 px-4">Nama Produk / Usaha</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Pemilik / Lokasi</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60">
                    <td className="py-3.5 px-4 font-extrabold text-dark max-w-xs truncate">{item.title}</td>
                    <td className="py-3.5 px-4 text-medium">{item.category}</td>
                    <td className="py-3.5 px-4 text-medium">{item.ownerOrLoc}</td>
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
          <div className="p-8 text-center text-xs text-medium">Belum ada potensi UMKM ditemukan.</div>
        )}
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Produk UMKM" : "Tambah Produk UMKM Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Nama Produk / Usaha</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
              placeholder="Contoh: Keripik Tempe Renyah Gendeng"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Kategori Usaha</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary bg-white"
              >
                <option value="UMKM Unggulan">UMKM Unggulan</option>
                <option value="Makanan & Minuman">Makanan & Minuman</option>
                <option value="Kerajinan">Kerajinan & Kriya</option>
                <option value="Perdagangan & Jasa">Perdagangan & Jasa</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Pemilik / Lokasi</label>
              <input
                type="text"
                required
                value={form.ownerOrLoc}
                onChange={(e) => setForm({ ...form, ownerOrLoc: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
                placeholder="Gendeng, Yogyakarta"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Deskripsi Produk</label>
            <textarea
              rows={4}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary"
              placeholder="Jelaskan keunggulan dan spesifikasi produk ini..."
            />
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
              {editingItem ? "Simpan Perubahan" : "Tambah Produk"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
