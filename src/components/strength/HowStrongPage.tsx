"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { localizePath } from "@/lib/locale";
import type { Unit } from "@/lib/strength/model";
import { AppCta } from "./AppCta";
import { StandardsTable } from "./StandardsTable";
import { StrengthCalculator } from "./StrengthCalculator";
import { StrengthFaq } from "./StrengthFaq";
import { useStrengthStrings } from "./useStrengthStrings";

export function HowStrongPage() {
  const s = useStrengthStrings();
  const { lang } = useLanguage();
  // Shared so the standards table follows the calculator's unit toggle.
  // Spanish-speaking markets lift in kilograms.
  const [unit, setUnit] = useState<Unit>(lang === "es" ? "kg" : "lb");

  return (
    <>
      <main>
        <header className="wrap sc-intro">
          <p className="eyebrow">{s.eyebrow}</p>
          <h1 className="sc-title">
            <span className="accent">{s.h1_accent}</span>
            {s.h1_rest}
          </h1>
          <p className="sc-sub">{s.sub}</p>
        </header>

        <StrengthCalculator unit={unit} onUnitChange={setUnit} />
        <AppCta />
        <StandardsTable unit={unit} />
        <StrengthFaq />
      </main>

      <footer className="sc-footer">
        <Link href={localizePath("/", lang)}>{s.footer_back}</Link>
        <p>{s.footer_line}</p>
      </footer>
    </>
  );
}
