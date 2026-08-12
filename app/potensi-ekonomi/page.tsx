"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";
import { getPotensiList, subscribeDBChange } from "@/lib/admin/services/adminService";
import { PotensiItem } from "@/lib/admin/types";

type CategoryFilter =
  | "Semua"
  | "UMKM Unggulan"
  | "Perdagangan"
  | "Jasa"
  | "Ekonomi Kreatif"
  | "Pertanian Perkotaan"
  | "Lainnya";

export default function PotensiEkonomi() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Semua");
  const [productList, setProductList] = useState<PotensiItem[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getPotensiList();
      setProductList(data.filter((item) => item.status === "published"));
    }
    loadData();
    const unsubscribe = subscribeDBChange(loadData);
    return () => unsubscribe();
  }, []);

  const categories: CategoryFilter[] = [
    "Semua",
    "UMKM Unggulan",
    "Perdagangan",
    "Jasa",
    "Ekonomi Kreatif",
    "Pertanian Perkotaan",
    "Lainnya",
  ];

  const products = productList.map((item) => ({
    title: item.title,
    cat: item.category,
    desc: item.description,
    loc: item.ownerOrLoc,
    image: item.coverImage,
    slug: item.slug,
  }));

  // Filtering simulation logic
  const filteredProducts = activeCategory === "Semua"
    ? products
    : products.filter(
        (p) =>
          p.cat === activeCategory ||
          (activeCategory === "UMKM Unggulan" && (p.cat === "Makanan & Minuman" || p.cat === "Kerajinan"))
      );

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. Page Header */}
      <section className="relative w-full min-h-[300px] sm:min-h-[360px] flex items-center justify-start text-white overflow-hidden bg-primary-dark py-12 sm:py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/community_event.png"
            alt="Potensi & Ekonomi Desa Gendeng"
            fill
            priority
            className="object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-accent font-extrabold text-xs uppercase tracking-wider mb-2">
            <span>🛍️</span>
            <span>{tr(t.potensi.tag, lang)}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-white leading-tight">
            {tr(t.potensi.title, lang)}
          </h1>
          <p className="text-xs sm:text-base text-white/85 max-w-xl leading-relaxed font-medium">
            {tr(t.potensi.subtitle, lang)}
          </p>
        </div>
      </section>

      {/* 2. Breadcrumbs & Alert Banner Section */}
      <section className="py-5 sm:py-6 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-bold mb-5 text-medium">
            <Link href="/" className="hover:text-primary flex items-center gap-1 active-press">
              <span>🏠</span> {tr(t.nav.home, lang)}
            </Link>
            <span>&gt;</span>
            <span className="text-primary">{tr(t.nav.potensi, lang)}</span>
          </nav>

          {/* Subheader Alert Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center border-b border-gray-100 pb-6 sm:pb-8">
            <div className="lg:col-span-8">
              <p className="text-dark font-semibold text-xs sm:text-sm leading-relaxed">
                {tr(t.potensi.subtitle, lang)}
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-tint/70 border border-primary/15 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                <div className="text-3xl text-primary flex-shrink-0">🛍️</div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold text-primary uppercase">{tr(t.potensi.alertBadge, lang)}</span>
                  <span className="text-[10px] text-medium mt-0.5 leading-snug">{tr(t.potensi.alertSub, lang)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main content tabs & Split Layout grid */}
      <section className="pb-14 sm:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Categories Pills (Scrollable on mobile) */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 mb-8 sm:mb-12 -mx-5 px-5 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap active-press transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-ios"
                    : "bg-gray-100 text-medium hover:bg-tint hover:text-primary border border-gray-200/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side list of products */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base sm:text-lg font-extrabold text-dark tracking-tight">
                  {activeCategory === "Semua" ? "UMKM Unggulan" : activeCategory}
                </h2>
                <span className="text-xs font-extrabold text-primary bg-tint px-3 py-1 rounded-full">
                  {filteredProducts.length} Produk
                </span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {filteredProducts.map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-ios flex flex-col h-full hover-scale"
                    >
                      <div className="relative h-56 sm:h-52 w-full bg-primary/5">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-extrabold text-dark text-base leading-tight mb-1">
                            {p.title}
                          </h3>
                          <span className="text-[10px] text-primary font-extrabold uppercase tracking-wider block mb-2">
                            {p.cat}
                          </span>
                          <p className="text-xs text-medium leading-relaxed mb-4 line-clamp-4">
                            {p.desc}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="flex items-center gap-1.5 text-xs text-medium font-medium truncate max-w-[140px]">
                            📍 {p.loc}
                          </span>
                          <Link
                            href={`/potensi-ekonomi/${p.slug}`}
                            className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary hover:text-primary-hover active-press uppercase tracking-wider"
                          >
                            Baca &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-tint/30 rounded-3xl border border-dashed border-primary/20 p-6">
                  <span className="text-3xl">📦</span>
                  <h3 className="text-sm font-bold text-dark mt-3">Belum ada potensi terdaftar</h3>
                  <p className="text-xs text-medium mt-1">Kami sedang menyusun basis data untuk kategori ini.</p>
                </div>
              )}
            </div>

            {/* Right side statistical summary card */}
            <div className="lg:col-span-4 bg-white border border-gray-200/70 rounded-3xl shadow-ios p-6">
              <h3 className="font-extrabold text-dark text-base border-b border-gray-100 pb-4 mb-6">
                Ringkasan Potensi Ekonomi
              </h3>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏪</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold text-dark">Total UMKM</span>
                      <span className="text-[10px] text-medium">Unit Usaha Terdaftar</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-primary">128</span>
                    <span className="text-[10px] text-medium ml-1">Usaha</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👥</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold text-dark">Tenaga Kerja</span>
                      <span className="text-[10px] text-medium">Pekerja Lokal Terserap</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-primary">356</span>
                    <span className="text-[10px] text-medium ml-1">Orang</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold text-dark">Sektor Dominan</span>
                      <span className="text-[10px] text-medium">Sektor Perekonomian</span>
                    </div>
                  </div>
                  <div className="text-right max-w-[140px]">
                    <span className="text-[10px] font-extrabold text-primary block leading-tight">Makanan, Kerajinan</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🤝</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold text-dark">Kemitraan Aktif</span>
                      <span className="text-[10px] text-medium">Koperasi & Swasta</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-primary">12</span>
                    <span className="text-[10px] text-medium ml-1">Mitra</span>
                  </div>
                </div>
              </div>

              <Link
                href="/statistik-desa"
                className="mt-8 block text-center border border-primary bg-tint/40 text-primary hover:bg-primary hover:text-white active-press py-3 rounded-2xl text-xs font-extrabold transition-all duration-200"
              >
                Lihat Statistik Lengkap →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
