"use client";

import Image from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";
import { APP_STORE_URL } from "@/lib/site";
import { useStrengthStrings } from "./useStrengthStrings";

// Funnel step: calculator result → the photo-based physique scan in the app.
export function AppCta() {
  const s = useStrengthStrings();

  return (
    <section id="app" className="wrap sc-cta-section" aria-labelledby="app-cta-title">
      <div className="sc-cta">
        <div className="sc-cta-copy">
          <p className="section-tag">{s.cta_tag}</p>
          <h2 id="app-cta-title" className="sc-cta-title">
            {s.cta_title}
          </h2>
          <p className="sc-cta-desc">{s.cta_desc}</p>

          <ul className="sc-cta-points">
            {s.cta_points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          {APP_STORE_URL ? (
            <a className="sc-appstore" href={APP_STORE_URL}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79a4.43 4.43 0 0 0-3.74 2.27c-1.6 2.77-.41 6.87 1.14 9.12.76 1.1 1.66 2.33 2.84 2.29 1.14-.05 1.57-.74 2.95-.74 1.37 0 1.76.74 2.96.71 1.23-.02 2-1.11 2.75-2.22.87-1.27 1.22-2.51 1.24-2.57-.03-.01-2.38-.91-2.4-3.62ZM14.1 5.84c.63-.76 1.05-1.82.94-2.87-.9.04-2 .6-2.65 1.36-.58.67-1.09 1.75-.95 2.78 1 .08 2.03-.51 2.66-1.27Z"
                />
              </svg>
              <span>
                <small>{s.cta_app_store_pre}</small>
                {s.cta_app_store}
              </span>
            </a>
          ) : (
            <div className="sc-cta-waitlist">
              <p className="sc-cta-soon">{s.cta_soon}</p>
              <WaitlistForm />
            </div>
          )}
        </div>

        <div className="sc-cta-visual" aria-hidden="true">
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-screen">
              <Image src="/app/screen-1.webp" alt="" fill sizes="220px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
