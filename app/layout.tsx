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
  title: "Website Resmi Kampung Gendeng - Portal Informasi & Pelayanan Publik",
  description:
    "Portal Informasi Resmi Kampung Gendeng, Gondokusuman, Yogyakarta. Potensi ekonomi, budaya lokal, dan pelayanan warga.",
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
