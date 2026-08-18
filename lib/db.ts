"use client";

import { communityActivities } from "@/lib/communityData";

export type ContentStatus = "published" | "draft";

export interface WargaRecord {
  id: string;
  slug: string;
  category: "pkk" | "pemuda" | "rw-rt" | "karang-taruna" | "posyandu" | "lainnya";
  title: string;
  date: string;
  location: string;
  organizer: string;
  shortDesc: string;
  description: string;
  coverImage: string;
  gallery: string[];
  status: ContentStatus;
}

export interface WisataRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  description: string;
  coverImage: string;
  gallery: string[];
  status: ContentStatus;
}

export interface PotensiRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  ownerOrLoc: string;
  description: string;
  coverImage: string;
  status: ContentStatus;
}

export interface GaleriRecord {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  status: ContentStatus;
}

export interface ProfilRecord {
  villageName: string;
  districtName: string;
  regencyName: string;
  greetingTitle: string;
  greetingName: string;
  greetingRole: string;
  greetingMessage: string;
  greetingImage: string;
  historyText: string;
  visionText: string;
  missionList: string[];
  missionText: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  officials: { name: string; role: string; image: string }[];
}

export interface HomepageRecord {
  heroWelcome: string;
  heroTagline: string;
  heroDesc: string;
  heroImage: string;
  heroCtaText: string;
  heroImageProfil?: string;
  heroImagePotensi?: string;
  heroImageWisata?: string;
  heroImageWarga?: string;
  highlights?: unknown[]; // Allow JSON array
}

// Initial Default Seed Data
const initialWarga: WargaRecord[] = communityActivities.map((act) => ({
  id: act.id,
  slug: act.slug,
  category: (act.category === "all" ? "lainnya" : act.category) as WargaRecord["category"],
  title: act.title.id,
  date: act.date.id,
  location: act.location.id,
  organizer: act.organizer.id,
  shortDesc: act.shortDescription.id,
  description: act.description.id,
  coverImage: act.coverImage,
  gallery: act.gallery,
  status: "published",
}));

const initialWisata: WisataRecord[] = [
  {
    id: "ws-1",
    slug: "kampung-gendeng",
    title: "Kampung Gendeng",
    category: "Ekowisata",
    location: "Gendeng, Gondokusuman",
    description: "Kampung yang nyaman dengan suasana kekeluargaan yang masih terjaga.",
    coverImage: "/images/hero_gendeng.png",
    gallery: ["/images/hero_gendeng.png", "/images/community_event.png"],
    status: "published",
  },
  {
    id: "ws-2",
    slug: "lorong-mural",
    title: "Lorong Mural Gendeng",
    category: "Seni Budaya",
    location: "Gendeng, Gondokusuman",
    description: "Lorong penuh warna karya warga yang menjadi ikon kreatif Desa Gendeng.",
    coverImage: "/images/potensi_crafts.png",
    gallery: ["/images/potensi_crafts.png"],
    status: "published",
  },
  {
    id: "ws-3",
    slug: "fasilitas-umum-guyub",
    title: "Fasilitas Umum Guyub",
    category: "Fasilitas Umum",
    location: "Gendeng, Gondokusuman",
    description: "Pusat kegiatan masyarakat untuk berbagai acara dan kegiatan desa.",
    coverImage: "/images/community_event.png",
    gallery: ["/images/community_event.png"],
    status: "published",
  },
  {
    id: "ws-4",
    slug: "taman-gendeng",
    title: "Taman Gendeng",
    category: "Ekowisata",
    location: "Gendeng, Gondokusuman",
    description: "Ruang terbuka hijau bagi warga untuk berkumpul dan bersantai.",
    coverImage: "/images/wisata_waterfall.png",
    gallery: ["/images/wisata_waterfall.png"],
    status: "published",
  },
];

const initialPotensi: PotensiRecord[] = [
  {
    id: "p-1",
    slug: "keripik-tempe",
    title: "Keripik Tempe Gendeng",
    category: "Makanan & Minuman",
    ownerOrLoc: "Gendeng, Yogyakarta",
    description: "Keripik tempe renyah buatan warga Desa Gendeng.",
    coverImage: "/images/potensi_crafts.png",
    status: "published",
  },
  {
    id: "p-2",
    slug: "batik-gendeng",
    title: "Batik Gendeng",
    category: "Kerajinan",
    ownerOrLoc: "Gendeng, Yogyakarta",
    description: "Kain batik dengan motif khas lokal Gendeng.",
    coverImage: "/images/potensi_crafts.png",
    status: "published",
  },
  {
    id: "p-3",
    slug: "konveksi-busana",
    title: "Konveksi & Busana",
    category: "Fashion",
    ownerOrLoc: "Gendeng, Yogyakarta",
    description: "Produksi pakaian, hijab, dan seragam berkualitas.",
    coverImage: "/images/potensi_crafts.png",
    status: "published",
  },
  {
    id: "p-4",
    slug: "kopi-gendeng",
    title: "Kopi Gendeng",
    category: "Makanan & Minuman",
    ownerOrLoc: "Gendeng, Yogyakarta",
    description: "Kopi bubuk pilihan dengan cita rasa khas.",
    coverImage: "/images/potensi_crafts.png",
    status: "published",
  },
];

