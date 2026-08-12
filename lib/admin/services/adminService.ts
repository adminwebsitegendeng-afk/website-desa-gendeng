import {
  WargaRecord,
  WisataRecord,
  PotensiRecord,
  GaleriRecord,
  ProfilRecord,
  HomepageRecord,
} from "@/lib/db";
import { DashboardStats } from "../types";
import { supabase } from "@/lib/supabase";

export function subscribeDBChange(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  
  window.addEventListener("focus", callback);
  
  return () => {
    window.removeEventListener("focus", callback);
  };
}

// ─── DASHBOARD STATS ───
export async function getDashboardStats(): Promise<DashboardStats> {
  const [warga, wisata, potensi, galeri] = await Promise.all([
    supabase.from("warga_komunitas").select("id", { count: "exact" }),
    supabase.from("wisata_budaya").select("id", { count: "exact" }),
    supabase.from("potensi_ekonomi").select("id", { count: "exact" }),
    supabase.from("galeri_media").select("id", { count: "exact" }),
  ]);

  return {
    totalKegiatan: warga.count || 0,
    totalWisata: wisata.count || 0,
    totalPotensi: potensi.count || 0,
    totalGaleri: galeri.count || 0,
  };
}

// ─── AUTHENTICATION ───
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("gendeng_admin_auth") === "true";
}
export function loginAdminSession(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("gendeng_admin_auth", "true");
}
export function logoutAdminSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("gendeng_admin_auth");
}

// ─── PROFIL DESA ───
export async function getProfilData(): Promise<ProfilRecord> {
  const { data, error } = await supabase.from("profil_desa").select("*").eq("id", 1).single();
  if (error || !data) {
    return {
      villageName: "Kampung Gendeng",
      districtName: "Gondokusuman",
      regencyName: "Kota Yogyakarta",
      greetingTitle: "Sambutan",
      greetingName: "-",
      greetingRole: "-",
      greetingMessage: "-",
      greetingImage: "",
      historyText: "-",
      visionText: "-",
      missionList: [],
      contactAddress: "-",
      contactPhone: "-",
      contactEmail: "-",
    } as ProfilRecord;
  }
  return data as ProfilRecord;
}
export async function updateProfilData(data: Partial<ProfilRecord>): Promise<ProfilRecord> {
  const { data: updated, error } = await supabase.from("profil_desa").upsert({ id: 1, ...data }).select().single();
  if (error) throw error;
  return updated as ProfilRecord;
}

