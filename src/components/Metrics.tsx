"use client";

import { useLanguage } from "@/context/LanguageContext";
import { METRIC_LABELS } from "@/lib/constants";
import { SectionHead } from "./SectionHead";

export function Metrics() {
  const { t } = useLanguage();

  return (
    <section className="wrap">
      <SectionHead tag={t.metrics_tag} title={t.metrics_title} desc={t.metrics_desc} />

      <div className="metrics">
        {METRIC_LABELS.map((label) => (
          <div className="metric-row" key={label}>
            <span className="metric-label">{label}</span>
            <div className="metric-track">
              <div className="metric-fill" />
            </div>
            <span className="metric-val">?</span>
          </div>
        ))}
      </div>
    </section>
  );
}
