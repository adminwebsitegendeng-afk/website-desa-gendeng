"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { officials } from "@/lib/mockData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { t, tr } from "@/lib/i18n/translations";
import { getProfilData, getHomepageData, subscribeDBChange } from "@/lib/admin/services/adminService";
import { ProfilData, HomepageData } from "@/lib/admin/types";

export default function ProfilDesa() {
  const { lang } = useLanguage();
  const [profil, setProfil] = useState<ProfilData | null>(null);
  const [homepage, setHomepage] = useState<HomepageData | null>(null);

  useEffect(() => {
    async function loadData() {
      const [data, hp] = await Promise.all([getProfilData(), getHomepageData()]);
      setProfil(data);
      setHomepage(hp as unknown as HomepageData);
    }
    loadData();
    const unsubscribe = subscribeDBChange(loadData);
    return () => unsubscribe();
  }, []);

  const visionMission = {
    vision: profil?.visionText || (lang === "en"
      ? "Realizing a Progressive, Independent, Prosperous Kampung Gendeng with Noble Cultural Character and Excellence in Integrated Agribusiness by 2030."
      : "Terwujudnya Kampung Gendeng yang Maju, Mandiri, Sejahtera, Berkarakter Budaya Luhur, dan Unggul dalam Sektor Agribisnis Terpadu pada Tahun 2030."),
    missions: (profil?.missionText && profil.missionText.trim() !== "-") ? profil.missionText.split('\n').filter(Boolean) : (lang === "en"
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


  const displayOfficials = profil?.officials && profil.officials.length > 0 
    ? profil.officials 
    : officials;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative bg-primary-dark text-white py-14 sm:py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={homepage?.heroImageProfil || "/images/hero_gendeng.png"}
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
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tint text-primary font-extrabold text-xs uppercase tracking-wider mb-2">
              <span>📜</span>
              <span>{tr(t.profil.historyTag, lang)}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight mt-1">
              {tr(t.profil.historyH2, lang)}
            </h2>
          </div>
          <div className="text-medium text-xs sm:text-sm leading-relaxed space-y-4 text-justify">
            {lang === "en" ? (
              <>
                <p className="font-extrabold text-dark text-sm sm:text-base mb-2 text-center">The History of Kampung Gendeng: From Abdi Dalem&apos;s Gending to Cultural Heritage</p>
                <p>The history of Kampung Gendeng in Baciro is deeply rooted in local oral traditions. The unique name does not refer to roof tiles or any other denotative meaning, but originated from a mispronunciation of the word <em>gending</em> (Javanese musical composition).</p>
                <p>Long ago, a royal court artist (Abdi Dalem) lived in this area, which was surrounded by rice fields. He frequently played and taught Javanese gamelan. The beautiful <em>gending</em> melodies attracted local farmers and passersby who eventually joined the practice.</p>
                <p>Phrases like &quot;Ayo latihan gending!&quot; (Let&apos;s practice gending!) gradually shifted in pronunciation to &quot;Gendeng&quot; over time. Historically, the area was also known for producing padas stone, further defining its geographical identity with sub-areas like Gendeng Padasan and Gendeng Sapen.</p>
                <p>Today, Kampung Gendeng stands strong as a cultural pillar in Kelurahan Baciro, where the artistic legacy of the Abdi Dalem lives on through the community&apos;s collective spirit in preserving regional arts.</p>
              </>
            ) : (
              <>
                <p className="font-extrabold text-dark text-sm sm:text-base mb-2 text-center">Sejarah Kampung Gendeng: Dari Alunan Gending Abdi Dalem Hingga Warisan Kebudayaan</p>
                <p>Keberadaan Kampung Gendeng yang terletak di wilayah Kelurahan Baciro tidak lepas dari rekam jejak sejarah dan tradisi lisan yang diwariskan secara turun-temurun. Namanya yang unik kerap memantik rasa ingin tahu masyarakat luas. Konon, penamaan &quot;Gendeng&quot; tidak berkaitan dengan pembuatan genteng bangunan atau makna denotatif lainnya, melainkan bermula dari kekeliruan pelafalan atau kesleo lidah dari kata dasar <em>gending</em>.</p>
                <p>Kisah ini bermula di masa lampau ketika kawasan tersebut masih didominasi oleh hamparan sawah. Bermukimlah seorang Abdi Dalem seniman pengrawit Keraton Yogyakarta di sekitar area yang kini menjadi lapangan dekat pos ronda/pemukiman warga. Di sela-sela aktivitasnya, sang Abdi Dalem sering memainkan dan melatih gending-gending gamelan Jawa. Alunan merdu gending tersebut kerap terdengar hingga ke area persawahan dan menarik perhatian para petani serta warga sekitar yang melintas.</p>
                <p>Berawal dari rasa tertarik, masyarakat yang melintas mulai mampir untuk melihat, berkumpul (jagong), hingga akhirnya ikut berlatih gending bersama. Ajakan berkumpul seperti &quot;Ayo latihan gending!&quot; atau &quot;Latihan gending ning ngendi?&quot; menjadi perbincangan harian yang sangat populer di kalangan warga. Seiring berjalannya waktu, lidah masyarakat setempat yang terbiasa menyebut aktivitas &quot;latihan gending&quot; tersebut secara perlahan bergeser pelafalannya menjadi &quot;Gendeng&quot;.</p>
                <p>Meskipun terdapat anggapan dari sebagian pihak bahwa nama wilayah tersebut berasal dari sentra produksi genteng, penelusuran sejarah lokal menunjukkan hal yang berbeda. Secara historis, wilayah sekitar justru dikenal sebagai area penghasil batu padas. Pembagian nama sub-wilayah seperti Gendeng Padasan dan Gendeng Sapen (area yang dahulu banyak digunakan warga untuk memelihara sapi) semakin mempertegas identitas geografis dan histori kawasan ini di masa lalu.</p>
                <p>Kini, Kampung Gendeng berdiri kokoh sebagai salah satu pilar kebudayaan di Kelurahan Baciro. Akar kesenian yang ditanamkan oleh sang Abdi Dalem di masa lalu terbukti tidak pudar ditelan zaman. Semangat khalayak sawah yang berkumpul untuk menabuh gamelan di pos ronda era dulu kini bertransformasi menjadi semangat kolektif warga dalam melestarikan berbagai kesenian daerah hingga saat ini.</p>
              </>
            )}
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
            <div className="md:col-span-7 bg-primary text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-center shadow-ios-lg">
              <span className="text-accent font-extrabold text-xs uppercase tracking-wider">{tr(t.profil.misiLabel, lang)}</span>
              <div className="text-base sm:text-xl font-extrabold mt-3 sm:mt-4 leading-relaxed italic text-white/95 space-y-4">
                {visionMission.missions.map((mission, idx) => (
                  <p key={idx}>&ldquo;{mission}&rdquo;</p>
                ))}
              </div>
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
