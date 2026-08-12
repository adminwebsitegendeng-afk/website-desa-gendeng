"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { loginAdminSession } from "@/lib/admin/services/adminService";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin@desagendeng.go.id");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      if (username.trim() && password.trim()) {
        loginAdminSession();
        setIsLoading(false);
        router.push("/admin/dashboard");
      } else {
        setIsLoading(false);
        setErrorMsg("Email/Username dan Password tidak boleh kosong");
      }
    }, 400);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200/80 shadow-2xl p-6 sm:p-8 flex flex-col my-auto">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        <Logo className="w-16 h-16 mb-3" />
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary bg-tint px-3 py-1 rounded-full mb-1">
          CMS Desa Gendeng
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight">
          Masuk Panel Administrator
        </h1>
        <p className="text-xs text-medium mt-1">
          Silakan masukkan akun pengelola resmi Desa Gendeng
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold text-center">
          {errorMsg}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-dark mb-1.5">
            Email / Username Pamong
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary text-sm font-medium transition-all"
            placeholder="admin@desagendeng.go.id"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-dark mb-1.5">
            Kata Sandi (Password)
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary text-sm font-medium transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-hover active-press text-white py-3.5 rounded-full font-extrabold text-sm shadow-ios transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span>Memverifikasi Akses...</span>
          ) : (
            <>
              <span>Masuk Dashboard Admin</span>
              <span>→</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <a
          href="/"
          className="text-xs text-medium hover:text-primary font-bold transition-colors inline-flex items-center gap-1"
        >
          <span>←</span> Kembali ke Website Publik
        </a>
      </div>
    </div>
  );
}
