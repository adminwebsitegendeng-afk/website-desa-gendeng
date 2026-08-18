export type ContentStatus = "published" | "draft";

export interface DashboardStats {
  totalKegiatan: number;
  totalWisata: number;
  totalPotensi: number;
  totalGaleri: number;
}

export interface ProfilData {
  greetingTitle: string;
  greetingName: string;
  greetingRole: string;
  greetingHeadline: string;
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

export type MapLocation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  description: string;
  created_at?: string;
};

export interface WargaItem {
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

export interface WisataItem {
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

export interface PotensiItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  ownerOrLoc: string;
  description: string;
  coverImage: string;
  gallery?: string[];
  status: ContentStatus;
}

export interface GaleriItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
}

export interface HighlightReference {
  type: "warga" | "wisata" | "potensi" | "custom";
  id: string; // The ID of the item, or empty if custom
  icon: string;
  // If custom or data is missing, we fallback to these:
  customTitle?: string;
  customDesc?: string;
  customImage?: string;
}

export interface HomepageData {
  heroWelcome: string;
  heroTagline: string;
  heroDesc: string;
  heroImage: string;
  heroImageProfil?: string;
  heroImagePotensi?: string;
  heroImageWisata?: string;
  heroImageWarga?: string;
  heroImagePos?: string;
  highlights: HighlightReference[];
}
