import type { Metadata } from "next";
import { Topbar } from "@/components/Topbar";
import { HowStrongPage } from "@/components/strength/HowStrongPage";
import type { Lang } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL, STRENGTH_CALCULATOR_PATH, absoluteUrl } from "@/lib/site";
import { STRENGTH_STRINGS } from "@/lib/strength/i18n";
import "@/components/strength/strength.css";

export function strengthMetadata(lang: Lang): Metadata {
  const s = STRENGTH_STRINGS[lang];
  return pageMetadata({
    lang,
    path: STRENGTH_CALCULATOR_PATH,
    title: s.title,
    description: s.meta_description,
  });
}

function buildJsonLd(lang: Lang) {
  const s = STRENGTH_STRINGS[lang];
  const pageUrl = absoluteUrl(localizePath(STRENGTH_CALCULATOR_PATH, lang));
  const homeUrl = absoluteUrl(localizePath("/", lang));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: s.title,
        url: pageUrl,
        description: s.meta_description,
        inLanguage: lang,
        applicationCategory: "HealthApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "FAQPage",
        inLanguage: lang,
        mainEntity: s.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: homeUrl },
          { "@type": "ListItem", position: 2, name: s.h1_accent, item: pageUrl },
        ],
      },
    ],
  };
}

export function StrengthPage({ lang }: { lang: Lang }) {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, first-party data; "<" is escaped so the JSON can't close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)).replace(/</g, "\\u003c") }}
      />
      <Topbar />
      <HowStrongPage />
    </>
  );
}
