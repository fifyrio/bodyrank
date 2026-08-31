import { Topbar } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
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
        <Gallery />
        <CoreLoop />
        <Ladder />
        <Metrics />
        <FooterCta />
      </main>
    </>
  );
}
