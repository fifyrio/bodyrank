"use client";

import { SectionHead } from "@/components/SectionHead";
import { useStrengthStrings } from "./useStrengthStrings";

// Native <details> keeps every answer in the DOM (indexable) and keyboard-accessible.
export function StrengthFaq() {
  const s = useStrengthStrings();

  return (
    <section className="wrap sc-section">
      <SectionHead tag={s.faq_tag} title={s.faq_title} desc={s.faq_desc} />

      <div className="sc-faq">
        {s.faq.map((item, index) => (
          <details className="sc-faq-item" key={item.q} open={index === 0}>
            <summary>
              <h3 className="sc-faq-q">{item.q}</h3>
            </summary>
            <p className="sc-faq-a">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
