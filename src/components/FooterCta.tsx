"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { localizePath } from "@/lib/locale";
import { STRENGTH_CALCULATOR_PATH } from "@/lib/site";
import { WaitlistForm } from "./WaitlistForm";

export function FooterCta() {
  const { t, lang } = useLanguage();

  return (
    <section className="footer-cta wrap">
      <h2 className="section-title">{t.footer_title}</h2>
      <p className="section-desc" style={{ maxWidth: 440, margin: "0 auto" }}>
        {t.footer_desc}
      </p>

      <WaitlistForm />

      <p className="footer-calc">
        <Link href={localizePath(STRENGTH_CALCULATOR_PATH, lang)}>{t.footer_calc_link}</Link>
      </p>
      <p className="footer-note">{t.footer_note}</p>
      <p className="footer-links">{t.footer_links}</p>
    </section>
  );
}
