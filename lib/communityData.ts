export type CommunityCategory =
  | "all"
  | "pkk"
  | "pemuda"
  | "rw-rt"
  | "karang-taruna"
  | "posyandu"
  | "lainnya";

export interface CommunityActivity {
  id: string;
  slug: string;
  category: CommunityCategory;
  categoryName: { id: string; en: string };
  title: { id: string; en: string };
  date: { id: string; en: string };
  shortDescription: { id: string; en: string };
  description: { id: string; en: string };
  coverImage: string;
  gallery: string[];
  organizer: { id: string; en: string };
  location: { id: string; en: string };
}

export const communityActivities: CommunityActivity[] = [
  {
    id: "pkk-rw",
    slug: "pkk-rw",
    category: "pkk",
    categoryName: { id: "PKK", en: "PKK" },
    title: {
      id: "Pelatihan Keterampilan Ibu-Ibu PKK Kampung Gendeng",
      en: "Gendeng Women's PKK Skill & Craft Training"
    },
    date: {
      id: "12 Juni 2026",
      en: "June 12, 2026"
    },
    shortDescription: {
      id: "Pertemuan rutin dan workshop kerajinan tangan kreatif untuk pemberdayaan ekonomi keluarga warga Gendeng.",
      en: "Routine meeting and creative handicraft workshop for household economic empowerment of Gendeng residents."
    },
    description: {
      id: "Ibu-ibu PKK Kampung Gendeng secara rutin mengadakan pertemuan bulanan yang diisi dengan pelatihan keterampilan usaha mikro dan tata kelola lingkungan sehat. Kegiatan ini menjadi sarana silaturahmi sekaligus wadah inovasi olahan makanan olahan lokal dan kerajinan bambu.",
      en: "The PKK women of Kampung Gendeng regularly hold monthly meetings filled with micro-business skill training and healthy environmental management. This event serves as a gathering space and innovation platform for local food processing and bamboo crafts."
    },
    coverImage: "/images/community_event.png",
    gallery: [
      "/images/community_event.png",
      "/images/potensi_crafts.png",
      "/images/hero_gendeng.png"
    ],
    organizer: {
      id: "Tim Penggerak PKK RW 05 Kampung Gendeng",
      en: "PKK RW 05 Committee Kampung Gendeng"
    },
    location: {
      id: "Balai Warga Kampung Gendeng",
      en: "Gendeng Community Hall"
    }
  },
  {
    id: "pemuda-gendeng",
    slug: "pemuda-gendeng",
    category: "pemuda",
    categoryName: { id: "Pemuda", en: "Youth" },
    title: {
      id: "Mural Kreatif & Aksi Bersih Lingkungan Pemuda Gendeng",
      en: "Gendeng Youth Creative Mural & Neighborhood Cleanup"
    },
    date: {
      id: "28 Mei 2026",
      en: "May 28, 2026"
    },
    shortDescription: {
      id: "Inisiatif para pemuda kampung dalam mempercantik lorong warga dengan karya mural khas dan aksi kebersihan bersama.",
      en: "Kampung youth initiative in beautifying resident alleys with distinctive murals and collective cleaning."
    },
    description: {
      id: "Kelompok pemuda Kampung Gendeng aktif menggerakkan kegiatan positif seperti pembuatan mural seni di dinding lorong warga dan kerja bakti kebersihan selokan. Semangat kebersamaan pemuda membuat kampung terlihat bersih, ramah, dan bernilai seni tinggi.",
      en: "The Gendeng youth group actively initiates positive activities such as wall murals in residential alleys and drainage cleanup work. The youth's spirit of togetherness makes the neighborhood clean, friendly, and artistically vibrant."
    },
    coverImage: "/images/potensi_crafts.png",
    gallery: [
      "/images/potensi_crafts.png",
      "/images/community_event.png",
      "/images/wisata_waterfall.png"
    ],
    organizer: {
      id: "Paguyuban Pemuda Gendeng",
      en: "Gendeng Youth Association"
    },
    location: {
      id: "Lorong Seni RW 06 Gendeng",
      en: "RW 06 Art Alley Gendeng"
    }
  },
  {
    id: "pengurus-rw",
    slug: "pengurus-rw",
    category: "rw-rt",
    categoryName: { id: "RW & RT", en: "RW & RT" },
    title: {
      id: "Rapat Koordinasi & Rembuk Warga Pengurus RT/RW",
      en: "RT/RW Administrators Coordination & Resident Assembly"
    },
    date: {
      id: "05 Juni 2026",
      en: "June 5, 2026"
    },
    shortDescription: {
      id: "Musyawarah berkala pengurus wilayah untuk membahas pelayanan publik dan rencana pembangunan sarana kampung.",
      en: "Periodic administrative meeting to discuss public services and neighborhood infrastructure development."
    },
    description: {
      id: "Forum rembuk warga yang dihadiri seluruh Ketua RT dan Tokoh Masyarakat Kampung Gendeng untuk menyerap aspirasi pembangunan fisik, keamanan lingkungan pos ronda, dan pengelolaan sampah pemukiman.",
      en: "A neighborhood assembly attended by all RT Heads and Community Figures of Kampung Gendeng to gather aspirations for infrastructure, security guard posts, and residential waste management."
    },
    coverImage: "/images/hero_gendeng.png",
    gallery: [
      "/images/hero_gendeng.png",
      "/images/community_event.png",
      "/images/kades_portrait.png"
    ],
    organizer: {
      id: "Pengurus RW 05 & RT Kampung Gendeng",
      en: "RW 05 & RT Board Kampung Gendeng"
    },
    location: {
      id: "Balai Warga Gendeng",
      en: "Gendeng Community Hall"
    }
  },
  {
    id: "karang-taruna",
    slug: "karang-taruna",
    category: "karang-taruna",
    categoryName: { id: "Karang Taruna", en: "Youth Organization" },
    title: {
      id: "Turnamen Olahraga & Pentas Seni Karang Taruna",
      en: "Karang Taruna Sports Tournament & Cultural Arts Show"
    },
    date: {
      id: "17 Mei 2026",
      en: "May 17, 2026"
    },
    shortDescription: {
      id: "Ajang silaturahmi olahraga voli antar-RT dan kompetisi kesenian tradisional karya remaja kampung.",
      en: "Inter-RT volleyball tournament and traditional art competition performed by neighborhood youth."
    },
    description: {
      id: "Karang Taruna Kampung Gendeng menyelenggarakan kegiatan olahraga dan panggung seni budaya tahunan. Kegiatan ini mempererat keakraban antar-warga lintas generasi sekaligus mengasah bakat kepemimpinan generasi muda.",
      en: "Gendeng Karang Taruna organizes annual sports events and a cultural art stage. This activity strengthens bonds across generations while honing the leadership talents of the youth."
    },
    coverImage: "/images/wisata_waterfall.png",
    gallery: [
      "/images/wisata_waterfall.png",
      "/images/community_event.png",
      "/images/potensi_crafts.png"
    ],
    organizer: {
      id: "Karang Taruna Muda Mandiri Gendeng",
      en: "Muda Mandiri Youth Organization Gendeng"
    },
    location: {
      id: "Lapangan Olahraga Gendeng",
      en: "Gendeng Sports Field"
    }
  },
  {
    id: "posyandu-balita",
    slug: "posyandu-balita",
    category: "posyandu",
    categoryName: { id: "Posyandu", en: "Integrated Health Post" },
    title: {
      id: "Layanan Kesehatan Posyandu Balita & Lansia",
      en: "Posyandu Health Services for Toddlers & Seniors"
    },
    date: {
      id: "10 Juni 2026",
      en: "June 10, 2026"
    },
    shortDescription: {
      id: "Pemeriksaan kesehatan berkala, imunisasi balita, dan pemberian makanan tambahan (PMT) nutrisi warga.",
      en: "Regular health checkups, toddler immunizations, and supplementary nutrition (PMT) distribution."
    },
    description: {
      id: "Kader Kesehatan Posyandu Kampung Gendeng rutin memberikan pelayanan penimbangan balita, pemantauan tumbuh kembang anak, pemeriksaan tensi lansia, serta penyuluhan gizi seimbang untuk menjaga kesehatan warga secara merata.",
      en: "Gendeng Posyandu health cadres regularly provide toddler growth monitoring, senior blood pressure checks, and balanced nutrition education to maintain community health."
    },
    coverImage: "/images/community_event.png",
    gallery: [
      "/images/community_event.png",
      "/images/hero_gendeng.png",
      "/images/potensi_crafts.png"
    ],
    organizer: {
      id: "Kader Kesehatan Posyandu Gendeng",
      en: "Gendeng Posyandu Health Cadres"
    },
    location: {
      id: "Pos Kesehatan RW Gendeng",
      en: "Gendeng RW Health Post"
    }
  },
  {
    id: "gotong-royong",
    slug: "gotong-royong",
    category: "lainnya",
    categoryName: { id: "Lainnya", en: "Other" },
    title: {
      id: "Kerja Bakti Massal & Penghijauan Lingkungan Warga",
      en: "Mass Community Work & Neighborhood Greening Drive"
    },
    date: {
      id: "01 Juni 2026",
      en: "June 1, 2026"
    },
    shortDescription: {
      id: "Aksi gotong royong seluruh warga dalam menanam bibit tanaman hias dan membersihkan pemukiman.",
      en: "Collective community action in planting ornamental seedlings and cleaning residential areas."
    },
    description: {
      id: "Semangat guyub warga Kampung Gendeng terlihat nyata dalam aksi kerja bakti hari Minggu. Warga bahu-membahu menanam tanaman hias di sepanjang jalan kampung, mengecat pagar, dan menikmati hidangan tradisi bersama.",
      en: "The community spirit of Kampung Gendeng comes alive during Sunday cleanups. Residents work shoulder to shoulder planting flowers along neighborhood streets, painting fences, and sharing traditional meals."
    },
    coverImage: "/images/hero_gendeng.png",
    gallery: [
      "/images/hero_gendeng.png",
      "/images/potensi_crafts.png",
      "/images/community_event.png"
    ],
    organizer: {
      id: "Paguyuban Warga Gendeng Guyub",
      en: "Gendeng Resident Association"
    },
    location: {
      id: "Wilayah RW 05 & 06 Gendeng",
      en: "RW 05 & 06 Area Gendeng"
    }
  }
];

export function getCommunityBySlug(slug: string): CommunityActivity | undefined {
  return communityActivities.find((act) => act.slug === slug);
}
