import type { Metadata } from "next";
import type { Lang } from "./i18n";
import { languageAlternates, localizePath } from "./locale";
import { SITE_NAME } from "./site";

const OG_LOCALE: Record<Lang, string> = { en: "en_US", es: "es_ES" };

interface PageMetadataInput {
  lang: Lang;
  // Language-neutral path, e.g. "/how-strong-am-i".
  path: string;
  title: string;
  description: string;
}

// Per-page metadata with a self-referencing canonical and full hreflang set.
// Relative URLs resolve against metadataBase from the root layout.
export function pageMetadata({ lang, path, title, description }: PageMetadataInput): Metadata {
  const url = localizePath(path, lang);

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
