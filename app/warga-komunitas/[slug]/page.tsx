"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";
import { getWargaBySlug } from "@/lib/admin/services/adminService";
import { WargaItem } from "@/lib/admin/types";

export default function WargaKomunitasDetailPage() {
  const { lang } = useLanguage();
  const params = useParams();
  const slug = params?.slug as string;

  const [activity, setActivity] = useState<WargaItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (slug) {
        const data = await getWargaBySlug(slug);
        setActivity(data || null);
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 text-center text-medium text-xs font-extrabold">
        Memuat detail kegiatan...
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <h1 className="text-2xl font-extrabold text-dark mb-4">
          {lang === "en" ? "Activity Not Found" : "Kegiatan Tidak Ditemukan"}
        </h1>
        <Link
          href="/warga-komunitas"
          className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-extrabold shadow-ios"
        >
          {tr(t.community.back, lang)}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. Subpage Header */}
      <section className="relative w-full bg-primary-dark text-white py-10 sm:py-14 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={activity.coverImage}
            alt={activity.title}
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 w-full">
          <Link
            href="/warga-komunitas"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-accent hover:underline mb-4 active-press"
          >
            <span>{tr(t.community.back, lang)}</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-accent text-primary font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {activity.category}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white font-extrabold text-xs px-3 py-1 rounded-full">
              📅 {activity.date}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {activity.title}
          </h1>
        </div>
      </section>

      {/* 2. Main Content & Sidebar */}
      <section className="py-10 sm:py-16 bg-white flex-grow">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            
            {/* Left Main Body */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Cover Image */}
              <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-ios-lg border border-gray-200/70">
                <Image
                  src={activity.coverImage}
                  alt={activity.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Description */}
              <div className="bg-white">
                <h2 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight mb-4">
                  {lang === "en" ? "Activity Overview" : "Deskripsi Kegiatan"}
                </h2>
                <p className="text-medium text-xs sm:text-base leading-relaxed whitespace-pre-line">
                  {activity.description}
                </p>
              </div>

              {/* Photo Gallery Grid */}
              {activity.gallery && activity.gallery.length > 0 && (
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg sm:text-xl font-extrabold text-dark tracking-tight mb-5 flex items-center gap-2">
                    <span>🖼️</span>
                    <span>{tr(t.community.galleryTitle, lang)}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {activity.gallery.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-ios border border-gray-200/60 hover-scale"
                      >
                        <Image
                          src={imgSrc}
                          alt={`${activity.title} gallery ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Info Card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-tint/40 border border-tint/80 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
                  <span>📌</span>
                  <span>{tr(t.community.infoTitle, lang)}</span>
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-dark font-medium pt-2 border-t border-tint/80">
                  <div>
                    <span className="text-[11px] text-medium uppercase font-extrabold block">
                      {tr(t.community.organizerLabel, lang)}
                    </span>
                    <span className="font-extrabold text-dark mt-0.5 block">
                      {activity.organizer}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-medium uppercase font-extrabold block">
                      {tr(t.community.dateLabel, lang)}
                    </span>
                    <span className="font-extrabold text-dark mt-0.5 block">
                      {activity.date}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-medium uppercase font-extrabold block">
                      {tr(t.community.locationLabel, lang)}
                    </span>
                    <span className="font-extrabold text-dark mt-0.5 block">
                      {activity.location}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-medium uppercase font-extrabold block">
                      {tr(t.community.categoryLabel, lang)}
                    </span>
                    <span className="inline-block bg-white border border-primary/20 text-primary font-extrabold text-xs px-3 py-1 rounded-full mt-1 uppercase">
                      {activity.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Back CTA */}
              <Link
                href="/warga-komunitas"
                className="w-full bg-primary hover:bg-primary-hover active-press text-white py-3 rounded-full text-xs font-extrabold shadow-ios text-center block transition-all"
              >
                {tr(t.community.back, lang)}
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
