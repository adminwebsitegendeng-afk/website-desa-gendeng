"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";
import { getWisataList, subscribeDBChange } from "@/lib/admin/services/adminService";
import { WisataItem } from "@/lib/admin/types";

export default function WisataBudaya() {
  const { lang } = useLanguage();
  const [wisataList, setWisataList] = useState<WisataItem[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getWisataList();
      setWisataList(data.filter((item) => item.status === "published"));
    }
    loadData();
    const unsubscribe = subscribeDBChange(loadData);
    return () => unsubscribe();
  }, []);

  const destinations = wisataList.map((item) => ({
    title: item.title,
    desc: item.description,
    loc: item.location,
    image: item.coverImage,
  }));

  const calendarEvents = [
    { month: "JUN", date: "15", title: lang === "en" ? "Gunungan Festival" : "Tradisi Gunungan", desc: "June 2025" },
    { month: "AUG", date: "17", title: lang === "en" ? "Independence Day Celebration" : "Peringatan HUT RI Desa Gendeng", desc: "17 August 2025" },
    { month: "SEP", date: "10", title: lang === "en" ? "Grand Cultural Gathering" : "Pengajian Akbar", desc: "10 September 2025" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. Hero Page Banner */}
      <section className="relative w-full min-h-[300px] sm:min-h-[360px] flex items-center justify-start text-white overflow-hidden bg-primary-dark py-12 sm:py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/community_event.png"
            alt="Wisata & Budaya Desa Gendeng"
            fill
            priority
            className="object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-accent font-extrabold text-xs uppercase tracking-wider mb-2">
            <span>🎭</span>
            <span>{tr(t.wisata.tag, lang)}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-white leading-tight">
            {tr(t.wisata.title, lang)}
          </h1>
          <p className="text-xs sm:text-base text-white/85 max-w-lg leading-relaxed font-medium">
            {tr(t.wisata.subtitle, lang)}
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
            <span className="text-primary">{tr(t.nav.wisata, lang)}</span>
          </nav>

          {/* Subheader info split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center border-b border-gray-100 pb-6 sm:pb-8">
            <div className="lg:col-span-8">
              <p className="text-dark font-semibold text-xs sm:text-sm leading-relaxed">
                {tr(t.wisata.subtitle, lang)}
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-tint/70 border border-primary/15 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                <div className="text-3xl text-primary flex-shrink-0">🤝</div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold text-primary uppercase">{tr(t.wisata.alertBadge, lang)}</span>
                  <span className="text-[10px] text-medium mt-0.5 leading-snug">{tr(t.wisata.alertSub, lang)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section Destinasi & Daya Tarik */}
      <section className="pb-14 sm:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-extrabold text-dark flex items-center gap-2">
              <span className="text-primary text-base">📍</span>
              <span>Destinasi & Daya Tarik</span>
            </h2>
          </div>

          {/* Destinations Carousel/Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {destinations.map((dest, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-ios hover-scale flex flex-col h-full"
              >
                <div className="relative h-56 sm:h-52 w-full bg-primary/5">
                  <Image src={dest.image} alt={dest.title} fill className="object-cover" />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-dark text-base leading-tight mb-2">
                      {dest.title}
                    </h3>
                    <p className="text-xs text-medium leading-relaxed mb-4">
                      {dest.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-extrabold pt-3 border-t border-gray-100">
                    <span>📍</span> {dest.loc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section Budaya & Tradisi / Event Calendar Split */}
      <section className="py-14 sm:py-20 bg-tint/30 border-t border-tint/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            
            {/* Left Column: Budaya & Tradisi Card */}
            <div className="lg:col-span-7 flex flex-col">
              <h2 className="text-base sm:text-lg font-extrabold text-dark flex items-center gap-2 mb-4 sm:mb-6">
                <span className="text-primary text-base">👥</span>
                <span>Budaya & Tradisi</span>
              </h2>

              <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-ios flex flex-col h-full">
                <div className="relative h-56 sm:h-64 w-full bg-primary/5">
                  <Image src="/images/community_event.png" alt="Tradisi Gunungan" fill className="object-cover" />
                </div>
                <div className="p-5 sm:p-6">
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Tradisi Unggulan
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-dark mt-3 mb-2">
                    Tradisi Gunungan
                  </h3>
                  <p className="text-xs text-medium leading-relaxed mb-6">
                    Tradisi tahunan sebagai bentuk rasa syukur kepada Tuhan Yang Maha Esa, Gunungan berisi hasil bumi dan makanan yang kemudian dibagikan kepada masyarakat sebagai simbol kebersamaan dan keberkahan.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="w-2.5 h-2.5 rounded-full bg-tint" />
                      <span className="w-2.5 h-2.5 rounded-full bg-tint" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Calendar Events */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-extrabold text-dark flex items-center gap-2">
                  <span className="text-primary text-base">📅</span>
                  <span>Kalender Event Budaya</span>
                </h2>
              </div>

              {/* Events list */}
              <div className="flex flex-col gap-3.5">
                {calendarEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-4 border border-gray-200/70 shadow-ios flex items-center gap-4 hover-scale cursor-pointer group"
                  >
                    {/* Date capsule widget */}
                    <div className="w-14 h-14 bg-tint/80 rounded-2xl flex flex-col items-center justify-center border border-primary/15 flex-shrink-0">
                      <span className="text-[10px] font-extrabold text-primary uppercase leading-none">{evt.month}</span>
                      <span className="text-lg font-extrabold text-primary leading-none mt-1">{evt.date}</span>
                    </div>
                    {/* Event info */}
                    <div className="flex-grow">
                      <h4 className="font-extrabold text-dark text-xs sm:text-sm leading-snug group-hover:text-primary transition-colors">
                        {evt.title}
                      </h4>
                      <p className="text-[11px] text-medium mt-1">{evt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
