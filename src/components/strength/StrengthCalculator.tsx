"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import {
  LIFTS,
  LIMITS,
  calculateStrength,
  fromKg,
  parseStrengthForm,
  toKg,
  type Lift,
  type Sex,
  type StrengthErrors,
  type StrengthField,
  type Unit,
} from "@/lib/strength/model";
import { convertWeight, fill, parseNumber } from "@/lib/strength/format";
import { Field, InputBox, Segmented } from "./FormControls";
import { StrengthReadout, type ScoredResult } from "./StrengthReadout";
import { useStrengthStrings } from "./useStrengthStrings";

interface LiftFields {
  weight: string;
  reps: string;
}

interface FormFields {
  sex: Sex;
  age: string;
  bodyweight: string;
  lifts: Record<Lift, LiftFields>;
}

const EMPTY_LIFT: LiftFields = { weight: "", reps: "" };

const INITIAL_FIELDS: FormFields = {
  sex: "male",
  age: "",
  bodyweight: "",
  lifts: { bench: EMPTY_LIFT, squat: EMPTY_LIFT, deadlift: EMPTY_LIFT },
};

const SEXES: readonly Sex[] = ["male", "female"];
const UNITS: readonly Unit[] = ["lb", "kg"];
const FIELD_ORDER: readonly StrengthField[] = ["age", "bodyweight", ...LIFTS, "lifts"];

function mapLifts<T>(fn: (lift: Lift) => T): Record<Lift, T> {
  return { bench: fn("bench"), squat: fn("squat"), deadlift: fn("deadlift") };
}

function weightToKg(raw: string, unit: Unit): number | null {
  const value = parseNumber(raw);
  return value === null ? null : toKg(value, unit);
}

// On narrow screens the readout sits below the form; bring it into view.
function revealIfOffscreen(element: HTMLElement | null) {
  if (!element) return;
  const { top } = element.getBoundingClientRect();
  if (top < window.innerHeight * 0.5 && top > 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

interface StrengthCalculatorProps {
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
}

export function StrengthCalculator({ unit, onUnitChange }: StrengthCalculatorProps) {
  const s = useStrengthStrings();
  const baseId = useId();
  const readoutRef = useRef<HTMLElement>(null);

  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<StrengthErrors>({});
  const [scored, setScored] = useState<ScoredResult | null>(null);

  const fieldId = (field: StrengthField) => `${baseId}-${field}`;
  const maxLift = Math.round(fromKg(LIMITS.liftKg.max, unit));

  function setLift(lift: Lift, patch: Partial<LiftFields>) {
    setFields((prev) => ({
      ...prev,
      lifts: { ...prev.lifts, [lift]: { ...prev.lifts[lift], ...patch } },
    }));
  }

  function handleUnitChange(next: Unit) {
    if (next === unit) return;
    setFields((prev) => ({
      ...prev,
      bodyweight: convertWeight(prev.bodyweight, unit, next),
      lifts: mapLifts((lift) => ({
        ...prev.lifts[lift],
        weight: convertWeight(prev.lifts[lift].weight, unit, next),
      })),
    }));
    onUnitChange(next);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const parsed = parseStrengthForm({
      sex: fields.sex,
      age: parseNumber(fields.age),
      bodyweightKg: weightToKg(fields.bodyweight, unit),
      lifts: mapLifts((lift) => ({
        weightKg: weightToKg(fields.lifts[lift].weight, unit),
        reps: parseNumber(fields.lifts[lift].reps),
      })),
    });

    if (!parsed.ok) {
      setErrors(parsed.errors);
      const first = FIELD_ORDER.find((field) => parsed.errors[field]);
      const focusTarget = first === "lifts" ? "bench" : first;
      if (focusTarget) document.getElementById(fieldId(focusTarget))?.focus();
      return;
    }

    setErrors({});
    setScored({ result: calculateStrength(parsed.input), sex: parsed.input.sex });
    requestAnimationFrame(() => revealIfOffscreen(readoutRef.current));
  }

  return (
    <section className="wrap sc-tool" aria-label={s.tool_label}>
      <form className="sc-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="sc-fieldset">
          <legend className="sc-legend">{s.about_legend}</legend>

          <div className="sc-toggles">
            <Segmented
              name={`${baseId}-sex`}
              label={s.sex_label}
              options={SEXES.map((value) => ({ value, label: s.sexes[value] }))}
              value={fields.sex}
              onChange={(sex) => setFields((prev) => ({ ...prev, sex }))}
            />
            <Segmented
              name={`${baseId}-unit`}
              label={s.unit_label}
              options={UNITS.map((value) => ({ value, label: value.toUpperCase() }))}
              value={unit}
              onChange={handleUnitChange}
            />
          </div>

          <div className="sc-grid">
            <Field
              id={fieldId("age")}
              label={s.age_label}
              inputMode="numeric"
              placeholder="30"
              value={fields.age}
              onChange={(age) => setFields((prev) => ({ ...prev, age }))}
              error={errors.age ? s.err_age : undefined}
            />
            <Field
              id={fieldId("bodyweight")}
              label={s.bodyweight_label}
              inputMode="decimal"
              placeholder={unit === "lb" ? "180" : "82"}
              suffix={unit}
              value={fields.bodyweight}
              onChange={(bodyweight) => setFields((prev) => ({ ...prev, bodyweight }))}
              error={
                errors.bodyweight
                  ? fill(s.err_bodyweight, {
                      min: Math.ceil(fromKg(LIMITS.bodyweightKg.min, unit)),
                      max: Math.floor(fromKg(LIMITS.bodyweightKg.max, unit)),
                      unit,
                    })
                  : undefined
              }
            />
          </div>
        </fieldset>

        <fieldset className="sc-fieldset">
          <legend className="sc-legend">{s.lifts_legend}</legend>

          {LIFTS.map((lift) => {
            const errorId = errors[lift] ? `${fieldId(lift)}-error` : undefined;
            return (
              <div className="sc-lift" key={lift}>
                <label className="sc-lift-name" htmlFor={fieldId(lift)}>
                  {s.lift_names[lift]}
                </label>
                <InputBox
                  id={fieldId(lift)}
                  inputMode="decimal"
                  placeholder="—"
                  suffix={unit}
                  value={fields.lifts[lift].weight}
                  onChange={(weight) => setLift(lift, { weight })}
                  errorId={errorId}
                />
                <InputBox
                  id={`${fieldId(lift)}-reps`}
                  inputMode="numeric"
                  placeholder="1"
                  suffix={s.reps_label}
                  ariaLabel={`${s.lift_names[lift]} — ${s.reps_label}`}
                  value={fields.lifts[lift].reps}
                  onChange={(reps) => setLift(lift, { reps })}
                  errorId={errorId}
                />
                {errorId && (
                  <p className="sc-error sc-lift-error" id={errorId}>
                    {fill(s.err_lift, { max: maxLift, unit })}
                  </p>
                )}
              </div>
            );
          })}

          {errors.lifts && (
            <p className="sc-error" role="alert">
              {s.err_lifts}
            </p>
          )}
          <p className="sc-hint">{s.lifts_hint}</p>
        </fieldset>

        <button type="submit" className="wl-btn sc-submit">
          {s.submit}
        </button>
      </form>

      <StrengthReadout ref={readoutRef} scored={scored} unit={unit} />
    </section>
  );
}
