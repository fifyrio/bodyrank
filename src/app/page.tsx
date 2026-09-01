import { Topbar } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { PhoneShowcase } from "@/components/PhoneShowcase";
import { CoreLoop } from "@/components/CoreLoop";
import { Ladder } from "@/components/Ladder";
import { Metrics } from "@/components/Metrics";
import { FooterCta } from "@/components/FooterCta";

export default function Home() {
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
