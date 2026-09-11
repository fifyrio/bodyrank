"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import { localizePath, splitLocale } from "@/lib/locale";
import { STRENGTH_CALCULATOR_PATH } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";

const LANG_LABELS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function Topbar() {
  const { lang, t } = useLanguage();
  const { path } = splitLocale(usePathname());

  return (
    <header className="topbar">
      <Link href={localizePath("/", lang)} className="brand" aria-label={t.nav_home}>
        <Image src="/logo.webp" alt="" width={28} height={28} priority />
        <span className="brand-word">BODYRANK</span>
      </Link>

      <div className="topbar-right">
        <nav className="topnav" aria-label={t.nav_label}>
          <Link
            href={localizePath(STRENGTH_CALCULATOR_PATH, lang)}
            aria-current={path === STRENGTH_CALCULATOR_PATH ? "page" : undefined}
          >
            {t.nav_calculator}
          </Link>
        </nav>

        {/* Real links to the same page in each language, so crawlers can follow them. */}
        <div className="langtoggle" role="group" aria-label="Language">
          {LANG_LABELS.map(({ code, label }) => (
            <Link
              key={code}
              href={localizePath(path, code)}
              hrefLang={code}
              lang={code}
              className={code === lang ? "active" : undefined}
              aria-current={code === lang ? "true" : undefined}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
