"use client";

import { useLanguage } from "@/context/LanguageContext";
import { STRENGTH_STRINGS, type StrengthStrings } from "@/lib/strength/i18n";

export function useStrengthStrings(): StrengthStrings {
  const { lang } = useLanguage();
  return STRENGTH_STRINGS[lang];
}
