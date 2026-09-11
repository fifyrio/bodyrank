// Strength percentile model behind the /how-strong-am-i calculator.
// Pure and import-free so it runs under `node --test` without a build step.
//
// Method: estimate a one-rep max, credit it for age, scale it allometrically to a
// reference bodyweight, then place the resulting bodyweight multiple on a
// log-normal curve fitted through published lifter strength standards.

export type Sex = "male" | "female";
export type Lift = "bench" | "squat" | "deadlift";
export type Unit = "lb" | "kg";

export const LIFTS: readonly Lift[] = ["bench", "squat", "deadlift"];

export const KG_PER_LB = 0.45359237;

export const LIMITS = {
  age: { min: 13, max: 90 },
  bodyweightKg: { min: 30, max: 250 },
  liftKg: { min: 1, max: 600 },
  reps: { min: 1, max: 12 },
} as const;

// z-scores of the 5th, 20th, 50th, 80th and 95th percentile of people who lift.
const ANCHOR_Z: readonly number[] = [-1.6449, -0.8416, 0, 0.8416, 1.6449];

// One-rep max as a multiple of bodyweight at each anchor percentile, for a lifter
// at the reference bodyweight in their peak strength years (23–40). Blended from
// widely published strength standards; results are estimates, not measurements.
const STANDARDS: Record<Sex, Record<Lift, readonly number[]>> = {
  male: {
    bench: [0.5, 0.75, 1.05, 1.45, 1.85],
    squat: [0.75, 1.1, 1.45, 2.0, 2.5],
    deadlift: [1.0, 1.4, 1.85, 2.4, 2.9],
  },
  female: {
    bench: [0.3, 0.5, 0.7, 0.95, 1.25],
    squat: [0.5, 0.8, 1.1, 1.5, 1.9],
    deadlift: [0.65, 1.0, 1.35, 1.8, 2.3],
  },
};

const REFERENCE_BODYWEIGHT_KG: Record<Sex, number> = { male: 80, female: 62 };

// Strength grows with roughly bodyweight^(2/3), so heavier lifters need a lower
// bodyweight multiple to be equally strong relative to their size.
const ALLOMETRIC_EXPONENT = 2 / 3;

// Age credit multipliers (Foster / McCulloch style), linearly interpolated.
const AGE_COEFFICIENTS: readonly (readonly [age: number, coefficient: number])[] = [
  [13, 1.3], [14, 1.23], [15, 1.18], [16, 1.13], [17, 1.08], [18, 1.06],
  [19, 1.04], [20, 1.03], [21, 1.02], [22, 1.01], [23, 1], [40, 1],
  [45, 1.05], [50, 1.13], [55, 1.21], [60, 1.32], [65, 1.45], [70, 1.6],
  [75, 1.77], [80, 2], [90, 2.5],
];

// Rank tiers, index-aligned with TIERS in lib/constants (Iron → Aesthetic).
// Boundaries are percentiles of lifters; minZ is the matching z-score.
export const STRENGTH_TIERS: readonly { minPercentile: number; minZ: number }[] = [
  { minPercentile: 0, minZ: -Infinity },
  { minPercentile: 25, minZ: -0.6745 },
  { minPercentile: 50, minZ: 0 },
  { minPercentile: 80, minZ: 0.8416 },
  { minPercentile: 95, minZ: 1.6449 },
  { minPercentile: 99, minZ: 2.3263 },
];

const MIN_PERCENTILE = 0.1;
const MAX_PERCENTILE = 99.9;

export interface LiftEntry {
  lift: Lift;
  weightKg: number;
  reps: number;
}

export interface StrengthInput {
  sex: Sex;
  age: number;
  bodyweightKg: number;
  lifts: readonly LiftEntry[];
}

export interface NextTier {
  tierIndex: number;
  oneRepMaxKg: number;
}

