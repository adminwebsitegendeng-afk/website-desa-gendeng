"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();

  const navLinks = [
    { name: tr(t.nav.home, lang), href: "/" },
    { name: tr(t.nav.profil, lang), href: "/profil-desa" },
    { name: tr(t.nav.potensi, lang), href: "/potensi-ekonomi" },
    { name: tr(t.nav.wisata, lang), href: "/wisata-budaya" },
    { name: tr(t.nav.community, lang), href: "/warga-komunitas" },
    { name: tr(t.nav.kontak, lang), href: "/kontak-lokasi" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/85 backdrop-blur-xl transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0 active-press">
            <Logo className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold text-[#111827] leading-tight group-hover:text-[#14532d] transition-colors">
                Kampung Gendeng
              </span>
              <span className="text-[10px] sm:text-xs text-[#6b7280] font-medium leading-tight">
                Kec. Gondokusuman, Kab. Yogyakarta
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center h-full gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 ${isActive
                      ? "bg-[#14532d] text-white shadow-sm"
                      : "text-[#374151] hover:text-[#14532d] hover:bg-gray-100/80"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Lang switcher */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <div className="flex bg-gray-100/90 rounded-full p-1 border border-gray-200/60 shadow-inner">
              <button
                onClick={() => setLang("id")}
                className={`text-xs font-extrabold px-3 py-1.5 rounded-full transition-all active-press ${lang === "id" ? "bg-[#14532d] text-white shadow-sm" : "text-[#6b7280] hover:text-[#14532d]"
                  }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang("en")}
                className={`text-xs font-extrabold px-3 py-1.5 rounded-full transition-all active-press ${lang === "en" ? "bg-[#14532d] text-white shadow-sm" : "text-[#6b7280] hover:text-[#14532d]"
                  }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2.5 rounded-full bg-gray-100/90 text-[#374151] active-press hover:bg-[#eef7ee] hover:text-[#14532d] transition-all"
          >
            {isOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4">
          <div className="p-3 bg-white/95 backdrop-blur-2xl rounded-3xl border border-gray-200/70 shadow-ios-lg space-y-1">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold active-press transition-all ${isActive
                      ? "bg-[#14532d] text-white shadow-sm"
                      : "text-[#374151] hover:text-[#14532d] hover:bg-[#eef7ee]"
                    }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-accent" />}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => { setLang("id"); setIsOpen(false); }}
                className={`flex-1 py-2.5 rounded-2xl text-xs font-extrabold active-press transition-all ${lang === "id" ? "bg-[#14532d] text-white shadow-sm" : "bg-gray-100 text-[#6b7280]"
                  }`}
              >
                🇮🇩 Indonesia
              </button>
              <button
                onClick={() => { setLang("en"); setIsOpen(false); }}
                className={`flex-1 py-2.5 rounded-2xl text-xs font-extrabold active-press transition-all ${lang === "en" ? "bg-[#14532d] text-white shadow-sm" : "bg-gray-100 text-[#6b7280]"
                  }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
