"use client";

import { useState, type CSSProperties, type Ref } from "react";
import { TIERS } from "@/lib/constants";
import { SITE_URL, STRENGTH_CALCULATOR_PATH } from "@/lib/site";
import type { LiftResult, Sex, StrengthResult, Unit } from "@/lib/strength/model";
import { fill, formatWeight, strongerThan, topPercent } from "@/lib/strength/format";
import { useStrengthStrings } from "./useStrengthStrings";

export interface ScoredResult {
  result: StrengthResult;
  // Sex at the time of scoring, so editing the form doesn't relabel a stale result.
  sex: Sex;
}

// Custom properties consumed by strength.css.
type ReadoutStyle = CSSProperties & { "--tier-color"?: string; "--p"?: number };

interface StrengthReadoutProps {
  scored: ScoredResult | null;
  unit: Unit;
  ref?: Ref<HTMLElement>;
}

export function StrengthReadout({ scored, unit, ref }: StrengthReadoutProps) {
  const s = useStrengthStrings();
  const tier = scored ? TIERS[scored.result.tierIndex] : null;
  const summary = scored
    ? fill(s.result_summary, { n: strongerThan(scored.result.percentile), group: s.groups[scored.sex] })
    : "";

  return (
    <section
      ref={ref}
      className={`sc-readout${scored ? " is-scored" : ""}`}
      style={tier ? ({ "--tier-color": tier.colorVar } as ReadoutStyle) : undefined}
    >
      <span className="sc-corner tl" aria-hidden="true" />
      <span className="sc-corner tr" aria-hidden="true" />
      <span className="sc-corner bl" aria-hidden="true" />
      <span className="sc-corner br" aria-hidden="true" />

      <h2 className="sc-readout-tag">{scored ? s.result_tag : s.idle_tag}</h2>
      <p className="sr-only" role="status">
        {summary}
      </p>

      {scored && tier ? (
        <ResultBody scored={scored} unit={unit} summary={summary} />
      ) : (
        <>
          <p className="sc-top sc-top--idle" aria-hidden="true">
            ??%
          </p>
          <TierLadder activeIndex={-1} />
          <p className="sc-summary">{s.idle_desc}</p>
        </>
      )}
    </section>
  );
}

interface ResultBodyProps {
  scored: ScoredResult;
  unit: Unit;
  summary: string;
}

function ResultBody({ scored, unit, summary }: ResultBodyProps) {
  const s = useStrengthStrings();
  const { result } = scored;
  const tier = TIERS[result.tierIndex];
  const top = topPercent(result.percentile);

  return (
    // key restarts the entrance animation on every new calculation.
    <div className="sc-result" key={`${result.z}-${result.lifts.length}`}>
      <p className="sc-top-pre">{s.result_pre}</p>
      <p className="sc-top">{fill(s.result_top, { n: top })}</p>
      <p className="sc-badge">
        {tier.name}
        <span aria-hidden="true"> · </span>
        <span className="sc-badge-tag">{tier.tag}</span>
      </p>

      <TierLadder activeIndex={result.tierIndex} />
      <p className="sc-summary" aria-hidden="true">
        {summary}
      </p>

      <ul className="sc-liftres-list">
        {result.lifts.map((lift) => (
          <LiftRow key={lift.lift} lift={lift} unit={unit} />
        ))}
      </ul>

      <div className="sc-actions">
        <ShareButton text={fill(s.share_text, { n: top, tier: tier.name })} />
        <a className="sc-scanlink" href="#app">
          {s.scan_link}
        </a>
      </div>
      <p className="sc-disclaimer">{s.disclaimer}</p>
    </div>
  );
}

function LiftRow({ lift, unit }: { lift: LiftResult; unit: Unit }) {
  const s = useStrengthStrings();
  const style: ReadoutStyle = {
    "--p": lift.percentile / 100,
    "--tier-color": TIERS[lift.tierIndex].colorVar,
  };
  const next = lift.nextTier
    ? fill(s.lift_next, {
        tier: TIERS[lift.nextTier.tierIndex].name,
        weight: formatWeight(lift.nextTier.oneRepMaxKg, unit, "plate-up"),
      })
    : s.lift_maxed;

  return (
    <li className="sc-liftres" style={style}>
      <div className="sc-liftres-head">
        <span className="sc-liftres-name">{s.lift_names[lift.lift]}</span>
        <span className="sc-liftres-pct">{fill(s.lift_top, { n: topPercent(lift.percentile) })}</span>
      </div>
      <div className="sc-bar" aria-hidden="true">
        <div className="sc-bar-fill" />
      </div>
      <p className="sc-liftres-meta">
        {fill(s.lift_1rm, { weight: formatWeight(lift.oneRepMaxKg, unit) })}
        <span aria-hidden="true"> · </span>
        <span className="sc-liftres-next">{next}</span>
      </p>
    </li>
  );
}

function TierLadder({ activeIndex }: { activeIndex: number }) {
  const s = useStrengthStrings();

  return (
    <div className="sc-ladder" aria-hidden="true">
      <ol className="sc-ladder-steps">
        {TIERS.map((tier, index) => (
          <li
            key={tier.name}
            className={index === activeIndex ? "is-active" : index < activeIndex ? "is-passed" : undefined}
            style={{ "--tier-color": tier.colorVar } as ReadoutStyle}
          />
        ))}
      </ol>
      <div className="sc-ladder-ends">
        <span>{s.ladder_low}</span>
        <span>{s.ladder_high}</span>
      </div>
    </div>
  );
}

type ShareStatus = "idle" | "copied" | "failed";

function ShareButton({ text }: { text: string }) {
  const s = useStrengthStrings();
  const [status, setStatus] = useState<ShareStatus>("idle");
  const url = `${SITE_URL}${STRENGTH_CALCULATOR_PATH}`;

  async function handleShare() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ text, url });
      } catch (error) {
        // AbortError means the user closed the share sheet — not a failure.
        if (!(error instanceof DOMException && error.name === "AbortError")) setStatus("failed");
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <>
      <button type="button" className="sc-ghost-btn" onClick={handleShare}>
        {status === "copied" ? s.share_copied : s.share}
      </button>
      {status === "failed" && (
        <p className="sc-share-failed" role="status">
          {s.share_failed}
        </p>
      )}
    </>
  );
}