export interface LiftResult {
  lift: Lift;
  oneRepMaxKg: number;
  z: number;
  percentile: number;
  tierIndex: number;
  nextTier: NextTier | null;
}

export interface StrengthResult {
  z: number;
  percentile: number;
  tierIndex: number;
  lifts: readonly LiftResult[];
}

export function toKg(value: number, unit: Unit): number {
  return unit === "lb" ? value * KG_PER_LB : value;
}

export function fromKg(kg: number, unit: Unit): number {
  return unit === "lb" ? kg / KG_PER_LB : kg;
}

// Epley formula. Accuracy drops past ~12 reps, hence LIMITS.reps.
export function estimateOneRepMax(weight: number, reps: number): number {
  return reps <= 1 ? weight : weight * (1 + reps / 30);
}

export function ageCoefficient(age: number): number {
  const first = AGE_COEFFICIENTS[0];
  const last = AGE_COEFFICIENTS[AGE_COEFFICIENTS.length - 1];
  if (age <= first[0]) return first[1];
  if (age >= last[0]) return last[1];

  const upper = AGE_COEFFICIENTS.findIndex(([a]) => a >= age);
  const [a0, c0] = AGE_COEFFICIENTS[upper - 1];
  const [a1, c1] = AGE_COEFFICIENTS[upper];
  return c0 + ((age - a0) / (a1 - a0)) * (c1 - c0);
}

// Abramowitz–Stegun 7.1.26 erf approximation (max error ~1.5e-7).
export function normalCdf(z: number): number {
  const t = 1 / (1 + (0.3275911 * Math.abs(z)) / Math.SQRT2);
  const poly =
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
      0.254829592) *
    t;
  const erf = 1 - poly * Math.exp(-(z * z) / 2);
  return z >= 0 ? (1 + erf) / 2 : (1 - erf) / 2;
}

export function percentileFromZ(z: number): number {
  return Math.min(MAX_PERCENTILE, Math.max(MIN_PERCENTILE, normalCdf(z) * 100));
}

export function tierIndexForZ(z: number): number {
  let index = 0;
  STRENGTH_TIERS.forEach((tier, i) => {
    if (z >= tier.minZ) index = i;
  });
  return index;
}

// Bodyweight scale factor so that a lifter at the reference weight gets 1 / bw.
function sizeDivisor(sex: Sex, bodyweightKg: number): number {
  const ref = REFERENCE_BODYWEIGHT_KG[sex];
  return bodyweightKg ** ALLOMETRIC_EXPONENT * ref ** (1 - ALLOMETRIC_EXPONENT);
}

// Index of the anchor segment to interpolate (or extrapolate) within.
function segmentFor(points: readonly number[], value: number): number {
  const i = points.findIndex((p) => p > value);
  if (i === -1) return points.length - 2;
  return Math.max(0, i - 1);
}

function zForRatio(sex: Sex, lift: Lift, ratio: number): number {
  const xs = STANDARDS[sex][lift].map(Math.log);
  const x = Math.log(ratio);
  const i = segmentFor(xs, x);
  const t = (x - xs[i]) / (xs[i + 1] - xs[i]);
  return ANCHOR_Z[i] + t * (ANCHOR_Z[i + 1] - ANCHOR_Z[i]);
}

function ratioForZ(sex: Sex, lift: Lift, z: number): number {
  const xs = STANDARDS[sex][lift].map(Math.log);
  const i = segmentFor(ANCHOR_Z, z);
  const t = (z - ANCHOR_Z[i]) / (ANCHOR_Z[i + 1] - ANCHOR_Z[i]);
  return Math.exp(xs[i] + t * (xs[i + 1] - xs[i]));
}

export function zForLift(
  sex: Sex,
  lift: Lift,
  oneRepMaxKg: number,
  bodyweightKg: number,
  age: number,
): number {
  const ratio = (oneRepMaxKg * ageCoefficient(age)) / sizeDivisor(sex, bodyweightKg);
  return zForRatio(sex, lift, ratio);
}

