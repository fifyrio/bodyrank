"use client";

import { useLanguage } from "@/context/LanguageContext";
import { TIERS } from "@/lib/constants";
import { SectionHead } from "./SectionHead";
import type { CSSProperties } from "react";

// Custom property consumed by .rung { --tier-color }.
type TierStyle = CSSProperties & { "--tier-color": string };

export function Ladder() {
  const { t } = useLanguage();

  return (
    <section className="wrap">
      <SectionHead tag={t.ladder_tag} title={t.ladder_title} desc={t.ladder_desc} />

      <div className="ladder">
        {TIERS.map((tier) => (
          <div className="rung" key={tier.name} style={{ "--tier-color": tier.colorVar } as TierStyle}>
            <span className="rung-name">{tier.name}</span>
            <span className="rung-tag">{tier.tag}</span>
          </div>
        ))}

        <div className="rung you" style={{ "--tier-color": "var(--violet)" } as TierStyle}>
          <span className="rung-name">{t.you_label}</span>
          <span className="rung-tag">{t.you_value}</span>
        </div>
      </div>
    </section>
  );
}
