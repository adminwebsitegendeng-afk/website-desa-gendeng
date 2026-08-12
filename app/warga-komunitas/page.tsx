"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";
import { CommunityCategory } from "@/lib/communityData";
import { getWargaList, subscribeDBChange } from "@/lib/admin/services/adminService";
import { WargaItem } from "@/lib/admin/types";

export default function WargaKomunitasPage() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CommunityCategory>("all");
  const [activities, setActivities] = useState<WargaItem[]>([]);

  const loadData = async () => {
    const data = await getWargaList();
    // Filter only published items
    const published = data.filter((item) => item.status === "published");
    setActivities(published);
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeDBChange(loadData);
    
    return () => {
      unsubscribe();
    };
  }, []);

  const categories: { id: CommunityCategory; label: string }[] = [
    { id: "all", label: tr(t.community.categories.all, lang) },
    { id: "pkk", label: tr(t.community.categories.pkk, lang) },
    { id: "pemuda", label: tr(t.community.categories.pemuda, lang) },
    { id: "rw-rt", label: tr(t.community.categories["rw-rt"], lang) },
    { id: "karang-taruna", label: tr(t.community.categories["karang-taruna"], lang) },
    { id: "posyandu", label: tr(t.community.categories.posyandu, lang) },
    { id: "lainnya", label: tr(t.community.categories.lainnya, lang) },
  ];

  // Case-insensitive & robust category filtering
  const filteredActivities = activeCategory === "all"
    ? activities
    : activities.filter(
        (act) => (act.category || "").toLowerCase() === (activeCategory || "").toLowerCase()
      );

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. Page Hero Banner */}
      <section className="relative w-full min-h-[300px] sm:min-h-[360px] flex items-center justify-start text-white overflow-hidden bg-primary-dark py-12 sm:py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/community_event.png"
            alt="Warga & Komunitas Desa Gendeng"
            fill
            priority
            className="object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-accent font-extrabold text-xs uppercase tracking-wider mb-2">
            <span>🤝</span>
            <span>{tr(t.community.tag, lang)}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-white leading-tight">
            {tr(t.community.title, lang)}
          </h1>
          <p className="text-xs sm:text-base text-white/85 max-w-lg leading-relaxed font-medium">
            {tr(t.community.subtitle, lang)}
          </p>
        </div>
      </section>

      {/* 2. Breadcrumbs & Subheader Section */}
      <section className="py-5 sm:py-6 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-bold mb-5 text-medium">
            <Link href="/" className="hover:text-primary flex items-center gap-1 active-press">
              <span>🏠</span> {tr(t.nav.home, lang)}
            </Link>
            <span>&gt;</span>
            <span className="text-primary">{tr(t.community.title, lang)}</span>
          </nav>

          {/* Subheader info split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center border-b border-gray-100 pb-6 sm:pb-8">
            <div className="lg:col-span-8">
              <p className="text-dark font-semibold text-xs sm:text-sm leading-relaxed">
                {tr(t.community.subtitle, lang)}
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-tint/70 border border-primary/15 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                <div className="text-3xl text-primary flex-shrink-0">👥</div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold text-primary uppercase">
                    {lang === "en" ? "Active Neighborhood Groups" : "Guyub Komunitas Warga"}
                  </span>
                  <span className="text-[10px] text-medium mt-0.5 leading-snug">
                    {lang === "en" ? "Together building a warm, harmonious community" : "Bahu-membahu membangun lingkungan hangat & harmonis"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Grid & Category Filter */}
      <section className="pb-14 sm:pb-20 bg-white flex-grow">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Category Filter Pills (Scrollable on mobile) */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 mb-8 sm:mb-12 -mx-5 px-5 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap active-press transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-ios"
                    : "bg-gray-100 text-medium hover:bg-tint hover:text-primary border border-gray-200/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredActivities.map((act) => {
                const coverImage = act.coverImage && act.coverImage.trim() !== "" ? act.coverImage : "/images/community_event.png";
                return (
                  <div
                    key={act.id}
                    className="bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-ios hover-scale flex flex-col h-full"
                  >
                    {/* Photo Container */}
                    <div className="relative h-56 sm:h-52 w-full bg-primary/5">
                      <Image
                        src={coverImage}
                        alt={act.title || "Kegiatan Warga"}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary font-extrabold text-[11px] px-3 py-1 rounded-full shadow-sm uppercase">
                        {act.category || "Umum"}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-medium mb-2 font-medium">
                          <span>📅</span>
                          <span>{act.date || "TBA"}</span>
                        </div>
                        <h3 className="font-extrabold text-dark text-base sm:text-lg leading-snug mb-2 line-clamp-2">
                          {act.title || "Kegiatan Warga"}
                        </h3>
                        <p className="text-xs text-medium leading-relaxed mb-4 line-clamp-4">
                          {act.shortDesc || act.description || "Agenda kegiatan warga Desa Gendeng."}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[11px] text-primary font-extrabold truncate max-w-[170px]">
                          📍 {act.location || "Kampung Gendeng"}
                        </span>
                        <Link
                          href={`/warga-komunitas/${act.slug || act.id}`}
                          className="inline-flex items-center gap-1 text-xs font-extrabold text-primary hover:text-primary-hover active-press transition-colors"
                        >
                          <span>{tr(t.community.readMore, lang)}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-tint/20 rounded-3xl border border-tint text-medium text-sm font-medium">
              {tr(t.community.noData, lang)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
