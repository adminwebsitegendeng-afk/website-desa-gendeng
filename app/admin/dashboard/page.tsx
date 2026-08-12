"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDashboardStats, getWargaList } from "@/lib/admin/services/adminService";
import { DashboardStats, WargaItem } from "@/lib/admin/types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<WargaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, wargaData] = await Promise.all([
          getDashboardStats(),
          getWargaList(),
        ]);
        setStats(statsData);
        setRecentActivities(wargaData.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-medium text-xs font-extrabold">
        Memuat Ringkasan Dashboard CMS...
      </div>
    );
  }

  const statCards = [
    { label: "Kegiatan Warga", value: stats?.totalKegiatan || 0, icon: "🤝", href: "/admin/warga-komunitas", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Wisata & Budaya", value: stats?.totalWisata || 0, icon: "🎭", href: "/admin/wisata-budaya", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { label: "Potensi & UMKM", value: stats?.totalPotensi || 0, icon: "🛍️", href: "/admin/potensi-ekonomi", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: "Galeri Foto Media", value: stats?.totalGaleri || 0, icon: "🖼️", href: "/admin/galeri", color: "bg-teal-50 text-teal-700 border-teal-200" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-primary-dark text-white rounded-3xl p-6 sm:p-8 shadow-ios-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="inline-block bg-white/15 text-accent text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Selamat Datang di Panel CMS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Pusat Pengelolaan Konten Desa Gendeng
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
            Kelola profil desa, agenda warga, produk UMKM, destinasi wisata, dan galeri media publik secara terpadu.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="bg-accent hover:bg-amber-400 text-primary font-extrabold text-xs px-5 py-3 rounded-full shadow-ios active-press transition-all flex-shrink-0"
        >
          Pratinjau Website Publik →
        </Link>
      </div>

      {/* Overview Stat Cards Grid */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-medium mb-4">
          Statistik Konten Website
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {statCards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className={`p-5 rounded-3xl border ${card.color} shadow-sm hover:shadow-ios transition-all flex flex-col justify-between active-press`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{card.icon}</span>
                <span className="text-2xl font-extrabold tracking-tight">{card.value}</span>
              </div>
              <span className="text-xs font-extrabold mt-3 block">{card.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-ios">
        <h3 className="text-sm font-extrabold text-dark uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>🚀</span>
          <span>Tindakan Cepat (Quick Actions)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/admin/warga-komunitas"
            className="p-4 rounded-2xl bg-tint/50 border border-primary/15 hover:bg-tint text-primary font-extrabold text-xs flex items-center justify-between transition-all"
          >
            <span>+ Tambah Kegiatan Warga</span>
            <span>→</span>
          </Link>
          <Link
            href="/admin/wisata-budaya"
            className="p-4 rounded-2xl bg-tint/50 border border-primary/15 hover:bg-tint text-primary font-extrabold text-xs flex items-center justify-between transition-all"
          >
            <span>+ Tambah Wisata/Budaya</span>
            <span>→</span>
          </Link>
          <Link
            href="/admin/potensi-ekonomi"
            className="p-4 rounded-2xl bg-tint/50 border border-primary/15 hover:bg-tint text-primary font-extrabold text-xs flex items-center justify-between transition-all"
          >
            <span>+ Tambah Produk UMKM</span>
            <span>→</span>
          </Link>
          <Link
            href="/admin/galeri"
            className="p-4 rounded-2xl bg-tint/50 border border-primary/15 hover:bg-tint text-primary font-extrabold text-xs flex items-center justify-between transition-all"
          >
            <span>🖼️ Unggah Foto Galeri</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Recent Content Table: Kegiatan Warga Terbaru */}
      <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-ios">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-extrabold text-dark tracking-tight flex items-center gap-2">
            <span>🤝</span>
            <span>Kegiatan Warga Terbaru</span>
          </h3>
          <Link href="/admin/warga-komunitas" className="text-xs font-extrabold text-primary hover:underline">
            Kelola Semua Kegiatan →
          </Link>
        </div>

        {recentActivities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-medium uppercase font-extrabold">
                  <th className="py-3 px-4">Nama Kegiatan</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Penyelenggara</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {recentActivities.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80">
                    <td className="py-3.5 px-4 font-extrabold text-dark max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="py-3.5 px-4 text-medium uppercase font-bold">{item.category}</td>
                    <td className="py-3.5 px-4 text-medium">{item.date}</td>
                    <td className="py-3.5 px-4 text-medium">{item.organizer}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          item.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status === "published" ? "Diterbitkan" : "Draft"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-medium">Belum ada kegiatan terbaru.</div>
        )}
      </div>
    </div>
  );
}