const initialGaleri: GaleriRecord[] = [
  { id: "g-1", title: "Tradisi Gunungan Warga", category: "Budaya", imageUrl: "/images/community_event.png", date: "2026-06-15", status: "published" },
  { id: "g-2", title: "Pemandangan Kampung Gendeng", category: "Lingkungan", imageUrl: "/images/hero_gendeng.png", date: "2026-05-10", status: "published" },
  { id: "g-3", title: "Workshop Batik & Anyaman", category: "UMKM", imageUrl: "/images/potensi_crafts.png", date: "2026-04-22", status: "published" },
];

const initialProfil: ProfilRecord = {
  villageName: "Kampung Gendeng",
  districtName: "Gondokusuman",
  regencyName: "Kota Yogyakarta",
  greetingTitle: "Sambutan Ketua RW / Tokoh Masyarakat",
  greetingName: "Bpk. Heru Prasetyo",
  greetingRole: "Ketua RW 05 Kampung Gendeng",
  greetingMessage: "Website ini hadir sebagai media informasi resmi Kampung Gendeng untuk masyarakat, sekaligus jendela dunia untuk mengenal potensi, budaya, dan perkembangan kampung kami.",
  greetingImage: "/images/kades_portrait.png",
  historyText: "Desa Gendeng terbentuk secara administratif dari penggabungan wilayah pemukiman asri di Kecamatan Gondokusuman, Yogyakarta.",
  visionText: "Terwujudnya Desa Gendeng yang Maju, Mandiri, Sejahtera, Berkarakter Budaya Luhur, dan Unggul dalam Sektor Agribisnis Terpadu pada Tahun 2030.",
  missionList: [
    "Meningkatkan kualitas pelayanan publik berbasis digital yang cepat, ramah, dan transparan.",
    "Mengembangkan sektor pertanian organik dan integrasi pertanian terpadu guna memperkuat ketahanan pangan warga.",
    "Mendorong pertumbuhan UMKM kreatif berbahan serat alam, bambu, dan potensi lokal lainnya.",
    "Melestarikan adat-istiadat, kesenian lokal, serta situs-situs budaya bersejarah di wilayah desa.",
  ],
  missionText: "1. Meningkatkan kualitas pelayanan publik berbasis digital yang cepat, ramah, dan transparan.\n2. Mengembangkan sektor pertanian organik dan integrasi pertanian terpadu guna memperkuat ketahanan pangan warga.\n3. Mendorong pertumbuhan UMKM kreatif berbahan serat alam, bambu, dan potensi lokal lainnya.\n4. Melestarikan adat-istiadat, kesenian lokal, serta situs-situs budaya bersejarah di wilayah desa.",
  contactAddress: "Balai Kampung Gendeng, RT 01 RW 05, Baciro, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55225",
  contactPhone: "+62 812-3456-7890",
  contactEmail: "halo@kampunggendeng.id",
  officials: [],
};

const initialHomepage: HomepageRecord = {
  heroWelcome: "Selamat Datang di",
  heroTagline: "Mengenalkan Desa, Memberdayakan Potensi, Mendunia!",
  heroDesc: "Desa Gendeng adalah kampung yang maju, mandiri, berbudaya dan terbuka untuk dunia.",
  heroImage: "/images/community_event.png",
  heroImageProfil: "/images/hero_gendeng.png",
  heroImagePotensi: "/images/community_event.png",
  heroImageWisata: "/images/community_event.png",
  heroImageWarga: "/images/community_event.png",
  heroCtaText: "Jelajahi Desa",
};

