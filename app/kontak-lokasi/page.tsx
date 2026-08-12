"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";

// Sub-component that accesses search parameters
function ContactFormContent() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const serviceType = searchParams.get("service");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Pertanyaan Umum",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (serviceType === "surat") {
      setFormData((prev) => ({ ...prev, category: "Layanan Surat Keterangan" }));
    } else if (serviceType === "aduan") {
      setFormData((prev) => ({ ...prev, category: "Pengaduan & Aspirasi" }));
    }
  }, [serviceType]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = lang === "en" ? "Name is required" : "Nama wajib diisi";
    if (!formData.email.trim()) {
      newErrors.email = lang === "en" ? "Email is required" : "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === "en" ? "Invalid email format" : "Format email tidak valid";
    }
    if (!formData.phone.trim()) newErrors.phone = lang === "en" ? "Phone number is required" : "Nomor telepon wajib diisi";
    if (!formData.message.trim()) newErrors.message = lang === "en" ? "Message is required" : "Pesan aduan/pertanyaan wajib diisi";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitted(false);
    } else {
      setErrors({});
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "Pertanyaan Umum",
        message: "",
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/70 shadow-ios p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-extrabold text-dark mb-1.5">{tr(t.kontak.formH, lang)}</h2>
      <p className="text-medium text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
        {tr(t.kontak.formSub, lang)}
      </p>

      {isSubmitted && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200/70 rounded-2xl text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5 shadow-sm">
          <span className="text-lg">✅</span>
          <div>
            <strong className="font-bold block text-sm">{tr(t.kontak.success, lang)}</strong>
            {tr(t.kontak.successSub, lang)} #{Math.floor(100000 + Math.random() * 900000)}.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-dark mb-2">{tr(t.kontak.name, lang)}</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl border ${
              errors.name ? "border-red-500" : "border-gray-200/80"
            } focus:outline-none focus:border-primary text-base sm:text-sm transition-all`}
            placeholder={tr(t.kontak.namePh, lang)}
          />
          {errors.name && <span className="text-xs text-red-500 mt-1 font-medium block">{errors.name}</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-dark mb-2">{tr(t.kontak.email, lang)}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-2xl border ${
                errors.email ? "border-red-500" : "border-gray-200/80"
              } focus:outline-none focus:border-primary text-base sm:text-sm transition-all`}
              placeholder="budi@email.com"
            />
            {errors.email && <span className="text-xs text-red-500 mt-1 font-medium block">{errors.email}</span>}
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-dark mb-2">{tr(t.kontak.phone, lang)}</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 rounded-2xl border ${
                errors.phone ? "border-red-500" : "border-gray-200/80"
              } focus:outline-none focus:border-primary text-base sm:text-sm transition-all`}
              placeholder={tr(t.kontak.phonePh, lang)}
            />
            {errors.phone && <span className="text-xs text-red-500 mt-1 font-medium block">{errors.phone}</span>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-dark mb-2">{tr(t.kontak.category, lang)}</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200/80 focus:outline-none focus:border-primary text-base sm:text-sm bg-white transition-all"
          >
            {t.kontak.catOptions[lang].map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-dark mb-2">{tr(t.kontak.message, lang)}</label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl border ${
              errors.message ? "border-red-500" : "border-gray-200/80"
            } focus:outline-none focus:border-primary text-base sm:text-sm transition-all`}
            placeholder={tr(t.kontak.messagePh, lang)}
          />
          {errors.message && <span className="text-xs text-red-500 mt-1 font-medium block">{errors.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover active-press text-white py-3.5 rounded-full font-extrabold text-sm sm:text-base shadow-ios transition-all duration-200"
        >
          {tr(t.kontak.submit, lang)}
        </button>
      </form>
    </div>
  );
}

export default function KontakLokasi() {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative bg-primary-dark text-white py-14 sm:py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_village.png"
            alt="Kontak & Lokasi Kantor Desa Gendeng"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            
            {/* Left side: Information and Map */}
            <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
              <div className="bg-tint/30 p-6 rounded-3xl border border-tint">
                <h2 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight">{tr(t.kontak.officeH, lang)}</h2>
                <p className="text-medium text-xs sm:text-sm mt-2 leading-relaxed">
                  {tr(t.kontak.officeP, lang)}
                </p>
                <div className="mt-5 space-y-3.5 text-xs sm:text-sm text-dark font-medium">
                  <p className="flex items-start gap-3">
                    <span className="text-base sm:text-lg">📍</span>
                    <span>{tr(t.footer.address, lang)}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-base sm:text-lg">📞</span>
                    <span>(0274) 512345</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-base sm:text-lg">✉️</span>
                    <span>info@desagendeng.go.id</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-base sm:text-lg">⏱️</span>
                    <span>{tr(t.kontak.hours, lang)}</span>
                  </p>
                </div>
              </div>

              {/* Styled Mock Map Wrapper */}
              <div className="bg-white border border-gray-200/70 rounded-3xl p-5 shadow-ios flex flex-col">
                <span className="text-xs font-extrabold text-primary uppercase tracking-wider mb-3">
                  📍 {lang === "en" ? "Location Map" : "Peta Lokasi Kantor Balai Warga"}
                </span>
                <div className="w-full h-64 sm:h-72 bg-gray-50 rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-100">
                  <div className="absolute inset-0 bg-gray-50 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] opacity-80" />
                  
                  <div className="absolute w-full h-4 bg-gray-200/90 top-1/2 left-0 -translate-y-1/2 rotate-12" />
                  <div className="absolute w-6 h-full bg-gray-200/90 top-0 left-1/3 -translate-x-1/2 -rotate-12" />
                  
                  <div className="absolute w-32 h-20 bg-emerald-100/50 rounded-full blur-sm top-4 left-6" />
                  <div className="absolute w-40 h-24 bg-primary/10 rounded-full blur-sm bottom-6 right-8" />
                  
                  <div className="relative z-10 flex flex-col items-center group cursor-pointer animate-bounce">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg shadow-lg border-2 border-white">
                      📍
                    </div>
                    <span className="bg-primary-dark text-white text-[10px] font-bold px-2.5 py-1 rounded-md mt-2 shadow-md">
                      Desa Gendeng
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="lg:col-span-7">
              <Suspense fallback={
                <div className="p-12 text-center text-medium">{tr(t.common.loading, lang)}</div>
              }>
                <ContactFormContent />
              </Suspense>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
