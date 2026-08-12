"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getWisataBySlug } from "@/lib/admin/services/adminService";
import { WisataItem } from "@/lib/admin/types";

export default function WisataBudayaDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [item, setItem] = useState<WisataItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (slug) {
        const data = await getWisataBySlug(slug);
        setItem(data || null);
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 text-center text-medium text-xs font-extrabold">
        Memuat detail destinasi...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <h1 className="text-2xl font-extrabold text-dark mb-4">
          Destinasi Tidak Ditemukan
        </h1>
        <Link
          href="/wisata-budaya"
          className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-extrabold shadow-ios"
        >
          Kembali
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
            src={item.coverImage}
            alt={item.title}
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 w-full">
          <Link
            href="/wisata-budaya"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-accent hover:underline mb-4 active-press"
          >
            <span>&larr; Kembali ke Wisata &amp; Budaya</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-accent text-primary font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {item.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {item.title}
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
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Description */}
              <div className="bg-white">
                <h2 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight mb-4">
                  Deskripsi
                </h2>
                <p className="text-medium text-xs sm:text-base leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Photo Gallery Grid */}
              {item.gallery && item.gallery.length > 0 && (
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg sm:text-xl font-extrabold text-dark tracking-tight mb-5 flex items-center gap-2">
                    <span>🖼️</span>
                    <span>Galeri Foto</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {item.gallery.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-ios border border-gray-200/60 hover-scale"
                      >
                        <Image
                          src={imgSrc}
                          alt={`${item.title} gallery ${idx + 1}`}
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
                  <span>Informasi Lokasi</span>
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-dark font-medium pt-2 border-t border-tint/80">
                  <div>
                    <span className="text-[11px] text-medium uppercase font-extrabold block">
                      Kategori
                    </span>
                    <span className="inline-block bg-white border border-primary/20 text-primary font-extrabold text-xs px-3 py-1 rounded-full mt-1 uppercase">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-medium uppercase font-extrabold block">
                      Lokasi
                    </span>
                    <span className="font-extrabold text-dark mt-0.5 block">
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Back CTA */}
              <Link
                href="/wisata-budaya"
                className="w-full bg-primary hover:bg-primary-hover active-press text-white py-3 rounded-full text-xs font-extrabold shadow-ios text-center block transition-all"
              >
                Kembali ke Daftar Wisata
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
