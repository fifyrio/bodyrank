import { test } from "node:test";
import assert from "node:assert/strict";
import {
  convertWeight,
  fill,
  formatNumber,
  formatWeight,
  parseNumber,
  roundWeight,
  strongerThan,
  topPercent,
} from "./format.ts";
import { toKg } from "./model.ts";

test("parseNumber treats blank as skipped and junk as invalid", () => {
  assert.equal(parseNumber(""), null);
  assert.equal(parseNumber("   "), null);
  assert.ok(Number.isNaN(parseNumber("abc")));
  assert.ok(Number.isNaN(parseNumber("1.2.3")));
});

test("parseNumber reads plain, decimal-comma and US-thousands input", () => {
  assert.equal(parseNumber(" 225 "), 225);
  assert.equal(parseNumber("102.5"), 102.5);
  assert.equal(parseNumber("102,5"), 102.5);
  assert.equal(parseNumber("1,005"), 1005);
  assert.equal(parseNumber("1,005.5"), 1005.5);
  assert.equal(parseNumber("12,345,678"), 12345678);
});

test("convertWeight converts parseable values and leaves the rest untouched", () => {
  assert.equal(convertWeight("225", "lb", "kg"), "102.1");
  assert.equal(convertWeight("100", "kg", "lb"), "220.5");
  assert.equal(convertWeight("", "lb", "kg"), "");
  assert.equal(convertWeight("abc", "lb", "kg"), "abc");
});

test("roundWeight supports exact, nearest-plate and plate-up rounding", () => {
  const kg = toKg(252, "lb");
  assert.equal(roundWeight(kg, "lb"), 252);
  assert.equal(roundWeight(kg, "lb", "plate"), 250);
  assert.equal(roundWeight(kg, "lb", "plate-up"), 255);
  assert.equal(roundWeight(101, "kg", "plate-up"), 102.5);
  assert.equal(formatWeight(100, "kg"), "100 kg");
});

test("formatNumber and formatWeight follow the page language", () => {
  assert.equal(formatNumber(1005, "en"), "1,005");
  assert.equal(formatNumber(112.5, "en"), "112.5");
  assert.equal(formatNumber(112.5, "es"), "112,5");
  assert.equal(formatWeight(112.5, "kg", "exact", "es"), "113 kg");
  assert.equal(formatWeight(112, "kg", "plate-up", "es"), "112,5 kg");
});

test("strongerThan and topPercent stay within 1–99 and sum to 100", () => {
  assert.equal(strongerThan(0.1), 1);
  assert.equal(strongerThan(99.9), 99);
  for (const p of [0.1, 12.4, 50, 77.6, 99.9]) {
    assert.equal(strongerThan(p) + topPercent(p), 100);
  }
});

test("fill replaces known placeholders and keeps unknown ones", () => {
  assert.equal(fill("Top {n}% · {tier}", { n: 23, tier: "SILVER" }), "Top 23% · SILVER");
  assert.equal(fill("{missing}", {}), "{missing}");
});
