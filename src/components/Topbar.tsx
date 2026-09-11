"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import { STRENGTH_CALCULATOR_PATH } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function Topbar() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="topbar">
      <Link href="/" className="brand" aria-label={t.nav_home}>
        <Image src="/logo.webp" alt="" width={28} height={28} priority />
        <span className="brand-word">BODYRANK</span>
      </Link>

      <div className="topbar-right">
        <nav className="topnav" aria-label={t.nav_label}>
          <Link
            href={STRENGTH_CALCULATOR_PATH}
            aria-current={pathname === STRENGTH_CALCULATOR_PATH ? "page" : undefined}
          >
            {t.nav_calculator}
          </Link>
        </nav>

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
    </header>
  );
}