// Storage Utilities with dual backward compatibility (gendeng_db_ and gendeng_cms_)
function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`gendeng_db_${key}`) || localStorage.getItem(`gendeng_cms_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    const jsonStr = JSON.stringify(value);
    localStorage.setItem(`gendeng_db_${key}`, jsonStr);
    localStorage.setItem(`gendeng_cms_${key}`, jsonStr);
    window.dispatchEvent(new Event("gendeng_db_update"));
    window.dispatchEvent(new Event("gendeng_cms_update"));
  } catch (e: unknown) {
    console.error("Storage save failed:", e);
    // Rethrow to allow the UI to show an alert (e.g. QuotaExceededError)
    const isQuotaError = e instanceof Error && e.name === "QuotaExceededError";
    throw new Error(isQuotaError ? "Kapasitas memori browser penuh! Silakan hapus data lama atau gunakan gambar yang lebih kecil." : "Gagal menyimpan data ke database lokal.");
  }
}

// ─── AUTHENTICATION API ───
export function getAuthSession(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("gendeng_admin_auth") === "true";
}

export function setAuthSession(auth: boolean): void {
  if (typeof window === "undefined") return;
  if (auth) {
    localStorage.setItem("gendeng_admin_auth", "true");
  } else {
    localStorage.removeItem("gendeng_admin_auth");
  }
  window.dispatchEvent(new Event("gendeng_db_update"));
}

// ─── DATABASE READ & WRITE METHODS ───

// 1. WARGA & KOMUNITAS
export function getWargaDB(): WargaRecord[] {
  return getItem("warga", initialWarga);
}
export function saveWargaDB(item: Partial<WargaRecord> & { id?: string }): WargaRecord {
  const list = getWargaDB();
  let record: WargaRecord;
  if (item.id) {
    const idx = list.findIndex((w) => w.id === item.id);
    if (idx !== -1) {
      record = { ...list[idx], ...item } as WargaRecord;
      list[idx] = record;
    } else {
      record = { ...item, id: item.id } as WargaRecord;
      list.unshift(record);
    }
  } else {
    record = { ...item, id: `w-${Date.now()}` } as WargaRecord;
    list.unshift(record);
  }
  setItem("warga", list);
  return record;
}
export function deleteWargaDB(id: string): void {
  const list = getWargaDB().filter((w) => w.id !== id);
  setItem("warga", list);
}

// 2. WISATA & BUDAYA
export function getWisataDB(): WisataRecord[] {
  return getItem("wisata", initialWisata);
}
export function saveWisataDB(item: Partial<WisataRecord> & { id?: string }): WisataRecord {
  const list = getWisataDB();
  let record: WisataRecord;
  if (item.id) {
    const idx = list.findIndex((ws) => ws.id === item.id);
    if (idx !== -1) {
      record = { ...list[idx], ...item } as WisataRecord;
      list[idx] = record;
    } else {
      record = { ...item, id: item.id } as WisataRecord;
      list.unshift(record);
    }
  } else {
    record = { ...item, id: `ws-${Date.now()}` } as WisataRecord;
    list.unshift(record);
  }
  setItem("wisata", list);
  return record;
}
export function deleteWisataDB(id: string): void {
  const list = getWisataDB().filter((ws) => ws.id !== id);
  setItem("wisata", list);
}

// 3. POTENSI & EKONOMI
export function getPotensiDB(): PotensiRecord[] {
  return getItem("potensi", initialPotensi);
}
export function savePotensiDB(item: Partial<PotensiRecord> & { id?: string }): PotensiRecord {
  const list = getPotensiDB();
  let record: PotensiRecord;
  if (item.id) {
    const idx = list.findIndex((p) => p.id === item.id);
    if (idx !== -1) {
      record = { ...list[idx], ...item } as PotensiRecord;
      list[idx] = record;
    } else {
      record = { ...item, id: item.id } as PotensiRecord;
      list.unshift(record);
    }
  } else {
    record = { ...item, id: `p-${Date.now()}` } as PotensiRecord;
    list.unshift(record);
  }
  setItem("potensi", list);
  return record;
}
export function deletePotensiDB(id: string): void {
  const list = getPotensiDB().filter((p) => p.id !== id);
  setItem("potensi", list);
}

// 4. GALERI MEDIA
export function getGaleriDB(): GaleriRecord[] {
  return getItem("galeri", initialGaleri);
}
export function saveGaleriDB(item: Partial<GaleriRecord> & { id?: string }): GaleriRecord {
  const list = getGaleriDB();
  let record: GaleriRecord;
  if (item.id) {
    const idx = list.findIndex((g) => g.id === item.id);
    if (idx !== -1) {
      record = { ...list[idx], ...item } as GaleriRecord;
      list[idx] = record;
    } else {
      record = { ...item, id: item.id } as GaleriRecord;
      list.unshift(record);
    }
  } else {
    record = { ...item, id: `g-${Date.now()}` } as GaleriRecord;
    list.unshift(record);
  }
  setItem("galeri", list);
  return record;
}
export function deleteGaleriDB(id: string): void {
  const list = getGaleriDB().filter((g) => g.id !== id);
  setItem("galeri", list);
}

// 5. PROFIL DESA
export function getProfilDB(): ProfilRecord {
  return getItem("profil", initialProfil);
}
export function saveProfilDB(data: Partial<ProfilRecord>): ProfilRecord {
  const current = getProfilDB();
  const updated = { ...current, ...data };
  setItem("profil", updated);
  return updated;
}

// 6. HOMEPAGE
export function getHomepageDB(): HomepageRecord {
  return getItem("homepage", initialHomepage);
}
export function saveHomepageDB(data: Partial<HomepageRecord>): HomepageRecord {
  const current = getHomepageDB();
  const updated = { ...current, ...data };
  setItem("homepage", updated);
  return updated;
}
