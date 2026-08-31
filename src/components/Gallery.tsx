"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { SHOTS } from "@/lib/constants";
import { SectionHead } from "./SectionHead";

export function Gallery() {
  const { t } = useLanguage();

  return (
    <>
      <section>
        <SectionHead tag={t.gal_tag} title={t.gal_title} desc={t.gal_desc} />
      </section>

      <div className="gallery">
        {SHOTS.map((shot, i) => {
          const cap = t.shots[i]?.cap ?? shot.key;
          return (
            <div className="shot" key={shot.key}>
              <Image
                src={`/shots/${shot.key}.webp`}
                alt={cap}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                sizes="196px"
              />
              <div className="shot-cap">{cap}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
