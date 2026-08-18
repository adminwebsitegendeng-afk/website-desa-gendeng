import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "@/components/PublicLayoutWrapper";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import GoogleTranslate from "@/components/GoogleTranslate";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://website-desa-gendeng.vercel.app"),
  title: {
    default: "Website Resmi Kampung Gendeng | Yogyakarta",
    template: "%s | Kampung Gendeng",
  },
  description:
    "Portal Informasi Resmi Kampung Gendeng, Gondokusuman, Yogyakarta. Temukan potensi ekonomi UMKM, budaya lokal, pariwisata, dan kegiatan warga kami.",
  keywords: ["Kampung Gendeng", "Desa Gendeng", "Gondokusuman", "Yogyakarta", "UMKM Jogja", "Wisata Jogja", "Desa Wisata"],
  authors: [{ name: "Pemerintah Kampung Gendeng" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://website-desa-gendeng.vercel.app",
    siteName: "Kampung Gendeng",
    title: "Website Resmi Kampung Gendeng | Yogyakarta",
    description: "Portal Informasi Resmi Kampung Gendeng, Gondokusuman, Yogyakarta. Temukan potensi ekonomi UMKM, budaya lokal, pariwisata, dan kegiatan warga kami.",
    images: [
      {
        url: "/images/hero_gendeng.png",
        width: 1200,
        height: 630,
        alt: "Kampung Gendeng Yogyakarta",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} font-sans antialiased text-[#111827] bg-white flex flex-col min-h-screen`}
      >
        <GoogleTranslate />
        <LanguageProvider>
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
