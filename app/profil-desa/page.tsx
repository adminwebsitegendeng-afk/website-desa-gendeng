"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { officials } from "@/lib/mockData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";
import { getProfilData, subscribeDBChange } from "@/lib/admin/services/adminService";
import { ProfilData } from "@/lib/admin/types";

export default function ProfilDesa() {
  const { lang } = useLanguage();
  const [profil, setProfil] = useState<ProfilData | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getProfilData();
      setProfil(data);
    }
    loadData();
    const unsubscribe = subscribeDBChange(loadData);
    return () => unsubscribe();
  }, []);

  const visionMission = {
    vision: profil?.visionText || (lang === "en"
      ? "Realizing a Progressive, Independent, Prosperous Kampung Gendeng with Noble Cultural Character and Excellence in Integrated Agribusiness by 2030."
      : "Terwujudnya Desa Gendeng yang Maju, Mandiri, Sejahtera, Berkarakter Budaya Luhur, dan Unggul dalam Sektor Agribisnis Terpadu pada Tahun 2030."),
    missions: profil?.missionList || (lang === "en"
      ? [
        "Improve digital-based public service quality that is fast, friendly, and transparent.",
        "Develop organic farming and integrated agriculture to strengthen community food security.",
        "Encourage the growth of creative MSMEs using natural fiber, bamboo, and local potential.",
        "Preserve local customs, arts, and historical cultural sites in the area.",
        "Upgrade village infrastructure to facilitate economic and social mobility.",
      ]
      : [
        "Meningkatkan kualitas pelayanan publik berbasis digital yang cepat, ramah, dan transparan.",
        "Mengembangkan sektor pertanian organik dan integrasi pertanian terpadu guna memperkuat ketahanan pangan warga.",
        "Mendorong pertumbuhan UMKM kreatif berbahan serat alam, bambu, dan potensi lokal lainnya.",
        "Melestarikan adat-istiadat, kesenian lokal, serta situs-situs budaya bersejarah di wilayah desa.",
        "Meningkatkan kualitas sarana infrastruktur pedesaan untuk memperlancar mobilitas ekonomi dan sosial.",
      ]),
  };

  const historyTimeline = [
    {
      year: "1948",
      title: lang === "en" ? "Hamlet Consolidation" : "Penggabungan Dusun",
      desc: lang === "en" ? "Kampung Gendeng was formed administratively post-independence." : "Desa Gendeng terbentuk secara administratif dari penggabungan tiga dusun lama pasca-kemerdekaan RI."
    },
    {
      year: "1975",
      title: lang === "en" ? "Creative Bamboo Center" : "Sentra Bambu Kreatif",
      desc: lang === "en" ? "Residents organized traditional bamboo craft groups." : "Warga mulai mengorganisasi diri membentuk kelompok perajin bambu tradisional."
    },
    {
      year: "2010",
      title: lang === "en" ? "Organic Farming Pioneer" : "Pionir Pertanian Organik",
      desc: lang === "en" ? "Manunggal farmers group converted paddy fields to national organic certification." : "Kelompok tani Manunggal sukses mengonversi sawah konvensional menjadi organik."
    },
    {
      year: "2020",
      title: lang === "en" ? "Independent Village DIY" : "Desa Mandiri DIY",
    },
  ];

  const displayOfficials = profil?.officials && profil.officials.length > 0 
    ? profil.officials 
    : officials;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative bg-primary-dark text-white py-14 sm:py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_gendeng.png"
            alt="Profil Desa"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-accent font-extrabold text-xs uppercase tracking-wider mb-2">
            <span>🏛️</span>
            <span>{tr(t.profil.tag, lang)}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-white leading-tight">
            {tr(t.profil.title, lang)}
          </h1>
          <p className="text-white/80 text-xs sm:text-base mt-3 sm:mt-4 max-w-xl mx-auto leading-relaxed">
            {tr(t.profil.subtitle, lang)}
          </p>
        </div>
      </section>

      {/* Sejarah Desa */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tint text-primary font-extrabold text-xs uppercase tracking-wider mb-2">
                <span>📜</span>
                <span>{tr(t.profil.historyTag, lang)}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight mt-1">
                {tr(t.profil.historyH2, lang)}
              </h2>
              <div className="text-medium text-xs sm:text-sm leading-relaxed mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                {lang === "en" ? (
                  <>
                    <p>The name <strong>&ldquo;Gendeng&rdquo;</strong> is derived from traditional Javanese tembang (gending) heritage, honoring a royal court artist who once resided here.</p>
                    <p>Post-independence in 1948, three hamlets united into a single community, establishing mutual cooperation (gotong royong) as their core identity.</p>
                    <p>Today, Kampung Gendeng flourishes as a prominent bamboo craft center in Yogyakarta while preserving its lush agrarian landscape.</p>
                  </>
                ) : (
                  <>
                    <p>Nama <strong>&ldquo;Gendeng&rdquo;</strong> di sini dibaca seperti lafal &quot;genting&quot; dalam bahasa Jawa (bukan bermakna kurang waras), yang konon berasal dari kata gending karena dahulu wilayah ini pernah ditinggali oleh seorang abdi dalem ahli tembang atau seni suara Jawa.</p>
                    <p>Pasca-kemerdekaan, melalui konsolidasi tata kelola wilayah pada tahun 1948, tiga dukuh menyatukan tekad untuk melebur menjadi satu kelurahan. Sejak saat itu, nilai gotong royong terpatri kuat sebagai jati diri masyarakat Desa Gendeng.</p>
                    <p>Hari ini, Desa Gendeng berkembang pesat sebagai salah satu sentra kerajinan bambu terkemuka di D.I. Yogyakarta dengan tetap mempertahankan lanskap agrarisnya yang hijau dan asri.</p>
                  </>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="border-l-2 border-primary/20 pl-6 sm:pl-8 space-y-8 sm:space-y-10 relative ml-2 sm:ml-4">
              {historyTimeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary border-4 border-white shadow-ios" />
                  <span className="text-primary font-extrabold text-base sm:text-lg leading-none">{item.year}</span>
                  <h3 className="text-sm sm:text-base font-extrabold text-dark mt-0.5">{item.title}</h3>
                  <p className="text-medium text-xs mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-14 sm:py-20 bg-tint/40 border-t border-tint/80">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-primary font-extrabold text-xs uppercase tracking-wider mb-2 border border-gray-200/60">
              <span>🎯</span>
              <span>{tr(t.profil.visionTag, lang)}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight mt-1">
              {tr(t.profil.visionH2, lang)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Visi Card */}
            <div className="md:col-span-5 bg-primary text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-center shadow-ios-lg">
              <span className="text-accent font-extrabold text-xs uppercase tracking-wider">{tr(t.profil.visionLabel, lang)}</span>
              <p className="text-base sm:text-xl font-extrabold mt-3 sm:mt-4 leading-relaxed italic text-white/95">
                &ldquo;{visionMission.vision}&rdquo;
              </p>
            </div>

            {/* Misi Card */}
            <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/70 shadow-ios">
              <span className="text-primary font-extrabold text-xs uppercase tracking-wider">{tr(t.profil.misiLabel, lang)}</span>
              <ul className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
                {visionMission.missions.map((mission, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-tint flex-shrink-0 flex items-center justify-center text-primary font-extrabold text-xs mt-0.5 shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="text-medium text-xs sm:text-sm leading-relaxed">{mission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Aparatur Pemerintahan Desa */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tint text-primary font-extrabold text-xs uppercase tracking-wider mb-2">
              <span>👥</span>
              <span>{tr(t.profil.structureTag, lang)}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight mt-1">
              {tr(t.profil.structureH2, lang)}
            </h2>
            <p className="text-medium text-xs sm:text-base mt-2 sm:mt-3">
              {tr(t.profil.structureP, lang)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayOfficials.map((official, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-ios text-center flex flex-col hover-scale"
              >
                <div className="h-56 sm:h-64 bg-tint/60 relative flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    {official.image && official.image !== "" && official.image !== "/images/kades_portrait.png" ? (
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-ios">
                        <Image src={official.image} alt={official.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white flex items-center justify-center text-primary text-3xl sm:text-4xl font-bold shadow-ios">
                        🧑‍💼
                      </div>
                    )}
                    <span className="text-[11px] text-primary font-extrabold mt-3 tracking-wider uppercase bg-white px-3 py-1 rounded-full shadow-sm z-10">
                      {lang === "en" ? "Community Administrator" : "Pemerintah Desa"}
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-6 bg-white flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg font-extrabold text-dark">{official.name}</h3>
                  <p className="text-xs sm:text-sm font-bold text-primary mt-0.5">{official.role}</p>
                  <p className="text-xs text-medium mt-3 leading-relaxed border-t border-gray-100 pt-3">
                    {lang === "en"
                      ? "Responsible for administrative services and managing neighborhood affairs."
                      : "Bertanggung jawab dalam pelayanan administrasi serta mengampu urusan ketatausahaan pamong desa."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
