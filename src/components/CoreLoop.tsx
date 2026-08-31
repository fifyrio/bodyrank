"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionHead } from "./SectionHead";

// One icon per loop step, in order: Scan, Rank, Train.
const STEP_ICONS = [
  <>
    <path d="M4 8V5a1 1 0 0 1 1-1h3M4 16v3a1 1 0 0 0 1 1h3M20 8V5a1 1 0 0 0-1-1h-3M20 16v3a1 1 0 0 1-1 1h-3" />
    <circle cx="12" cy="12" r="3.4" />
  </>,
  <>
    <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
    <path d="M9 12.3l2 2 4-4.2" />
  </>,
  <>
    <path d="M4 8v8M20 8v8" />
    <path d="M2 12h2M20 12h2" />
    <rect x="6" y="6" width="3" height="12" rx="0.8" />
    <rect x="15" y="6" width="3" height="12" rx="0.8" />
    <path d="M9 12h6" />
  </>,
];

export function CoreLoop() {
  const { t } = useLanguage();

  return (
    <section className="wrap">
      <SectionHead tag={t.loop_tag} title={t.loop_title} desc={t.loop_desc} />

      <div className="loop">
        {t.loop_steps.map((step, i) => (
          <div className="loop-step" key={step.num}>
            <div className="loop-num">{step.num}</div>
            <div className="loop-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {STEP_ICONS[i]}
              </svg>
            </div>
            <div className="loop-title">{step.title}</div>
            <div className="loop-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
