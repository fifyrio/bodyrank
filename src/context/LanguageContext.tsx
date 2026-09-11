"use client";

import { createContext, useContext, useMemo } from "react";
import { STRINGS, type Lang, type Strings } from "@/lib/i18n";

interface LanguageValue {
  lang: Lang;
  t: Strings;
}

const LanguageContext = createContext<LanguageValue | null>(null);

// The language comes from the URL (/ vs /es), resolved by the root layout on
// the server, so SSR output and hydration always agree.
export function LanguageProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const value = useMemo<LanguageValue>(() => ({ lang, t: STRINGS[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
