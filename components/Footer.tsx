"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-primary-dark text-white pt-12 sm:pt-16 pb-8 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Info Column */}
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10 sm:w-12 sm:h-12" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                  Kampung Gendeng
                </span>
                <span className="text-[10px] sm:text-xs text-accent/90 font-bold">
                  {tr(t.common.locTag, lang)}
                </span>
              </div>
            </div>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-xs">
              {tr(t.footer.desc, lang)}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-accent mb-4 sm:mb-6 uppercase tracking-wider">
              {tr(t.footer.col1, lang)}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/profil-desa" className="hover:text-accent active-press transition-all block">
                  {tr(t.nav.profil, lang)}
                </Link>
              </li>
              <li>
                <Link href="/potensi-ekonomi" className="hover:text-accent active-press transition-all block">
                  {tr(t.nav.potensi, lang)}
                </Link>
              </li>
              <li>
                <Link href="/wisata-budaya" className="hover:text-accent active-press transition-all block">
                  {tr(t.nav.wisata, lang)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & News */}
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-accent mb-4 sm:mb-6 uppercase tracking-wider">
              {tr(t.footer.col2, lang)}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/statistik-desa" className="hover:text-accent active-press transition-all block">
                  {lang === "en" ? "Population Statistics" : "Statistik Kependudukan"}
                </Link>
              </li>
              <li>
                <Link href="/kontak-lokasi" className="hover:text-accent active-press transition-all block">
                  {tr(t.nav.kontak, lang)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact details Column */}
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-accent mb-4 sm:mb-6 uppercase tracking-wider">
              {tr(t.footer.col3, lang)}
            </h3>
            <address className="not-italic text-xs sm:text-sm text-white/80 space-y-2.5 sm:space-y-3">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{tr(t.footer.address, lang)}</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(0274) 512345</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@desagendeng.go.id</span>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60 text-center md:text-left">
          <p>© {new Date().getFullYear()} Kampung Gendeng. {tr(t.footer.copyright, lang)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-white">{tr(t.footer.privacy, lang)}</a>
            <a href="#" className="hover:text-white">{tr(t.footer.terms, lang)}</a>
            <a href="#" className="hover:text-white font-bold text-accent">{tr(t.footer.service, lang)}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
