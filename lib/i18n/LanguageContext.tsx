"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "@/lib/i18n/translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "id",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gendeng_lang") as Lang;
      if (saved === "id" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      // Fallback to default "id" if localStorage is unavailable
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("gendeng_lang", l);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
