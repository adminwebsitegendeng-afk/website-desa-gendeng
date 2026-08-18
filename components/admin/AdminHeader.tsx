"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function AdminHeader({ onToggleSidebar }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (!confirm("Apakah Anda yakin ingin keluar dari panel admin?")) return;
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const getTitle = () => {
    switch (pathname) {
      case "/admin/dashboard":
        return "Dashboard Ringkasan";
      case "/admin/profil":
        return "Pengelolaan Profil Desa";
      case "/admin/berita":
        return "Pengelolaan Berita & Informasi";
      case "/admin/warga-komunitas":
        return "Pengelolaan Warga & Komunitas";
      case "/admin/wisata-budaya":
        return "Pengelolaan Wisata & Budaya";
      case "/admin/potensi-ekonomi":
        return "Pengelolaan Potensi & Ekonomi";
      case "/admin/galeri":
        return "Pengelolaan Galeri Media";
      case "/admin/homepage":
        return "Pengaturan Beranda Utama";
      default:
        return "Panel Administrator CMS";
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200/70 shadow-sm px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Toggle Hamburger Button for Mobile */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl border border-gray-200 text-dark hover:bg-gray-100 transition-colors"
          aria-label="Buka Menu Sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex flex-col">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
            Sistem Informasi Desa Gendeng
          </span>
          <h1 className="text-base sm:text-xl font-extrabold text-dark tracking-tight">
            {getTitle()}
          </h1>
        </div>
      </div>

      {/* Right User Profile Info & Public Link */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-tint/80 border border-primary/20 text-primary font-extrabold text-xs hover:bg-tint active-press transition-all"
        >
          <span>🌐</span>
          <span>Pratinjau Situs</span>
        </Link>

        <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200/80 pl-2 pr-3 py-1.5 rounded-full">
          <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
            A
          </div>
          <div className="hidden md:flex flex-col text-left mr-2">
            <span className="text-xs font-extrabold text-dark leading-tight">Admin Desa</span>
            <span className="text-[10px] text-medium leading-tight">Gendeng, Gondokusuman</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-7 h-7 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors border border-red-100"
            title="Keluar (Logout)"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
