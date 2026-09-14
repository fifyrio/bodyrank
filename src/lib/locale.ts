// URL-based locales. English lives at the site root; every other language gets
// a /<lang> prefix, e.g. /how-strong-am-i ↔ /es/how-strong-am-i.

import type { Lang } from "./i18n";

export const LANGS: readonly Lang[] = ["en", "es"];
export const DEFAULT_LANG: Lang = "en";

export function localizePath(path: string, lang: Lang): string {
  if (lang === DEFAULT_LANG) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

// Splits a pathname into its language and the language-neutral path.
export function splitLocale(pathname: string): { lang: Lang; path: string } {
  for (const lang of LANGS) {
    if (lang === DEFAULT_LANG) continue;
    const prefix = `/${lang}`;
    if (pathname === prefix) return { lang, path: "/" };
    if (pathname.startsWith(`${prefix}/`)) return { lang, path: pathname.slice(prefix.length) };
  }
  return { lang: DEFAULT_LANG, path: pathname || "/" };
}

// hreflang map for one page: every language plus x-default (English).
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(LANGS.map((lang) => [lang, localizePath(path, lang)])),
    "x-default": localizePath(path, DEFAULT_LANG),
  };
}
