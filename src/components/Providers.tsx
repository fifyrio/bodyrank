"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { WaitlistProvider } from "@/context/WaitlistContext";
import type { Lang } from "@/lib/i18n";

export function Providers({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <LanguageProvider lang={lang}>
      <WaitlistProvider>{children}</WaitlistProvider>
    </LanguageProvider>
  );
}
