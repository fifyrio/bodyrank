import type { Metadata } from "next";
import { LocalizedTitle } from "@/components/LocalizedTitle";
import { Topbar } from "@/components/Topbar";
import { HowStrongPage } from "@/components/strength/HowStrongPage";
import { SITE_NAME, SITE_URL, STRENGTH_CALCULATOR_PATH } from "@/lib/site";
import { STRENGTH_STRINGS } from "@/lib/strength/i18n";
import "@/components/strength/strength.css";

const en = STRENGTH_STRINGS.en;
const PAGE_URL = `${SITE_URL}${STRENGTH_CALCULATOR_PATH}`;
const DESCRIPTION =
  "Free “how strong am I” test. Enter your bench, squat and deadlift to see your strength percentile for your age, sex and bodyweight — and your BodyRank tier.";
const TITLES = { en: STRENGTH_STRINGS.en.title, es: STRENGTH_STRINGS.es.title };

export const metadata: Metadata = {
  title: en.title,
  description: DESCRIPTION,
  alternates: { canonical: STRENGTH_CALCULATOR_PATH },
  openGraph: {
    title: en.title,
    description: DESCRIPTION,
    url: STRENGTH_CALCULATOR_PATH,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: en.title,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "How Strong Am I? — BodyRank Strength Calculator",
      url: PAGE_URL,
      description: DESCRIPTION,
      applicationCategory: "HealthApplication",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@type": "FAQPage",
      mainEntity: en.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "How Strong Am I?", item: PAGE_URL },
      ],
    },
  ],
};

export default function HowStrongAmIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, first-party data; "<" is escaped so the JSON can't close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <LocalizedTitle titles={TITLES} />
      <Topbar />
      <HowStrongPage />
    </>
  );
}
