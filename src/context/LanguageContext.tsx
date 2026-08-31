"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { STRINGS, type Lang, type Strings } from "@/lib/i18n";

interface LanguageValue {
  lang: Lang;
  t: Strings;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageValue | null>(null);

const STORAGE_KEY = "br-lang";

function isLang(value: string | null): value is Lang {
  return value === "en" || value === "es";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore a previously chosen language on mount.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) {
      setLangState(stored);
    }
  }, []);

  // Keep <html lang> and document title in sync with the active language.
  useEffect(() => {
    const dict = STRINGS[lang];
    document.documentElement.lang = dict.htmllang;
    document.title = dict.title;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LanguageValue>(
    () => ({ lang, t: STRINGS[lang], setLang }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
