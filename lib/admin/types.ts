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
  greetingMessage: string;
  historyText: string;
  visionText: string;
  missionList: string[];
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
}

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
  status: ContentStatus;
}

export interface GaleriItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
}

export interface HomepageData {
  heroWelcome: string;
  heroTagline: string;
  heroDesc: string;
  heroImage: string;
}
