import { Topbar } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { PhoneShowcase } from "@/components/PhoneShowcase";
import { CoreLoop } from "@/components/CoreLoop";
import { Ladder } from "@/components/Ladder";
import { Metrics } from "@/components/Metrics";
import { FooterCta } from "@/components/FooterCta";
import { LocalizedTitle } from "@/components/LocalizedTitle";
import { STRINGS } from "@/lib/i18n";

const TITLES = { en: STRINGS.en.title, es: STRINGS.es.title };

export default function Home() {
  return (
    <>
      <LocalizedTitle titles={TITLES} />
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