// ─── WARGA & KOMUNITAS ───
export async function getWargaList(): Promise<WargaRecord[]> {
  const { data, error } = await supabase.from("warga_komunitas").select("*").order("date", { ascending: false });
  if (error) return [];
  return data as WargaRecord[];
}
export async function getWargaBySlug(slug: string): Promise<WargaRecord | undefined> {
  const { data, error } = await supabase.from("warga_komunitas").select("*").eq("slug", slug).single();
  if (error) return undefined;
  return data as WargaRecord;
}
export async function createWarga(data: Omit<WargaRecord, "id">): Promise<WargaRecord> {
  const id = `w-${Date.now()}`;
  const { data: created, error } = await supabase.from("warga_komunitas").insert({ id, ...data }).select().single();
  if (error) throw error;
  return created as WargaRecord;
}
export async function updateWarga(id: string, data: Partial<WargaRecord>): Promise<WargaRecord> {
  const { data: updated, error } = await supabase.from("warga_komunitas").update(data).eq("id", id).select().single();
  if (error) throw error;
  return updated as WargaRecord;
}
export async function deleteWarga(id: string): Promise<boolean> {
  const { error } = await supabase.from("warga_komunitas").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ─── WISATA & BUDAYA ───
export async function getWisataList(): Promise<WisataRecord[]> {
  const { data, error } = await supabase.from("wisata_budaya").select("*");
  if (error) return [];
  return data as WisataRecord[];
}
export async function createWisata(data: Omit<WisataRecord, "id">): Promise<WisataRecord> {
  const id = `ws-${Date.now()}`;
  const { data: created, error } = await supabase.from("wisata_budaya").insert({ id, ...data }).select().single();
  if (error) throw error;
  return created as WisataRecord;
}
export async function updateWisata(id: string, data: Partial<WisataRecord>): Promise<WisataRecord> {
  const { data: updated, error } = await supabase.from("wisata_budaya").update(data).eq("id", id).select().single();
  if (error) throw error;
  return updated as WisataRecord;
}
export async function deleteWisata(id: string): Promise<boolean> {
  const { error } = await supabase.from("wisata_budaya").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ─── POTENSI & EKONOMI ───
export async function getPotensiList(): Promise<PotensiRecord[]> {
  const { data, error } = await supabase.from("potensi_ekonomi").select("*");
  if (error) return [];
  return data as PotensiRecord[];
}
export async function createPotensi(data: Omit<PotensiRecord, "id">): Promise<PotensiRecord> {
  const id = `p-${Date.now()}`;
  const { data: created, error } = await supabase.from("potensi_ekonomi").insert({ id, ...data }).select().single();
  if (error) throw error;
  return created as PotensiRecord;
}
export async function updatePotensi(id: string, data: Partial<PotensiRecord>): Promise<PotensiRecord> {
  const { data: updated, error } = await supabase.from("potensi_ekonomi").update(data).eq("id", id).select().single();
  if (error) throw error;
  return updated as PotensiRecord;
}
export async function deletePotensi(id: string): Promise<boolean> {
  const { error } = await supabase.from("potensi_ekonomi").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ─── GALERI MEDIA ───
export async function getGaleriList(): Promise<GaleriRecord[]> {
  const { data, error } = await supabase.from("galeri_media").select("*").order("date", { ascending: false });
  if (error) return [];
  return data as GaleriRecord[];
}
export async function createGaleriItem(data: Omit<GaleriRecord, "id">): Promise<GaleriRecord> {
  const id = `g-${Date.now()}`;
  const { data: created, error } = await supabase.from("galeri_media").insert({ id, ...data }).select().single();
  if (error) throw error;
  return created as GaleriRecord;
}
export async function deleteGaleriItem(id: string): Promise<boolean> {
  const { error } = await supabase.from("galeri_media").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ─── HOMEPAGE SETTINGS ───
export async function getHomepageData(): Promise<HomepageRecord> {
  const { data, error } = await supabase.from("homepage_settings").select("*").eq("id", 1).single();
  if (error || !data) {
    return {
      heroWelcome: "Selamat Datang di",
      heroTagline: "Website Resmi Desa",
      heroDesc: "Memajukan desa dan masyarakat.",
      heroImage: "/images/hero_village.png",
      heroCtaText: "Jelajahi",
      highlights: [
        { type: "custom", id: "", icon: "🌾", customTitle: "Pertanian", customDesc: "Lahan subur dan hasil pertanian berkualitas", customImage: "/images/hero_village.png" },
        { type: "custom", id: "", icon: "🛍️", customTitle: "UMKM Unggulan", customDesc: "Berbagai produk lokal kreatif", customImage: "/images/potensi_crafts.png" },
        { type: "custom", id: "", icon: "🎭", customTitle: "Budaya & Tradisi", customDesc: "Kekayaan budaya dan tradisi", customImage: "/images/community_event.png" },
        { type: "custom", id: "", icon: "⛰️", customTitle: "Pariwisata Alam", customDesc: "Keindahan alam yang menjadi daya tarik", customImage: "/images/wisata_waterfall.png" },
      ]
    } as HomepageRecord;
  }
  
  // Ensure highlights exists even for old records
  if (!data.highlights || !Array.isArray(data.highlights) || data.highlights.length === 0) {
    data.highlights = [
      { type: "custom", id: "", icon: "🌾", customTitle: "Pertanian", customDesc: "Lahan subur dan hasil pertanian berkualitas", customImage: "/images/hero_village.png" },
      { type: "custom", id: "", icon: "🛍️", customTitle: "UMKM Unggulan", customDesc: "Berbagai produk lokal kreatif", customImage: "/images/potensi_crafts.png" },
      { type: "custom", id: "", icon: "🎭", customTitle: "Budaya & Tradisi", customDesc: "Kekayaan budaya dan tradisi", customImage: "/images/community_event.png" },
      { type: "custom", id: "", icon: "⛰️", customTitle: "Pariwisata Alam", customDesc: "Keindahan alam yang menjadi daya tarik", customImage: "/images/wisata_waterfall.png" },
    ];
  }
  
  return data as HomepageRecord;
}
export async function updateHomepageData(data: Partial<HomepageRecord>): Promise<HomepageRecord> {
  const { data: updated, error } = await supabase.from("homepage_settings").upsert({ id: 1, ...data }).select().single();
  if (error) throw error;
  return updated as HomepageRecord;
}
