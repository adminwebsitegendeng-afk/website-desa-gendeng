"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";
import { getHomepageData, getProfilData, getWargaList, getWisataList, getPotensiList, subscribeDBChange } from "@/lib/admin/services/adminService";
import { HomepageData, ProfilData, WargaItem, WisataItem, PotensiItem } from "@/lib/admin/types";

export default function Home() {
  const { lang } = useLanguage();

  const [homepage, setHomepage] = useState<HomepageData | null>(null);
  const [profil, setProfil] = useState<ProfilData | null>(null);
  const [activities, setActivities] = useState<WargaItem[]>([]);
  const [wisata, setWisata] = useState<WisataItem[]>([]);
  const [potensi, setPotensi] = useState<PotensiItem[]>([]);

  useEffect(() => {
    async function loadCMSData() {
      const [hp, pr, wg, ws, pt] = await Promise.all([
        getHomepageData(),
        getProfilData(),
        getWargaList(),
        getWisataList(),
        getPotensiList(),
      ]);
      setHomepage(hp as unknown as HomepageData);
      setProfil(pr);
      setActivities(wg.filter((item) => item.status === "published"));
      setWisata(ws.filter((item) => item.status === "published"));
      setPotensi(pt.filter((item) => item.status === "published"));
    }
    loadCMSData();
    const unsubscribe = subscribeDBChange(loadCMSData);
    return () => unsubscribe();
  }, []);

  const defaultHighlights = [
    { title: tr(t.home.hl1Title, lang), desc: tr(t.home.hl1Desc, lang), image: "/images/hero_village.png", icon: "🌾" },
    { title: tr(t.home.hl2Title, lang), desc: tr(t.home.hl2Desc, lang), image: "/images/potensi_crafts.png", icon: "🛍️" },
    { title: tr(t.home.hl3Title, lang), desc: tr(t.home.hl3Desc, lang), image: "/images/community_event.png", icon: "🎭" },
    { title: tr(t.home.hl4Title, lang), desc: tr(t.home.hl4Desc, lang), image: "/images/wisata_waterfall.png", icon: "⛰️" },
  ];

  const highlights = homepage?.highlights?.length ? homepage.highlights.map(hl => {
    if (hl.type === "warga") {
      const act = activities.find(a => a.id === hl.id);
      if (act) return { title: act.title, desc: act.shortDesc || act.description, image: act.coverImage, icon: hl.icon };
    } else if (hl.type === "wisata") {
      const ws = wisata.find(a => a.id === hl.id);
      if (ws) return { title: ws.title, desc: ws.description, image: ws.coverImage, icon: hl.icon };
    } else if (hl.type === "potensi") {
      const pt = potensi.find(a => a.id === hl.id);
      if (pt) return { title: pt.title, desc: pt.description, image: pt.coverImage, icon: hl.icon };
    }
    
    // Fallback if custom or data not found
    return {
      title: hl.customTitle || "Highlight",
      desc: hl.customDesc || "-",
      image: hl.customImage || "/images/hero_village.png",
      icon: hl.icon || "✨"
    };
  }) : defaultHighlights;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-center justify-start text-white overflow-hidden bg-primary-dark py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={homepage?.heroImage || "/images/community_event.png"}
            alt="Kegiatan Guyub Desa Gendeng"
            fill
            priority
            className="object-cover object-[center_30%] sm:object-center opacity-95 scale-100"
          />
          {/* Subtle dark green gradient overlay on the left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 via-primary-dark/35 to-transparent z-1 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full text-left">
          <div className="max-w-2xl">
            <span className="text-white/90 text-xs sm:text-lg md:text-xl font-semibold tracking-wide block mb-1">
              {homepage?.heroWelcome || tr(t.home.heroWelcome, lang)}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              Kampung <span className="text-accent font-extrabold">Gendeng</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl font-bold text-white mb-3 leading-snug">
              {homepage?.heroTagline || tr(t.home.heroTagline, lang)}
            </p>
            <p className="text-xs sm:text-sm text-white/85 font-medium leading-relaxed mb-8 max-w-lg">
              {homepage?.heroDesc || tr(t.home.heroDesc, lang)}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/profil-desa"
                className="bg-primary hover:bg-primary-hover active-press text-white px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-extrabold shadow-ios transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>🔍</span>
                <span>{tr(t.home.heroExplore, lang)}</span>
              </Link>
              <button
                onClick={() => alert("Simulasi memutar video profil desa...")}
                className="border border-white/40 bg-white/10 hover:bg-white/20 active-press backdrop-blur-md text-white px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span>▶</span>
                <span>{tr(t.home.heroVideo, lang)}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sambutan Kepala Desa Section */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Portrait Image container */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[260px] sm:max-w-xs aspect-square rounded-3xl overflow-hidden shadow-ios-lg border-4 border-tint">
                <Image
                  src="/images/kades_portrait.png"
                  alt="Kepala Desa Gendeng"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Speeches and content */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-primary font-extrabold text-xs uppercase tracking-wider mb-3 px-3 py-1 bg-tint rounded-full">
                <span>🍃</span>
                <span>{profil?.greetingTitle || tr(t.home.greetTitle, lang)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight leading-tight">
                {tr(t.home.greetHeadline, lang)}
              </h2>
              <div className="text-medium text-xs sm:text-sm leading-relaxed mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                <p>{profil?.greetingMessage || tr(t.home.greetBody1, lang)}</p>
                <p>{tr(t.home.greetBody2, lang)}</p>
              </div>
              <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="font-extrabold text-dark text-sm sm:text-base">
                  {profil?.greetingName || tr(t.home.greetSig, lang)}
                </p>
                <span className="text-xs text-medium font-semibold">{profil?.greetingRole || "Ketua RW 05 Kampung Gendeng"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Highlight Section: Potensi Utama */}
      <section className="py-14 sm:py-20 bg-tint/40 border-t border-tint/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-primary font-extrabold text-xs uppercase tracking-wider mb-2 px-3 py-1 bg-white rounded-full border border-gray-200/60">
              <span>🍃</span>
              <span>{tr(t.home.highlightTag, lang)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
              {tr(t.home.highlightH2, lang)}
            </h2>
          </div>

          {/* Highlights Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {highlights.map((hl, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-ios flex flex-col h-full hover-scale"
              >
                {/* Visual Image half */}
                <div className="relative h-56 sm:h-52 w-full bg-primary/5">
                  <Image
                    src={hl.image}
                    alt={hl.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Contents + Circle Icon half */}
                <div className="p-5 pt-8 relative flex-grow flex flex-col">
                  {/* Circular icon popping up between sections */}
                  <div className="absolute -top-6 left-5 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white text-xl border-4 border-white shadow-ios">
                    {hl.icon}
                  </div>
                  <h3 className="font-extrabold text-dark text-base sm:text-lg leading-tight">
                    {hl.title}
                  </h3>
                  <p className="text-medium text-xs leading-relaxed mt-2 flex-grow">
                    {hl.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section Preview Warga & Komunitas */}
      <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-extrabold text-xs uppercase tracking-wider mb-2 px-3 py-1 bg-tint rounded-full">
                <span>{tr(t.community.homePreviewTag, lang)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                {tr(t.community.homePreviewTitle, lang)}
              </h2>
              <p className="text-xs sm:text-sm text-medium mt-1 max-w-lg">
                {tr(t.community.homePreviewSub, lang)}
              </p>
            </div>
            <Link
              href="/warga-komunitas"
              className="bg-primary hover:bg-primary-hover active-press text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-ios transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <span>{tr(t.community.homePreviewCta, lang)}</span>
            </Link>
          </div>

          {/* 3 Activity Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {activities.slice(0, 3).map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-ios hover-scale flex flex-col h-full"
              >
                <div className="relative h-56 sm:h-52 w-full bg-primary/5">
                  <Image
                    src={act.coverImage}
                    alt={act.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md text-primary font-extrabold text-[11px] px-3 py-1 rounded-full shadow-sm uppercase">
                    {act.category}
                  </span>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-medium mb-1.5 font-medium">
                      <span>📅</span>
                      <span>{act.date}</span>
                    </div>
                    <h3 className="font-extrabold text-dark text-base leading-snug mb-2 line-clamp-2">
                      {act.title}
                    </h3>
                    <p className="text-xs text-medium leading-relaxed mb-4 line-clamp-2">
                      {act.shortDesc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-primary font-extrabold truncate max-w-[140px]">
                      📍 {act.location}
                    </span>
                    <Link
                      href={`/warga-komunitas/${act.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-primary hover:text-primary-hover active-press transition-colors"
                    >
                      <span>{tr(t.community.readMore, lang)}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
