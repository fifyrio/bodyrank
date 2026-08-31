"use client";

import Image from "next/image";
import type { Lang } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function Topbar() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="topbar">
      <div className="brand">
        <Image src="/logo.webp" alt="BodyRank logo" width={28} height={28} priority />
        BODYRANK
      </div>
      <div className="langtoggle" role="group" aria-label="Language">
        {LANGS.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            className={code === lang ? "active" : ""}
            aria-pressed={code === lang}
            onClick={() => setLang(code)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
