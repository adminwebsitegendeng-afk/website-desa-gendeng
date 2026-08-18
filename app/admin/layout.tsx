"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Render Login Page Screen
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 notranslate" translate="no">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col lg:flex-row font-sans text-dark notranslate" translate="no">
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
