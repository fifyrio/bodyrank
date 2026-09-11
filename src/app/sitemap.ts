import type { MetadataRoute } from "next";
import { LANGS, languageAlternates, localizePath } from "@/lib/locale";
import { STRENGTH_CALCULATOR_PATH, absoluteUrl } from "@/lib/site";

const PAGES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: STRENGTH_CALCULATOR_PATH, changeFrequency: "monthly", priority: 0.9 },
] as const;

// One entry per page per language, each carrying the full hreflang set.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, absoluteUrl(href)]),
    );

    return LANGS.map((lang) => ({
      url: absoluteUrl(localizePath(path, lang)),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
