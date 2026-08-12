"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { isAuthenticated, subscribeDBChange } from "@/lib/admin/services/adminService";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    function checkAuth() {
      const isAuth = isAuthenticated();
      setAuthed(isAuth);
      if (!isAuth && pathname !== "/admin/login") {
        router.replace("/admin/login");
      }
    }

    checkAuth();
    const unsubscribe = subscribeDBChange(checkAuth);
    return () => unsubscribe();
  }, [pathname, router]);

  // Render Login Page Screen
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">{children}</div>;
  }

  // Loading state while verifying auth
  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-medium text-xs font-bold">
        Verifikasi Sesi Akses Administrator...
      </div>
    );
  }

  // Guard: if not authenticated and trying to access protected admin page
  if (!authed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col lg:flex-row font-sans text-dark">
      {/* Sidebar Navigation */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Admin Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-8 flex-grow max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
