"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";

export default function KontakLokasi() {
  const { lang } = useLanguage();


  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative bg-primary-dark text-white py-14 sm:py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_gendeng.png"
            alt="Kontak & Lokasi Kantor Kampung Gendeng"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-accent font-extrabold text-xs uppercase tracking-wider mb-2">
            <span>📞</span>
            <span>{tr(t.kontak.tag, lang)}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-white leading-tight">
            {tr(t.kontak.title, lang)}
          </h1>
          <p className="text-white/80 text-xs sm:text-base mt-3 sm:mt-4 max-w-xl mx-auto leading-relaxed">
            {tr(t.kontak.subtitle, lang)}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-14 sm:py-20 bg-white flex-grow">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* Static Map Wrapper (Top Full Width) */}
          <div className="mb-12 sm:mb-16 bg-white border border-gray-200/70 rounded-3xl p-3 sm:p-4 shadow-ios w-full">
            <div className="flex items-center justify-between mb-3 px-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-dark flex items-center gap-2">
                <span>📍</span> {lang === "en" ? "Village Administration Map" : "Peta Administrasi Kampung Gendeng"}
              </h2>
            </div>
            <a href="/images/peta_gendeng.jpg" target="_blank" rel="noopener noreferrer" className="block w-full relative overflow-hidden rounded-2xl border border-gray-100 shadow-inner group cursor-zoom-in" title="Klik untuk memperbesar gambar peta">
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <span className="bg-white text-dark font-extrabold px-5 py-2.5 rounded-full shadow-xl text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-lg">🔍</span> Klik untuk Memperbesar
                </span>
              </div>
              <Image 
                src="/images/peta_gendeng.jpg" 
                alt="Peta Administrasi Kampung Gendeng" 
                width={1920}
                height={1280}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            </a>
          </div>

          <div className="flex justify-center mt-6 sm:mt-8">
            <div className="w-full max-w-2xl bg-tint/30 p-8 rounded-3xl border border-tint shadow-sm text-center">
              <h2 className="text-xl sm:text-3xl font-extrabold text-dark tracking-tight mb-3">{tr(t.kontak.officeH, lang)}</h2>
              <p className="text-medium text-sm sm:text-base leading-relaxed mb-6">
                {tr(t.kontak.officeP, lang)}
              </p>
              <div className="space-y-4 text-sm sm:text-base text-dark font-medium inline-block text-left bg-white p-6 rounded-2xl shadow-inner border border-gray-100">
                <p className="flex items-start gap-3">
                  <span className="text-lg">📍</span>
                  <span>{tr(t.footer.address, lang)}</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-lg">📞</span>
                  <span>(0274) 512345</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-lg">✉️</span>
                  <span>info@desagendeng.go.id</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-lg">⏱️</span>
                  <span>{tr(t.kontak.hours, lang)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
