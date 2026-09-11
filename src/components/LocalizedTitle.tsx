"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/i18n";

// Swaps document.title when the visitor changes language. Crawlers get the
// English title from each page's server metadata.
export function LocalizedTitle({ titles }: { titles: Record<Lang, string> }) {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = titles[lang];
  }, [lang, titles]);

  return null;
}
