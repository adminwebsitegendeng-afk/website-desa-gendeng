"use client";

import { useState, useEffect } from "react";
import { MapLocation } from "@/lib/admin/types";
import { getMapLocations, addMapLocation, updateMapLocation, deleteMapLocation } from "@/lib/admin/services/adminService";
import AdminModal from "@/components/admin/AdminModal";
import MapViewer from "@/components/MapViewer";

export default function PetaDesaAdmin() {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoc, setEditingLoc] = useState<MapLocation | null>(null);

  const [form, setForm] = useState<{name: string; category: string; description: string; lat: number; lng: number}>({
    name: "", category: "Fasilitas Umum", description: "", lat: -7.7942, lng: 110.3845
  });

  async function loadData() {
    setLoading(true);
    const data = await getMapLocations();
    setLocations(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingLoc(null);
    setForm({ name: "", category: "Fasilitas Umum", description: "", lat: -7.7942, lng: 110.3845 });
    setIsModalOpen(true);
  };

  const openEditModal = (loc: MapLocation) => {
    setEditingLoc(loc);
    setForm({ name: loc.name, category: loc.category, description: loc.description, lat: loc.lat, lng: loc.lng });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus titik lokasi ini?")) return;
    await deleteMapLocation(id);
    loadData();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLoc) {
      await updateMapLocation(editingLoc.id, form);
    } else {
      await addMapLocation(form);
    }
    setIsModalOpen(false);
    loadData();
  };

  const handleMapClick = (lat: number, lng: number) => {
    setForm({ ...form, lat, lng });
  };

  if (loading) return <div className="p-8 text-center text-sm font-bold text-gray-500">Memuat Peta...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Peta Digital Desa</h1>
          <p className="text-medium text-sm mt-1">Kelola titik lokasi yang tampil di halaman Peta & Kontak.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-hover active-press text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-ios flex items-center gap-2 transition-all"
        >
          <span>➕</span> Tambah Titik
        </button>
      </div>

      {/* Map Preview */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-ios overflow-hidden h-[400px]">
        <MapViewer locations={locations} />
      </div>

      {/* Locations List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-ios overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-dark font-extrabold">
              <tr>
                <th className="px-6 py-4">Nama Lokasi</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Koordinat</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-medium">
              {locations.map((loc) => (
                <tr key={loc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-dark">{loc.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-tint text-primary px-2 py-1 rounded-full text-[10px] font-extrabold uppercase">
                      {loc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">{loc.lat.toFixed(5)}, {loc.lng.toFixed(5)}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => openEditModal(loc)} className="text-blue-500 hover:text-blue-700 font-bold text-xs uppercase tracking-wider">Edit</button>
                    <button onClick={() => handleDelete(loc.id)} className="text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-wider">Hapus</button>
                  </td>
                </tr>
              ))}
              {locations.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Belum ada titik lokasi peta.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingLoc ? "Edit Titik Peta" : "Tambah Titik Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Nama Tempat</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-primary"
                placeholder="Cth: Balai PWKG Gendeng Baciro"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase text-dark mb-1">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-primary bg-white"
              >
                <option value="Fasilitas Umum">Fasilitas Umum</option>
                <option value="Balai Warga">Balai Warga</option>
                <option value="UMKM">UMKM</option>
                <option value="Wisata">Wisata</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Koordinat (Klik Peta untuk Mengisi)</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="any"
                required
                value={form.lat}
                onChange={(e) => setForm({ ...form, lat: parseFloat(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-primary"
                placeholder="Latitude"
              />
              <input
                type="number"
                step="any"
                required
                value={form.lng}
                onChange={(e) => setForm({ ...form, lng: parseFloat(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-primary"
                placeholder="Longitude"
              />
            </div>
          </div>

          {/* Mini map for picking coordinates */}
          <div className="h-[200px] w-full rounded-2xl overflow-hidden border border-gray-200">
             <MapViewer 
               locations={[]} 
               center={form.lat && form.lng ? [form.lat, form.lng] : [-7.7942, 110.3845]} 
               zoom={17}
               onMapClick={handleMapClick} 
             />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-dark mb-1">Deskripsi Singkat (Opsional)</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-primary"
              placeholder="Deskripsi singkat tempat ini..."
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
              {editingLoc ? "Simpan Perubahan" : "Tambah Titik"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
