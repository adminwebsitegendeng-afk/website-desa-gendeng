"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { logoutAdminSession } from "@/lib/admin/services/adminService";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Peta Desa", href: "/admin/peta-desa", icon: "📍" },
    { label: "Profil Desa", href: "/admin/profil", icon: "🏛️" },
    { label: "Warga & Komunitas", href: "/admin/warga-komunitas", icon: "🤝" },
    { label: "Wisata & Budaya", href: "/admin/wisata-budaya", icon: "🎭" },
    { label: "Potensi & Ekonomi", href: "/admin/potensi-ekonomi", icon: "🛍️" },
    { label: "Galeri Media", href: "/admin/galeri", icon: "🖼️" },
    { label: "Pengaturan Beranda", href: "/admin/homepage", icon: "🏠" },
  ];

  const handleLogout = () => {
    logoutAdminSession();
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-dark/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-primary-dark text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-primary/20 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Header Brand */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo className="w-9 h-9" />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight text-white">
                  CMS Desa Gendeng
                </span>
                <span className="text-[10px] text-accent font-bold uppercase tracking-wider">
                  Panel Administrator
                </span>
              </div>
            </div>
            {/* Close button on mobile */}
            <button
              onClick={onClose}
              className="lg:hidden text-white/70 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-white/50 px-3 mb-2">
              Menu Pengelolaan
            </div>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-ios"
                      : "text-white/80 hover:bg-white/10 hover:text-accent"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold py-2.5 rounded-2xl transition-all"
          >
            <span>🌐</span>
            <span>Buka Website Public</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full text-red-300 hover:text-red-100 hover:bg-red-500/20 text-xs font-extrabold py-2.5 rounded-2xl transition-all"
          >
            <span>🚪</span>
            <span>Keluar Panel</span>
          </button>
        </div>
      </aside>
    </>
  );
}
