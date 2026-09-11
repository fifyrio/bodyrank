import { fromKg, toKg, type Unit } from "./model.ts";

// Blank → null (field skipped); anything unparseable → NaN (field invalid).
// Accepts "1,005" / "1,005.5" (US thousands) and "102,5" (decimal comma).
export function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;

  const isUsThousands = /^\d{1,3}(,\d{3})+(\.\d+)?$/.test(trimmed);
  const normalized = isUsThousands ? trimmed.replace(/,/g, "") : trimmed.replace(",", ".");
  return Number(normalized);
}

// Re-expresses a typed weight in another unit; leaves blank/invalid input as typed.
export function convertWeight(raw: string, from: Unit, to: Unit): string {
  const value = parseNumber(raw);
  if (value === null || !Number.isFinite(value)) return raw;
  return String(Math.round(fromKg(toKg(value, from), to) * 10) / 10);
}

// Replaces {name} placeholders; unknown placeholders are left untouched.
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

// Smallest practical load jump in each unit (a pair of 2.5 lb / 1.25 kg plates).
const PLATE_STEP: Record<Unit, number> = { lb: 5, kg: 2.5 };

export type WeightRounding = "exact" | "plate" | "plate-up";

export function roundWeight(kg: number, unit: Unit, rounding: WeightRounding = "exact"): number {
  const value = fromKg(kg, unit);
  const step = PLATE_STEP[unit];
  if (rounding === "plate") return Math.round(value / step) * step;
  if (rounding === "plate-up") return Math.ceil(value / step) * step;
  return Math.round(value);
}

export function formatWeight(kg: number, unit: Unit, rounding: WeightRounding = "exact"): string {
  return `${roundWeight(kg, unit, rounding)} ${unit}`;
}

// "Stronger than N%" — kept within 1–99 so the copy never claims 0% or 100%.
export function strongerThan(percentile: number): number {
  return Math.min(99, Math.max(1, Math.round(percentile)));
}

// "Top N%" — complements strongerThan so the two always add up to 100.
export function topPercent(percentile: number): number {
  return Math.max(1, 100 - strongerThan(percentile));
}
