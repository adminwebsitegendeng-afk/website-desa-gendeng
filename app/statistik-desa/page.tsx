"use client";

import { useState } from "react";
import Image from "next/image";
import { demographics } from "@/lib/mockData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type StatTab = "pekerjaan" | "pendidikan" | "umur" | "gender";

export default function StatistikDesa() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<StatTab>("pekerjaan");

  const tabs: { id: StatTab; label: string; icon: string }[] = [
    { id: "pekerjaan", label: lang === "en" ? "Occupation" : "Pekerjaan", icon: "💼" },
    { id: "pendidikan", label: lang === "en" ? "Education" : "Pendidikan", icon: "🎓" },
    { id: "umur", label: lang === "en" ? "Age Groups" : "Kelompok Umur", icon: "⏳" },
    { id: "gender", label: lang === "en" ? "Gender Ratio" : "Jenis Kelamin", icon: "👥" },
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case "pekerjaan":
        return demographics.occupation.map(d => ({
          ...d,
          label: lang === "en" ? ({
            "Petani & Peternak": "Farmers & Livestock",
            "Pengrajin Bambu & Kriya": "Bamboo Craftsmanship",
            "Pedagang & Wirausaha": "Traders & Entrepreneurs",
            "PNS / TNI / Polri": "Civil Servants & Public Officers",
            "Karyawan Swasta": "Private Sector Employees",
            "Lainnya / Belum Bekerja": "Others / Unemployed"
          }[d.label] || d.label) : d.label
        }));
      case "pendidikan":
        return demographics.education.map(d => ({
          ...d,
          label: lang === "en" ? ({
            "SD / Sederajat": "Elementary School",
            "SMP / Sederajat": "Junior High School",
            "SMA / SMK Sederajat": "Senior High School",
            "Diploma (D1-D4)": "Diploma Degree",
            "Sarjana (S1-S3)": "Bachelor / Postgraduate"
          }[d.label] || d.label) : d.label
        }));
      case "umur":
        return demographics.ageGroup.map(d => ({
          ...d,
          label: lang === "en" ? ({
            "0 - 14 Tahun (Anak-anak)": "0 - 14 Years (Children)",
            "15 - 64 Tahun (Usia Produktif)": "15 - 64 Years (Productive Age)",
            "65+ Tahun (Lansia)": "65+ Years (Seniors)"
          }[d.label] || d.label) : d.label
        }));
      case "gender":
        return demographics.gender.map(d => ({
          ...d,
          label: lang === "en" ? ({
            "Laki-laki": "Male",
            "Perempuan": "Female"
          }[d.label] || d.label) : d.label
        }));
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative bg-primary-dark text-white py-14 sm:py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_gendeng.png"
            alt="Statistik Desa"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-accent font-extrabold text-xs uppercase tracking-wider mb-2">
            <span>📊</span>
            <span>{lang === "en" ? "Demographic Data" : "Data Kependudukan"}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-white leading-tight">
            {lang === "en" ? "Kampung Gendeng Statistics" : "Statistik Penduduk Desa Gendeng"}
          </h1>
          <p className="text-white/80 text-xs sm:text-base mt-3 sm:mt-4 max-w-xl mx-auto leading-relaxed">
            {lang === "en"
              ? "Presenting transparent and accurate population demographic data of Kampung Gendeng for the public."
              : "Menyajikan data demografis kependudukan Desa Gendeng secara transparan dan akurat bagi publik."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20 bg-white flex-grow">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {/* Key Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-16">
            <div className="bg-tint/40 border border-tint rounded-3xl p-5 sm:p-6 flex items-center gap-4 shadow-sm">
              <div className="text-3xl sm:text-4xl flex-shrink-0">👥</div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-extrabold text-medium uppercase">
                  {lang === "en" ? "Total Population" : "Total Penduduk"}
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-primary">{demographics.totalPopulation.toLocaleString("id-ID")}</span>
                <span className="text-[11px] text-medium">{lang === "en" ? "Registered residents" : "Jiwa terdaftar"}</span>
              </div>
            </div>
            <div className="bg-tint/40 border border-tint rounded-3xl p-5 sm:p-6 flex items-center gap-4 shadow-sm">
              <div className="text-3xl sm:text-4xl flex-shrink-0">🏠</div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-extrabold text-medium uppercase">
                  {lang === "en" ? "Total Families" : "Jumlah Keluarga"}
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-primary">{demographics.totalFamilies.toLocaleString("id-ID")}</span>
                <span className="text-[11px] text-medium">{lang === "en" ? "Heads of Household" : "Kepala Keluarga (KK)"}</span>
              </div>
            </div>
            <div className="bg-tint/40 border border-tint rounded-3xl p-5 sm:p-6 flex items-center gap-4 shadow-sm">
              <div className="text-3xl sm:text-4xl flex-shrink-0">⚖️</div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-extrabold text-medium uppercase">
                  {lang === "en" ? "Gender Ratio (M:F)" : "Rasio Jender (L:P)"}
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-primary">49.6% : 50.4%</span>
                <span className="text-[11px] text-medium">{lang === "en" ? "Population balance" : "Keseimbangan populasi"}</span>
              </div>
            </div>
          </div>

          {/* Demographic Breakdown Panel */}
          <div className="bg-white rounded-3xl border border-gray-200/70 shadow-ios overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Sidebar Tabs Selector (Scrollable on mobile) */}
            <div className="lg:col-span-4 bg-gray-50/80 border-b lg:border-b-0 lg:border-r border-gray-200/60 p-4 sm:p-6 flex flex-col">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-medium mb-3 sm:mb-4">
                {lang === "en" ? "Demographic Categories" : "Kategori Demografi"}
              </h3>
              <div className="flex lg:flex-col overflow-x-auto no-scrollbar gap-2 pb-1 lg:pb-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2.5 whitespace-nowrap active-press transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-white shadow-ios"
                        : "bg-white text-dark hover:bg-tint/50 hover:text-primary border border-gray-200/60"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Progress Bar Charts */}
            <div className="lg:col-span-8 p-5 sm:p-8">
              <h3 className="text-base sm:text-xl font-extrabold text-dark mb-6 sm:mb-8 flex items-center gap-2">
                <span>📊</span>
                <span>
                  {lang === "en"
                    ? `Demographic Breakdown by ${tabs.find((t) => t.id === activeTab)?.label}`
                    : `Breakdown Demografi Berdasarkan ${tabs.find((t) => t.id === activeTab)?.label}`}
                </span>
              </h3>

              <div className="space-y-5 sm:space-y-6">
                {getActiveData().map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end text-xs sm:text-sm">
                      <span className="font-extrabold text-dark">{item.label}</span>
                      <div className="text-xs text-medium">
                        <span className="font-extrabold text-primary mr-1">{item.value.toLocaleString("id-ID")}</span>
                        <span>({item.percentage}%)</span>
                      </div>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full h-3.5 bg-tint/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-12 pt-5 border-t border-gray-100 text-[11px] text-medium leading-relaxed">
                {lang === "en"
                  ? "* Data sourced from Kampung Gendeng office population registration for the first semester of 2026. Updated every June and December."
                  : "* Data bersumber dari registrasi kependudukan Kantor Desa Gendeng semester pertama tahun 2026. Diperbarui setiap bulan Juni dan Desember."}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
