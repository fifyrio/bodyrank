"use client";

import { useLanguage } from "@/context/LanguageContext";
import { APP_SCREENS } from "@/lib/constants";
import { SectionHead } from "./SectionHead";

export function PhoneShowcase() {
  const { t } = useLanguage();

  // Duplicate the screen list so the vertical scroll loops seamlessly:
  // translating the track by exactly -50% lands on an identical frame.
  const reel = [...APP_SCREENS, ...APP_SCREENS];

  return (
    <section className="showcase">
      <SectionHead tag={t.gal_tag} title={t.gal_title} desc={t.gal_desc} />

      <div className="showcase-stage">
        <span className="showcase-glow showcase-glow--violet" aria-hidden="true" />
        <span className="showcase-glow showcase-glow--cyan" aria-hidden="true" />

        <div className="phone">
          <span className="phone-notch" aria-hidden="true" />
          <div className="phone-screen">
            <div className="reel">
              {reel.map((screen, i) => (
                <div className="reel-item" key={i}>
                  {/* Plain img: the reel duplicates + transforms confuse lazy
                      observers, and each frame is a tiny pre-optimized webp. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screen.src}
                    alt={i < APP_SCREENS.length ? screen.alt : ""}
                    aria-hidden={i >= APP_SCREENS.length}
                    width={480}
                    height={1041}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
            <span className="phone-scanline" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
