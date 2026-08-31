"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { WaitlistForm } from "./WaitlistForm";

export function Hero() {
  const { t } = useLanguage();

  return (
    <header className="hero">
      <div className="scanframe">
        <span className="c3" aria-hidden="true" />
        <span className="c4" aria-hidden="true" />

        <p className="eyebrow">
          <span className="dot" aria-hidden="true" />
          <span>{t.eyebrow}</span>
        </p>

        <div className="logo-mark">
          <Image
            src="/logomark.webp"
            alt=""
            width={88}
            height={88}
            priority
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <h1 className="headline">
          <span>{t.headline_pre}</span>
          <span className="accent">{t.headline_accent}</span>
          <span>{t.headline_post}</span>
        </h1>

        <p className="sub">{t.sub}</p>

        <WaitlistForm />

        <p className="wl-note">{t.note}</p>
      </div>
    </header>
  );
}
