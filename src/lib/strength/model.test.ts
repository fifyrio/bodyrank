import { test } from "node:test";
import assert from "node:assert/strict";
import {
  KG_PER_LB,
  STRENGTH_TIERS,
  ageCoefficient,
  calculateStrength,
  estimateOneRepMax,
  fromKg,
  normalCdf,
  oneRepMaxForZ,
  parseStrengthForm,
  percentileFromZ,
  tierIndexForZ,
  toKg,
  zForLift,
  type StrengthFormValues,
} from "./model.ts";

const close = (actual: number, expected: number, tolerance = 1e-3) =>
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≉ ${expected}`);

const blankLifts = (): StrengthFormValues["lifts"] => ({
  bench: { weightKg: null, reps: null },
  squat: { weightKg: null, reps: null },
  deadlift: { weightKg: null, reps: null },
});

test("converts between lb and kg losslessly", () => {
  close(toKg(100, "lb"), 100 * KG_PER_LB);
  close(fromKg(toKg(225, "lb"), "lb"), 225);
  assert.equal(toKg(80, "kg"), 80);
});

test("estimateOneRepMax returns the weight for a single and applies Epley above", () => {
  assert.equal(estimateOneRepMax(100, 1), 100);
  close(estimateOneRepMax(100, 5), 116.667);
});

test("ageCoefficient is 1 in peak years and credits younger and older lifters", () => {
  assert.equal(ageCoefficient(30), 1);
  assert.equal(ageCoefficient(40), 1);
  close(ageCoefficient(50), 1.13);
  close(ageCoefficient(47.5), 1.09);
  assert.ok(ageCoefficient(16) > 1);
  assert.equal(ageCoefficient(5), ageCoefficient(13));
  assert.equal(ageCoefficient(120), ageCoefficient(90));
});

test("normalCdf matches known values", () => {
  close(normalCdf(0), 0.5, 1e-6);
  close(normalCdf(1.6449), 0.95, 1e-4);
  close(normalCdf(-0.8416), 0.2, 1e-4);
});

test("percentileFromZ clamps extremes", () => {
  assert.equal(percentileFromZ(-20), 0.1);
  assert.equal(percentileFromZ(20), 99.9);
});

test("a lift exactly on a standard anchor lands on that percentile", () => {
  // 80 kg male, age 30, bench 1.05 × bodyweight = the median anchor.
  const z = zForLift("male", "bench", 84, 80, 30);
  close(z, 0, 1e-9);
  close(percentileFromZ(z), 50, 1e-4);
});

test("percentile increases with the weight lifted", () => {
  const light = zForLift("male", "squat", 100, 85, 30);
  const heavy = zForLift("male", "squat", 140, 85, 30);
  assert.ok(heavy > light);
});

test("at the same bodyweight multiple, the heavier lifter scores higher", () => {
  const small = zForLift("male", "deadlift", 60 * 2, 60, 30);
  const large = zForLift("male", "deadlift", 110 * 2, 110, 30);
  assert.ok(large > small);
});

test("the same lift scores higher for an older lifter", () => {
  const young = zForLift("female", "bench", 45, 62, 30);
  const older = zForLift("female", "bench", 45, 62, 60);
  assert.ok(older > young);
});

test("oneRepMaxForZ inverts zForLift, including extrapolated ranges", () => {
  for (const z of [-2.5, -1, 0, 0.5, 1.2, 2.3263, 3]) {
    const kg = oneRepMaxForZ("male", "bench", z, 92, 47);
    close(zForLift("male", "bench", kg, 92, 47), z, 1e-9);
  }
});

test("tierIndexForZ maps percentiles onto the six-tier ladder", () => {
  assert.equal(STRENGTH_TIERS.length, 6);
  assert.equal(tierIndexForZ(-3), 0); // Iron
  assert.equal(tierIndexForZ(-0.6745), 1); // Bronze at 25th
  assert.equal(tierIndexForZ(0.74), 2); // ~77th percentile → Silver
  assert.equal(tierIndexForZ(0.8416), 3); // Gold at 80th
  assert.equal(tierIndexForZ(2), 4); // Platinum
  assert.equal(tierIndexForZ(2.4), 5); // Aesthetic (top 1%)
});

test("calculateStrength averages z-scores across lifts", () => {
  const input = {
    sex: "male" as const,
    age: 30,
    bodyweightKg: 80,
    lifts: [
      { lift: "bench" as const, weightKg: 84, reps: 1 },
      { lift: "squat" as const, weightKg: 160, reps: 1 },
    ],
  };
  const result = calculateStrength(input);
  const meanZ = (result.lifts[0].z + result.lifts[1].z) / 2;

  close(result.z, meanZ, 1e-12);
  close(result.percentile, percentileFromZ(meanZ), 1e-12);
  assert.equal(result.tierIndex, tierIndexForZ(meanZ));
});

test("calculateStrength reports the weight needed for the next tier", () => {
  // Just above the median bench (84 kg), so solidly Silver.
  const result = calculateStrength({
    sex: "male",
    age: 30,
    bodyweightKg: 80,
    lifts: [{ lift: "bench", weightKg: 90, reps: 1 }],
  });
  const [bench] = result.lifts;

  assert.equal(bench.tierIndex, 2);
  assert.ok(bench.nextTier);
  assert.equal(bench.nextTier.tierIndex, 3);
  assert.ok(bench.nextTier.oneRepMaxKg > bench.oneRepMaxKg);
  close(zForLift("male", "bench", bench.nextTier.oneRepMaxKg, 80, 30), STRENGTH_TIERS[3].minZ, 1e-9);
});

test("calculateStrength has no next tier at the top of the ladder", () => {
  const result = calculateStrength({
    sex: "male",
    age: 30,
    bodyweightKg: 80,
    lifts: [{ lift: "deadlift", weightKg: 320, reps: 1 }],
  });
  assert.equal(result.lifts[0].tierIndex, 5);
  assert.equal(result.lifts[0].nextTier, null);
});

test("calculateStrength rejects an empty lift list", () => {
  assert.throws(() => calculateStrength({ sex: "female", age: 30, bodyweightKg: 60, lifts: [] }));
});

test("parseStrengthForm builds an input from entered lifts only, defaulting reps to 1", () => {
  const lifts = blankLifts();
  const result = parseStrengthForm({
    sex: "female",
    age: 28,
    bodyweightKg: 60,
    lifts: { ...lifts, squat: { weightKg: 80, reps: null } },
  });

  assert.ok(result.ok);
  assert.deepEqual(result.input.lifts, [{ lift: "squat", weightKg: 80, reps: 1 }]);
});

test("parseStrengthForm flags missing, unparseable and out-of-range fields", () => {
  const lifts = blankLifts();
  const result = parseStrengthForm({
    sex: "male",
    age: null,
    bodyweightKg: Number.NaN,
    lifts: {
      ...lifts,
      bench: { weightKg: 100, reps: 20 },
      squat: { weightKg: 900, reps: 1 },
      deadlift: { weightKg: 150, reps: 2.5 },
    },
  });

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.deepEqual(result.errors, {
    age: true,
    bodyweight: true,
    bench: true,
    squat: true,
    deadlift: true,
  });
});

test("parseStrengthForm flags a lift with reps but no weight", () => {
  const lifts = blankLifts();
  const result = parseStrengthForm({
    sex: "male",
    age: 30,
    bodyweightKg: 80,
    lifts: { ...lifts, bench: { weightKg: null, reps: 5 } },
  });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.deepEqual(result.errors, { bench: true });
});

test("parseStrengthForm requires at least one lift", () => {
  const result = parseStrengthForm({ sex: "male", age: 30, bodyweightKg: 80, lifts: blankLifts() });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.deepEqual(result.errors, { lifts: true });
});
