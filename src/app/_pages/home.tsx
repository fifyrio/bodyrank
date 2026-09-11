import type { Metadata } from "next";
import { Topbar } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { PhoneShowcase } from "@/components/PhoneShowcase";
import { CoreLoop } from "@/components/CoreLoop";
import { Ladder } from "@/components/Ladder";
import { Metrics } from "@/components/Metrics";
import { FooterCta } from "@/components/FooterCta";
import { STRINGS, type Lang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function homeMetadata(lang: Lang): Metadata {
  const t = STRINGS[lang];
  return pageMetadata({ lang, path: "/", title: t.title, description: t.sub });
}

export function HomePage() {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <PhoneShowcase />
        <CoreLoop />
        <Ladder />
        <Metrics />
        <FooterCta />
      </main>
    </>
  );
}
