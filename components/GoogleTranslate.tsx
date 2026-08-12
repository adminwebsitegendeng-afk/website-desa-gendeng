"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

export default function GoogleTranslate() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "id",
          includedLanguages: "en,id",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div id="google_translate_element" className="hidden" style={{ display: "none" }}></div>
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
    </>
  );
}