// Inverse of zForLift: the one-rep max that lands exactly on a given z-score.
export function oneRepMaxForZ(
  sex: Sex,
  lift: Lift,
  z: number,
  bodyweightKg: number,
  age: number,
): number {
  return (ratioForZ(sex, lift, z) * sizeDivisor(sex, bodyweightKg)) / ageCoefficient(age);
}

function scoreLift(input: StrengthInput, entry: LiftEntry): LiftResult {
  const { sex, age, bodyweightKg } = input;
  const oneRepMaxKg = estimateOneRepMax(entry.weightKg, entry.reps);
  const z = zForLift(sex, entry.lift, oneRepMaxKg, bodyweightKg, age);
  const tierIndex = tierIndexForZ(z);
  const next = STRENGTH_TIERS[tierIndex + 1];

  return {
    lift: entry.lift,
    oneRepMaxKg,
    z,
    percentile: percentileFromZ(z),
    tierIndex,
    nextTier: next
      ? {
          tierIndex: tierIndex + 1,
          oneRepMaxKg: oneRepMaxForZ(sex, entry.lift, next.minZ, bodyweightKg, age),
        }
      : null,
  };
}

// Overall score is the mean z-score across the lifts entered.
export function calculateStrength(input: StrengthInput): StrengthResult {
  if (input.lifts.length === 0) {
    throw new Error("calculateStrength requires at least one lift");
  }

  const lifts = input.lifts.map((entry) => scoreLift(input, entry));
  const z = lifts.reduce((sum, l) => sum + l.z, 0) / lifts.length;

  return { z, percentile: percentileFromZ(z), tierIndex: tierIndexForZ(z), lifts };
}

// ---- form parsing -------------------------------------------------------

// `null` means the field was left blank; NaN means it could not be parsed.
export interface LiftFormValue {
  weightKg: number | null;
  reps: number | null;
}

export interface StrengthFormValues {
  sex: Sex;
  age: number | null;
  bodyweightKg: number | null;
  lifts: Record<Lift, LiftFormValue>;
}

export type StrengthField = "age" | "bodyweight" | "lifts" | Lift;
export type StrengthErrors = Partial<Record<StrengthField, true>>;

export type ParseResult =
  | { ok: true; input: StrengthInput }
  | { ok: false; errors: StrengthErrors };

function inRange(value: number | null, range: { min: number; max: number }): value is number {
  return value !== null && Number.isFinite(value) && value >= range.min && value <= range.max;
}

export function parseStrengthForm(values: StrengthFormValues): ParseResult {
  const errors: StrengthErrors = {};
  if (!inRange(values.age, LIMITS.age)) errors.age = true;
  if (!inRange(values.bodyweightKg, LIMITS.bodyweightKg)) errors.bodyweight = true;

  const entered = LIFTS.filter((lift) => values.lifts[lift].weightKg !== null);
  entered.forEach((lift) => {
    const { weightKg, reps } = values.lifts[lift];
    const repsOk = reps === null || (Number.isInteger(reps) && inRange(reps, LIMITS.reps));
    if (!inRange(weightKg, LIMITS.liftKg) || !repsOk) errors[lift] = true;
  });
  // Reps typed without a weight: flag the lift rather than silently skipping it.
  LIFTS.forEach((lift) => {
    const { weightKg, reps } = values.lifts[lift];
    if (weightKg === null && reps !== null) errors[lift] = true;
  });
  if (entered.length === 0 && !LIFTS.some((lift) => errors[lift])) errors.lifts = true;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    input: {
      sex: values.sex,
      age: values.age as number,
      bodyweightKg: values.bodyweightKg as number,
      lifts: entered.map((lift) => ({
        lift,
        weightKg: values.lifts[lift].weightKg as number,
        reps: values.lifts[lift].reps ?? 1,
      })),
    },
  };
}
